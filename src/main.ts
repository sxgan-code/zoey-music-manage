import {createApp} from 'vue'
import App from '@/App.vue'
import router from "@/router/index.ts"
import '@/assets/css/common.scss'
import "@/assets/css/media.scss"
import '@/components/message/style.scss'
import {createPinia} from 'pinia'
import '@/ipc/ipc.ts'
//pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//注册移入小浮框提示
import tooltip from '@/components/tips/tooltip.ts'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
const app = createApp(App);
app.use(router)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(tooltip)
app.mount('#app')
    .$nextTick(() => {
        postMessage({payload: 'removeLoading'}, '*')
    })
