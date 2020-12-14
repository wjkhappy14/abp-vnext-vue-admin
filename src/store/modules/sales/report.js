import { getDefects, getQueryItems, setSheetFilters, fetchItems } from '@/api/sales/report'

const state = {
  source: {
    items: [],
    count: 200
  },
  search: {
    ClothName: "",
    Color: "",
    Department: "",
    LotLength: "",
    LotNumber: "",
    MachineName: "",
    OrderSeries: "",
    PlanNumber: ""
  },
  defects: [],
  columns: [],
  query: [],
  select: [
    {
      key: '',
      text: '',
      options: []
    }
  ]
}
const getters = {
  source: (state) => {
    return state.source;
  },
  select: (state) => {
    return state.select;
  },
  allColumns: (state) => {
    return state.columns.concat(state.defects);
  }
}
const mutations = {
  setColumns: (state, columns) => {
    state.columns = columns
  },
  setDefects: (state, defects) => {
    state.defects = defects
  },
  setQuery: (state, query) => {
    state.query = query
  },
  setSelect: (state, items) => {
    state.select = items;
  },
  setSource: (state, source) => {
    state.source.items = source;
  }
}
const actions = {
  getDefects({ commit }) {
    return getDefects();
  },
  getQueryItems({ commit }) {
    return getQueryItems();
  },
  setSheetFilters({ commit }, filters) {
    return setSheetFilters(filters);
  },
  init({ dispatch, commit }) {
    try {
      Promise.all([
        dispatch('getDefects'),
        dispatch('getQueryItems'),
        dispatch('setSheetFilters')
      ])
        .then(items => {
          var defects = [];
          var columns = [];
          var select = items[2];
          var query = [];

          defects = items[0].items.filter(x => {
            return x.isVisiable == true;
          });
          defects = defects.map(item => {
            return {
              name: item.id,
              text: item.name
            };
          });
          commit('setDefects', defects);
          columns = items[1]['columns'].map(item => {
            return {
              name: item.key,
              text: item.text
            };
          });
          commit('setColumns', columns);
          query = items[1]['query'];
          commit('setQuery', query);
          var result = [];
          query.forEach(item => {
            var summary = {};
            summary.options = select[item.key];
            summary.text = item.text;
            summary.key = item.key;
            result.push(summary);
          });
          commit('setSelect', result);
        });
    }
    catch (ex) {
      console.error(ex);
    }
    finally {

    }
  },
  search({ commit, state }) {
    var options = state.search;
    options.date = "2020-07-03";
    console.log(options);
    fetchItems(options).then(result => {
      var items = result.map(item => {
        state.defects.forEach(defect => {
          item[defect.name] = item.realDefectsSummary[defect.name];
        });
        return item;
      });
      commit('setSource', items);
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
