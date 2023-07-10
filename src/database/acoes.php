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
        $dados = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($dados) {
            $resultado['dados'] = $dados;
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

//GRAVAR CONTA
function gravarConta($conn)
{
    $resultado = [
        'erro' => 0,
        'msg' => 'Conta cadastrada!'
    ];

    $nome = $_POST["nome"];
    $saldoInicial = $_POST["saldo-inicial"];
    $idUsuario = $_POST["id-usuario"];

    try {
        $stmt = $conn->prepare(_SQL_GRAVAR_CONTA);
        $stmt->execute([$nome, $saldoInicial, $saldoInicial, $idUsuario]);
    } catch (PDOException $e) {
        $resultado['erro'] = 1;
        $resultado['msg'] = 'ERRO: ' . $e->getMessage();
    }

    echo json_encode($resultado);
}

//GRAVAR CATEGORIA
function gravarCategoria($conn)
{
    $resultado = [
        'erro' => 0,
        'msg' => 'Categoria cadastrada!'
    ];

    $nome = $_POST["nome"];
    $tipo = $_POST["tipo"];
    $idUsuario = $_POST["id-usuario"];

    try {
        $stmt = $conn->prepare(_SQL_GRAVAR_CATEGORIA);
        $stmt->execute([$nome, $tipo, $idUsuario]);
    } catch (PDOException $e) {
        $resultado['erro'] = 1;
        $resultado['msg'] = 'ERRO: ' . $e->getMessage();
    }

    echo json_encode($resultado);
}

//CARREGAR CATEGORIAS
function carregarCategorias($conn)
{
    $resultado = [
        'erro' => 0,
        'msg' => 'Categorias carregadas!'
    ];

    $idUsuario = $_POST["idUsuario"];

    try {
        $stmt = $conn->prepare(_SQL_CARREGAR_CATEGORIAS);
        $stmt->execute([$idUsuario]);
        $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($dados) {
            $resultado['dados'] = $dados;
        } else {
            $resultado['erro'] = 1;
            $resultado['msg'] = 'Erro ao carregar as categorias!';
        }
    } catch (PDOException $e) {
        $resultado['erro'] = 1;
        $resultado['msg'] = 'ERRO: ' . $e->getMessage();
    }

    echo json_encode($resultado);
}

//CARREGAR CONTAS
function carregarContas($conn)
{
    $resultado = [
        'erro' => 0,
        'msg' => 'Contas carregadas!'
    ];

    $idUsuario = $_POST["idUsuario"];

    try {
        $stmt = $conn->prepare(_SQL_CARREGAR_CONTAS);
        $stmt->execute([$idUsuario]);
        $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($dados) {
            $resultado['dados'] = $dados;
        } else {
            $resultado['erro'] = 1;
            $resultado['msg'] = 'Erro ao carregar as contas!';
        }
    } catch (PDOException $e) {
        $resultado['erro'] = 1;
        $resultado['msg'] = 'ERRO: ' . $e->getMessage();
    }

    echo json_encode($resultado);
}

function gravarLancamento($conn)
{
    $resultado = [
        'erro' => 0,
        'msg' => 'Lançamento gravado com sucesso!'
    ];

    $tipo = $_POST["tipo"];
    $valor = $_POST["valor"];
    $descricao = $_POST["descricao"];
    $data = $_POST["data"];
    $idCategoria = $_POST["categoria"];
    $idConta = $_POST["conta"];
    $idUsuario = $_POST["id-usuario"];

    try {
        //GRAVA LANÇAMENTO
        $stmt = $conn->prepare(_SQL_GRAVAR_LANCAMENTO);
        $stmt->execute([$tipo, $valor, $descricao, $data, $idCategoria, $idConta, $idUsuario]);

        //MUDA SALDO DA CONTA
        if ($tipo == 'R') {
            $stmt = $conn->prepare(_SQL_UPDATE_SALDO_CONTA_RECEITA);
            $stmt->execute([$valor, $idConta]);
        } else {
            $stmt = $conn->prepare(_SQL_UPDATE_SALDO_CONTA_DESPESA);
            $stmt->execute([$valor, $idConta]);
        }
    } catch (PDOException $e) {
        $resultado['erro'] = 1;
        $resultado['msg'] = 'ERRO: ' . $e->getMessage();
    }

    echo json_encode($resultado);
}

//CARREGAR CARDS BALANÇO
function carregaCardsBalanco($conn)
{
    $resultado = [
        'erro' => 0,
        'msg' => 'Dados dos cards carregados!'
    ];

    $idUsuario = $_POST["idUsuario"];
    $anoMes = $_POST["anoMes"];
    
    try {
        $stmt = $conn->prepare(_SQL_CARREGAR_SALDO_CONTAS);
        $stmt->execute([$anoMes, $idUsuario, $anoMes, $idUsuario, $idUsuario, $anoMes]);
        $dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $stmt = $conn->prepare(_SQL_CARREGAR_RECEITAS_DESPESAS_BALANCO);
        $stmt->execute([$anoMes, $idUsuario, $anoMes, $idUsuario]);
        $dados2 = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($dados && $dados2) {
            $resultado['saldo_contas'] = $dados;
            $resultado['receitas_despesas_balanco'] = $dados2;
        } else {
            $resultado['erro'] = 1;
            $resultado['msg'] = 'Erro ao carregar os dados dos cards!';
        }
    } catch (PDOException $e) {
        $resultado['erro'] = 1;
        $resultado['msg'] = 'ERRO: ' . $e->getMessage();
    }

    echo json_encode($resultado);
}