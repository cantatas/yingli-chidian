<template>
  <div class="plug-toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'components-toast',
  data() {
    return {
      message: '',
    };
  },
  components: {
  },
  methods: {
  },
};
</script>

<style lang="scss">
.plug-toast{
  position :fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  z-index: 999;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
}
</style>