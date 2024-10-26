<?php

namespace App\Http\Controllers;

use App\Models\Medicamento;
use Illuminate\Http\Request;

class MedicamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $medicamentos = Medicamento::all();
        return $medicamentos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $nome = $request->input('nome');
        $laboratorio = $request->input('laboratorio');
        $fornecedor = $request->input('fornecedor');
        $unidade_medida = $request->input('unidade_medida');
        
        $medicamento = Medicamento::create([
            'nome' => $nome,
            'laboratorio' => $laboratorio,
            'fornecedor' => $fornecedor,
            'unidade_medida' => $unidade_medida
        ]);
        
        $id = $medicamento->id;
        return response(
            ['location' => route('medicamentos.show', $id)],
            201
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Medicamento  $medicamento
     * @return \Illuminate\Http\Response
     */
    public function show(Medicamento $medicamento)
    {
        return $medicamento;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Medicamento  $medicamento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Medicamento $medicamento)
    {
        $medicamento->update($request->only(['nome', 'laboratorio', 'fornecedor', 'unidade_medida']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Medicamento  $medicamento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Medicamento $medicamento)
    {
        $medicamento->delete();
    }
}
