import { useState, useEffect } from "react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";

const RemoverRemedio = () => {
  const [remedios, setRemedios] = useState([]);
  const [remediosFiltrados, setRemediosFiltrados] = useState([]);
  const [selectedTarja, setSelectedTarja] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get("/api/medicamentos");
        setRemedios(response.data);
        setRemediosFiltrados(response.data);
      } catch (error) {
        console.error("Erro ao carregar remédios:", error);
      }
    };
    fetchMedicamentos();
  }, []);

  const handleTarjaChange = (e) => {
    const tarjaSelecionada = e.target.value;
    setSelectedTarja(tarjaSelecionada);

    if (tarjaSelecionada) {
      const filtrados = remedios.filter(
        (remedio) => remedio.tarja && remedio.tarja.toLowerCase() === tarjaSelecionada.toLowerCase()
      );
      setRemediosFiltrados(filtrados);
    } else {
      setRemediosFiltrados(remedios);
    }
  };

  const handleRemover = async (id) => {
    try {
      const response = await axios.delete(`/api/medicamentos/${id}`);
      if (response.status === 200) {
        setRemedios((prevRemedios) => prevRemedios.filter((remedio) => remedio.id !== id));
        setRemediosFiltrados((prevFiltrados) => prevFiltrados.filter((remedio) => remedio.id !== id));
        alert("Remédio removido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao remover remédio:", error);
      setErrorMessage("Erro ao remover o remédio.");
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          StockPharma - Remover Medicamento
        </h2>
      }
    >
      <Head title="Remover Medicamento" />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white bg-red-600">
            Remover Medicamento
          </h1>

          <div className="mb-4">
            <label htmlFor="tarja" className="block text-gray-700 dark:text-gray-300">
              Selecione a Tarja:
            </label>
            <select
              id="tarja"
              value={selectedTarja}
              onChange={handleTarjaChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="amarela">Amarela</option>
              <option value="vermelha">Vermelha</option>
              <option value="preta">Preta</option>
            </select>
          </div>

          <div>
            {remediosFiltrados.length > 0 ? (
              <ul className="space-y-2">
                {remediosFiltrados.map((remedio) => (
                  <li key={remedio.id} className="flex justify-between items-center p-2 bg-gray-200 rounded shadow">
                    <span>{remedio.nome}</span>
                    <button
                      onClick={() => handleRemover(remedio.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-red-500">Nenhum remédio encontrado para a tarja selecionada.</p>
            )}
          </div>

          {errorMessage && <p className="text-center text-red-500 mt-2">{errorMessage}</p>}

          <Link
            href="/dashboard"
            className="w-full mt-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 block text-center"
          >
            Voltar para o Dashboard
          </Link>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default RemoverRemedio;
