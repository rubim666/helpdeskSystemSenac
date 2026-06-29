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

    $uuid = sprintf(
    '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
    mt_rand(0, 0xffff), mt_rand(0, 0xffff),
    mt_rand(0, 0xffff),
    mt_rand(0, 0x0fff) | 0x4000,
    mt_rand(0, 0x3fff) | 0x8000,
    mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );


    $descricao = "GABRIEL BAITOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    $data = new DateTime();
    $idChamado = 1;
    $idTecnico = 2;

    $history->createUsuario(
        $uuid,
        $descricao,
        $data,
        $idChamado,
        $idTecnico
    );

    echo "Histórico inserido com sucesso!";

} catch (Exception $e) {
    throw $e;
}