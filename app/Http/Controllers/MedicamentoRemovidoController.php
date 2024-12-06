<?php

namespace App\Http\Controllers;

use App\Models\MedicamentoRemovido;
use Illuminate\Http\Request;

class MedicamentoRemovidoController extends Controller
{
    public function index()
    {
        return MedicamentoRemovido::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'fornecedor' => 'required|string|max:255',
            'laboratorio' => 'required|string|max:255',
            'medida' => 'required|string|max:255',
            'quantidade' => 'required|string|max:255',
            'miligramas' => 'required|string|max:255',
            'tarja' => 'required|string|max:255',
        ]);

        $medicamento = MedicamentoRemovido::create(array_merge(
            $request->all(),
            ['removido_em' => now(),]

        ));

        return response()->json($medicamento, 201);
    }

    public function show($id)
    {
        $medicamento = MedicamentoRemovido::find($id);

        if (!$medicamento) {
            return response()->json(['message' => 'Medicamento não encontrado.'], 404);
        }

        return response()->json($medicamento);
    }
}
