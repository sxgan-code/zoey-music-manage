<script setup lang="ts">

import {useUserStore} from "@/store/user-store";
import msg, {PositionTypeEnum} from "@/components/message";
import router from "@/router";

const userStore = useUserStore()
</script>

<template>
  <div class="menu-block">
    <div class="my-music-title">系统</div>
    <div class="my-music-list">
      <div class="like-music" @click="router.push('/main/content')">
        <i class="icon huaweiicon icon-ic_public_home"></i> <span>主页</span>
      </div>
    </div>
  </div>
  <div class="menu-block">
    <div class="my-music-title">文件管理</div>
    <div class="my-music-list">
      <div class="like-music" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-ic_public_favor"></i> <span>歌曲文件</span>
      </div>
      <div class="local-down" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-ic_gallery_move_out"></i> <span>图片文件</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-block {
  width: 15rem;
  margin: 0 2rem;
  color: var(--text-color-rgba);
  overflow: hidden;
  
  .my-music-title {
    font-family: 'HarmonyOS Sans', sans-serif;
    font-size: 1.2rem;
    width: 14rem;
    margin: 1rem 0 0.5rem 0;
    line-height: 2rem;
  }
  
  .my-music-list {
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    
    > div {
      width: 14rem;
      margin: 0.5rem 0;
      border-radius: 0.5rem;
      
      i {
        line-height: 3rem;
        font-size: 1.8rem;
        font-weight: lighter;
        margin: 0 1rem;
      }
      
      > span {
        margin: auto 0;
      }
    }
    
    div:hover {
      background: var(--bg-light-rgba-2);
    }
    
    .selectNode {
      color: var(--text-color);
      background: var(--bg-light-rgba-1);
    }
  }
}
</style>