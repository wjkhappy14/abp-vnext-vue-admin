import busVue from "@/utils/bus";

const state = {
  users: [],
  groups: [
    { name: 'One' },
    { name: 'Two' },
    { name: 'Three' },
    { name: 'Four' }
  ],
  summary: {}
}

// getters
const getters = {

}

const mutations = {
  addItem: (state, item) => {
    state.users.push(item);
  }
}

const actions = {
  addItem({ commit }, data) {
    commit('addItem', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

