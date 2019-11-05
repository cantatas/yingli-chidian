
const state = {
  transResult: {},
};

const mutations = {
  SET_TRANS_RESULT(state, param) {
    state.transResult = param;
  },
};

const actions = {

  queryWord({ commit }, params) {
    commit('SET_TRANS_RESULT', JSON.parse(params));
  },
  clearTransResutl({ commit }) {
    commit('SET_TRANS_RESULT', '');
  },
};

const getters = {
  getTransResult: state => state.transResult,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
