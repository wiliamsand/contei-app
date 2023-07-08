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

            //DEFAULT ROTA NÃO ENCONTRADA
        default:
            echo json_encode(['erro' => 1, 'msg' => 'Rota não encontrada!']);
            break;
    }
}
