import {
  lotReportSummary, defectCategories, machineClothLength,
  defectsCount, monthClothLength
} from '@/api/summary'

const state = {
  items: []
}
const getters = {
  roles: (state) => {
    return state.items;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  }
}

const actions = {
  lotReportSummary({ commit }, permission) {
    return new Promise((resolve, reject) => {
      lotReportSummary(permission).then(response => {
        commit('setItems', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  defectCategories({ commit }, permission) {
    return new Promise((resolve, reject) => {
      defectCategories(permission).then(response => {
        commit('setItems', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  machineClothLength({ commit, state }) {
    return new Promise((resolve, reject) => {
      machineClothLength().then(response => {
        commit('setItems', response.items)
      }).catch(error => {
        reject(error)
      })
    })
  },

  defectsCount({ commit, state }) {
    return new Promise((resolve, reject) => {
      defectsCount().then(response => {
        commit('setItems', response.items)
      }).catch(error => {
        reject(error)
      })
    })
  },
  monthClothLength({ commit, state }) {
    return monthClothLength();
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
