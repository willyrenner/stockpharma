import { useState } from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const TarjaAmarela = () => {
  const [formData, setFormData] = useState({
    nome: "",
    fornecedor: "",
    laboratorio: "",
    medida: "caixa",
    quantidade: "",
    miligramas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nome: formData.nome,
      fornecedor: formData.fornecedor,
      laboratorio: formData.laboratorio,
      medida: formData.medida,
      quantidade: formData.quantidade,
      miligramas: formData.miligramas,
      tarja: "amarela",
    };

    try {
      const response = await axios.post("/api/medicamentos", payload);
      alert("Medicamento cadastrado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao cadastrar medicamento:", error);
      alert("Erro ao cadastrar medicamento. Tente novamente.");
    }
  };

  return (
    <>
      <AuthenticatedLayout
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            StockPharma
          </h2>
        }
      >
        <Head title="Cadastro de Medicamento" />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-white-100 bg-yellow-300">
              Cadastro de Medicamento
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Nome do Medicamento
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Fornecedor
                </label>
                <input
                  type="text"
                  name="fornecedor"
                  value={formData.fornecedor}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Laboratório
                </label>
                <input
                  type="text"
                  name="laboratorio"
                  value={formData.laboratorio}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Medida
                </label>
                <select
                  name="medida"
                  value={formData.medida}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="caixa">Caixa</option>
                  <option value="frasco">Frasco</option>
                  <option value="cartela">Cartela</option>
                  <option value="comprimido">Comprimido</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Quantidade
                </label>
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300">
                  Míligramas (mg)
                </label>
                <input
                  type="number"
                  name="miligramas"
                  value={formData.miligramas}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  min="0"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cadastrar Medicamento
              </button>
              <Link
                href={route('cadastrarremedios')}
                className="w-full mt-4 py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 block text-center"
              >
                Voltar
              </Link>
            </form>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default TarjaAmarela;
