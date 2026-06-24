<?php

declare(strict_types=1);

use App\Controllers\CategoriaController;
use App\Controllers\ChamadoController;
use App\Controllers\HistoricoController;
use App\Controllers\HomeController;
use App\Controllers\StatusController;
use App\Controllers\UsuarioController;
use App\Core\Router;

require_once __DIR__ . '/../app/Core/Database.php';
require_once __DIR__ . '/../app/Core/Controller.php';
require_once __DIR__ . '/../app/Core/Router.php';

require_once __DIR__ . '/../app/Models/BaseModel.php';
require_once __DIR__ . '/../app/Models/Usuario.php';
require_once __DIR__ . '/../app/Models/Chamado.php';
require_once __DIR__ . '/../app/Models/Categoria.php';
require_once __DIR__ . '/../app/Models/Historico.php';
require_once __DIR__ . '/../app/Models/Status.php';

require_once __DIR__ . '/../app/Controllers/HomeController.php';
require_once __DIR__ . '/../app/Controllers/UsuarioController.php';
require_once __DIR__ . '/../app/Controllers/ChamadoController.php';
require_once __DIR__ . '/../app/Controllers/CategoriaController.php';
require_once __DIR__ . '/../app/Controllers/HistoricoController.php';
require_once __DIR__ . '/../app/Controllers/StatusController.php';

$router = new Router();
require __DIR__ . '/../routes/web.php';

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
