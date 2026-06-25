<?php

namespace App\Models;

abstract class BaseModel
{
    protected string $table;
    protected array $fillable = [];

    public function table(): string
    {
        return $this->table;
    }

    public function fillable(): array
    {
        return $this->fillable;
    }
}
