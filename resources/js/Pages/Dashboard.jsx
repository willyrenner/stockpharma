import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Dashboard = () => {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          StockPharma
        </h2>
      }
    >
      <Head title="Painel de Controle" />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
              Bem-vindo ao StockPharma!
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Escolha uma das opções abaixo para começar:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href={route("cadastrarremedios")}
                className="bg-blue-500 text-white text-center font-medium py-4 px-6 rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                Cadastrar Remédio
              </Link>
              <Link
                href={route("relatorioPedidos")}
                className="bg-green-500 text-white text-center font-medium py-4 px-6 rounded-lg shadow hover:bg-green-600 transition-transform transform hover:scale-105"
              >
                Relatório de Pedidos
              </Link>
              <Link
                href={route("remediosEstoque")}
                className="bg-yellow-500 text-white text-center font-medium py-4 px-6 rounded-lg shadow hover:bg-yellow-600 transition-transform transform hover:scale-105"
              >
                Remédios em Estoque
              </Link>
              <Link
                href={route("removerRemedio")}
                className="bg-red-500 text-white text-center font-medium py-4 px-6 rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
              >
                Remover Remédio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
