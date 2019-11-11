<template>
<div class="brand-components flex">
  <span class="hou">后</span><span class="dao">道</span><span class="ci">词</span><span class="dian">典</span>
</div>
</template>

<script>
export default {
  name: 'brand-components',
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/base.scss";
.brand-components{
  justify-content: center !important;
  align-items: center;
  height: 100px;
  span{
      padding: 3px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
  }
  .hou{
      color: #3a3de2;
      background: rgba(58, 61, 226, 0.1);
      font-size: 28px;
      transform: rotate(-10deg);
  }
  .dao{
      transform: rotate(-20deg);
      color: #d8c00c;
      background: rgba(216, 192, 12, 0.1);
  }
  .ci{
      color: #b89ae8;
      background: rgba(184, 154, 232, 0.1);
  }
  .dian{
      color: #18b4e6;
      background: rgba(62, 206, 252, 0.1);
  }
  .dian,
  .dao{
      font-size: 22px;
  }
}
</style>