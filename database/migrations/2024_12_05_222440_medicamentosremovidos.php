<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('medicamentos_removidos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nome');
            $table->string('fornecedor');
            $table->string('laboratorio');
            $table->string('medida');
            $table->string('quantidade');
            $table->string('miligramas');
            $table->string('tarja');
            $table->timestamp('removido_em')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('medicamentos_removidos');
    }
};
