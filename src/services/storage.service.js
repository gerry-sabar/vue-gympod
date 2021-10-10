const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
var PODS = [];

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/
const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },

    getUuid() {
        return localStorage.getItem('uuid')
    },

    saveUuid(uuid){
        localStorage.setItem('uuid', uuid)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    saveRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }

}

const PodService = {
    savePod(pods){
         localStorage.setItem(PODS, pods)
    },
    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },

    getPods(){
        return localStorage.getItem(PODS)
    },
    initialData(){
        return [];
    },
}

export { TokenService, PodService }