import { addUser, getUsers, updateUser } from '@/api/Identity/user'
import { range } from "rxjs";
import { map, filter } from "rxjs/operators";

const state = {
  items: []
}

const getters = {
  items: (state) => {
    return state.items;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  }
}

const actions = {
  addUser({ commit }, permission) {
    return new Promise((resolve, reject) => {
      addUser(permission).then(response => {
        commit('setItems', response.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUser({ commit }, permission) {
    return new Promise((resolve, reject) => {
      updateUser(permission).then(response => {
        commit('setItems', response.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUsers({ commit, state }) {
    return getUsers().then(response => {
      commit('setItems', response.items);
      range(1, 20)
        .pipe(
          filter(x => x % 2 === 1),
          map(x => x + x)
        ).subscribe(x => console.log(x));
    }).catch(error => {
      console.error(error);
    })
  },

  deleteUser({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('setToken', token)
      setToken(token)


      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
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
