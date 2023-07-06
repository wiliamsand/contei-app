<?php
require_once 'defines.php';
require 'config.php';

function gravarUsuario($conn)
{
    $resultado = [
        'erro' => 0,
        'msg' => 'Cadastro feito com sucesso!'
    ];

    $nome = $_POST["nome"];
    $sobrenome = $_POST["sobrenome"];
    $email = $_POST["email"];
    $senha = $_POST["senha"];

    try {
        $stmt = $conn->prepare(_SQL_GRAVAR_USUARIO);
        $stmt->execute([$nome, $sobrenome, $email, $senha]);
    } catch (PDOException $e) {
        $resultado['erro'] = 1;
        $resultado['msg'] = 'ERRO: ' . $e->getMessage();
    }

    echo json_encode($resultado);
}
