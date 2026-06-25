<?php

namespace App\Models;

class Usuario extends BaseModel
{
    protected string $table = 'USUARIO';

    protected array $fillable = [
        'uuid',
        'nome',
        'CPF',
        'telefone',
        'email',
        'senha',
        'nivel',
        'ativo',
    ];

    public const NIVEIS = ['adm', 'analista', 'tecnico', 'usuario'];
}
