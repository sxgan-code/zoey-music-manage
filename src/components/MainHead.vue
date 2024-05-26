<script setup lang="ts">
import {useUserStore} from "@/store/user-store.ts";
import useIPC from "@/ipc/use-ipc.ts";

const userStore = useUserStore();
// 窗口控制方法
const {sendWinController} = useIPC()
</script>

<template>
  <div class="head-container">
    <div class="head-logo">
      <i class="icon myiconfont my-music-wangyiyun-logo"><span class="path1"></span><span class="path2"></span><span
          class="path3"></span></i>
      <span>管理后台</span>
    </div>
    <div class="head-person">
    
    </div>
    <div class="head-sys-click">
      <div class="head-user-avatar">
        <img src="@/assets/images/avatar.png">
      </div>
      <div class="head-user-name">
        登录成功
      </div>
      <div class="head-icon-box">
        <span class="icon-box-min" @click="sendWinController('min')">
          <i class="icon iconfont" v-tooltip="{text:'最小化'}">&#xe972</i>
        </span>
        <span class="icon-box-max" @click="sendWinController('max-unmax')">
          <i class="icon iconfont" v-if="userStore.maxOrUnMaxStart" v-tooltip="{text:'最大化'}">&#xe751</i>
          <i class="icon iconfont" v-if="!userStore.maxOrUnMaxStart" v-tooltip="{text:'最小化'}">&#xeb21</i>
        </span>
        <span class="icon-box-close" @click="sendWinController('close')">
          <i class="icon iconfont" v-tooltip="{text:'关闭'}">&#xe68d</i>
        </span>
      </div>
    
    </div>
  </div>

</template>

<style scoped lang="scss">
.head-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 7rem;
  background: var(--zoey-bg-head);
  .head-logo {
    width: 25rem;
    text-align: center;
    display: flex;
    font-family: "HarmonyOS Sans", sans-serif;
    color: var(--bg-light-rgb);
    
    i {
      line-height: 7rem;
      font-size: 5rem;
      margin: 0 2rem;
    }
    
    span {
      height: 7rem;
      line-height: 7rem;
      font-size: 3rem;
      font-weight: bold;
    }
  }
  
  .head-person {
    width: 5rem;
  }
  
  .head-sys-click {
    height: 7rem;
    display: flex;
    
    .head-user-avatar {
      display: flex;
      width: 4rem;
      height: 4rem;
      margin: 1.2rem;
      
      img {
        -webkit-app-region: no-drag;
        background: var(--bg-light-rgb);
        border-radius: 1.8rem;
        width: 3.6rem;
        height: 3.6rem;
      }
      
    }
    
    .head-user-name {
      -webkit-app-region: no-drag;
      line-height: 6rem;
      font-size: 1.4rem;
      font-family: "HarmonyOS Sans", "sans-serif";
      color: var(--bg-light-rgb);
    }
    
    .head-user-name:hover {
      cursor: pointer;
      color: var(--text-active-color);
    }
    
    .head-icon-box {
      .icon-btn-simple {
        margin-right: 2rem;
      }
      
      /*用户信息浮动框*/
      .user-info-float-box {
        display: none;
        position: absolute;
        top: 6rem;
        //left: 5rem;
        z-index: 999;
        transform: translateX(-35%);
        width: 12rem;
        border-radius: 1rem;
        background: var(--bg-light-rgb);
        padding: 2rem 0;
        
        div {
          width: 10rem;
          height: 3rem;
          margin: 1rem 1rem;
          line-height: 3rem;
          font-family: "HarmonyOS Sans", sans-serif;
          font-size: 1.4rem;
          text-align: center;
          color: var(--bg-light-rgb);
        }
        
        div:hover {
          cursor: pointer;
          color: var(--text-active-color);
        }
      }
      
      span i {
        margin: 0 1rem;
        -webkit-app-region: no-drag; // li点击元素去除拖拽，不然后面无法实现点击事件
        color: var(--bg-light-rgb);
        font-size: 1.8rem;
        line-height: 6rem;
      }
      
      .icon-box-user {
        .i-info {
          font-size: 2rem;
        }
      }
      
      .icon-box-min, .icon-box-max {
        margin-top: 0.15rem;
      }
      
      .icon-box-max i {
        font-weight: bold;
        font-size: 1.9rem;
      }
      
      .icon-box-close i {
        font-weight: bold;
        font-size: 2.2rem;
      }
      
      .icon-box-close {
        margin-right: 1rem;
      }
    }
  }
  
  div:hover {
    i:hover {
      cursor: pointer;
      color: var(--text-active-color);
    }
  }
}

</style>