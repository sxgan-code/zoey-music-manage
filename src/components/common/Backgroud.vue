<script setup lang="ts">

</script>

<template>
  <div class="bg-mask">
    <!--<img src="@/assets/images/bg.png" alt="">-->
  </div>
</template>

<style scoped lang="scss">
.bg-mask {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -9;
  width: 100vw;
  height: 100vh;
  background: var(--bg-light-rgb);
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    object-position: center;
    opacity: 0.97;
  }
}
</style>