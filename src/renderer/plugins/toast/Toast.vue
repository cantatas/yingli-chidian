<template>
  <transition name="toast">
    <div v-show="isShow" :class="customClass" class="plug-toast">
      <div>{{message}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'components-toast',
  props: {
    position: {
      type: String,
      default: 'middle',
    },
  },
  data() {
    return {
      message: '',
      isShow: '',
    };
  },
  computed: {
    customClass() {
      const classes = [];
      switch (this.position) {
        case 'top':
          classes.push('is-placetop');
          break;
        case 'bottom':
          classes.push('is-placebottom');
          break;
        default:
          classes.push('is-placemiddle');
      }
      classes.push(this.className);
      return classes.join(' ');
    },
  },
};
</script>

<style lang="scss">
.plug-toast{
  position: fixed;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  -webkit-transition: opacity .3s linear;
  transition: opacity .3s linear;
  font-size: 14px;
  &.is-placebottom {
      bottom: 20px;
      left: 50%;
      transform: translate(-50%, 0)
  }
  &.is-placemiddle {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
  }
  &.is-placetop {
      top: 20px;
      left: 50%;
      transform: translate(-50%, 0)
  }
}

.toast-enter, .toast-leave-active {
    opacity: 0
}
</style>