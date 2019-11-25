<template>
 <div class="language-components">
   <div @click="toggle" class="choose-lang">{{activeLang}}</div>
   <div v-show="isShow" class="list">
    <ul :class="{ 'on' : activeKey == 'auto'}" class="auto">
      <li @click="setLang(null)" >自动检测</li>
    </ul>
    <ul class="items">
      <li :class="{'on': item.key == activeKey}" @click="setLang(item)" :key="index" v-for="(item,index) in lang">{{item.lang}}</li>
    </ul>
   </div>
</div>
</template>
<script>
import langList from '../js/language-list';
const AUTO_NAME = '自动检测';
export default {
  name: 'language-components',
  data() {
    return {
      lang: langList,
      activeLang: AUTO_NAME,
      activeKey: '',
      isShow: false,
    };
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
    setLang(val) {
      let item = val;
      if (!item) {
        item = {};
        item.key = 'auto';
        item.lang = AUTO_NAME;
        this.activeLang = item.lang;
      } else {
        this.activeLang = `${item.lang} ⇋ 中文`;
      }
      this.activeKey = item.key;
      this.toggle();
      this.$emit('getFromToLang', item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/language-components.scss";
</style>