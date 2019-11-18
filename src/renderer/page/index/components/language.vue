<template>
 <div class="language-components">
   <div class="choose-lang">{{activeLang}}</div>
   <ul class="list">
     <li :key="index" v-for="(item,index) in lang">{{item.lang}}</li>
   </ul>
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
    };
  },
  mounted() {
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/language-components.scss";
</style>