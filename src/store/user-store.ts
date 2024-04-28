import {defineStore} from 'pinia'
import {SysUserVO} from "@/api/auth/types.ts";
import {isEmptyReturnOldData} from "@/utils/common-utils.ts";

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('user', {
    // other options...
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            isMask: false,
            maxOrUnMaxStart: true,
            /*自增函数*/
            counter: 0,
            isChange: false,
            bgImg: '/image/skins/20240003.jpg',
            /* 用户信息 */
            userInfo: {
                isLogin: false,
                userId: '',
                userName: '未登录',
                sex: '',
                email: '',
                avatar: '@/assets/images/avatar.png',
                personalSign: '',
                status: '',
                delFlag: '',
                deptId: null,
                phoneNumber: '',
                remark: '',
                userType: '',
            } as SysUserVO,
        }


    },
    actions: {
        /*自增函数*/
        increment() {
            this.counter++
        },
        /* 设置遮罩状态 */
        changeMaskState() {
            this.isMask = !this.isMask
        },
        /* 设置用户信息 */
        setUserInfo(data: SysUserVO, isLoad: boolean = false) {
            this.userInfo.isLogin = isLoad
            this.userInfo.email = isEmptyReturnOldData(data.email, this.userInfo.email)
            this.userInfo.avatar = isEmptyReturnOldData(data.avatar, this.userInfo.avatar)
            this.userInfo.personalSign = isEmptyReturnOldData(data.personalSign, this.userInfo.personalSign)
            this.userInfo.delFlag = isEmptyReturnOldData(data.delFlag, this.userInfo.delFlag)
            this.userInfo.deptId = isEmptyReturnOldData(data.deptId, this.userInfo.deptId)
            this.userInfo.phoneNumber = isEmptyReturnOldData(data.phoneNumber, this.userInfo.phoneNumber)
            this.userInfo.remark = isEmptyReturnOldData(data.remark, this.userInfo.remark)
            this.userInfo.sex = isEmptyReturnOldData(data.sex, this.userInfo.sex)
            this.userInfo.status = isEmptyReturnOldData(data.status, this.userInfo.status)
            this.userInfo.userId = isEmptyReturnOldData(data.userId, this.userInfo.userId)
            this.userInfo.userName = isEmptyReturnOldData(data.userName, this.userInfo.userName)
            this.userInfo.userType = isEmptyReturnOldData(data.userType, this.userInfo.userType)
        },
        /* 判断是否登录，否则打开登录窗口 */
        judgeLogin() {
            if (!this.userInfo.isLogin) {
                let data = {
                    width: 600,
                    height: 520,
                    url: '/login'
                }
                window.ipcRenderer.invoke('renderer-open-win', data);
            }
        }
    },
    getters: {
        // 返回全局遮罩状态
        getIsMask: (state) => state.isMask,
        // getUserInfo
        getUserInfo: (state) => state.userInfo,
    },
    // persist: {
    //     enabled: true,
    //     strategies: [
    //         {storage: localStorage, paths: ['bgImg']},
    //     ],
    // },
})