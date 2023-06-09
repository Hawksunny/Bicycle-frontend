import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    bikeList: [],
    curStation: {},
    uid: 0,
  },
  getters,
  mutations,
  actions,
  modules: {},
});
