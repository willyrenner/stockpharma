import React, { useState } from "react";

const RelatorioPedidos = ({ navigate }) => {
  const pedidos = [
    { id: 1, pedido: "Remédio A", usuario: "João Silva", data: "2024-11-10", receita: "Receita 001" },
    { id: 2, pedido: "Remédio B", usuario: "Maria Oliveira", data: "2024-11-12", receita: "Receita 002" },
  ];

  const [filteredPedidos, setFilteredPedidos] = useState(pedidos);
  const [dateFilter, setDateFilter] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setDateFilter(value);
    if (value) {
      setFilteredPedidos(
        pedidos.filter((pedido) => pedido.data.includes(value))
      );
    } else {
      setFilteredPedidos(pedidos);
    }
  };

  return (
    <div className="relatorio-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", backgroundColor: "#161b22", color: "white", height: "100vh" }}>
      <header className="relatorio-header" style={{ marginBottom: "20px", fontSize: "24px" }}>
        <h1>Relatório de Pedidos</h1>
      </header>

      <div className="filtro-container" style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={dateFilter}
          onChange={handleFilterChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #2ea043",
            backgroundColor: "#1c1f26",
            color: "white",
            fontSize: "16px",
            width: "200px",
          }}
        />
      </div>

      <div className="pedidos-container" style={{ width: "80%", maxWidth: "800px", overflowY: "scroll", maxHeight: "400px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #238636" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Pedido</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Usuário</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Data</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Receita</th>
            </tr>
          </thead>
          <tbody>
            {filteredPedidos.map((pedido) => (
              <tr key={pedido.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={{ padding: "10px" }}>{pedido.pedido}</td>
                <td style={{ padding: "10px" }}>{pedido.usuario}</td>
                <td style={{ padding: "10px" }}>{pedido.data}</td>
                <td style={{ padding: "10px" }}>{pedido.receita}</td>
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

export default RelatorioPedidos;
