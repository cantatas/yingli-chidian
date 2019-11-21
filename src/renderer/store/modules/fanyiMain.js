

import keys from '@/common/cache/localCacheKeys';
import { setItem, getItem } from '@/common/cache/localCache';
import pinyin from 'pinyin';

const regZH = /[^\u4e00-\u9fa5]/;

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
    if (param.length)param = param.sort((a, b) => (b.t > a.t ? 1 : -1));
    state.myCollection = param;
  },
  SET_SEARCH_HISTORYS(state, param) {
    if (param.length)param = param.sort((a, b) => (b.t > a.t ? 1 : -1));
    state.serarchHistorys = param;
  },
};

const actions = {

  queryWord({ commit, dispatch }, params) {
    const val = JSON.parse(params.msg);
    // 新增拼音
    let py = '';
    if (!regZH.test(params.query)) {
      py = pinyin(params.query).join('，');
    }
    val.py = py;
    commit('SET_TRANS_RESULT', val);
    // 保存历史搜索
    if (val.trans_result) {
      dispatch('saveSearchHistory', {
        query: val.trans_result[0].src,
        result: val.trans_result[0].dst,
      });
    }
  },
  clearTransResutl({ commit }) {
    commit('SET_TRANS_RESULT', '');
  },
  // eslint-disable-next-line no-empty-pattern
  saveMyCollection({}, params) {
    return new Promise((resolve, reject) => {
      const t = new Date().getTime();
      const val = JSON.parse(getItem(keys.index.MY_COLLECTION)) || [];
      if (val.findIndex(item => item.q === params.query) < 0) {
        val.push({ t, q: params.query, r: params.result });
        setItem(keys.index.MY_COLLECTION, val);
        resolve();
      } else {
        reject();
      }
    });
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
  deleteColleItemByTime({ dispatch }, time) { // 根据时间戳删除 收藏项
    const list = JSON.parse(getItem(keys.index.MY_COLLECTION));
    list.splice(list.findIndex(item => item.t === time), 1);
    setItem(keys.index.MY_COLLECTION, list);
    dispatch('getMyCollection');
  },
  deleteHistroyItemByTime({ dispatch }, time) { // 根据时间戳删除 历史项
    const list = JSON.parse(getItem(keys.index.SEARCH_HISTORYS));
    list.splice(list.findIndex(item => item.t === time), 1);
    setItem(keys.index.SEARCH_HISTORYS, list);
    dispatch('getSearchHistory');
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
