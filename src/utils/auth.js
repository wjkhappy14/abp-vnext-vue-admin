export function getToken() {
  var access_token = localStorage.getItem('access_token')

  return access_token;
}

export function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function removeToken() {
  return localStorage.removeItem("access_token")
}
