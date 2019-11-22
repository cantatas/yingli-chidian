<template>
  <div class="history-components">
      <ul class="record-list">
        <li :key="index" v-for="(key,index) in getSearchHistoryState">
          <div class="li-box">
            <div class="body">
              <div class="num">{{index+1}}.</div>
              <div class="content">
                <div class="query">{{key.q}}<a title="复制" @click="copyResult(key.q)" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a></div>
                <div v-show="key.p" class="py">{{key.p || ''}}</div>
                <div class="result">{{key.r}}<a title="复制" @click="copyResult(key.r)" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a></div>
                <div class="time">{{getDayName(key.t)}} {{dateFormat(key.t)}}</div>
              </div>
            </div>
            <div class="actions">
              <a class="del-colle" @click="deleteHistroyItem(key.t)">
                <i class="icon iconfont iconshanchu"></i>
              </a>
            </div>
          </div>
        </li>
        <li class="data-end"><i class="icon iconfont iconhuangguan"></i>没有更多了</li>
      </ul>
  </div>
</template>

<script>

import { Toast, Dialog } from '@/plugins';
import { mapGetters } from 'vuex';
import indexPage from '../js/index-page';
export default {
  name: 'history-components',
  mounted() {
    this.getSearchHistory();
  },
  computed: {
    ...mapGetters([
      'getSearchHistoryState',
    ]),
  },
  methods: {
    ...indexPage,
    getSearchHistory() { // 获取搜索记录
      this.$store.dispatch('getSearchHistory');
    },
    deleteHistroyItem(t) {
      // eslint-disable-next-line no-restricted-globals
      Dialog('确认删除？').then((action) => {
        if (action === 'ok') {
          this.$store.dispatch('deleteHistroyItemByTime', t).then(() => {
            Toast({
              message: '删除成功',
              position: 'bottom',
            });
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/history-components.scss";
</style>