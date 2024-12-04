import Cookies from "js-cookie";
class Token {
  constructor(value, expirationTimeInSeconds, scope) {
    this.value = value || Cookies.get('suapToken');
    this.startTime = new Date().getTime();
    this.finishTime = new Date(this.startTime + expirationTimeInSeconds * 1000);
    this.scope = scope || Cookies.get('suapScope');

    console.log("Token armazenado:", this.value); // Adicione este log

    if (!Cookies.get('suapToken') && this.value) {
      Cookies.set('suapToken', this.value, { expires: this.finishTime });
    }
    if (!Cookies.get('suapTokenExpirationTime') && this.finishTime) {
      Cookies.set('suapTokenExpirationTime', this.finishTime, { expires: this.finishTime });
    }
    if (!Cookies.get('suapScope') && this.scope) {
      Cookies.set('suapScope', this.scope, { expires: this.finishTime });
    }
  }

  getValue() {
    return this.value;
  }

  getExpirationTime() {
    return this.finishTime;
  }

  getScope() {
    return this.scope;
  }

  // Valida se o token é válido, considerando o tempo de expiração
  isValid() {
    const currentTime = new Date().getTime();
    // Verifica se o token existe e se o tempo de expiração ainda é válido
    return this.value && currentTime < this.finishTime;
  }

  revoke() {
    this.value = null;
    this.startTime = null;
    this.finishTime = null;

    Cookies.remove('suapToken');
    Cookies.remove('suapTokenExpirationTime');
    Cookies.remove('suapScope');
  }
}



class SuapClient {
  constructor(authHost, clientID, redirectURI, scope) {
    this.authHost = authHost.replace(/\/$/, ''); // Remove barra final, se existir
    this.clientID = clientID;
    this.redirectURI = redirectURI;
    this.scope = scope;

    this.token = null;
    this.resourceURL = `${this.authHost}/api/eu/`;
    this.authorizationURL = `${this.authHost}/o/authorize/`;
    this.logoutURL = `${this.authHost}/o/revoke_token/`;
    this.responseType = 'token';
    this.grantType = 'implicit';
  }

  // Inicialização da classe
  init() {
    const tokenValue = this.extractToken() || Cookies.get('suapToken');
    const expirationTime = this.extractDuration();
    const scope = this.extractScope() || Cookies.get('suapScope');

    // Se o token não for encontrado ou estiver expirado, faça login
    if (!tokenValue || !scope || !expirationTime) {
      console.log("Token ou escopo não encontrado, solicitando login.");
      return;
    }

    // Armazene o token e inicialize com a data de expiração e escopo
    this.token = new Token(tokenValue, expirationTime, scope);
    console.log("Token extraído e armazenado:", this.token.getValue());
  }

  // Extrai o token da URL
  extractToken() {
    const match = document.location.hash.match(/access_token=([^&]+)/);
    return match ? match[1] : null;
  }

  // Extrai o escopo da URL
  extractScope() {
    const match = document.location.hash.match(/scope=([^&]+)/);
    if (match) {
      const decodedScopes = decodeURIComponent(match[1]).replace(/\+/g, ' ');
      const cleanScopes = decodedScopes.split("access_token")[0].trim();
      return cleanScopes.replace(/#$/, "").trim();
    }
    return null;
  }

  // Extrai a duração do token da URL
  extractDuration() {
    const match = document.location.hash.match(/expires_in=(\d+)/);
    return match ? Number(match[1]) : 0;
  }

  // Verifica se o usuário está autenticado
  isAuthenticated() {
    return this.token && this.token.isValid();
  }

  // Gera o URL de login
  getLoginURL() {
    return `${this.authorizationURL}?response_type=${this.responseType}&grant_type=${this.grantType}&client_id=${this.clientID}&scope=${this.scope}&redirect_uri=${this.redirectURI}`;
  }

  // Realiza o login
  login() {
    window.location = this.getLoginURL();
  }

  // Realiza o logout
  logout() {
    fetch(this.logoutURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: this.token.getValue(), client_id: this.clientID })
    })
    .then(() => {
      this.token.revoke();
      window.location = this.redirectURI;
    })
    .catch(err => console.error('Logout failed:', err));
  }

  // Requisita o recurso da API
  getResource(scope, callback) {
    if (!this.isAuthenticated()) {
      console.error("Usuário não autenticado.");
      alert('Faça login antes de requisitar os recursos.');
      return;
    }

    fetch(this.resourceURL, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${this.token.getValue()}`,
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      callback(data);
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
      alert('Falha na comunicação com o SUAP');
    });
  }
}





export { SuapClient };
