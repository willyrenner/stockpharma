<?php

use App\Http\Controllers\MedicamentoController;
use Illuminate\Support\Facades\Route;

Route::apiResource('medicamentos', MedicamentoController::class);
