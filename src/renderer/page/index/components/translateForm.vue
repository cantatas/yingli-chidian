<template>
 <div class="tab-body translateForm-components">
  <div class="tran-type">
    <ul class="choose-type">
      <li>英汉翻译</li>
    </ul>
  </div>
  <div class="row form">
    <textarea ref="queryInput" @focus="clearTransResutl" @keydown="keyDownAction" @keyup.enter="queryWords()" v-model="queryWord" placeholder="在此输入要翻译的单词" rows="3"></textarea>
  </div>
  <div v-show="queryWord" class="row result">
    <div v-show="resultVal" class="row fy-res copy-row">
      <div class="input">{{queryWord}}</div><a title="复制" @click="copyResult(queryWord)" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a>
    </div>
    <div class="row fy-res">
      <div class="res-text">{{ resultVal }}</div>
    </div>
    <div class="row fy-res">
      <div class="res-collection" v-show="resultVal">
        <a title="复制" @click="copyResult()" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a>
        <a title="加入我的收藏" class="coll" @click="saveCollection"><i  :class="{'on' : isCollecolled}" class="icon iconfont iconcollection"></i></a>
      </div>
    </div>
  </div>
</div>
</template>
<script>

// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { mapGetters } from 'vuex';
import indexPage from '../js/index-page';
export default {
  name: 'translateForm-components',
  props: {
    activeIndex: {
      type: Number,
    },
  },
  data() {
    return {
      queryWord: '',
      isCollecolled: false,
    };
  },
  mounted() {
    this.onIPCMsg();
    this.$refs.queryInput.focus();
  },
  watch: {
    activeIndex(val) {
      if (val === 0) {
        this.$refs.queryInput.focus();
      }
    },
  },
  computed: {
    ...mapGetters([
      'getTransResultState',
    ]),
    resultVal() {
      return (this.getTransResultState.trans_result && this.getTransResultState.trans_result[0].dst) || '';
    },
  },
  methods: {
    ...indexPage,
    queryWords() {
      if (this.queryWord) {
        ipcRenderer.send('indexQueryWords', {
          query: this.queryWord,
          transTo: 'en',
        });
        this.isCollecolled = false;
      }
    },
    keyDownAction(e) {
      this.clearTransResutl();
      if (e.keyCode === 13) e.preventDefault();
    },
    clearTransResutl() {
      if (!this.queryWord) {
        this.$store.dispatch('clearTransResutl');
      }
    },
    onIPCMsg() {
      ipcRenderer.on('indexQueryResult', (e, msg) => {
        this.$store.dispatch('queryWord', msg);
      });
    },
    saveCollection() { // 收藏翻译
      this.$store.dispatch('saveMyCollection', {
        query: this.queryWord,
        result: this.resultVal,
      }).then(() => {
        this.isCollecolled = true;
      });
    },
    saveSearchHistory() { // 保存搜索记录
      this.$store.dispatch('saveSearchHistory', this.resultVal);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/translateForm-components.scss";
</style>