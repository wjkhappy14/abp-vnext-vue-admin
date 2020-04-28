import bus from '@/utils/bus'
import { getItems, create, update, deleteItem } from '@/api/docs/article'
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
  setItem: (state, item) => {
    var index = state.items.findIndex(x => x.id == item.id);
    if (index > 0) {
      state.items[index] = item;
    }

  },
  removeItem: (state, item) => {
    var index = state.items.findIndex(x => x.id == item.id);
    state.items.splice(index, 1);
  }
}

const actions = {
  addItem({ commit }, article) {
    return new Promise((resolve, reject) => {
      create(article).then(response => {
        commit('setItems', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateItem({ commit }, args) {
    return update(args).then(article => {
      commit('setItem', article)
    }).catch(error => {
      console.error(error);
    })
  },

  getItems({ commit }) {
    return getItems({type:2}).then(response => {
      commit('setItems', response.items);
      range(1, 10)
        .pipe(
          filter(x => x % 2 === 1),
          map(x => x + x)
        ).subscribe(x => console.log(x));
    }).catch(error => {
      console.error(error);
    })
  },

  getItem({ state }, args) {
    return state.items.find(function (item) {
      return item.id == args.id
    });
  },
  deleteItem({ commit }, item) {
    return deleteItem(item).then(x => {
      commit('removeItem', item);
      bus.$notify.success({
        title: '新闻动态',
        message: '删除成功',
        showClose: true,
        duration: 3000,
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
