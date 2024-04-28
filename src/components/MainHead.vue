<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import useIPC from "@/ipc/use-ipc.ts";
import {useUserStore} from "@/store/user-store.ts";
import msg, {PositionTypeEnum} from "@/components/message";
import {getUserInfoApi} from "@/api/auth";
import router from "@/router";
import {usePlayStore} from "@/store/play-store.ts";

// 窗口控制方法
const {sendWinController} = useIPC()
/**
 * @Description: 打开系统窗口
 * @Author: sxgan
 * @Date: 2024/4/13 23:35
 **/
const openChildWin = (path: string) => {
  let data = {
    width: 600,
    height: 520,
    url: path
  }
  window.ipcRenderer.invoke('renderer-open-win', data);
}

/**
 * @Description: 换肤
 * @Author: sxgan
 * @Date: 2024/4/13 23:34
 **/
const changeSkins = () => {
  router.push('/main/skins')
  // document.documentElement.style.setProperty('--text-color', 'rgb(246, 190, 200)');
  // document.documentElement.style.setProperty('--text-color-rgba', 'rgba(246, 190, 200,0.7)');
  // document.documentElement.style.setProperty('--text-active-color', 'rgb(232, 211, 252)');
}

/**
 * @Description: 账户相关
 * @Author: sxgan
 * @Date: 2024/4/13 23:32
 **/
const userStore = useUserStore();
// 自动登录配置参数
const autoLogin = () => {
  /* 每次启动判断是否登录 */
  msg.warning('正在登录中。。。。', PositionTypeEnum.TOP, 2, () => {
    getUserInfoApi().then(res => {
      if (res.status === 200) {
        userStore.setUserInfo(res.data, true)
        msg.success('登录成功')
      } else {
        router.push('/main/recommend')
        msg.warning('账户登录已过期，请重新登录。。。', PositionTypeEnum.TOP, 2, () => {
          openChildWin('/login')
        })
      }
    }).catch(err => {
      msg.error('服务器端异常，请稍后再试', PositionTypeEnum.TOP, 2, () => {
      })
    });
  })
}
// 每次启动调用
onMounted(() => {
  // 如果检测未登录，则自动登录
  if (!userStore.userInfo.isLogin) {
    autoLogin()
  }
  // 手动登录触发
  window.ipcRenderer.on('user-token', (_event, args) => {
    localStorage.setItem("token", args)
    getUserInfoApi().then(res => {
      if (res.status === 200) {
        userStore.setUserInfo(res.data, true)
        msg.success('登录成功')
      }
    })
  })
})
// 退出当前账号
const playStore = usePlayStore()
const exitCurrentAccount = () => {
  if (!userStore.userInfo.isLogin) {
    msg.warning('账号未登录', PositionTypeEnum.TOP)
    return
  } else {
    userStore.userInfo.isLogin = false
    playStore.songPlayingInfo.isPlay = false
    localStorage.removeItem('token')
    router.push('/main/recommend')
    msg.success('账号退出成功')
  }
}
// 打开用户信息页面
const openPage = (path: string) => {
  userStore.judgeLogin()
  router.push('/main/' + path)
}
/**
 * @Description:用户信息浮动框
 * @Author: sxgan
 * @Date: 2024/4/13 23:31
 **/
const userInfoBox = ref()
const openUserInfoBox = (event: any) => {
  userInfoBox.value.style.display = 'block'
}

// 点击事件，用于隐藏div
function hideBox(event: any) {
  // 检查事件是否来自i-user-info和div-user-info元素,且userInfoBox.value不为空
  if (event.target.id !== 'i-user-info' && event.target.id !== 'div-user-info' && userInfoBox.value != null) {
    userInfoBox.value.style.display = 'none';
  }
}

// 绑定到window，确保即使点击框内也能监听外部点击
document.body.addEventListener('click', hideBox);
// 在onUnmounted生命周期钩子中移除事件监听，避免内存泄露
onUnmounted(() => {
  window.removeEventListener('click', hideBox);
});


