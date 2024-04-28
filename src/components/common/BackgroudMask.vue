<script setup lang="ts">
import {useUserStore} from "@/store/user-store.ts";
import {usePlayStore} from "@/store/play-store.ts";
import {onMounted, ref} from "vue";

const userStore = useUserStore();
const playStore = usePlayStore();

const img = ref()
onMounted(() => {
  var path = localStorage.getItem('bgImg');
  console.log(path)
  if (path === null) {
    userStore.bgImg = '/image/skins/20240003.jpg'
  } else {
    userStore.isChange = true
    userStore.bgImg = path
  }
})
</script>

<template>
  <div class="bg-mask">
    <img v-if="!userStore.isChange" src="@/assets/images/20240002.jpg" alt="">
    <img v-if="userStore.isChange"
         :key="userStore.bgImg"
         :src="playStore.staticBaseUrl + userStore.bgImg" alt="">
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
  
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    object-position: center;
    //background-size: cover;
    opacity: 0.94;
  }
}
</style>