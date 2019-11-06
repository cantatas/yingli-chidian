<template>
  <div class="page-index ">
    <main class="box">
      <div class="left-side">
        <ul class="menu">
          <li class="name"></li>
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
        <div class="tran-type">
          <ul class="choose-type">
            <li>英汉翻译</li>
          </ul>
        </div>
        <div class="row form">
          <textarea @focus="clearTransResutl" @keyup="indexQueryWords()" v-model="formWord" placeholder="请输入要查询的单词..." rows="3"></textarea>
        </div>
        <div v-show="formWord" class="row result">
          <!-- <div class="row title">result</div> -->
          <div class="row inpput">{{formWord}}</div>
          <div class="row fy-res">
            <div class="res-text">{{ getTransResult.trans_result && getTransResult.trans_result[0].dst }}</div>
            <div class="res-collection" v-show="getTransResult.trans_result && getTransResult.trans_result[0].dst">
              <a title="加入我的收藏" @click="saveCollection"><i class="icon iconfont iconcollection"></i></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { mapGetters } from 'vuex';

export default {
  name: 'fanyi-page',
  data() {
    return {
      formWord: '',
      menuData: [
        { name: '搜索', icon: 'iconwj-cznr' },
        { name: '翻译', icon: 'iconbusiness-translate' },
        { name: '收藏', icon: 'iconcollection' },
      ],
      activeIndex: 0,
      setTimer: null,
    };
  },
  components: {
  },
  mounted() {
    this.onIPCMsg();
  },
  computed: {
    ...mapGetters(['getTransResult']),
  },
  methods: {
    indexQueryWords() {
      clearTimeout(this.setTimer);
      this.setTimer = setTimeout(() => {
        ipcRenderer.send('indexQueryWords', this.formWord);
      }, 200);
    },
    action(index) {
      this.activeIndex = index;
    },
    clearTransResutl() {
      if (!this.formWord) {
        this.$store.dispatch('clearTransResutl');
      }
    },
    onIPCMsg() {
      ipcRenderer.on('indexQueryResult', (e, msg) => {
        this.$store.dispatch('queryWord', msg);
      });
    },
    saveCollection() {

    },
  },
};
</script>

<style lang="scss">
@import "sass/index.scss";
</style>