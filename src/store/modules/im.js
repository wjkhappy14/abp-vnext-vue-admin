import { SocketAPI } from "@/utils/WsApi2";
const state = {
  group: {
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
  log: {

  },
  clients: [],
  columns: [],
  select: [
    {
      connectionId: '',
      text: '',
      options: []
    }
  ]
}
const getters = {
  group: (state) => {
    return state.group;
  },
  log: (state) => {
    return state.log;
  },
  select: (state) => {
    return state.select;
  },
  connection: () => SocketAPI.connection,
  clients: (state) => {
    return state.clients;
  }
}
const mutations = {
  log: (state, log) => {
    state.log = log
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
  start({ commit }) {
    SocketAPI.connection.on('connected', (value) => {
      commit('log', value);
    });
    SocketAPI.start().then((x) => {
      console.log(x);
    });
  },
  getToken() {
    var cmd = {
      cmd: 'token'
    };
    SocketAPI.sendCommand(cmd);
  },
  login() {
    SocketAPI.sendCommand({
      cmd: 'login'
    });
  },
  streamSubscribe() {
    SocketAPI.streamSubscribe();
  },
  invoke() {
    SocketAPI.invoke('send', {
      connectionId: 'abc',
      message: '123'
    });
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
