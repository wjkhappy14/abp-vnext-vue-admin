import bus from '@/utils/bus'
import { getItems, create, deleteItem } from '@/api/Blogging/post'
import { range } from "rxjs";
import { map, filter } from "rxjs/operators";

const state = {
  items: [],
  count: 0
}

const getters = {
  items: (state) => {
    return state.items;
  }
}
const mutations = {
  setItems: (state, items) => {
    state.items = items
  },
  removeItem: (state, item) => {

  }
}

const actions = {
  addItem({ commit }, blog) {
    return new Promise((resolve, reject) => {
      create(blog).then(response => {
        commit('setItems', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateItem({ commit }, blog) {
    return new Promise((resolve, reject) => {
      updateUser(blog).then(response => {
        commit('setItems', response.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getItems({ commit, state },item) {
    return getItems(item.id).then(response => {
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

  deleteItem({ commit, state, dispatch }, blog) {
    return deleteItem(blog).then(x => {
      bus.$notify.success({
        title: '新闻动态',
        message: '删除成功',
        showClose: true,
        position: 'bottom-right'
      });
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
