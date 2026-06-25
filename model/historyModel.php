<?php

require_once '../helpdeskSystemSenac/testeneon.php';


class History {
    private int $uuid;
    private string $descricao;
    private DateTime $data;
    private int $id_usuario_tecnico;
    private int $id_chamado;

    public function __construct(int $uuid, string $descricao, DateTime $data, int $id_usuario_tecnico, int $id_chamado)
    {
        $this->uuid = $uuid;
        $this->descricao = $descricao;
        $this->data = $data;
        $this->id_usuario_tecnico = $id_usuario_tecnico;
        $this->id_chamado = $id_chamado;
    }

    public function getId() {
        return $this->uuid;
    }

    public function setId( int $uuid) {
        $this->uuid = $uuid;
    }

    public function getChamado() {
        return $this->id_chamado;
    }

    public function setChamado(int $id_chamado) {
        $this->id_chamado = $id_chamado;
    }

    public function getUserTecnico() {
        return $this->id_usuario_tecnico;
    }

    public function setUserTecnico(int $id_usuario_tecnico) {
        $this->id_usuario_tecnico = $id_usuario_tecnico;
    }

    public function getDesc() {
        return $this->descricao;
    }

    public function setDesc(string $descricao) {
        $this->descricao = $descricao;
    }

    public function getData() {
        return $this->data;
    }

    public function setData(DateTime $data) {
        $this->data = $data;
    }

    # Função para criar o historico
    public function createUsuario(string $descricao, DateTime $data, int $id_chamado, int $id_usuario_tecnico) {

    try {
    $db = new Database();

   
    $stmt = $db->getConnection()->prepare(
        "INSERT INTO historico (descricao, data, id_chamado, id_usuario_tecnico) VALUES (?, ?, ?, ?)"
    );

    $params = [
        $descricao, 
        $data,
        $id_chamado,
        $id_usuario_tecnico
    ];

    $stmt->execute($params);

    } catch (PDOException $e) {
        echo "Erro: " . $e->getMessage();
    }


    }
    

}

?>