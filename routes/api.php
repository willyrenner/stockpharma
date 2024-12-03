<?php

use App\Http\Controllers\MedicamentoController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\VerificarTokenSUAP;

Route::apiResource('medicamentos', MedicamentoController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/recurso-publico', function() {
    return ['mensagem' => 'Este recurso público veio da API'];
});


Route::middleware(VerificarTokenSUAP::class)->get('/recurso-privado', function() {
    return ['mensagem' => 'Este recurso privado veio da API'];
});

Route::get('/settings', function () {
    return response()->json([
        'SUAP_URL' => env('SUAP_URL', 'https://suap.ifrn.edu.br'),
        'CLIENT_ID' => env('CLIENT_ID', 'u3Iq3g1Pk2umDWsVeS6K75EJe7LLlACzfmiMenGV'),
        'REDIRECT_URI' => env('REDIRECT_URI', 'http://localhost:8000/loggedin'),
        'SCOPE' => env('SCOPE', 'identificacao email documentos_pessoais'),
    ]);
});

