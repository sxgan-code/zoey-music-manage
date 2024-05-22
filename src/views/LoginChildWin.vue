<script setup lang="ts">
import useIpc from '@/ipc/use-ipc.ts'
import {ref} from "vue";
import {verifyCheckStr, VerifyTypeEnum} from "@/utils/verify-utils.ts";
import {useUserStore} from "@/store/user-store.ts";
import {signinApi} from "@/api/auth";
import msg, {PositionTypeEnum} from "@/components/message";

const {sendChildWinController, sendChildMsgToMain} = useIpc();

var userStore = useUserStore();


const isLogin = ref(true)
const errMsg = ref<string>('')

// 表单校验
const registerData = ref({
  email: 'sxgan@foxmail.com',
  password: 'aaa123',
  rePassword: '',
  verifyCode: ''
})

/**
 * 登录
 */
const signinSys = () => {
  if (verifyFormData(VerifySignEnum.SIGNIN)) {
    // 表单所有元素验证通过，可以提交了
    
    userStore.isMask = true
    signinApi(registerData.value).then(res => {
      console.log(res)
      if (res.status != 200) {
        errMsg.value = res.message
      } else {
        sendChildMsgToMain(res.data.token)
        // console.log("跳转主页面,token: " + res.data.token)
        sendChildWinController('close')
      }
    }).catch(err => {
      msg.error('服务器端异常，请稍后再试', PositionTypeEnum.TOP, 2, () => {
        isLogin.value = true
      })
    }).finally(() => {
          userStore.isMask = false
        }
    )
    
  }
}

enum VerifySignEnum {
  SIGNIN = 'signin', SIGNUP = 'signup', OTHER = 'other',
}

/**
 * 校验表单，
 * @param sign 校验标志
 */
function verifyFormData(sign: VerifySignEnum) {
  if (!verifyCheckStr(registerData.value.email, VerifyTypeEnum.EMAIL)) {
    errMsg.value = '邮箱格式错误'
    return false
  } else if ((sign === VerifySignEnum.SIGNIN || sign === VerifySignEnum.SIGNUP)
      && !verifyCheckStr(registerData.value.password, VerifyTypeEnum.PWD)) {
    errMsg.value = '密码必须以字母开头长度6-18位，可含数字、下划线'
    return false
  } else if (sign === VerifySignEnum.SIGNUP && registerData.value.rePassword !== registerData.value.password) {
    errMsg.value = '确认密码必须和密码相同'
    return false
  } else if (sign === VerifySignEnum.SIGNUP && registerData.value.verifyCode.length == 0) {
    errMsg.value = '验证码不能为空'
    return false
  } else {
    errMsg.value = ''
    return true
  }
}

</script>

<template>
  <div class="login-root-box">
    <div class="globe-mask" v-if="userStore.isMask">
      <div class="globe-rotating-element icon-box">
        <i class="icon myiconfont my-spinner9 "><span
            class="path1"></span><span class="path2"></span><span class="path3"></span></i>
      </div>
    </div>
    <div class="head-controller-close">
      <span class="icon-box-close" @click="sendChildWinController('close')">
        <i class="icon iconfont">&#xe68d</i>
      </span>
    </div>
    <div class="select-win-box">
      <div class="login-box bg-color">登录账号</div>
    </div>
    <div v-if="isLogin" class="content-box login-content">
      <div class="box-form">
        <div>
          <input class="input-box" type="text" @input="verifyFormData(VerifySignEnum.OTHER)" name=""
                 v-model="registerData.email" id=""
                 placeholder="请输入邮箱">
        </div>
        <div>
          <input class="input-box" type="password" name="" id="" v-model="registerData.password"
                 placeholder="请输入密码">
        </div>
        <div class="error-tip"><span>{{ errMsg }}</span></div>
        <button class="but-box but-submit" @click="signinSys()">登录</button>
      </div>
    </div>
  </div>
  <!--<h1>这是子窗口</h1>-->
  <!--  <button type="button" @click="sendMsgByChildWin()">发送消息</button>-->
</template>

<style scoped lang="scss">
.login-root-box {
  width: 100vw;
  height: 100vh;
  
  .head-controller-close {
    height: 5rem;
    width: 100vw;
    background: #333;
    text-align: right;
    line-height: 5rem;
    -webkit-app-region: drag; // 整个菜单栏可拖拽
    span {
      margin-right: 2rem;
    }
    
    span i {
      font-size: 2rem;
      -webkit-app-region: no-drag; // 整个菜单栏可拖拽
      color: #fff;
    }
    
    span i:hover {
      color: #CC9C84;
    }
  }
  
  .select-win-box {
    width: 60vw;
    height: 4rem;
    background: #F4F4F4;
    margin: 5rem auto 3rem;
    border-radius: 2.5rem;
    border: 0.2rem solid #F4F4F4;
    display: flex;
    
    div {
      color: #696969;
      width: 60vw;
      height: 4rem;
      text-align: center;
      line-height: 4rem;
      font-size: 1.8rem;
      font-family: "HarmonyOS Sans Bold", sans-serif;
      border-radius: 2.5rem;
    }
    
    .bg-color {
      background: #ffffff;
      color: #000;
    }
  }
  
  .content-box {
    width: 80vw;
    height: 50vh;
    margin: 0 auto;
    text-align: center;
    
    .box-form {
      width: 80vw;
      height: 30vh;
      
      .input-box {
        width: 30rem;
        height: 3.5rem;
        margin: 0.5rem;
        font-size: 1.4rem;
        font-family: "JetBrainsMono Bold", sans-serif;
        border: 0.1rem solid #cccccc;
        border-radius: 0.5rem;
        padding-left: 1.5rem;
        color: #333;
      }
      
      input::-webkit-input-placeholder {
        /* placeholder颜色 */
        color: #cccccc;
        /* placeholder字体大小 */
        font-size: 12px
      }
      
      .but-box {
        width: 32rem;
        height: 3.5rem;
        background: #0099FF;
        border: none;
        border-radius: 0.5rem;
        color: #fff;
        font-family: "HarmonyOS Sans Bold", sans-serif;
      }
      
      .but-box-click {
        background: rgba(#0099FF, 0.7);
      }
      
      .but-box:hover {
        background: rgba(#0099FF, 0.7);
      }
      
      .input-verify {
        width: 12rem;
      }
      
      .but-verify {
        width: 14rem;
        margin-right: 4rem;
      }
      
      .error-tip {
        height: 3rem;
        width: 31.5rem;
        line-height: 3rem;
        font-family: "HarmonyOS Sans Bold", sans-serif;
        font-size: 1.2rem;
        color: red;
        text-align: left;
        margin: 0 auto;
      }
    }
  }
}
</style>