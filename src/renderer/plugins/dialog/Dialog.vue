<template>
  <transition name="tran-dialog">
    <div v-show="isShow" class="dialog">
      <div class="head">温馨提示</div>
      <div class="content">{{message}}</div>
      <div class="foot">
        <a @click="doAction('cancel')" class="cancel">取消</a>
        <a @click="doAction('ok')" class="ok">确认</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'components-dialog',
  data() {
    return {
      message: '',
      isShow: '',
      action: '',
      callback: null,
    };
  },
  methods: {
    doAction(act) {
      this.action = act;
      this.callback(act);
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss">
.dialog{
  position: fixed;
  padding: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  border:1px solid #f1f1f1;
  box-shadow: 0px 2px 6px 0px #f3f3f3;
  
  width:276px;
  min-height:184px;
  background:rgba(255,255,255,1);
  border-radius:6px;

  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  -webkit-transition: opacity .3s linear;
  transition: opacity .3s linear;
  font-size: 14px;
  .head{
    color: #666;
    font-size: 16px;
  }
  .content{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    overflow: auto;
    overflow-x: hidden;
    color: #333;
  }
  .foot{
    a{
      width:120px;
      height:40px;
      background:rgba(75,140,241,1);
      border-radius:6px;
      display: inline-block;
      line-height: 40px;
      color: #fff;
      &.cancel{
        color: #666;
        background:rgba(248,249,251,1);
      }
    }
  }
}

.tran-dialog-enter, .tran-dialog-leave-active {
    opacity: 0
}
</style>