

import keys from '@/common/cache/localCacheKeys';
import { setItem, getItem } from '@/common/cache/localCache';

const state = {
  transResult: {},
  serarchHistorys: [],
  myCollection: [],
};

const mutations = {
  SET_TRANS_RESULT(state, param) {
    state.transResult = param;
  },
  SET_MY_COLLECTION(state, param) {
    state.myCollection = param;
  },
  SET_SEARCH_HISTORYS(state, param) {
    state.serarchHistorys = param;
  },
};

const actions = {

  queryWord({ commit }, params) {
    commit('SET_TRANS_RESULT', JSON.parse(params));
  },
  clearTransResutl({ commit }) {
    commit('SET_TRANS_RESULT', '');
  },
  // eslint-disable-next-line no-empty-pattern
  saveMyCollection({}, params) {
    const t = new Date().getTime();
    const val = JSON.parse(getItem(keys.index.MY_COLLECTION)) || [];
    val.push({ t, q: params.query, r: params.result });
    setItem(keys.index.MY_COLLECTION, val);
  },
  // eslint-disable-next-line no-empty-pattern
  saveSearchHistory({}, params) {
    const val = JSON.parse(getItem(keys.index.SEARCH_HISTORYS)) || [];
    val.push({ t: new Date().getTime(), q: params.query, r: params.result });
    setItem(keys.index.SEARCH_HISTORYS, val);
  },
  getMyCollection({ commit }) {
    commit('SET_MY_COLLECTION', JSON.parse(getItem(keys.index.MY_COLLECTION)));
  },
  getSearchHistory({ commit }) {
    commit('SET_SEARCH_HISTORYS', JSON.parse(getItem(keys.index.SEARCH_HISTORYS)));
  },
};

const getters = {
  getTransResultState: state => state.transResult,
  getSearchHistoryState: state => state.serarchHistorys,
  getMyCollectionState: state => state.myCollection,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
