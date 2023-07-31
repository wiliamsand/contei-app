$(document).ready(function () {
    //LOGIN COM O GOOGLE
    function handleCredentialResponse(response) {
        const data = jwt_decode(response.credential)
        console.log(data);
    }
    window.onload = function () {
        google.accounts.id.initialize({
            client_id: "871846604959-sur510g3olplfkk4et0l7dc2ka0m3mrr.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { 
                theme: "outline", 
                size: "large",
                shape: "pill" 
            }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
    }

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