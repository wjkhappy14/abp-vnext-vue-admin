import { getItems, updateItem } from '@/api/quote/contract'

const state = {
  items: [],
  query:{
  Sorting:"id asc",
  SkipCount:0,
  MaxResultCount:20
},
  isLoading:false
}
const getters = {
  items: (state) => {
    return state.items;
  },
  query: (state) => {
    return state.query;
  },
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  }
}

const actions = {
  updateItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      update(item).then(response => {
        commit('setItems', response.items)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getItems({ commit,state }) {
    return new Promise((resolve, reject) => {
      getItems(state.query).then(response => {
        commit('setItems', response.items)
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
