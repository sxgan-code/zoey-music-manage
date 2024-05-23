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
        redirect: '/main/content',
        children: [
            /* 左侧导航栏 */
            {
                path: 'content',
                name: 'content',
                component: () => import('@/components/MainContent.vue'),
            },
            /* 左侧导航栏 */
            {
                path: 'file/song/list',
                name: 'songFile',
                component: () => import('@/components/file/MusicSongList.vue'),
            }
        ],
    },
]
export default mainRouters

