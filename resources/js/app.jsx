import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';

function App() {
  return (
    <h1>Bem-vindo ao StockPharma!</h1>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
