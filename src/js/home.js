$(document).ready(function () {
    //DADOS USUARIO
    const usuario = {
        id: localStorage.getItem('id'),
        nome: localStorage.getItem('nome'),
        sobrenome: localStorage.getItem('sobrenome'),
        email: localStorage.getItem('email')
    }

    //INICIO
    const selectMes = $('#select-mes').val(getMesAtual())
    const selectAno = $('#select-ano').val(getAnoAtual())

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
    let tipoCategoria = 'R'

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
    //quando muda a nav da categoria seta variável global com seu tipo
    $('.nav-pills .nav-link').on('shown.bs.tab', function (event) {
        const selectedNavItem = $(event.target).text()
        if (selectedNavItem == 'Receitas') {
            tipoCategoria = 'R'
        } else {
            tipoCategoria = 'D'
        }
    })

    formCategorias.submit(function (e) {
        e.preventDefault()
        const dados = new FormData(formCategorias[0])
        dados.append('tipo', tipoCategoria)
        gravarCategoria(dados)
    })
})