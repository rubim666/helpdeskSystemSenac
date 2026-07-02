<?php

date_default_timezone_set('America/Sao_Paulo');

class Ticket {
    protected int $id;
    protected ?string $uuid;
    protected string $titulo;
    protected string $descricao;
    protected ?string $prioridade;
    protected ?DateTime $dataAbertura;
    protected ?DateTime $dataEncerramento;
    protected string $patrimonio;
    protected ?int $id_categoria;
    protected int $id_usuario;
    protected ?int $id_responsavel;
    protected string $status;
 
    public function __construct(
        int $id = null,
        ?string $uuid = null,
        string $titulo,
        string $descricao,
        ?string $prioridade = null,
        ?DateTime $dataAbertura = null,
        ?DateTime $dataEncerramento = null,
        string $patrimonio,
        ?int $id_categoria = null,
        int $id_usuario = 0,
        ?int $id_responsavel = null,
        string $status
    )
    {
        if (empty($titulo)) {
        throw new InvalidArgumentException('Nome inválido');
        }

        if (empty($descricao)) {
        throw new InvalidArgumentException('Telefone inválido');
        }

        $this->id = $id;
        $this->uuid = $uuid;
        $this->titulo = $titulo;
        $this->descricao = $descricao;
        $this->prioridade = $prioridade;
        $this->dataAbertura = $dataAbertura;
        $this->dataEncerramento = $dataEncerramento;
        $this->patrimonio = $patrimonio;
        $this->id_categoria = $id_categoria;
        $this->id_usuario = $id_usuario;
        $this->id_responsavel = $id_responsavel;
        $this->status = $status;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getUuid(): string {
        return $this->uuid;
    }

    public function getTitulo(): string {
        return $this->titulo;
    }

    public function getDescricao(): string {
        return $this->descricao;
    }

    public function getPrioridade(): string {
        return $this->prioridade;
    }

    public function getDataAbertura(): DateTime {
        return $this->dataAbertura;
    }

    public function getDataEncerramento(): DateTime {
        $date = new DateTime();
        return $this->dataEncerramento->$date->format('d-m-Y H:i:s');
    }

    public function getPatrimonio(): string {
        return $this->patrimonio;
    }

    public function getIdCategoria(): int {
        return $this->id_categoria;
    }

    public function getIdUsuario(): int {
        return $this->id_usuario;
    }

    public function getIdResponsavel(): ?int {
        return $this->id_responsavel;
    }

    public function getStatus(): string {
        return $this->status;
    }

    public function getHistorico(): array {
        return [
            'id' => $this->id,
            'titulo' => $this->titulo,
            'descricao' => $this->descricao,
            'patrimonio' => $this->patrimonio,
        ];
    } 

    public function getAll(): array {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'titulo' => $this->titulo,
            'descricao' => $this->descricao,
            'prioridade' => $this->prioridade,
            'dataAbertura' => $this->dataAbertura,
            'dataEncerramento' => $this->dataEncerramento,
            'patrimonio' => $this->patrimonio,
            'id_categoria' => $this->id_categoria,
            'id_usuario' => $this->id_usuario,
            'id_responsavel' => $this->id_responsavel,
            'status' => $this->status,
        ];
    }

    public function toJson(): string {
        return json_encode($this->getAll());
    }

    public function setTitulo(string $titulo): void {
        if (empty($titulo)) {
            throw new InvalidArgumentException('Título inválido');
        }
        $this->titulo = $titulo;
    }

    public function setDescricao(string $descricao): void {
        if (empty($descricao)) {
            throw new InvalidArgumentException('Descrição inválido');
        }
        $this->descricao = $descricao;
    }

    public function setPrioridade(string $prioridade): void {
        $this->prioridade = $prioridade;
    }

    public function setPatrimonio(string $patrimonio): void {
        if (empty($patrimonio)) {
            throw new InvalidArgumentException('Patrimônio inválido');
        }
        $this->patrimonio = $patrimonio;
    }

    public function setStatus(string $status): void {
        $this->status = $status;
    }

    public function setIdCategoria(int $id_categoria): void {
        $this->id_categoria = $id_categoria;
    }

    public function setIdUsuario(int $id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    public function setIdResponsavel(?int $id_responsavel): void {
        $this->id_responsavel = $id_responsavel;
    }
}
 

$teste = new Ticket(1, "147", "titulo", "descricao descricao", "baixa", new DateTime(), new DateTime("2026-01-01"), "pat-01", 1, 1, 1, "ativo");
echo "<pre>";
echo $teste->toJson();
echo "</pre>";
?>