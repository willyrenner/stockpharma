import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { SuapClient } from "@/client";

const Loggedin = () => {
    const [settings, setSettings] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [scopes, setScopes] = useState("");
    const [response, setResponse] = useState(null);
    const [uriResponse, setUriResponse] = useState(null);
    const [uri, setUri] = useState("");

    const location = useLocation();  // Hook para acessar a URL
    const history = useHistory();    // Hook para redirecionamento (se necessário)

    // Pega os parâmetros de query da URL
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token"); // Exemplo de parâmetro da URL

    useEffect(() => {
        if (tokenFromUrl) {
            // Enviar o token para o controlador
            axios
                .post("/api/controlador", { token: tokenFromUrl })
                .then((response) => {
                    console.log("Token enviado para o controlador com sucesso:", response.data);
                    setToken(response.data.token); // Armazena o token no estado, se necessário
                })
                .catch((error) => {
                    console.error("Erro ao enviar o token para o controlador:", error);
                });
        }
    }, [tokenFromUrl]);

    useEffect(() => {
        console.log("URL Atual:", window.location.href); // Para verificar a URL completa
    }, []);

    const handleLogout = () => {
        const suap = new SuapClient(settings.SUAP_URL, settings.CLIENT_ID, settings.REDIRECT_URI, settings.SCOPE);
        suap.logout();
    };

    const handleGetResource = () => {
        const suap = new SuapClient(settings.SUAP_URL, settings.CLIENT_ID, settings.REDIRECT_URI, settings.SCOPE);
        suap.getResource(scopes, (data) => setResponse(data));
    };

    const handleApiRequest = () => {
        axios
            .get(uri, {
                headers: { Authorization: `Bearer ${token.getValue()}`, Accept: "application/json" },
            })
            .then((res) => setUriResponse(res.data))
            .catch((err) => console.error(err));
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <header style={{ backgroundColor: "#4CAF50", padding: "10px", color: "white", textAlign: "center" }}>
                <h1>Cliente SUAP React</h1>
            </header>

            <main style={{ marginTop: "20px" }}>
                {isAuthenticated ? (
                    <div>
                        <h2>Você está autenticado</h2>
                        <button
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "10px",
                                border: "none",
                                cursor: "pointer",
                                marginBottom: "20px",
                            }}
                            onClick={handleLogout}
                        >
                            Encerrar Sessão
                        </button>
                        <div>
                            <p><strong>Access Token:</strong> {token?.getValue()}</p>
                            <p><strong>Validade:</strong> {token ? new Date(token.getExpirationTime()).toLocaleString() : "N/A"}</p>
                            <p><strong>Escopos autorizados:</strong> {scopes}</p>
                        </div>

                        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                            <h3>Requisitar dados ao SUAP</h3>
                            <input
                                type="text"
                                value={scopes}
                                onChange={(e) => setScopes(e.target.value)}
                                placeholder="Digite os escopos"
                                style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
                            />
                            <button
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    padding: "10px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onClick={handleGetResource}
                            >
                                Enviar Requisição
                            </button>
                            <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", marginTop: "10px" }}>
                                {JSON.stringify(response, null, 4)}
                            </pre>
                        </div>

                        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                            <h3>Acessar recurso da API</h3>
                            <input
                                type="text"
                                value={uri}
                                onChange={(e) => setUri(e.target.value)}
                                placeholder="Digite a URI"
                                style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
                            />
                            <button
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    padding: "10px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                                onClick={handleApiRequest}
                            >
                                Enviar Requisição
                            </button>
                            <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", marginTop: "10px" }}>
                                {JSON.stringify(uriResponse, null, 4)}
                            </pre>
                        </div>
                    </div>
                ) : (
                    <p style={{ color: "red", textAlign: "center" }}>A autenticação falhou. Por favor, tente novamente.</p>
                )}
            </main>
        </div>
    );
};

export default Loggedin;
