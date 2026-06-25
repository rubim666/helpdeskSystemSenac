<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Chamado;

class ChamadoController extends Controller
{
    public function index(): void
    {
        $model = new Chamado();
        $this->render('chamado/index', [
            'table' => $model->table(),
            'fields' => $model->fillable(),
        ]);
    }
}
