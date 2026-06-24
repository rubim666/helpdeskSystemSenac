<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index(): void
    {
        $model = new Usuario();
        $this->render('usuario/index', [
            'table' => $model->table(),
            'fields' => $model->fillable(),
        ]);
    }
}
