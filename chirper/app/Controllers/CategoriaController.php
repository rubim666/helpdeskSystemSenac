<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index(): void
    {
        $model = new Categoria();
        $this->render('categoria/index', [
            'table' => $model->table(),
            'fields' => $model->fillable(),
        ]);
    }
}
