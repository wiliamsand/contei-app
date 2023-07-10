$(document).ready(function () {
    //DADOS USUARIO
    const usuario = {
        id: localStorage.getItem('id'),
        nome: localStorage.getItem('nome'),
        sobrenome: localStorage.getItem('sobrenome'),
        email: localStorage.getItem('email')
    }

    //GLOBAIS
    let tipoCategoria = 'R'

    //CONTAINERS
    const containerPrincipal = $('.container-principal')
    const containerContas = $('.container-contas')
    const containerCategorias = $('.container-categorias')

    //TOPBAR
    const nome = $('#p-nome').text(usuario.nome)

    //SIDEBAR
    const menuContas = $('#menu-contas').click(() => {
        containerPrincipal.hide()
        containerCategorias.hide()
        containerContas.show()
    })
    const menuCategorias = $('#menu-categorias').click(() => {
        containerPrincipal.hide()
        containerContas.hide()
        containerCategorias.show()
    })

    //REFERÊNCIAS INICIO
    const selectMes = $('#select-mes').val(getMesAtual())
    const selectAno = $('#select-ano').val(getAnoAtual())
    const selectCategoriaReceita = $('#categoria-receita')
    const selectCategoriaDespesa = $('#categoria-despesa')
    const selectContaReceita = $('#conta-receita')
    const selectContaDespesa = $('#conta-despesa')
    const formLancarReceita = $('#form-lancar-receita')
    const formLancarDespesa = $('#form-lancar-despesa')
    const modalLancamento = $('#myModal')
    const cardSaldoContas = $('#card-saldo-contas')
    const cardReceitas = $('#card-receitas')
    const cardDespesas = $('#card-despesas')
    const cardBalanco = $('#card-balanco')

    // FUNÇÕES INICIO 
    const carregarCategorias = usuario => {
        const montarOptions = dados => {
            selectCategoriaReceita.find('option:gt(0)').remove()
            selectCategoriaDespesa.find('option:gt(0)').remove()
            dados.map(item => item.TIPO == 'R' ?
                selectCategoriaReceita.append($('<option>', { value: item.ID, text: item.NOME })) :
                selectCategoriaDespesa.append($('<option>', { value: item.ID, text: item.NOME }))
            )
        }

        const dados = {
            rota: 'carregar_categorias',
            idUsuario: usuario
        }

        $.ajax({
            method: "POST",
            url: "../database/rotas.php",
            data: dados
        }).done(function (retorno) {
            let resultado = JSON.parse(retorno)
            montarOptions(resultado.dados)
        }).fail(function (retorno) {
            alert(resultado.msg)
        })
    }

    const carregarContas = usuario => {
        const montarOptions = dados => {
            selectContaReceita.find('option:gt(0)').remove()
            selectContaDespesa.find('option:gt(0)').remove()
            dados.map(item => selectContaReceita.append($('<option>', { value: item.ID, text: item.NOME })))
            dados.map(item => selectContaDespesa.append($('<option>', { value: item.ID, text: item.NOME })))
        }

        const dados = {
            rota: 'carregar_contas',
            idUsuario: usuario
        }

        $.ajax({
            method: "POST",
            url: "../database/rotas.php",
            data: dados
        }).done(function (retorno) {
            let resultado = JSON.parse(retorno)
            montarOptions(resultado.dados)
        }).fail(function (retorno) {
            alert(resultado.msg)
        })
    }

    const limparFormsLancamento = () => {
        formLancarReceita[0].reset()
        formLancarDespesa[0].reset()
    }

    const gravarLancamento = dados => {
        dados.append('rota', 'gravar_lancamento')
        dados.append('id-usuario', usuario.id)
        dados.append('tipo', tipoCategoria)

        $.ajax({
            method: "POST",
            url: "../database/rotas.php",
            data: dados,
            processData: false,
            contentType: false
        }).done(function (retorno) {
            let resultado = JSON.parse(retorno)
            limparFormsLancamento()
            modalLancamento.modal('hide')
            carregaCardsBalanco()
            alert(resultado.msg);
        }).fail(function (retorno) {
            alert(resultado.msg)
        })
    }

    const getAnoMes = () => {
        const ano = selectAno.val()
        const mes = selectMes.val() < 10 ? '0' + selectMes.val() : selectMes.val()
        const anoMes = ano.toString() + mes.toString()
        return anoMes
    }

    const carregaCardsBalanco = () => {
        const montarCards = resultado => {
            cardSaldoContas.text('R$' + resultado.saldo_contas[0].SALDO_CONTAS)
            cardReceitas.text('R$' + resultado.receitas_despesas_balanco[0].RECEITAS)
            cardDespesas.text('R$' + resultado.receitas_despesas_balanco[0].DESPESAS)
            cardBalanco.text('R$' + resultado.receitas_despesas_balanco[0].BALANCO)
        }

        const dados = {
            anoMes: getAnoMes(),
            idUsuario: usuario.id,
            rota: 'carregar_cards_balanco'
        }
        $.ajax({
            method: "POST",
            url: "../database/rotas.php",
            data: dados
        }).done(function (retorno) {
            let resultado = JSON.parse(retorno)
            montarCards(resultado)
        }).fail(function (retorno) {
            alert(resultado.msg)
        })
    }

    //EVENTOS INICIO
    modalLancamento.on('show.bs.modal', function () {
        carregarCategorias(usuario.id)
        carregarContas(usuario.id)
    })

    formLancarReceita.submit(function (e) {
        e.preventDefault()
        const dados = new FormData(formLancarReceita[0])
        gravarLancamento(dados)
    })

    formLancarDespesa.submit(function (e) {
        e.preventDefault()
        const dados = new FormData(formLancarDespesa[0])
        gravarLancamento(dados)
    })

    selectMes.add(selectAno).change(function () {
        carregaCardsBalanco()
    });

    //REFERÊNCIAS CONTAS
    const formConta = $('#form-conta')

    //FUNÇÕES CONTAS
    const limparFormConta = () => {
        formConta[0].reset()
    }

    const gravarConta = dados => {
        dados.append('rota', 'gravar_conta')
        dados.append('id-usuario', usuario.id)

        $.ajax({
            method: "POST",
            url: "../database/rotas.php",
            data: dados,
            processData: false,
            contentType: false
        }).done(function (retorno) {
            let resultado = JSON.parse(retorno)
            limparFormConta()
            alert(resultado.msg);
        }).fail(function (retorno) {
            alert(resultado.msg)
        })
    }

    //EVENTOS CONTAS
    formConta.submit(function (e) {
        e.preventDefault()
        const dados = new FormData(formConta[0])
        gravarConta(dados)
    })

    //REFERENCIAS CATEGORIAS
    const formCategorias = $('#form-categoria')

    //FUNÇÕES CATEGORIAS
    const limparFormCategoria = () => {
        formCategorias[0].reset()
    }

    const gravarCategoria = dados => {
        dados.append('rota', 'gravar_categoria')
        dados.append('id-usuario', usuario.id)

        $.ajax({
            method: "POST",
            url: "../database/rotas.php",
            data: dados,
            processData: false,
            contentType: false
        }).done(function (retorno) {
            let resultado = JSON.parse(retorno)
            limparFormCategoria()
            alert(resultado.msg);
        }).fail(function (retorno) {
            alert(resultado.msg)
        })
    }

    //EVENTOS CATEGORIAS
    formCategorias.submit(function (e) {
        e.preventDefault()
        const dados = new FormData(formCategorias[0])
        dados.append('tipo', tipoCategoria)
        gravarCategoria(dados)
    })

    //EVENTOS GLOBAIS
    $('.nav-pills .nav-link').on('shown.bs.tab', function (event) {
        const selectedNavItem = $(event.target).text()
        if (selectedNavItem == 'Receitas') {
            tipoCategoria = 'R'
        } else {
            tipoCategoria = 'D'
        }
        console.log(tipoCategoria);
    })

    //OUTROS
    carregaCardsBalanco()
})