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
    const nome = $('#p-nome').text(usuario.nome)
    const containerPrincipal = $('.container-principal')
    const menuContas = $('#menu-contas').click(() => {
        containerPrincipal.hide()
    })

    //REFERÊNCIAS CONTAS
    const formConta = $('#form-conta')

    //EVENTOS CONTAS
    formConta.submit(function (e) {
        e.preventDefault()
        alert('cadastrar conta')
    })
})