<template>
  <div class="page-index ">
    <main class="box">
      <div class="left-side"><!-- 左侧 -->
        <brand></brand>
        <menuComponents @getMenuActionIndex="getMenuActionIndex"></menuComponents>
      </div>
      <div class="right-side"><!-- 右侧 -->
        <div v-if="activeIndex == 0" class="tab tab-translateForm">
          <translateForm></translateForm>
        </div>
        <div v-if="activeIndex == 1" class="tab tab-collection">
          <collection></collection>
        </div>
        <div v-if="activeIndex == 2" class="tab tab-history">
          <history></history>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import brand from '@/components/brand';
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