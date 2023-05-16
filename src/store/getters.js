const getters = {
  newCount(state) {
    return 100 * state.count;
  },
  getBikeList(state) {
    return state.bikeList;
  }
};

export default getters;
