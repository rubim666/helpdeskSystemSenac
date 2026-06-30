<?php
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abrir Chamado</title>
    <style>
        * {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    margin: 0;
    background: #ffffff;
    color: #333;
}

.container {
    max-width: 900px;
    margin: 40px auto;
    padding: 0 20px;
}

h1 {
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 14px;
    color: #666;
    margin-bottom: 40px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

label {
    font-size: 14px;
    font-weight: 600;
    color: #4b5563;
}

input, textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1.5px solid #ff6b6b;
    outline: none;
    font-size: 14px;
    transition: 0.2s;
}

textarea {
    min-height: 180px;
    resize: none;
}

input::placeholder,
textarea::placeholder {
    color: #9ca3af;
}

textarea:focus,
input:focus {
    border-color: #ff3b3b;
}

.error {
    color: #ff3b3b;
    font-size: 13px;
    margin-top: -10px;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 10px;
}

button {
    padding: 10px 22px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
}

.cancel {
    background: #ef4444;
    color: white;
}

.save {
    background: #1d9bf0;
    color: white;
}

button:hover {
    opacity: 0.9;
}

#called_id {
    display: inline-block;
    padding: 8px 12px;
    background: #f3f4f6;
    border-radius: 10px;
    font-weight: 600;
    color: #111827;
}
    </style>
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