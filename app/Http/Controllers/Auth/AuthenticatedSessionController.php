<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    /**
     * Handle the SUAP callback to authenticate the user.
     */
    public function handleSuapCallback(Request $request)
    {
        // Log para verificar se a função está sendo chamada
        Log::info('handleSuapCallback foi chamado.');

        // Obtém o token de acesso da requisição
        $token = $request->input('token');

        

        // Log para verificar o token recebido
        Log::info('Token recebido: ' . $token);

        // Verifica se o token foi fornecido
        if (!$token) {
            Log::error('Token não fornecido.');
            return response()->json(['error' => 'Token não fornecido.'], 400);
        } else {
            $client = new Client();
            $response = $client->request('GET', 'https://suap.ifrn.edu.br/api/eu/', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ]
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

                $nome = isset($data['nome_usual']) ? $data['nome_usual'] : 'Nome não disponível';
                $email = isset($data['email']) ? $data['email'] : 'E-mail não disponível';

                // Cria ou atualiza o usuário no banco
                $user = User::updateOrCreate(
                    ['email' => $email],
                    ['name' => $nome, 'password' => Hash::make('password')] // Senha aleatória
                );

                // Tenta autenticar o usuário
                Auth::login($user);

                // Log para confirmar que o usuário foi autenticado
                Log::info('Usuário autenticado: ' . $user->email);
                Log::info('Usuário autenticado: ' . $user->name);

                // Redireciona para o painel ou área restrita
                return redirect()->intended(route('dashboard', absolute: false));

        }

        
            // Faz a requisição para a API do SUAP
            

            // Log para verificar o status da resposta
   

            
        }
    }

