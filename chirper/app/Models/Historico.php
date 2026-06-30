<?php

require_once './chirper/src/configs/Database.php';


class History {
    private string $uuid;
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

    public static function getIdHistory(int $id): string
{
    try {

        $db = new Database();

        $stmt = $db->getConnection()->prepare(
            'SELECT * FROM "HISTORICO" WHERE id = ?'
        );

        $stmt->execute([$id]);

        $history = $stmt->fetch(PDO::FETCH_ASSOC);

        return json_encode($history);

    } catch (PDOException $e) {

        return json_encode([
            "erro" => $e->getMessage()
        ]);
    }
}
    

    public function createUsuario(string $uuid, string $descricao, DateTime $data, int $id_chamado, int $id_usuario_tecnico) {

    try {
    $db = new Database();

   
    $stmt = $db->getConnection()->prepare(
        'INSERT INTO "HISTORICO" (uuid, descricao, data, id_chamado, id_usuario_tecnico) VALUES (?, ?, ?, ?, ?)'
    );

    $params = [
    $uuid,
    $descricao,
    $data->format('Y-m-d H:i:s'),
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