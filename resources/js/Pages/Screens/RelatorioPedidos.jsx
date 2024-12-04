import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const RelatorioPedidos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [filteredMedicamentos, setFilteredMedicamentos] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get("/api/medicamentos");
        setMedicamentos(response.data);
        setFilteredMedicamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
      }
    };
    fetchMedicamentos();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setDateFilter(value);
    if (value) {
      setFilteredMedicamentos(
        medicamentos.filter((med) => med.created_at.includes(value))
      );
    } else {
      setFilteredMedicamentos(medicamentos);
    }
  };

  const medicamentosPorTarja = filteredMedicamentos.reduce((acc, med) => {
    acc[med.tarja] = (acc[med.tarja] || 0) + 1;
    return acc;
  }, {});

  const dataBar = {
    labels: Object.keys(medicamentosPorTarja),
    datasets: [
      {
        label: "Quantidade por Tarja",
        data: Object.values(medicamentosPorTarja),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const medicamentosPorDia = filteredMedicamentos.reduce((acc, med) => {
    const date = med.created_at.split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dataLine = {
    labels: Object.keys(medicamentosPorDia),
    datasets: [
      {
        label: "Quantidade por Dia",
        data: Object.values(medicamentosPorDia),
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        fill: false,
      },
    ],
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          StockPharma - Relatório de Medicamentos
        </h2>
      }
    >
      <Head title="Relatório de Medicamentos" />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-300">
            Relatório de Medicamentos
          </h1>
          <div className="mb-4">
            <input
              type="date"
              value={dateFilter}
              onChange={handleFilterChange}
              className="p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-300 w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
              <h2 className="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">
                Gráfico de Tarjas
              </h2>
              <Pie data={dataBar} />
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
              <h2 className="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">
                Quantidade por Dia
              </h2>
              <Bar data={dataLine} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="text-left p-4 text-gray-700 dark:text-gray-300">
                    Nome
                  </th>
                  <th className="text-left p-4 text-gray-700 dark:text-gray-300">
                    Fornecedor
                  </th>
                  <th className="text-left p-4 text-gray-700 dark:text-gray-300">
                    Laboratório
                  </th>
                  <th className="text-left p-4 text-gray-700 dark:text-gray-300">
                    Tarja
                  </th>
                  <th className="text-left p-4 text-gray-700 dark:text-gray-300">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicamentos.map((med) => (
                  <tr key={med.id} className="border-b border-gray-200">
                    <td className="p-4">{med.nome}</td>
                    <td className="p-4">{med.fornecedor}</td>
                    <td className="p-4">{med.laboratorio}</td>
                    <td className="p-4">{med.tarja}</td>
                    <td className="p-4">{med.created_at.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <Link
              href={route("dashboard")}
              className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 block text-center"
            >
              Voltar para o Dashboard
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default RelatorioPedidos;
