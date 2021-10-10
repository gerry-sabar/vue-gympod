import Vuex from 'vuex'
import Vue from 'vue'
import { UserService, AuthenticationError } from '@/services/user.service'
import { TokenService} from '@/services/storage.service'
import router from '@/router/index'
 
Vue.use(Vuex)

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    loginStatus: false,
    loginData: null,
    refreshTokenPromise: null,
    loginFail: null,
    podData: [],
    bookingDetail: [],
}

const actions = {

    updateLoginFail: ({commit}, payload) => {
        commit('loginFail', payload);
    },

    async podData({ commit }){
        const pods = await UserService.getPod()
        commit('setNewPod', pods.data)
    },

    async bookingDetail({commit}, data){
        const detail = await UserService.getBookingDetail(data.pod_id)
        commit('bookingDetail', detail.data)
    },

    async setPodData({commit}){
        commit('setNewPod', [])
    },

    async login({ commit }, data) {
        commit('loginRequest');
        const email = data.email
        const password = data.password
        try {
            await UserService.login(email, password)
            router.push('/')
            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginFail', e)
            }
            return false
        }
    }, 

    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/login')
    },

    refreshToken({ commit, state, dispatch }) {
        if(!state.refreshTokenPromise) {
            const p = UserService.refreshToken()
            commit('refreshTokenPromise', p)

            p.then(response => {
                    if(response.status == 401) {
                        commit('refreshTokenPromise', null)
                        dispatch('logout')    
                    }
                    commit('refreshTokenPromise', null)
                    commit('loginSuccess', response)
            }).catch(() => {
                    commit('refreshTokenPromise', null)
            })
        }

        return state.refreshTokenPromise
    },
}

const mutations = {
    podDetail(state, data){
        state.podDataDetail = data
    },
    setNewPod(state, data) {
        state.podData = data
    },
    bookingDetail(state, data){
        state.bookingDetail = data
    },
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },
    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticating = false;
    },
    setLoginStatus(state, status) {
        state.loginStatus = status
    },
    setLoginData(state, data) {
        state.loginData = data
    },
    logoutSuccess(state) {
        state.accessToken = ''
    },
    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    },
    loginFail: (state, payload) => {
        state.loginFail = payload;
    },

}

const getters = {
    getPodDetails: state => {
        return state.podData
    },
    getBookingDetails: state => {
        return state.bookingDetail
    },
    getLoginStatus(state) {
        return state.loginStatus
    },
    getLoginData(state) {
        return state.loginData
    },
    getLoginFail: state => {
        return state.loginFail;
    },

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})