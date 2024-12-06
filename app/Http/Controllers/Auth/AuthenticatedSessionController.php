<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use GuzzleHttp\Client;

class AuthenticatedSessionController extends Controller
{

    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Handle the SUAP callback to authenticate the user.
     * 
     * 
     */
    public function handleSuapCallback(Request $request): RedirectResponse {
        
        // Obtém o token de acesso da requisição
        $token = $request->input('token');

        if (!$token) {
            return response()->json(['error' => 'Token não fornecido.'], 400);
        }

        // Faz a requisição para a API do SUAP
        $client = new Client();

        $response = $client->request('GET', 'https://suap.ifrn.edu.br/api/eu/', [
            'headers' => [
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
            ]
        ]);

        if ($response->getStatusCode() === 200) {
            // Converte o corpo da resposta para um array
            $data = json_decode($response->getBody()->getContents(), true);

            $nome = isset($data['nome_usual']) ? $data['nome_usual'] : 'Nome não disponível';
            $email = isset($data['email']) ? $data['email'] : 'E-mail não disponível';

            // Cria ou atualiza o usuário no banco
            $user = User::updateOrCreate(
                ['email' => $email],
                ['name' => $nome, 'password' => Hash::make('password')] // Senha aleatória
            );

            // Tenta autenticar o usuário
            if (Auth::login($user)) {
                echo "Falha na requisição. Status: " . $response->getStatusCode() . "<br>";
                // Redireciona para o painel ou área restrita
                return redirect()->route('dashboard');
            } else {
                // Caso não consiga autenticar, exibe mensagem de erro
                return redirect()->route('login')->with('error', 'Falha ao tentar autenticar o usuário.');
            }
        } else {
            echo "Falha na requisição. Status: " . $response->getStatusCode() . "<br>";
        }
    }
}

