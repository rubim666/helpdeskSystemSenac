<?php

namespace App\Models;

class Status extends BaseModel
{
    protected string $table = 'STATUS';

    protected array $fillable = [
        'nome',
        'ativo',
    ];

    public const STATUS_PEDIDO = ['pendente', 'cancelado', 'concluido'];
}
