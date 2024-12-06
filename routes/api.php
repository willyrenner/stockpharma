<?php

use App\Http\Controllers\MedicamentoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicamentoRemovidoController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

Route::apiResource('medicamentos', MedicamentoController::class);

Route::apiResource('medicamentos_removidos', MedicamentoRemovidoController::class);

Route::post('/loggedin', function (Request $request) {
    $token = $request->input('access_token');

    // 1. Verificar o token na API do SUAP
    $client = new \GuzzleHttp\Client();
    try {
        $response = $client->get('https://suap.ifrn.edu.br/api/eu/', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
            ],
        ]);

        $suapUser = json_decode($response->getBody()->getContents(), true);

        // 2. Criar ou atualizar o usuário no banco de dados
        $user = User::updateOrCreate(
            ['email' => $suapUser['email']], // Usa o email como identificador único
            [
                'name' => $suapUser['nome'], // Nome completo
                'password' => bcrypt($token), // Apenas para satisfazer o campo password, caso use
            ]
        );

        // 3. Autenticar o usuário
        Auth::login($user);

        return response()->json(['success' => true, 'user' => $user]);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Token inválido ou erro no SUAP'], 401);
    }
});

Route::get('/settings', function () {
    return response()->json([
        'SUAP_URL' => env('SUAP_URL', 'https://suap.ifrn.edu.br'),
        'CLIENT_ID' => env('CLIENT_ID', 'u3Iq3g1Pk2umDWsVeS6K75EJe7LLlACzfmiMenGV'),
        'REDIRECT_URI' => env('REDIRECT_URI', 'http://localhost:8000/loggedin'),
        'SCOPE' => env('SCOPE', 'identificacao email documentos_pessoais'),
    ]);
});

