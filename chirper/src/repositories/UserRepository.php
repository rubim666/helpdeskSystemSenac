<?php 
require_once __DIR__ . "/../configs/Database.php";
require_once __DIR__ . "/../models/User.php";
class UserRepository{
    public function EncontrarUsuarioPorId(int $id):User{
        try{
            $sql = 'SELECT * FROM "USUARIO" WHERE id = ?';
            $stmt = Database::getConnection()->prepare($sql);
            $stmt->execute([$id]);
            $dados = $stmt->fetch();
            return new User($dados['id'], $dados['uuid'] , $dados['nome']
             , $dados['CPF'] , $dados['telefone'] , $dados['email'],
             $dados['senha'], $dados['nivel'] , $dados['ativo']);
        }catch(PDOException $e){
            throw new RuntimeException("Erro ao buscar usuário no banco",0 , $e);
        }
    }
    public function EncontrarTodosUsuarios():array{
        try{
            $sql = 'SELECT * FROM "USUARIO"';
            $stmt = Database::getConnection()->prepare($sql);
            $stmt->execute();
            $dados = $stmt->fetchAll();
            $usuarios = [];
            foreach ($dados as $usuario) {
            $usuarios[] = new User(    
                $usuario['id'],
                $usuario['uuid'],           
                $usuario['nome'],
                $usuario['CPF'],
                $usuario['telefone'],
                $usuario['email'],
                $usuario['senha'],
                $usuario['nivel'],
                $usuario['ativo']
            );
            }
            return $usuarios;


        }catch(PDOException $e){
            throw new RuntimeException("Erro ao buscar usuário no banco",0 , $e);
        }
    }
    public function criarUsuario(User $usuario):bool{
        try{
            $sql = 'INSERT INTO "USUARIO" (nome, "CPF" , telefone , email , senha , nivel , ativo) VALUES ( ? , ? , ?  , ? , ? , ? , ?)';
            $stmt = Database::getConnection()->prepare($sql);
            return $stmt->execute([$usuario->getNome() ,
            $usuario->getCpf() , $usuario->getTelefone() , $usuario->getEmail() , $usuario->getSenha() , $usuario->getNivel() , $usuario->getAtivo()]);
        }catch(PDOException $e){
            throw new RuntimeException("Erro ao criar usuario ",0 , $e);
        }
       
    }
    public function deletarUsuario(int $id): bool{
        try {
            $sql = 'UPDATE FROM "USUARIO" SET ativo = FALSE WHERE id = ?';
            $stmt = Database::getConnection()->prepare($sql);
            return $stmt->execute([$id]);
        } catch (PDOException $e) {
            throw new RuntimeException("Erro ao tentar deletar usuario " , 0 , $e);
        }
    }
}

$usuario = new UserRepository();
echo $usuario->deletarUsuario(2);

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