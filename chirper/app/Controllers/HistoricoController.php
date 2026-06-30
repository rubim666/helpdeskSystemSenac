<?php

require_once "./chirper/app/Models/Historico.php";

class HistoryController {


    public static function createHistory(int $id_tecnico, int $id_chamado) {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $uuid = $_POST['uuid'];
            $description = $_POST['description'];
            $date = $_POST['date'];


            $history = new History(
                        0,
                        "",
                        new DateTime(),
                        0,
                        0
                    );


            $history->createUsuario(
                        $uuid,
                        $description,
                        $date,
                        $id_chamado,
                        $id_tecnico
                    );

        }
    }

    public static function getId(int $id) {
        if (!empty($id)) {
            History::getIdHistory($id);
        } elseif (empty($id)) {
            echo "Sessão interrompida";
        }
    }
}
