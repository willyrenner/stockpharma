import React, { useState } from "react";

const RemediosEstoque = ({ navigate }) => {
  const remedios = [
    { id: 1, nome: "Paracetamol", tarja: "Amarela", quantidade: 100 },
    { id: 2, nome: "Ibuprofeno", tarja: "Vermelha", quantidade: 150 },
    { id: 3, nome: "Amoxicilina", tarja: "Preta", quantidade: 80 },
    { id: 4, nome: "Dipirona", tarja: "Amarela", quantidade: 120 },
    { id: 5, nome: "Cefalexina", tarja: "Vermelha", quantidade: 200 },
    { id: 6, nome: "Cloridrato de Metformina", tarja: "Preta", quantidade: 50 },
    { id: 7, nome: "Loratadina", tarja: "Amarela", quantidade: 300 },
    { id: 8, nome: "Cetoconazol", tarja: "Vermelha", quantidade: 90 },
    { id: 9, nome: "Omeprazol", tarja: "Preta", quantidade: 60 },
    { id: 10, nome: "Simvastatina", tarja: "Amarela", quantidade: 110 },
  ];

  return (
    <div className="relatorio-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", backgroundColor: "#161b22", color: "white", height: "100vh" }}>
      <header className="relatorio-header" style={{ marginBottom: "20px", fontSize: "24px" }}>
        <h1>Remédios em Estoque</h1>
      </header>

      <div className="remedios-container" style={{ width: "80%", maxWidth: "800px", overflowY: "scroll", maxHeight: "400px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #238636" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Remédio</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Tarja</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {remedios.map((remedio) => (
              <tr key={remedio.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "10px" }}>{remedio.nome}</td>
                <td style={{ padding: "10px" }}>{remedio.tarja}</td>
                <td style={{ padding: "10px" }}>{remedio.quantidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default RemediosEstoque;
