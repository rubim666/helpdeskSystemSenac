<?php 
require_once __DIR__ . "/../configs/Database.php";
require_once __DIR__ . "/../models/History.php";
class HistoryRepository{
    public function createHistory(int $id):User{
        try{
            $sql = 'INSERT INTO "HISTORICO" (data, descricao )';
            $stmt = Database::getConnection()->prepare($sql);
            $stmt->execute([$id]);
            $dados = $stmt->fetch();
            return new User($dados['id'] , $dados['uuid'] , $dados['nome']
             , $dados['CPF'] , $dados['telefone'] , $dados['email'],
             $dados['senha'], $dados['nivel'] , $dados['ativo']);
        }catch(PDOException $e){
            throw new RuntimeException("Erro ao buscar usuário no banco",0 , $e);
        }
    }
}

$user = new UserRepository();
$usuario = $user->listarUsuarioPorId(2);
?>