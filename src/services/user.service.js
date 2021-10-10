import ApiService from './api.service'
import { 
    //PodService, 
    TokenService 
} from './storage.service'


class AuthenticationError {
    constructor(errorCode, message) {
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    getPod: async function(){
        const requestData = {
            method: 'get',
            url: "/pods",
            data: {}
        }

        try {
            ApiService.setHeader()
            const response = await ApiService.customRequest(requestData)
            return response
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    getBookingDetail: async function(parameter){
        const requestData = {
            method: 'get',
            url: "/detail/" + parameter,
            data: {}
        }
        try {
            ApiService.setHeader()
            const response = await ApiService.customRequest(requestData)
            return response
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Login the user and store the access token to TokenService. 
     * 
     * @returns access_token
     * @throws AuthenticationError 
    **/
    login: async function(email, password) {
        const requestData = {
            method: 'post',
            url: "/login",
            data: {
                email: email,
                password: password
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            TokenService.saveToken(response.data.access_token)
            TokenService.saveRefreshToken(response.data.refresh_token)
            TokenService.saveUuid(response.data.uuid)
            ApiService.setHeader()
            return response.data.access_token
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     * Refresh the access token.
    **/
    refreshToken: async function() {
        const refreshToken = TokenService.getRefreshToken()

        const requestData = {
            method: 'get',
            url: "/refresh",
            headers : {
                RefreshToken : refreshToken
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)
            TokenService.saveToken(response.data.access_token)
            TokenService.saveRefreshToken(response.data.refresh_token)
            // Update the header in ApiService
            ApiService.setHeader()

            return response.data.access_token
        } catch (error) {
            return error.response
        }

    },

    /**
     * Logout the current user by removing the token from storage. 
     * 
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
    logout() {
        TokenService.removeToken()
        TokenService.removeRefreshToken()
        ApiService.removeHeader()   
    }
}

export default UserService

export { UserService, AuthenticationError }