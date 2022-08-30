import { addItem, getItems, updateItem,deleteItem,getRoles } from '@/api/Identity/user'
import { range } from "rxjs";
import { map, filter } from "rxjs/operators";

const state = {
  pagination:{
    Filter:"",
    Sorting:"id asc",
    SkipCount:0,
    MaxResultCount:15,
    total:101
  },
  permission:{},
  items: [],
  roles: [],
  editable:false,
  index:0,
  selected:{},
  search:{
    key:"",
    items:[]
  }
}

const getters = {
  getPagination: (state) => {
    return (index) => {
        if (state.pagination.total>0) {
            return state.pagination.index=index;
        }
        return {}
    }
},
  items: (state) => {
    return state.items;
  },
  count:(state)=>{
    return state.items.length;
  }
}
const mutations = {
  filter: (state, name) => {
    let xx = state.items.filter(v => v.name === name)
    if (xx.length > 0) {
        state.index = state.list.indexOf(xx[0])
    } else {
        state.index = 0
    }
    state.search.items = array.map(v => {
        return {
            id: v.id,
            name: v.name
        }
    })
    console.log("搜索结果：", state.search.items.map(v => v.name))
},
isEditable:(state,editable)=>{
  state.editable=editable;
},
  setItems: (state, items) => {
    state.items = items
  },
  addItem: (state, item) => {
    state.items.push(item);
  },
  updateItem:(state, item)=>{


  },
  removeItem:(state, item)=>{


  },
  setRoles:(state,roles)=>{
    state.roles=roles;
  },
   // 选择选中的那个
   itemSelected: (state,row) => {
    state.selected=state.items.find(v => v.id == row.id);
   }
}

const actions = {
  addItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      addItem(item).then(user => {
        commit('addItem', user);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      updateItem(item).then(user => {
        commit('setItems', user)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  async getItems({ commit, state }) {
    try {
      const response = await getItems(state.pagination);
      commit('setItems', response.items);
      range(1, 20)
        .pipe(
          filter(x => x % 2 === 1),
          map(x_1 => x_1 + x_1)
        ).subscribe(x_2 => console.log(x_2));
    } catch (error) {
      console.error(error);
    }
  },
  itemClick: ({
    commit, state
  }, item) => {
    getRoles(item.id).then(r => {
      commit('setRoles', r.items);
      console.log(state.selected);
    });
  },
  async deleteItem({ commit, dispatch }, item) {
   const r = await deleteItem(item).then(r=>{
      commit("removeItem",item);
   });
  },
  viewPermissions({ commit, dispatch }, item)
  {
    dispatch('permission/getPermissions', item, {root: true}).then(res=>{


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
