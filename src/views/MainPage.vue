<script setup lang="ts">

import {useUserStore} from "@/store/user-store.ts";
import MainLeftMenu from "@/components/MainLeftMenu.vue";
import MainHead from "@/components/MainHead.vue";
import {useRoute} from "vue-router";
import MaskBox from "@/components/common/MaskBox.vue";

var userStore = useUserStore();
const route = useRoute()
</script>

<template>
  <div class="main-box-root">
    <mask-box :is-mask="userStore.isMask"/>
    <backgroud/>
    <div class="head-box">
      <main-head/>
    </div>
    <div class="content-box">
      <div class="left-menu">
        <main-left-menu/>
      </div>
      <div class="right-box">
        <div class="right-box-content">
          <router-view :key="route.fullPath"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-box-root {
  width: 100vw;
  height: 100vh;
  
  .head-box {
    height: 7rem;
    width: 100vw;
    -webkit-app-region: drag; // 整个菜单栏可拖拽
  }
  
  .content-box {
    width: 100vw;
    height: calc(100vh - 7rem);
    display: flex;
    
    .left-menu {
      width: 20rem;
      height: 100%;
      overflow-y: auto;
      background: var(--zoey-bg-menu);
    }
    
    .right-box {
      width: calc(100vw - 20rem);
      height: 100%;
      background: rgba(#000, 0.08);
      
      .right-box-content {
        width: calc(100vw - 20rem);
        height: calc(100vh - 7rem);
      }
    }
  }
}

</style>