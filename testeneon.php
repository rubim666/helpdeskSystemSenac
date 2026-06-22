<?php

$host = "ep-green-night-acel3qx9-pooler.sa-east-1.aws.neon.tech";
$dbname = "neondb";
$user = "neondb_owner";
$password = "npg_UkuLXGbqY71a";

try {
    $dsn = "pgsql:host=$host;port=5432;dbname=$dbname;sslmode=require;options='endpoint=ep-green-night-acel3qx9'";

    $pdo = new PDO($dsn, $user, $password);

    echo "Conectado com sucesso!<br>";

    $stmt = $pdo->prepare('SELECT * FROM "USUARIO"');
    $stmt->execute();
    $resultado = $stmt->fetchAll();
    foreach($resultado as $result => $user){
        echo "Usuarios " . $user['nome'] . "<br>";

    }

} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}


