/* eslint-disable no-unused-vars */
import { createStore } from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://159.223.57.121:8090/'

export default createStore({
  state: {
    token: localStorage.getItem('token'),
    isLoginIn: false,
    notification: {
      title: null,
      message: null,
    },

    userProfile: localStorage.getItem('userProfile'),
    userOnline: localStorage.getItem('userOnline'),
  },

  getters: {
    isLoginIn: function(state) {
      return state.isLoginIn
    },
    notification: function(state) {
      return state.notification
    },
    userProfile: function(state) {
      return typeof state.userProfile === 'string' ? JSON.parse(state.userProfile) : state.userProfile
    },
    userOnline: function(state) {
      return state.userOnline
    }
  },

  mutations: {
    setIsLogin: function(state, value) {
      state.isLoginIn = value ? true : false
    },

    setToken: function(state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
      state.userOnline = new Date()
      localStorage.setItem('userOnline', state.userOnline)
    },

    removeToken: function(state) {
      state.token = null
      localStorage.removeItem('token')
      state.userOnline = null
      localStorage.removeItem('userOnline')
    },

    setNotification: function(state, value) {
      state.notification = {...value}
    },

    setUserProfile: function(state, value) {
      state.userProfile = {...value}
      localStorage.setItem('userProfile', JSON.stringify(value))
    },
  },

  actions: {
    getData: async function({ commit, state }, payload){
      try {
        const response = await axios.get(BASE_URL + payload.url, {
          headers: { 'Authorization': `Bearer ${state.token}`}
        })

        if (response.status === 200) {
          return response
        } 
      } catch (error) {
        console.log(error)
      }
    },

    postData: async function({ commit, state }, payload) {
      // const headers = state.token ? { 'Authorization': `Bearer ${state.token}`} : null 
      try {
        if (state.token){
          const response = await axios.post(BASE_URL + payload.url, payload.params, {
            headers: { 'Authorization': `Bearer ${state.token}`}
          })

          return response
        } else {
          const response = await axios.post(BASE_URL + payload.url, payload.params)

          return response  
        }

      } catch (error) {
        console.log(error)
      }
    },

    putData: async function({ commit, state }, payload) {
      try {
        const response = await axios.put(BASE_URL + payload.url, payload.params, {
          headers: { 'Authorization': `Bearer ${state.token}`}
        })

        return response
      } catch (error) {
        console.log(error)
      }
    },

    deleteData: async function({ commit, state }, payload) {
      try {
        const response = await axios.delete(BASE_URL + payload.url, {
          headers: { 'Authorization': `Bearer ${state.token}`}
        })

        return response
      } catch (error) {
        console.log(error)
      }
    }
  },
})
