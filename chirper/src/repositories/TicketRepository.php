<?php
require_once __DIR__ . "/../configs/Database.php";
require_once __DIR__ . "/../models/Ticket.php";

class TicketRepository{
    public function EncontrarTicketPorId(int $id):Ticket{
        try{
            $sql = 'SELECT * FROM "CHAMADO" WHERE id = ?';
            $stmt = Database::getConnection()->prepare($sql);
            $stmt->execute([$id]);
            $dados = $stmt->fetch();
            $dataAberturaObj = !empty($dados['data_abertura']) ? new DateTime($dados['data_abertura']) : null;
            $dataEncerramentoObj = !empty($dados['data_encerramento']) ? new DateTime($dados['data_encerramento']) : null;
            return new Ticket($dados['id'],  $dados['titulo']
             , $dados['descricao'] , $dados['prioridade'], $dados['patrimonio'],
               $dados['status'], $dados['id_categoria'], $dados['id_usuario'], 
               $dados['id_responsavel'], $dados['uuid'], $dataAberturaObj,
               $dataEncerramentoObj);
        }catch(PDOException $e){
            throw new RuntimeException("Erro ao buscar chamado no banco",0 , $e);
        }
    }

    public function EncontrarTodosTickets(): string { // <-- Tipo de retorno vira string
        try {
            $sql = 'SELECT * FROM "CHAMADO"';
            $stmt = Database::getConnection()->prepare($sql);
            $stmt->execute();
            $dados = $stmt->fetchAll();
            $tickets = [];
      
            foreach($dados as $linha){
                $dataAberturaObj = !empty($linha['data_abertura']) ? new DateTime($linha['data_abertura']) : null;
                $dataEncerramentoObj = !empty($linha['data_encerramento']) ? new DateTime($linha['data_encerramento']) : null;
                
                $ticket = new Ticket(
                    $linha['id'],  $linha['titulo'], $linha['descricao'], 
                    $linha['prioridade'], $linha['patrimonio'], $linha['status'], 
                    $linha['id_categoria'], $linha['id_usuario'], $linha['id_responsavel'], 
                    $linha['uuid'], $dataAberturaObj, $dataEncerramentoObj
                );
                $tickets[] = $ticket->getAll(); 
            }
            return json_encode($tickets, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        } catch (PDOException $e) {
            throw new RuntimeException("Erro ao buscar chamados no banco", 0, $e);
        }
    }

    public function CriarTicket(Ticket $ticket):void{
        try {
            $sql = 'INSERT INTO "CHAMADO" (uuid, titulo, descricao, prioridade, data_abertura, data_encerramento, patrimonio, id_categoria, id_usuario, id_responsavel, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            $stmt = Database::getConnection()->prepare($sql);
            $stmt->execute([$ticket->getUuid(), $ticket->getTitulo(), $ticket->getDescricao(), $ticket->getPrioridade(), $ticket->getDataAbertura(), $ticket->getDataEncerramento(), $ticket->getPatrimonio(), $ticket->getIdCategoria(), $ticket->getIdUsuario(), $ticket->getIdResponsavel(), $ticket->getStatus()]);
        } catch (PDOException $e) {
            throw new RuntimeException("Erro ao criar chamado no banco",0 , $e);
        }
    }

    public function atualizarPrioridadeTicket(int $id, string $prioridade):void{
        try {
            $sql = 'UPDATE "CHAMADO" SET prioridade = ? WHERE id = ?';
            $stmt = Database::getConnection()->prepare($sql);
            $stmt->execute([$prioridade, $id]);
        } catch (PDOException $e) {
            throw new RuntimeException("Erro ao atualizar prioridade do chamado no banco",0 , $e);
        }
    }
    
    public function encerrarTicket(int $id, string $status):void{
        try {
            $sql = 'UPDATE "CHAMADO" SET status = ?, data_encerramento = NOW() WHERE id = ?';
            $stmt = Database::getConnection()->prepare($sql);
            $stmt->execute([$status, $id]);
        } catch (PDOException $e) {
            throw new RuntimeException("Erro ao encerrar chamado no banco",0 , $e);
        }
    }
}

    // BUSCA DE UM CHAMADO POR ID
    // $ticket = new TicketRepository();
    // echo $ticket->EncontrarTicketPorId(317)->getTitulo();


    $repositorio = new TicketRepository();
    $json = $repositorio->EncontrarTodosTickets();
    header('Content-Type: application/json; charset=utf-8');
    echo $json;


    // echo "echo de string pra ver se ta aparecendo";
// $user = $usuario->encontrarPorCpf('222.222.222-22');
// $user->setEmail('carlinhos13@empresa.com');
// $user->setNome('Carlos Campos');
// echo $usuario->atualizarUsuario($user);
// echo $user->getNome() . "<br>" . $user->getEmail() . "<br>" . $user->getTelefone();
 
// $user = new User('JoaozinhoGsss' , '111.222.444-21' , '(15)99222-8890' , 'joaozinho11112@email.com' , '123456');
// echo $usuario->criarUsuario($user);
 
// $user = new UserRepository();
// $usuario = $user->EncontrarTodosUsuarios();
// foreach($usuario as $user){
//     echo $user->getEmail() . "<br>";
// }
// echo $usuario->getId();  
// echo "<br>";
 
// echo $usuario->getNome();
// echo "<br>";
 
// echo $usuario->getEmail();
// echo "<br>";
 
// echo $usuario->getNivel();

?>