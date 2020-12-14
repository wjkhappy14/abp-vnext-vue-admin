export function getToken() {
    var access_token = sessionStorage.getItem('access_token')
    return access_token;
}

export function setToken(token) {
    sessionStorage.setItem("access_token", token);
}

export function removeToken() {
    return sessionStorage.removeItem("access_token")
}
