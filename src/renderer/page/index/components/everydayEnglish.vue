<template>
  <div class="everydayEnglish-components">
     
  </div>
</template>

<script>

// eslint-disable-next-line import/no-extraneous-dependencies
import timeTool from '@/common/time';
import { ipcRenderer } from 'electron';
import { mapGetters } from 'vuex';
import indexPage from '../js/index-page';
export default {
  name: 'everydayEnglish-components',
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters([
      'setEverydayEnglish',
    ]),
  },
  methods: {
    ...indexPage,
    getData() {
      ipcRenderer.send('getEverydayEnglish', timeTool.dataFormat(new Date()).Date);
      ipcRenderer.on('setEverydayEnglish', (e, msg) => {
        this.$store.dispatch('setEverydayEnglish', msg);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../sass/history-components.scss";
</style>