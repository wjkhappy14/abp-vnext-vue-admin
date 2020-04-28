import { getCountries, deleteItem } from '@/api/region'

const state = {
  items: [],
  country: {
    items: []
  },
  stateProvince: {},
  city: {},
}
const getters = {
  items: (state) => {
    return state.items;
  }
}
const mutations = {
  setCountry: (state, items) => {
    state.country = {
      items: items
    }
  }
}

const actions = {
  addCountry({ commit }, permission) {
    return new Promise((resolve, reject) => {
      addCountry(permission).then(response => {
        commit('setCountry', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateRole({ commit }, permission) {
    return new Promise((resolve, reject) => {
      updateRole(permission).then(response => {
        commit('setCountry', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getCountries({ commit }) {
    return new Promise((resolve, reject) => {
      getCountries().then(response => {
        commit('setCountry', response.items)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getStateProvinces({ commit }) {
    return new Promise((resolve, reject) => {
      getCountries().then(response => {
        commit('setCountry', response.items)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getCities({ commit }) {
    return new Promise((resolve, reject) => {
      getCountries().then(response => {
        commit('setCountry', response.items)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteItem({ commit, dispatch }, item) {
    return new Promise(async resolve => {
      deleteItem(item);
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
