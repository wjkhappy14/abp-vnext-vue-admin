import { getItems, updateItems } from '@/api/Permission/index'

const state = {
  groups: [],
  permissions: [
    {
      name: "delete",
      isGranted: true
    }
  ],
  visible:false
}
const getters = {
  groups: (state) => {
    return state.groups;
  }
}
const mutations = {
  setPermissions: (state, groups) => {
    state.groups = groups
    console.log(groups);
  },
  toogleVisible:(state)=>{
    state.visible = !state.visible
  },
  changeVisible:(state,visible)=>{
    state.visible =visible
  }
}

const actions = {
  setPermissions({commit,state}) {
    console.log("更新权限设置");
    return new Promise((resolve, reject) => {
      updateItems(state.permissions).then(response => {
        commit('setPermissions', response.groups)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPermissions({ commit },item) {
    return new Promise((resolve, reject) => {
      console.log(item);
      getItems(item.id,'U').then(response => {
        commit('setPermissions', response.groups)
        commit('changeVisible', true)
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
