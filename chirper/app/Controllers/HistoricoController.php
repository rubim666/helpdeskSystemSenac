<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Historico;

class HistoricoController extends Controller
{
    public function index(): void
    {
        $model = new Historico();
        $this->render('historico/index', [
            'table' => $model->table(),
            'fields' => $model->fillable(),
        ]);
    }
}
