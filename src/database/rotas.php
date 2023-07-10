<?php
require_once 'acoes.php';

if (isset($_POST['rota'])) {
    switch ($_POST['rota']) {
            //REGISTRO
        case 'gravar_usuario':
            gravarUsuario($conn);
            break;

            //LOGIN
        case 'login':
            login($conn);
            break;

            //CADASTRAR CONTA
        case 'gravar_conta':
            gravarConta($conn);
            break;

            //CADASTRAR CATEGORIA
        case 'gravar_categoria':
            gravarCategoria($conn);
            break;

            //CARREGAR CATEGORIAS
        case 'carregar_categorias':
            carregarCategorias($conn);
            break;

            //CARREGAR CONTAS
        case 'carregar_contas':
            carregarContas($conn);
            break;

            //GRAVAR LANÇAMENTO
        case 'gravar_lancamento':
            gravarLancamento($conn);
            break;

            //CARREGA CARDS BALANCO
        case 'carregar_cards_balanco':
            carregaCardsBalanco($conn);
            break;

            //DEFAULT ROTA NÃO ENCONTRADA
        default:
            echo json_encode(['erro' => 1, 'msg' => 'Rota não encontrada!']);
            break;
    }
}
