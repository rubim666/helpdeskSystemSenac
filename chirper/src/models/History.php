<?php 

class History{
    private int $id;
    private DateTime $data;
    private string $descricao;
    
    public function __construct(int $id , ?DateTime $data = null , string $descricao = '')
    {

        $this->id = $id;
        $this->data = $data ?? new DateTime();
        $this->descricao = $descricao;
    }

    public function getId():int{
        return $this->id;
    }
    public function getData(): DateTime{
        return $this->data;
    }
    public function getDescricao():string{
        return $this->descricao;
    }

    public function setData(DateTime $data): void {
        if (empty($data)) {
        throw new InvalidArgumentException('Data inválida');
        }
        $this->data = $data;
    }
    
    public function setDescricao(string $descricao): void {
        if (empty($descricao)) {
        throw new InvalidArgumentException('Descrição inválida');
        }
        $this->descricao = $descricao;
    } 
}

?>