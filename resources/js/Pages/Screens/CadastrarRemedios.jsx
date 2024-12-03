import React from "react";
import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const CadastrarRemedios = () => {
  return (

    <AuthenticatedLayout
      header={
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          StockPharma
        </h2>
      }
    >
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarja Amarela */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tarja Amarela</h2>
          <img
            src="../../../img/tarjaamarela.png"
            alt="Tarja Amarela"
            className="w-full h-32 object-contain mb-6"
          />
          <Link
            href={route("tarjaAmarela")}
            className="block bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Entrar
          </Link>
        </div>

        {/* Tarja Vermelha */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tarja Vermelha</h2>
          <img
            src="../../../img/tarjavermelha.png"
            alt="Tarja Vermelha"
            className="w-full h-32 object-contain mb-6"
          />
          <Link
            href={route("tarjaVermelha")}
            className="block bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Entrar
          </Link>
        </div>

        {/* Tarja Preta */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tarja Preta</h2>
          <img
            src="../../../img/tarjapreta.png"
            alt="Tarja Preta"
            className="w-full h-32 object-contain mb-6"
          />
          <Link
            href={route("tarjaPreta")}
            className="block bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8 ml-8 text-start">
        <Link
          href={route("dashboard")}
          className="inline-block mt-4 py-2 px-8 bg-green-600 text-white rounded hover:bg-green-700 block text-center"
        >
          Voltar
        </Link>
      </div>
    </div>
    </AuthenticatedLayout>
  );
};

export default CadastrarRemedios;
