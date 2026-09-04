<?php

declare(strict_types=1);

require_once __DIR__ . '/../app/Core/Database.php';
require_once __DIR__ . '/../app/Core/Controller.php';
require_once __DIR__ . '/../app/Core/Router.php';

require_once __DIR__ . '/../app/src/configs/Database.php';
require_once __DIR__ . '/../app/src/models/Ticket.php';
require_once __DIR__ . '/../app/src/repositories/TicketRepository.php';
require_once __DIR__ . '/../app/src/controllers/CalledController.php';
require_once __DIR__ . '/../app/src/controllers/UserController.php';

use App\Core\Router;

// Allow the packaged mobile app (served from a different origin) to call this API with cookies.
$allowedOrigins = [
	'https://localhost',
	'http://localhost',
	'http://localhost:5173',
	'capacitor://localhost',
];
$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($requestOrigin, $allowedOrigins, true)) {
	header('Access-Control-Allow-Origin: ' . $requestOrigin);
	header('Access-Control-Allow-Credentials: true');
	header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(204);
	exit;
}

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

$router = new Router();

require __DIR__ . '/../routes/web.php';

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);

