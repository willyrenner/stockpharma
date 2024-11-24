<?php

namespace App\Http\Controllers;

use App\Models\Medicamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
        $comprimidos = $request->input('comprimidos');
        $unidade_medida = $request->input('unidade_medida');

        $medicamento = Medicamento::create([
            'nome' => $nome,
            'comprimidos' => $comprimidos,
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
        $medicamento->update($request->only(['nome', 'comprimidos', 'unidade_medida']));
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

    /**
     * Generate reports of medications based on the given type or date range.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function gerarRelatorio(Request $request)
    {
        $tipo = $request->query('tipo'); // diario, semanal, mensal, intervalo
        $dataInicio = $request->query('data_inicio');
        $dataFim = $request->query('data_fim');

        // Inicia a query
        $query = Medicamento::query();
        $hoje = Carbon::now();

        // Verifica o tipo de relatório
        if ($tipo === 'diario') {
            // Filtro diário: apenas o dia de hoje
            $query->whereDate('created_at', $hoje->toDateString());
        } elseif ($tipo === 'semanal') {
            // Filtro semanal: entre o início e fim da semana
            $inicioSemana = $hoje->startOfWeek()->toDateString();
            $fimSemana = $hoje->endOfWeek()->toDateString();
            $query->whereBetween('created_at', [$inicioSemana, $fimSemana]);
        } elseif ($tipo === 'mensal') {
            // Filtro mensal: entre o início e fim do mês
            $inicioMes = $hoje->startOfMonth()->toDateString();
            $fimMes = $hoje->endOfMonth()->toDateString();
            $query->whereBetween('created_at', [$inicioMes, $fimMes]);
        } elseif ($tipo === 'intervalo' && $dataInicio && $dataFim) {
            // Filtro por intervalo de datas, usando as datas fornecidas
            // Converte as datas fornecidas para o formato correto
            $dataInicio = Carbon::parse($dataInicio)->startOfDay(); // Começo do dia
            $dataFim = Carbon::parse($dataFim)->endOfDay(); // Fim do dia

            // Verifica se as datas são válidas
            if ($dataInicio > $dataFim) {
                return response()->json(['error' => 'A data de início não pode ser maior que a data de fim.'], 400);
            }

            $query->whereBetween('created_at', [$dataInicio, $dataFim]);
        } else {
            return response()->json(['error' => 'Parâmetros inválidos'], 400);
        }

        // Executa a consulta e obtém os medicamentos
        $medicamentos = $query->get();

        // Retorna a resposta com o relatório
        return response()->json([
            'tipo' => $tipo,
            'periodo' => [
                'inicio' => $dataInicio ?? $hoje->startOfDay()->toDateString(),
                'fim' => $dataFim ?? $hoje->endOfDay()->toDateString(),
            ],
            'medicamentos' => $medicamentos,
        ]);
    }

}
