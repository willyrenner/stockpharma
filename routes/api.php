<?php

use App\Http\Controllers\MedicamentoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicamentoRemovidoController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

Route::apiResource('medicamentos', MedicamentoController::class);

Route::apiResource('medicamentos_removidos', MedicamentoRemovidoController::class);

Route::get('/settings', function () {
    return response()->json([
        'SUAP_URL' => env('SUAP_URL', 'https://suap.ifrn.edu.br'),
        'CLIENT_ID' => env('CLIENT_ID', 'u3Iq3g1Pk2umDWsVeS6K75EJe7LLlACzfmiMenGV'),
        'REDIRECT_URI' => env('REDIRECT_URI', 'http://localhost:8000/loggedin'),
        'SCOPE' => env('SCOPE', 'identificacao email documentos_pessoais'),
    ]);
});

