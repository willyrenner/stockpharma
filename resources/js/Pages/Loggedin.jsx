import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Certifique-se de importar o axios

const DisplayToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Pega a parte da URL após o "#"
    const hash = window.location.hash;

    // Usando URLSearchParams para extrair o token
    const params = new URLSearchParams(hash.replace('#', '?')); // Substitui "#" por "?" para usar URLSearchParams
    const accessToken = params.get('access_token'); // Extrai o token

    // Se o token existir, armazene no estado e envie para o backend
    if (accessToken) {
      setToken(accessToken);
      axios.post('http://localhost:8000/api/handle-suap-callback', { token: accessToken })
        .then(response => {
          console.log('Token enviado e usuário autenticado');
          window.location.href = '/dashboard';
        })
        .catch(error => {
          console.error('Erro ao enviar token para o backend', error);
        });
    }

    
  }, []);


};

export default DisplayToken;
