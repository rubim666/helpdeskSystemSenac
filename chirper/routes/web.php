<?php

$router->get('/api/chamados', [CalledController::class, 'index']);
$router->post('/api/chamados', [CalledController::class, 'store']);

