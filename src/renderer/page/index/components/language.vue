<template>
 <div class="language-components">
   <div @click="toggle" class="choose-lang">{{activeLang}}</div>
   <div v-show="isShow" class="list">
    <ul class="auto">
      <li>自动监测</li>
    </ul>
    <ul class="items">
      <li @click="setLang(item)" :key="index" v-for="(item,index) in lang">{{resetText(item.lang)}}</li>
    </ul>
   </div>
</div>
</template>
<script>
import langList from '../js/language-list';
export default {
  name: 'language-components',
  data() {
    return {
      lang: langList,
      activeLang: '自动检测',
      isShow: false,
    };
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    resetText(text) {
      return `${text.slice(0, 1)} ⇋ 汉`;
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    setLang(item) {
      this.activeLang = this.resetText(item.lang);
      this.toggle();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/language-components.scss";
</style>