$(document).ready(function () {
    // REFERÊNCIAS
    const form = $('#form')

    // EVENTOS 
    form.submit(function (e) {
        e.preventDefault()
        const dados = new FormData(form[0])
        const senha = dados.get('senha')
        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/
        
        //validação da senha
        if (senha !== dados.get('confirmacao-senha')) {
            alert('As senhas não conferem, verifique e tente novamente!')
            return
        }
        if (!regexSenha.test(senha)) {
            alert('A senha precisa ter no mínimo 8 dígitos e conter letras maiúsculas, minúsculas, números e no mínimo um caractere especial!')
            return
        }

        alert('enviar')
    })
})