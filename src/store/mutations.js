import * as types from "./mutaion-types";

const mutations = {
  [types.INCREMENT](state, payload) {
    state.count += payload.param;
  },
  [types.DECREMENT](state, payload) {
    state.count -= payload.param;
  },
};

export default mutations;
