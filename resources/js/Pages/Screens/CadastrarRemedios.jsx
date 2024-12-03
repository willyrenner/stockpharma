import React from "react";
import { Link } from '@inertiajs/react';

const CadastrarRemedios = () => {
  return (
    <div className="cadastrar-remedios-container">
      <header style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <h1>STOCK PHARMA</h1>
      </header>
      
      <div className="categories" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        {/* Card for Tarja Amarela */}
        <div className="card" style={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <h2>Tarja Amarela</h2>
          <img
            src="../../../img/tarjaamarela.png"
            alt="Tarja Amarela"
            style={{ width: "100%", height: "100px", objectFit: "contain", marginBottom: "10px" }}
          />
          {/* Link for Tarja Amarela */}
          <Link
            href={route('tarjaAmarela')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            style={{ textDecoration: 'none' }}
          >
            Entrar
          </Link>
        </div>

        {/* Card for Tarja Vermelha */}
        <div className="card" style={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <h2>Tarja Vermelha</h2>
          <img
            src="../../../img/tarjavermelha.png"
            alt="Tarja Vermelha"
            style={{ width: "100%", height: "100px", objectFit: "contain", marginBottom: "10px" }}
          />
          {/* Link for Tarja Vermelha */}
          <Link
            href={route('tarjaVermelha')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            style={{ textDecoration: 'none' }}
          >
            Entrar
          </Link>
        </div>

        {/* Card for Tarja Preta */}
        <div className="card" style={{ width: '30%', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <h2>Tarja Preta</h2>
          <img
            src="../../../img/tarjapreta.png"
            alt="Tarja Preta"
            style={{ width: "100%", height: "100px", objectFit: "contain", marginBottom: "10px" }}
          />
          {/* Link for Tarja Preta */}
          <Link
            href={route('tarjaPreta')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            style={{ textDecoration: 'none' }}
          >
            Entrar
          </Link>
        </div>
      </div>

      {/* Back Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link
          href={route('dashboard')}
          className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-700"
          style={{ textDecoration: 'none' }}
        >
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default CadastrarRemedios;
