import React, { useEffect, useState } from 'react';

const DisplayToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Pega a parte da URL após o "#"
    const hash = window.location.hash;

    // Usando URLSearchParams para extrair o token
    const params = new URLSearchParams(hash.replace('#', '?')); // Substitui "#" por "?" para usar URLSearchParams
    const accessToken = params.get('access_token'); // Extrai o token

    // Se o token existir, armazene no estado
    if (accessToken) {
      setToken(accessToken);
      axios.post('/api/handle-suap-callback', { token: accessToken })
      .then(response => {
        console.log('Token enviado e usuário autenticado');
      })
      .catch(error => {
        console.error('Erro ao enviar token para o backend', error);
      });
  }
}, []);

  return (
    <div>
      <h1>Token de Acesso</h1>
      <p>{token ? token : 'Nenhum token encontrado.'}</p>
    </div>
  );
};

export default DisplayToken;
