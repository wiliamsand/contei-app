$(document).ready(function () {
    let logado = false
    logado ? window.location.href = './src/pages/home.php' : window.location.href = './src/pages/login.php'
})