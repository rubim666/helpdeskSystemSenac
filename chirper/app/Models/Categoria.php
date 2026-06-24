<?php

namespace App\Models;

class Categoria extends BaseModel
{
    protected string $table = 'CATEGORIA';

    protected array $fillable = [
        'nome',
    ];
}
