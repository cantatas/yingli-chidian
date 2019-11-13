<template>
  <div class="collection-components">
    <ul class="record-list">
      <li :key="index" v-for="(key,index) in getMyCollectionState">
        <div class="li-box">
          <div class="body">
            <div class="num">{{index+1}}.</div>
            <div class="content">
              <div class="query">{{key.q}}<a title="复制" @click="copyResult(key.q)" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a></div>
              <div class="result">{{key.r}}<a title="复制" @click="copyResult(key.r)" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a></div>
              <div class="time">{{getDayName(key.t)}} {{dateFormat(key.t)}}</div>
            </div>
          </div>
          <div class="actions">
            <a class="del-colle" @click="deleteColleItem(key.t)">
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

import { mapGetters } from 'vuex';
import indexPage from '../js/index-page';
export default {
  name: 'collection-components',
  mounted() {
    this.getMyCollection();
  },
  computed: {
    ...mapGetters([
      'getMyCollectionState',
    ]),
  },
  methods: {
    ...indexPage,
    getMyCollection() {
      this.$store.dispatch('getMyCollection');
    },
    deleteColleItem(t) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('确认删除？')) {
        this.$store.dispatch('deleteColleItemByTime', t);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/history-components.scss";
</style>