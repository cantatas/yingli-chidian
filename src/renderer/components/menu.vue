<template>
<ul class="menu menu-components">
  <li v-for="(item,index) in menuData" :key="index" @click="action(index)" :class="{'on' : activeIndex == index}">
    <i class="icon iconfont" :class="item.icon"></i> {{item.name}}
  </li>
</ul>
</template>

<script>
export default {
  name: 'menu-components',
  data() {
    return {
      menuData: [
        { name: '翻译', icon: 'iconbusiness-translate' },
        { name: '收藏', icon: 'iconcollection' },
        { name: '历史', icon: 'iconhistory' },
      ],
      activeIndex: 0,
    };
  },
  methods: {
    action(index) {
      this.activeIndex = index;
      this.$emit('getMenuActionIndex', index);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "sass/menu.scss";
</style>