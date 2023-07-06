<?php
require_once 'acoes.php';

switch ($_POST['rota']) {
        //REGISTRO
    case 'gravar_usuario':
        gravarUsuario($conn);
        break;

        //DEFAULT ROTA NÃO ENCONTRADA
    default:
        echo json_encode(['erro' => 1, 'msg' => 'Rota não encontrada!']);
        break;
}
