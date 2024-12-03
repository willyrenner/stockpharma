import React, { useState } from "react";

const RemoverRemedio = ({ navigate }) => {
  // Dados de remédios de diferentes tarjas
  const remedios = {
    amarela: [
      { id: 1, nome: "Paracetamol", tarja: "Amarela" },
      { id: 2, nome: "Dipirona", tarja: "Amarela" },
      { id: 3, nome: "Ibuprofeno", tarja: "Amarela" },
      { id: 4, nome: "Loratadina", tarja: "Amarela" },
      { id: 5, nome: "Cefalexina", tarja: "Amarela" },
      { id: 6, nome: "Omeprazol", tarja: "Amarela" },
      { id: 7, nome: "Simvastatina", tarja: "Amarela" },
      { id: 8, nome: "Amoxicilina", tarja: "Amarela" },
      { id: 9, nome: "Cloridrato de Metformina", tarja: "Amarela" },
      { id: 10, nome: "Dipirona", tarja: "Amarela" },
    ],
    vermelha: [
      { id: 1, nome: "Ibuprofeno", tarja: "Vermelha" },
      { id: 2, nome: "Cetoconazol", tarja: "Vermelha" },
      { id: 3, nome: "Cefalexina", tarja: "Vermelha" },
      { id: 4, nome: "Cetoconazol", tarja: "Vermelha" },
      { id: 5, nome: "Dipirona", tarja: "Vermelha" },
      { id: 6, nome: "Paracetamol", tarja: "Vermelha" },
      { id: 7, nome: "Ibuprofeno", tarja: "Vermelha" },
      { id: 8, nome: "Loratadina", tarja: "Vermelha" },
      { id: 9, nome: "Simvastatina", tarja: "Vermelha" },
      { id: 10, nome: "Amoxicilina", tarja: "Vermelha" },
    ],
    preta: [
      { id: 1, nome: "Amoxicilina", tarja: "Preta" },
      { id: 2, nome: "Metformina", tarja: "Preta" },
      { id: 3, nome: "Cloridrato de Metformina", tarja: "Preta" },
      { id: 4, nome: "Cefalexina", tarja: "Preta" },
      { id: 5, nome: "Dipirona", tarja: "Preta" },
      { id: 6, nome: "Simvastatina", tarja: "Preta" },
      { id: 7, nome: "Paracetamol", tarja: "Preta" },
      { id: 8, nome: "Omeprazol", tarja: "Preta" },
      { id: 9, nome: "Ibuprofeno", tarja: "Preta" },
      { id: 10, nome: "Cetoconazol", tarja: "Preta" },
    ],
  };

  // Estado para armazenar a tarja selecionada, remédios e erro de não encontrado
  const [selectedTarja, setSelectedTarja] = useState("");
  const [remediosDisponiveis, setRemediosDisponiveis] = useState([]);
  const [remedioSelecionado, setRemedioSelecionado] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTarjaChange = (e) => {
    const tarjaSelecionada = e.target.value;
    setSelectedTarja(tarjaSelecionada);
    if (tarjaSelecionada) {
      setRemediosDisponiveis(remedios[tarjaSelecionada]);
      setErrorMessage(""); // Limpa a mensagem de erro
    } else {
      setRemediosDisponiveis([]);
    }
  };

  const handleRemedioSelect = (e) => {
    setRemedioSelecionado(e.target.value);
  };

  const handleRemover = () => {
    if (!remedioSelecionado) {
      setErrorMessage("Selecione um remédio para remover.");
      return;
    }

    const isRemedioValido = remediosDisponiveis.some(
      (remedio) => remedio.nome === remedioSelecionado
    );

    if (isRemedioValido) {
      setErrorMessage("");
      alert(`Remédio ${remedioSelecionado} removido com sucesso!`);
    } else {
      setErrorMessage("Este remédio não está cadastrado.");
    }
  };

  return (
    <div
      className="remover-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#161b22",
        color: "white",
        height: "100vh",
      }}
    >
      <header className="remover-header" style={{ marginBottom: "20px", fontSize: "24px" }}>
        <h1>Remover Remédio</h1>
      </header>

      <div className="tarja-selector" style={{ marginBottom: "20px" }}>
        <label htmlFor="tarja">Selecione a Tarja:</label>
        <select
          id="tarja"
          value={selectedTarja}
          onChange={handleTarjaChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #2ea043",
            backgroundColor: "#1c1f26",
            color: "white",
            fontSize: "16px",
            width: "200px",
          }}
        >
          <option value="">Selecione</option>
          <option value="amarela">Amarela</option>
          <option value="vermelha">Vermelha</option>
          <option value="preta">Preta</option>
        </select>
      </div>

      <div className="remedios-list" style={{ marginBottom: "20px", width: "80%", maxWidth: "800px" }}>
        {remediosDisponiveis.length > 0 && (
          <>
            <label htmlFor="remedio">Selecione o Remédio:</label>
            <select
              id="remedio"
              value={remedioSelecionado}
              onChange={handleRemedioSelect}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #2ea043",
                backgroundColor: "#1c1f26",
                color: "white",
                fontSize: "16px",
                width: "200px",
              }}
            >
              <option value="">Selecione</option>
              {remediosDisponiveis.map((remedio) => (
                <option key={remedio.id} value={remedio.nome}>
                  {remedio.nome}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <button
        onClick={handleRemover}
        style={{
          width: "123px",
          padding: "10px",
          backgroundColor: "#d72638",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Remover
      </button>

      {errorMessage && (
        <p
          style={{
            color: "#d72638",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </p>
      )}

      <button
        onClick={() => navigate("dashboard")}
        className="back-button"
        style={{
          marginTop: "20px",
          width: "120px",
          padding: "10px",
          backgroundColor: "#d72638",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Voltar
      </button>
    </div>
  );
};

export default RemoverRemedio;
