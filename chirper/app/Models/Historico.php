<?php

namespace App\Models;

class Historico extends BaseModel
{
    protected string $table = 'HISTORICO';

    protected array $fillable = [
        'uuid',
        'descricao',
        'data',
        'id_usuario_tecnico',
        'id_chamado',
    ];
}
