$(document).ready(function () {
    // REFERÊNCIAS
    const form = $('#form')

    //FUNÇÕES
    const gravar = dados => {
        dados.append('rota', 'login')

        $.ajax({
            method: "POST",
            url: "../database/rotas.php",
            data: dados,
            processData: false,
            contentType: false
        }).done(function (retorno) {
            let resultado = JSON.parse(retorno)
            console.log(resultado.dados);
            if (resultado.dados) {
                const email = resultado.dados.EMAIL
                const id = resultado.dados.ID
                const nome = resultado.dados.NOME
                const sobrenome = resultado.dados.SOBRENOME
                localStorage.setItem('email', email);
                localStorage.setItem('id', id);
                localStorage.setItem('nome', nome);
                localStorage.setItem('sobrenome', sobrenome);
                window.location.href = '../pages/home.php'
            } else {
                alert(resultado.msg)
            }
        }).fail(function (retorno) {
            alert(resultado.msg)
        })
    }

    // EVENTOS 
    form.submit(function (e) {
        e.preventDefault()
        const dados = new FormData(form[0])
        gravar(dados)
    })
})