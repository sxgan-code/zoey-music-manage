import {RouteRecordRaw} from "vue-router";


const mainRouters: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        redirect: '/signin',
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => import("@/views/LoginChildWin.vue"),
    },

    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/MainPage.vue'),
        redirect: '/main/recommend',
        children: [
            /* 左侧导航栏 */
        ],
    },
]
export default mainRouters

