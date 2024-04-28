<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
  if (import.meta.env.VITE_APP_ENV !== "development") {
    // 仅仅开发可使用ctrl+shift+i打开DevTools
    document.addEventListener('keydown', evt => {
      if (evt.ctrlKey && evt.shiftKey && 73 === evt.keyCode) {
        evt.preventDefault();
        return false;
      }
    });
  }
})

</script>

<template>
  <div class="main-root">
    <router-view/>
  </div>
</template>

<style lang="scss">
.main-root {
  width: 100vw;
  height: 100vh;
}
</style>
