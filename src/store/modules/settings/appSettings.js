import { fetch, update, gridColumns } from '@/api/settings'

const state = {
  items: [],
  grid: {
    columns: []
  }
}
const getters = {
  items: (state) => {
    return state.items;
  },
  grid: (state) => {
    return state.grid;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  },
  setGrid: (state, grid) => {
    state.grid.columns = grid
  },
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
  gridColumns({ commit, state }) {
    return new Promise((resolve, reject) => {
      gridColumns().then(response => {
        commit('setGrid', response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getItems({ commit, state }) {
    return new Promise((resolve, reject) => {
      fetch().then(response => {
        commit('setItems', response)
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

