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

// Sem hospedagem própria ainda: aceita o app Capacitor e qualquer origem de rede local.
function apiResolveAllowedOrigin(?string $origin): ?string
{
	if ($origin === null || $origin === '') {
		return null;
	}

	$allowlist = ['capacitor://localhost', 'http://localhost', 'https://localhost'];
	if (in_array($origin, $allowlist, true)) {
		return $origin;
	}

	$privateNetworkPattern = '/^https?:\/\/(127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})(:\d+)?$/';
	return preg_match($privateNetworkPattern, $origin) === 1 ? $origin : null;
}

$requestOrigin = $_SERVER['HTTP_ORIGIN'] ?? null;
$allowedOrigin = apiResolveAllowedOrigin($requestOrigin);

if ($allowedOrigin !== null) {
	header("Access-Control-Allow-Origin: {$allowedOrigin}");
	header('Access-Control-Allow-Credentials: true');
	header('Vary: Origin');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
	header('Access-Control-Allow-Headers: Accept, Content-Type');
	header('Access-Control-Max-Age: 86400');
	http_response_code(204);
	exit;
}

// SameSite=None exige Secure (HTTPS). Em rede local sem HTTPS, cai para Lax.
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
	|| (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

session_set_cookie_params([
	'lifetime' => 0,
	'path' => '/',
	'samesite' => $isHttps ? 'None' : 'Lax',
	'secure' => $isHttps,
	'httponly' => true,
]);

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

$router = new Router();

require __DIR__ . '/../routes/web.php';

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);

