<?php
# sessao do usuario
session_start();
$_SESSION['user'];

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abrir Chamado</title>
    <link rel="stylesheet" href="../../../resources/css/openCalled.css">
</head>
<body>
    <div class="form">
        <h2>Abrir Chamado</h2>
        <form action="" method="post">
            <div class="form-label">
                <span id="called_id">#000123 <?php #ID DO CHAMADO ?> </span>
            </div>

            <div class="form-label">
                <label for="title">Título</label>
                <input type="text" name="title" id="title">
            </div>

            <div class="form-label">
                <label for="description">Descrição</label>
                <textarea name="description" id="description"></textarea>
            </div>

            <button type="submit">Enviar</button>
        </form>
    </div>
</body>
</html>