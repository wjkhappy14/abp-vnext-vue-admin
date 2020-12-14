import { getCountries, updateCountry, getStateProvinces, updateStateProvince, getCities, updateCity, deleteItem } from '@/api/region'
import { map, scan, reduce, mergeMap, filter, find, findIndex } from 'rxjs/operators';
import { of, from, interval, Observable } from 'rxjs';
import { groupBy, orderBy, castArray } from "lodash";

const state = {
  tree: [],
  country: {
    items: [],
    loading: true,
    selected: {
      item: {}
    },
    groups: [],
    continent: [],
    count: 0,
    autocomplete: {
      count: 0,
      items: []
    }
  },
  stateProvince: {
    items: [],
    group: {
      items: [],
      key: 'name'
    },
    loading: true,
    selected: {
      item: {}
    }
  },
  city: {
    items: [],
    filter: {
      population: [{ text: 'Million', value: 1000000 }, { text: '10 Million', value: 10 * 1000000 }, { text: 'Billion', value: 100000000 }]
    },
    group: {
      items: [],
      key: 'name'
    },
    func: () => {
      console.log(this);
    },
    loading: true,
    selected: {
      item: {}
    }
  },
}
const getters = {
  country: (state) => {
    return state.country;
  },
  findFunc: (state) => {
    return (
      {
        name
      }) => {
      const result = from(state.country.items).pipe(find(v => v.name == name));
      result.subscribe(function (item) {
        state.country.selected.item = item;
      });
    }
  },
  autocompleteFunc: function (state) {
    return function ({ name }) {
      const result = from(state.country.items).pipe(filter(v => v.name == name))
      result.subscribe(function (item) {
        state.country.autocomplete.items.push(item)
      });
    };
  },
  stateProvince: (state) => {
    return state.stateProvince;
  },
  selectedFunc: function (state) {
    return function ({ id, type }) {
      switch (type) {
        case "country":
          from(state.country.items)
            .pipe(find(v => v.id == id))
            .subscribe(item => state.country.selected.item = item);
          break;
        case "province":
          from(state.stateProvince.items)
            .pipe(find(v => v.id == id))
            .subscribe(item => state.stateProvince.selected.item = item);
          break;
        case "city":
          from(state.city.items).pipe(find(v => v.id == id))
            .subscribe(item => state.city.selected.item = item);
          break;
      }
    };
  },
  city: (state) => {
    return state.city;
  }
}
const mutations = {
  settCountries: (state, items) => {
    let groups = groupBy(items, "continent");
    state.country.groups = groups;// castArray(groups);
    state.country.items = items;
    state.country.continents = Object.keys(groups);
    state.country.count = items.length;
  },
  scan: (state, { key, type }) => {
    from(state.stateProvince.items).pipe(scan((x) => { return key; }))
      .subscribe(x => console.log(x));
  },
  groupBy: (state, { key, type }) => {
    let groups = Object.create(null);
    switch (type) {
      case "country":
        groups = groupBy(state.country.items, key);
        state.country.group.items = groups;
        state.country.group.key = key;
      case "province":
        groups = groupBy(state.stateProvince.items, key);
        state.stateProvince.group.items = groups;
        state.stateProvince.group.key = key;
      case "city":
        groups = groupBy(state.city.items, key);
        state.city.group.items = groups;
        state.city.group.key = key;
    }
    console.table(state);
  },
  setStateProvinces: (state, items) => {
    state.stateProvince.items = orderBy(items, ['name', 'id'], ['asc', 'desc']);
    state.stateProvince.loading = false;
  },
  setCities: (state, items) => {
    state.city.items = items;
    state.city.loading = false;
  },
  buildTree(state, level) {
    console.log(level);
    if (level === 1) {
      debugger;
      state.tree = state.country.groups;
    }
    else if (level === 2) {

    }
    else if (level === 3) {

    }
  }
}

const actions = {
  addCountry({ commit }, item) {
    return new Promise((resolve, reject) => {
      addCountry(item).then(response => {

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  delayAction({ commit }, delayInMillis) {
    var func = (observable) => new Observable(observer => {
      const allTimerIDs = new Set();
      const subscription = observable.subscribe({
        next(value) {
          const timerID = setTimeout(() => {
            observer.next(value);
            allTimerIDs.delete(timerID);
          }, delayInMillis);
          allTimerIDs.add(timerID);
        },
        error(err) {
          observer.error(err);
        },
        complete() {
          observer.complete();
        }
      });
      // the return value is the teardown function,
      // which will be invoked when the new
      // Observable is unsubscribed from.
      return () => {
        subscription.unsubscribe();
        allTimerIDs.forEach(timerID => {
          clearTimeout(timerID);
        });
      }
    });
    return func;
  },
  updateCountry({ commit }, country) {
    return new Promise((resolve, reject) => {
      updateCountry(country).then(response => {
        commit('setCountry', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getCountries({ commit }) {
    return new Promise((resolve, reject) => {
      getCountries().then(response => {
        commit('setCountry', response.items)
        commit('buildTree', 1)
        const observable = interval(1000);
      }).catch(error => {
        reject(error)
      })
    })
  },

  getStateProvinces({ commit }) {
    return new Promise((resolve, reject) => {
      getStateProvinces().then(response => {
        var items = response.map(item => {
          item.edit = true;
          //var original = Object.create(null);
          // item.original = Object.assign(item, original);
          return item;
        });
        Promise.all(
          [
            commit('setStateProvinces', items),
            commit('buildTree', 2)
          ]
        );
      }).catch(error => {
        reject(error)
      })
    });
  },
  updateStateProvince({ commit }, item) {
    return new Promise((resolve, reject) => {
      updateStateProvince(item);
    });
  },

  getCities({ commit }, options) {
    return new Promise((resolve, reject) => {
      getCities(options).then(response => {
        Promise.all(
          [
            commit('setCities', response),
            commit('buildTree', 3)
          ]
        );
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateCity({ commit }, item) {
    return new Promise((resolve, reject) => {
      updateCity(item);
    });
  },
  deleteItem({ commit, dispatch }, item) {
    return new Promise(async resolve => {
      deleteItem(item);
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
