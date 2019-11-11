<template>
  <div class="page-index ">
    <main class="box">
      <div class="left-side">
        <brand></brand>
        <menuComponents @getMenuActionIndex="getMenuActionIndex"></menuComponents>
        <!-- <div class="datafrom">
          数据来自 <span>百度翻译</span>
        </div> -->
      </div>
      <div class="right-side">
        <div v-if="activeIndex == 0" class="tab tab-fanyi">
          <translateForm></translateForm>
        </div>
        <div v-if="activeIndex == 1" class="tab tab-collection">
          <collectionComponents></collectionComponents>
        </div>
        <div v-if="activeIndex == 2" class="tab tab-history">
          <historyComponents></historyComponents>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import brand from '@/components/brand';
import menuComponents from '@/components/menu';
import historyComponents from './components/history';
import collectionComponents from './components/collection';
import translateForm from './components/translateForm';
export default {
  name: 'fanyi-page',
  data() {
    return {
      queryWord: '',
      activeIndex: 0,
      setTimer: null,
    };
  },
  components: {
    brand,
    translateForm,
    historyComponents,
    collectionComponents,
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