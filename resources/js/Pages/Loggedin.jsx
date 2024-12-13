import { useEffect, useState } from 'react';
import axios from 'axios'; 

const DisplayToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const hash = window.location.hash;

    const params = new URLSearchParams(hash.replace('#', '?'));
    const accessToken = params.get('access_token');

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
