<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SuapController extends Controller
{
    public function getSettings()
    {
        return response()->json([
            'SUAP_URL' => env('SUAP_URL'),
            'CLIENT_ID' => env('CLIENT_ID'),
            'REDIRECT_URI' => env('APP_URL'),
            'SCOPE' => 'identificacao email documentos_pessoais',
        ]);
    }
}