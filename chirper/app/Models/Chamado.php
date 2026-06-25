<?php

namespace App\Models;

class Chamado extends BaseModel
{
    protected string $table = 'CHAMADO';

    protected array $fillable = [
        'uuid',
        'titulo',
        'descricao',
        'prioridade',
        'data_abertura',
        'data_encerramento',
        'patrimonio',
        'id_categoria',
        'id_usuario',
        'id_responsavel',
        'id_status',
    ];

    public const PRIORIDADES = ['baixa', 'media', 'alta', 'muito alta'];
}
