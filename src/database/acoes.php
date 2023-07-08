<?php
require_once 'defines.php';
require 'config.php';

//REGISTRO
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

//LOGIN
function login($conn)
{
    $resultado = [
        'erro' => 0,
        'msg' => 'Login feito com sucesso!'
    ];

    $email = $_POST["email"];
    $senha = $_POST["senha"];

    try {
        $stmt = $conn->prepare(_SQL_LOGIN);
        $stmt->execute([$email, $senha]);
        $dados = $stmt->fetch(PDO::FETCH_ASSOC); // Obter os dados da consulta

        if ($dados) {
            $resultado['dados'] = $dados; // Incluir os dados no array de resultado
        } else {
            $resultado['erro'] = 1;
            $resultado['msg'] = 'Credenciais inválidas!';
        }
    } catch (PDOException $e) {
        $resultado['erro'] = 1;
        $resultado['msg'] = 'ERRO: ' . $e->getMessage();
    }

    echo json_encode($resultado);
}
