<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicamentoRemovido extends Model
{
    use HasFactory;

    protected $table = 'medicamentos_removidos';

    protected $fillable = [
        'nome',
        'fornecedor',
        'laboratorio',
        'medida',
        'quantidade',
        'miligramas',
        'tarja',
    ];
}
