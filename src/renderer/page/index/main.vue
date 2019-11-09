<template>
  <div class="page-index ">
    <main class="box">
      <div class="left-side">
        <ul class="menu">
          <li class="name">
            <span class="hou">后</span><span class="dao">道</span><span class="ci">词</span><span class="dian">典</span>
          </li>
        </ul>
        <ul class="menu">
          <li v-for="(item,index) in menuData" :key="index" @click="action(index)" :class="{'on' : activeIndex == index}">
            <i class="icon iconfont" :class="item.icon"></i> {{item.name}}
          </li>
        </ul>
        <!-- <div class="datafrom">
          数据来自 <span>百度翻译</span>
        </div> -->
      </div>
      <div class="right-side">
        <div v-show="activeIndex == 0" class="tab tab-fanyi">
          <div class="tran-type">
            <ul class="choose-type">
              <li>英汉翻译</li>
            </ul>
          </div>
          <div class="row form">
            <textarea @focus="clearTransResutl" @keydown="keyDownAction" @keyup.enter="indexQueryWords()" v-model="queryWord" placeholder="在此输入要翻译的单词" rows="3"></textarea>
          </div>
          <div v-show="queryWord" class="row result">
            <div v-show="resultVal" class="row fy-res copy-row">
              <div class="input">{{queryWord}}</div><a title="复制" @click="copySearch()" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a>
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
        </div><!-- tab-fanyi -->
        <div v-show="activeIndex == 1" class="tab tab-collection">
          <ul class="record-list">
            <li :key="index" v-for="(key,index) in getMyCollectionState">
              <div class="body">
                <div class="num">{{index+1}}</div>
                <div class="content">
                  <div class="query">{{key.q}}<a title="复制" @click="copyResult(key.q)" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a></div>
                  <div class="result">{{key.r}}<a title="复制" @click="copyResult(key.r)" class="copy"><i class="icon iconfont iconfuzhicopy22"></i></a></div>
                  <div class="time">{{getDayName(key.t)}} {{dateFormat(key.t)}}</div>
                </div>
              </div>
              <div class="actions">
                <a class="del-colle" @click="deleteColleItem()">
                  <i class="icon iconfont iconshanchu"></i>
                </a>
              </div>
            </li>
            <li class="data-end"><i class="icon iconfont iconhuangguan"></i>没有更多了</li>
          </ul>
        </div>
        <div v-show="activeIndex == 2" class="tab tab-history">
history
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer, clipboard } from 'electron';
import timeTool from '@/common/time';
import { mapGetters } from 'vuex';

export default {
  name: 'fanyi-page',
  data() {
    return {
      queryWord: '',
      menuData: [
        // { name: '搜索', icon: 'iconwj-cznr' },
        { name: '翻译', icon: 'iconbusiness-translate' },
        { name: '收藏', icon: 'iconcollection' },
        { name: '历史', icon: 'iconhistory' },
      ],
      activeIndex: 0,
      setTimer: null,
      isCollecolled: false,
    };
  },
  components: {
  },
  mounted() {
    this.onIPCMsg();
  },
  computed: {
    ...mapGetters([
      'getTransResultState',
      'getSearchHistoryState',
      'getMyCollectionState',
    ]),
    resultVal() {
      return (this.getTransResultState.trans_result && this.getTransResultState.trans_result[0].dst) || '';
    },
  },
  methods: {
    dateFormat(time) {
      return timeTool.dataFormat(time).time;
    },
    getDayName(time) {
      return timeTool.getDayName(time);
    },
    indexQueryWords() {
      if (this.queryWord) {
        ipcRenderer.send('indexQueryWords', this.queryWord);
        this.isCollecolled = false;
      }
    },
    keyDownAction(e) {
      if (e.keyCode === 13) e.preventDefault();
    },
    action(index) {
      this.activeIndex = index;
      if (index === 1) {
        this.getMyCollection();
      }
      if (index === 2) {
        this.getSearchHistory();
      }
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
    getMyCollection() {
      this.$store.dispatch('getMyCollection');
    },
    saveSearchHistory() { // 保存搜索记录
      this.$store.dispatch('saveSearchHistory', this.resultVal);
    },
    getSearchHistory() { // 获取搜索记录
      this.$store.dispatch('getSearchHistory');
    },
    copyResult(value) { // 复制翻译结果
      clipboard.writeText(value || this.resultVal);
    },
    copySearch() { // 复制搜索
      clipboard.writeText(this.queryWord);
    },
  },
};
</script>

<style lang="scss">
@import "sass/index.scss";
</style>