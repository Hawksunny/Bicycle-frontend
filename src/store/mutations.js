import * as types from "./mutaion-types";

const mutations = {
  [types.SET_UID] (state, payload) {
    state.uid = payload.uid;
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
