import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import axios from 'axios'
import Dashboard from '@/components/Dashboard/Dashboard'
import Detail from '@/components/Dashboard/Detail'
import { TokenService } from '@/services/storage.service'
import Store from '@/store/store'

Vue.use(
  Router,
  Vuex,
  axios,
)

Vue.prototype.$http = axios

axios.interceptors.response.use(
  function(response) { 
    return response;
  }, 
  function(error) {
    if (error.response.status == 422 && error.response.data.msg == 'The access token has expired') {
      Store.dispatch('refreshToken')
    } else{
      router.push({
        path: '/login', redirect: '/login'
      })
    }
});

const router = new Router({
  mode: 'history',
  base: '',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },

    { 
      path: '/detail/:id', 
      component: Detail 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken();
  if (!isPublic && !loggedIn) {
    next({
      path:'/login',
      query: {redirect: '/login'}  // Store the full path to redirect the user to after login
    });
  } 
  
  if (loggedIn && onlyWhenLoggedOut) {    
    next({ path: '/' })
  } 
  
  next();
})

export default router