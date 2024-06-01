<script setup lang="ts">
const props = defineProps({
  isMask: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="globe-mask" v-if="isMask">
    <div class="rotating-element icon-box">
      <i class="icon myiconfont my-spinner9 "><span
          class="path1"></span><span class="path2"></span><span class="path3"></span></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rotating-element {
  animation: rotate 1s linear infinite; /* 这里的infinite表示无限次重复播放动画 */
}

/*全局遮罩*/
.globe-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 999;
  background: rgba(#000, 0.3);
  
  .icon-box {
    width: 10rem;
    height: 10rem;
    position: absolute;
    top: calc(50% - 5rem);
    left: calc(50% - 5rem);
    background-image: linear-gradient(43deg, rgba(#4158D0, 0.5) 0%, rgba(#C850C0, 0.4) 46%, rgba(#FFCC70, 0.9) 100%); /*设置渐变的方向从左到右 颜色从ff0000到ffff00*/
    background-clip: text; /*将设置的背景颜色限制在文字中*/
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; /*给文字设置成透明*/
    i {
      font-size: 10rem;
      color: #f89898;
    }
  }
}

</style>