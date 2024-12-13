import React, { useState, useEffect } from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const RemediosEstoque = () => {
  const [remedios, setRemedios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    tarja: "",
    quantidade: "",
    fornecedor: "",
    laboratorio: "",
    miligramas: "",
  });

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

  const handleEditClick = (remedio) => {
    setEditandoId(remedio.id);
    setFormData({ ...remedio });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    axios
      .put(`/api/medicamentos/${editandoId}`, formData)
      .then((response) => {
        axios
          .get("/api/medicamentos")
          .then((res) => {
            setRemedios(res.data);
          })
          .catch((error) => {
            console.error("Erro ao atualizar a lista de medicamentos:", error);
          });
        setEditandoId(null);
      })
      .catch((error) => {
        console.error("Erro ao salvar o medicamento:", error);
      });
  };

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
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Nome</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Tarja</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Quantidade</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Fornecedor</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Laboratório</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Miligramas</th>
                    <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {remedios.map((remedio) => (
                    <React.Fragment key={remedio.id}>
                      <tr className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{remedio.nome}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{remedio.tarja}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{remedio.quantidade}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{remedio.fornecedor}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{remedio.laboratorio}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-200">{remedio.miligramas}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-200">
                          <button
                            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            onClick={() => handleEditClick(remedio)}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                      {editandoId === remedio.id && (
                        <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                          <td colSpan="7" className="px-4 py-2">
                            <div className="space-y-4">
                              <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Nome"
                                className="w-full px-4 py-2 border rounded"
                              />
                              <input
                                type="text"
                                name="tarja"
                                value={formData.tarja}
                                onChange={handleChange}
                                placeholder="Tarja"
                                className="w-full px-4 py-2 border rounded"
                              />
                              <input
                                type="number"
                                name="quantidade"
                                value={formData.quantidade}
                                onChange={handleChange}
                                placeholder="Quantidade"
                                className="w-full px-4 py-2 border rounded"
                              />
                              <input
                                type="text"
                                name="fornecedor"
                                value={formData.fornecedor}
                                onChange={handleChange}
                                placeholder="Fornecedor"
                                className="w-full px-4 py-2 border rounded"
                              />
                              <input
                                type="text"
                                name="laboratorio"
                                value={formData.laboratorio}
                                onChange={handleChange}
                                placeholder="Laboratório"
                                className="w-full px-4 py-2 border rounded"
                              />
                              <input
                                type="text"
                                name="miligramas"
                                value={formData.miligramas}
                                onChange={handleChange}
                                placeholder="Miligramas"
                                className="w-full px-4 py-2 border rounded"
                              />
                              <div className="flex justify-end space-x-2">
                                <button
                                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                  onClick={handleSave}
                                >
                                  Salvar
                                </button>
                                <button
                                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                  onClick={() => setEditandoId(null)}
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
