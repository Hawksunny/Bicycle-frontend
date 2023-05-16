import * as types from "./mutaion-types";

const mutations = {
  [types.INCREMENT] (state, payload) {
    state.count += payload.param;
  },
  [types.DECREMENT] (state, payload) {
    state.count -= payload.param;
  },

  [types.BIKE_LIST_INIT] (state, payload) {
    state.bikeList = [];
    state.bikeList = [...state.bikeList, ...payload.bikeList];
  },
  [types.ADD_BIKE] (state, payload) {
    state.bikeList = [...state.bikeList, payload.bike];
  },

  [types.CUR_STATION_INIT] (state, payload) {
    state.curStation = {};
    state.curStation = {...state.curStation, ...payload.curStation};
  },
  [types.INCREASE_STATION_CAPACITY] (state) {
    state.curStation.capacity++;
  },
  [types.DECREASE_STATION_CAPACITY] (state) {
    state.curStation.capacity--;
  },
};

export default mutations;
