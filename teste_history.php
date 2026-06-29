<?php

require_once './model/historyModel.php'; 

try {


    $history = new History(
        0,
        "",
        new DateTime(),
        0,
        0
    );

   
    $descricao = "Primeiro teste de histórico";
    $data = new DateTime();
    $idChamado = 1;
    $idTecnico = 2;

    $history->createUsuario(
        $descricao,
        $data,
        $idChamado,
        $idTecnico
    );

    echo "Histórico inserido com sucesso!";

} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
}