</script>

<template>
  <div class="head-container">
    <div class="head-logo">
      <!--<i class="icon myiconfont my-music-qqmusic-logo" style="background:lightblue;">-->
      <!--  <span class="path1"></span>-->
      <!--  &lt;!&ndash;<span class="path2"></span>&ndash;&gt;-->
      <!--  &lt;!&ndash;<span class="path3"></span>&ndash;&gt;-->
      <!--</i>-->
      <i class="icon myiconfont my-music-wangyiyun-logo"><span class="path1"></span><span class="path2"></span><span
          class="path3"></span></i>
      <span>ZOEY音乐</span>
    </div>
    <div class="head-person">
    
    </div>
    <div class="head-sys-click">
      <div class="head-user-avatar">
        <img @click="openChildWin('/login')"
             v-tooltip="{text:'请登录'}"
             v-if="!userStore.userInfo.isLogin"
             src="@/assets/images/not_login.png">
        <img v-if="userStore.userInfo.isLogin"
             src="@/assets/images/avatar.png">
      </div>
      <div v-if="userStore.userInfo.isLogin" @click="router.push('/main/user-info')" class="head-user-name">
        {{ userStore.getUserInfo.userName }}
      </div>
      <div class="head-icon-box">
        <span class="icon-box-btn icon-box-user">
          <i id="i-user-info" class="icon iconfont i-info"
             @click="openUserInfoBox($event)"
             v-tooltip="{text:'用户信息'}">&#xe705</i>
        </span>
        <div id="div-user-info" ref="userInfoBox" class="user-info-float-box">
          <div @click="msg.warning('开发中。。。',PositionTypeEnum.TOP)">我的歌单</div>
          <div @click="msg.warning('开发中。。。',PositionTypeEnum.TOP)">我的关注</div>
          <div @click="msg.warning('开发中。。。',PositionTypeEnum.TOP)">我的粉丝</div>
          <div @click="openPage('user-info')">个人账号</div>
          <div @click="exitCurrentAccount()">退出账号</div>
        </div>
        <span class="icon-box-btn icon-btn-skins">
          <i class="icon myiconfont my-yelp"
             @click="changeSkins()"
             v-tooltip="{text:'换肤'}">
            <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </i>
        </span>
        <span class="icon-box-btn icon-btn-options">
          <i class="icon myiconfont my-cog"
             @click="router.push('/main/settings')"
             v-tooltip="{text:'主菜单'}">
            <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </i>
        </span>
        <span class="icon-box-btn icon-btn-simple">
          <i class="icon myiconfont my-new-tab"
             @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"
             v-tooltip="{text:'开启精简模式'}">
            <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </i>
        </span>
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
  
  .head-logo {
    width: 25rem;
    text-align: center;
    display: flex;
    font-family: "HarmonyOS Sans", sans-serif;
    color: var(--text-color);
    
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
    height: 8rem;
    display: flex;
    
    .head-user-avatar {
      display: flex;
      width: 4rem;
      height: 4rem;
      margin: 1.2rem;
      
      img {
        -webkit-app-region: no-drag;
        background: var(--el-color-white);
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
      color: var(--text-color);
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
        background: var(--text-deep-rgba-9);
        padding: 2rem 0;
        
        div {
          width: 10rem;
          height: 3rem;
          margin: 1rem 1rem;
          line-height: 3rem;
          font-family: "HarmonyOS Sans", sans-serif;
          font-size: 1.4rem;
          text-align: center;
          color: var(--text-color);
        }
        
        div:hover {
          cursor: pointer;
          color: var(--text-active-color);
        }
      }
      
      span i {
        margin: 0 1rem;
        -webkit-app-region: no-drag; // li点击元素去除拖拽，不然后面无法实现点击事件
        color: var(--text-color);
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