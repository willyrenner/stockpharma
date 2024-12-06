<?php

// Certifique-se de que o Composer está carregado
require 'vendor/autoload.php';

use GuzzleHttp\Client;

$token = '1vYZ7wclCdkGCMORiSim2dmhGeWwdU';  // Substitua pelo seu token

// Cria uma instância do Guzzle Client
$client = new Client();

// Faz a requisição para a API do SUAP
$response = $client->request('GET', 'https://suap.ifrn.edu.br/api/eu/', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token,
        'Accept' => 'application/json',
    ]
]);

// Verifica se a requisição foi bem-sucedida
if ($response->getStatusCode() === 200) {
    // Converte o corpo da resposta para um array
    $data = json_decode($response->getBody()->getContents(), true);

    // Mostra a resposta completa (para verificar a estrutura)
    echo "<pre>";
    print_r($data);
    echo "</pre>";

    // Caso você queira acessar o nome e email, por exemplo:
    if (isset($data['nome_usual']) && isset($data['email'])) {
        echo "Nome: " . $data['nome_usual'] . "<br>";
        echo "E-mail: " . $data['email'] . "<br>";
    } else {
        echo "Não foi possível encontrar o nome ou o e-mail.<br>";
    }
} else {
    echo "Falha na requisição. Status: " . $response->getStatusCode() . "<br>";
}
?>
