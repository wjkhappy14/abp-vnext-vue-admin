import { fetch, defectCategories } from '@/api/defect'

const state = {
  items: [],
  categories: {}
}
const getters = {
  items: (state) => {
    return state.items;
  },
  categories: (state) => {
    return state.categories;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  },
  setCategories: (state, categories) => {
    state.categories = categories
  }
}

const actions = {
  updateItem({ commit }, item) {
    item = item || { name: '', value: '' };
    return new Promise((resolve, reject) => {
      update(item).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getCategories({ commit, state }) {
    return new Promise((resolve, reject) => {
      defectCategories().then(response => {
        commit('setCategories', response)
      }).catch(error => {
        reject(error)
      })
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

