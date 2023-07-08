function getMesAtual() {
    const dataAtual = new Date()
    const mesAtual = dataAtual.getMonth() + 1

    return mesAtual
}

function getAnoAtual() {
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    return anoAtual;
}