import React from "react";

const TarjaVermelha = ({ navigate }) => {
  return (
    <div className="tarja-container tarja-vermelha"style={{width: "636px"}}>
      <header className="tarja-header">
        <h1>Tarja Vermelha</h1>
      </header>
      <form className="tarja-form">
        <label>Nome do Remédio:</label>
        <input type="text" placeholder="Digite o nome do remédio" />

        <label>Quantidade:</label>
        <input type="number" placeholder="Digite a quantidade" />

        <label>Data de Cadastro:</label>
        <input type="date" />

      </form>
      <button type="submit" style={{width: "100px"}}>Cadastrar</button>
      <button style={{width: "100px"}}
        onClick={() => navigate("cadastrarRemedios")}
        className="back-button"
      >
        Voltar
      </button>
    </div>
  );
};

export default TarjaVermelha;
