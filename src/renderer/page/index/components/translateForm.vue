<template>
 <div class="tab-body translateForm-components">
  <!-- 语言选择 -->
  <language @getFromToLang="getFromToLang"></language>
  <div class="row form">
    <textarea ref="queryInput"  @keydown="keyDownAction" @keyup.enter="queryWords()" v-model="queryWord" placeholder="在此输入要翻译的单词" rows="3"></textarea>
  </div>
  <div v-show="queryWord" class="row result">
    <div v-show="resultVal" class="row fy-res copy-row">
      <div class="input">{{queryWord}}</div><a title="复制" @click="copyResult(queryWord)" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a>
    </div>
    <div v-show="pinyinVal" class="row pinyin">{{pinyinVal}}</div>
    <div class="row fy-res">
      <div class="res-text">{{ resultVal }}</div>
      <div class="res-collection" v-show="resultVal">
        <a title="复制" class="copy"><i class="icon iconfont icontongzhi"></i></a>
        <a title="复制" @click="copyResult()" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a>
        <a title="加入我的收藏" class="coll" @click="saveCollection"><i  :class="{'on' : isCollecolled}" class="icon iconfont iconcollection"></i></a>
      </div>
    </div>
    <div class="row fy-res">
    </div>
  </div>
</div>
</template>
<script>

import { Toast } from '@/plugins';
import errorCode from '@/common/errorCode';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { mapGetters } from 'vuex';
import indexPage from '../js/index-page';
import language from './language';

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
      fromToLang: 'auto',
      transToLang: 'zh',
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
  components: {
    language,
  },
  computed: {
    ...mapGetters([
      'getTransResultState',
    ]),
    resultVal() {
      return (this.getTransResultState.trans_result && this.getTransResultState.trans_result[0].dst) || '';
    },
    pinyinVal() {
      return this.getTransResultState.py || '';
    },
  },
  methods: {
    ...indexPage,
    getFromToLang(item) {
      this.fromToLang = item.key;
    },
    queryWords() { // 查询
      if (this.queryWord) {
        ipcRenderer.send('indexQueryWords', {
          query: this.queryWord,
          from: this.fromToLang,
          transTo: this.transToLang,
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
        this.$root.log(msg);
        if (msg.error_code && msg.error_code !== 0) {
          Toast(errorCode[msg.error_code]);
        } else {
          this.$store.dispatch('queryWord', { msg, query: this.queryWord });
        }
      });
    },
    saveCollection() { // 收藏翻译
      this.$store.dispatch('saveMyCollection', {
        query: this.queryWord,
        result: this.resultVal,
        py: this.pinyinVal,
      }).then(() => {
        this.isCollecolled = true;
        Toast('收藏成功');
      }, () => {
        Toast('该词条已收藏');
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