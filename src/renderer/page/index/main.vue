<template>
  <div class="page-index">
    <main class="box">
      <!-- 左侧 -->
      <div style="" class="left-side  immersive-bar-height">
        <!-- logo -->
        <brand></brand>
        <!-- 菜单 -->
        <cMenu @getMenuActionIndex="getMenuActionIndex"></cMenu>
      </div>
      <!-- 右侧 -->
      <div class="right-side">
        <!-- 头部 -->
        <cHeader></cHeader>

        <!-- tabs -->
        <div v-show="activeIndex == 0" class="tab tab-translateForm">
          <!-- 语言选择 -->
          <language></language>
          <!-- 翻译 -->
          <translateForm :activeIndex="activeIndex"></translateForm>
        </div>

        <div v-if="activeIndex == 1" class="tab tab-collection">
          <!-- 收藏 -->
          <collection></collection>
        </div>

        <div v-if="activeIndex == 2" class="tab tab-history">
          <!-- 历史翻译 -->
          <history></history>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
import brand from '@/components/brand';
import cMenu from '@/components/menu';
import cHeader from '@/components/header';
import history from './components/history';
import collection from './components/collection';
import translateForm from './components/translateForm';
import language from './components/language';
export default {
  name: 'index-page',
  data() {
    return {
      activeIndex: 0,
    };
  },
  components: {
    brand,
    cHeader,
    translateForm,
    history,
    collection,
    cMenu,
    language,
  },
  methods: {
    getMenuActionIndex(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="scss">
@import "sass/main.scss";
</style>