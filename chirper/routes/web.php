$router->get('/', [HomeController::class, 'index']);
$router->get('/usuarios', [UsuarioController::class, 'index']);
$router->get('/chamados', [ChamadoController::class, 'index']);
$router->get('/categorias', [CategoriaController::class, 'index']);
$router->get('/historicos', [HistoricoController::class, 'index']);
$router->get('/status', [StatusController::class, 'index']);
