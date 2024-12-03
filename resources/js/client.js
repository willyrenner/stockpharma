import Cookies from "js-cookie";
class Token {
  constructor(value, expirationTimeInSeconds, scope) {
    this.value = value || Cookies.get('suapToken');
    this.startTime = new Date().getTime();
    this.finishTime = new Date(this.startTime + expirationTimeInSeconds * 1000);
    this.scope = scope || Cookies.get('suapScope');

    if (!Cookies.get('suapToken')) Cookies.set('suapToken', this.value, { expires: this.finishTime });
    if (!Cookies.get('suapTokenExpirationTime')) Cookies.set('suapTokenExpirationTime', this.finishTime, { expires: this.finishTime });
    if (!Cookies.get('suapScope')) Cookies.set('suapScope', this.scope, { expires: this.finishTime });
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

  isValid() {
    return !!this.value && Cookies.get('suapToken') === this.value;
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

  init() {
    this.token = new Token(this.extractToken(), this.extractDuration(), this.extractScope());
  }

  extractToken() {
    const match = document.location.hash.match(/access_token=([^&]+)/);
    return match ? match[1] : null;
  }

  extractScope() {
    const match = document.location.hash.match(/scope=([^&]+)/);
    return match ? decodeURIComponent(match[1]).replace(/\+/g, ' ') : null;
  }

  extractDuration() {
    const match = document.location.hash.match(/expires_in=(\d+)/);
    return match ? Number(match[1]) : 0;
  }

  getLoginURL() {
    return `${this.authorizationURL}?response_type=${this.responseType}&grant_type=${this.grantType}&client_id=${this.clientID}&scope=${this.scope}&redirect_uri=${this.redirectURI}`;
  }

  isAuthenticated() {
    return this.token !== undefined && this.token !== null;
  }

  getToken() {
    return this.tokenValue || this.token.getValue();  // Retorna o token armazenado ou o valor do token
  }

  login() {
    window.location = this.getLoginURL();
  }

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
}

export { SuapClient };
