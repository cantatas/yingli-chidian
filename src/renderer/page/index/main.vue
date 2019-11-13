<template>
  <div class="page-index">
    <main class="box">
      <!-- 左侧 -->
      <div class="left-side">
        <!-- logo -->
        <brand></brand>
        <!-- 菜单 -->
        <menuComponents @getMenuActionIndex="getMenuActionIndex"></menuComponents>
      </div>
      <!-- 右侧 -->
      <div class="right-side">
        <div v-show="activeIndex == 0" class="tab tab-translateForm">
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
import { Toast } from '@/plugins';
import menuComponents from '@/components/menu';
import history from './components/history';
import collection from './components/collection';
import translateForm from './components/translateForm';
export default {
  name: 'index-page',
  data() {
    return {
      activeIndex: 0,
    };
  },
  components: {
    brand,
    translateForm,
    history,
    collection,
    menuComponents,
  },
  mounted() {
    Toast('112233333');
  },
  methods: {
    getMenuActionIndex(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="scss">
@import "sass/index.scss";
</style>