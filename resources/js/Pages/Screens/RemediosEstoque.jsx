import React, { useState, useEffect } from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const RemediosEstoque = () => {
  const [remedios, setRemedios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/medicamentos")
      .then((response) => {
        setRemedios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os medicamentos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          StockPharma - Remédios em Estoque
        </h2>
      }
    >
      <Head title="Remédios em Estoque" />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
              Lista de Remédios
            </h1>
            {loading ? (
              <p className="text-center text-gray-600 dark:text-gray-400">Carregando...</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                      Nome
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                      Tarja
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                      Quantidade
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                      Fornecedor
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                      Laboratório
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                      Miligramas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {remedios.map((remedio) => (
                    <tr
                      key={remedio.id}
                      className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                        {remedio.nome}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                        {remedio.tarja}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                        {remedio.quantidade}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                        {remedio.fornecedor}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                        {remedio.laboratorio}
                      </td>
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                        {remedio.miligramas}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mt-4">
              <Link
                href={route("dashboard")}
                className="inline-block py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default RemediosEstoque;
