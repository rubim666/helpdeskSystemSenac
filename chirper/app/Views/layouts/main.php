<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Helpdesk MVC</title>
    <style>
        body { font-family: Segoe UI, sans-serif; margin: 2rem; background: #f4f7fb; color: #1f2937; }
        nav a { margin-right: 1rem; text-decoration: none; color: #0f766e; font-weight: 600; }
        main { margin-top: 1.5rem; background: #fff; padding: 1.25rem; border-radius: 10px; box-shadow: 0 6px 18px rgba(0,0,0,.06); }
        h1 { margin-top: 0; }
    </style>
</head>
<body>
    <nav>
        <a href="/">Inicio</a>
        <a href="/usuarios">Usuarios</a>
        <a href="/chamados">Chamados</a>
        <a href="/categorias">Categorias</a>
        <a href="/historicos">Historicos</a>
        <a href="/status">Status</a>
    </nav>

    <main>
        <?php require $viewFile; ?>
    </main>
</body>
</html>
