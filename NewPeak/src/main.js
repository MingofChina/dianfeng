import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./utils/rem"
import Meta from 'vue-meta'
Vue.config.productionTip = false;

//进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//全局element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Meta)
Vue.use(ElementUI);

Vue.directive('title', { //单个修改标题
        inserted: function(el, binding) {
            console.log(el)
            document.title = el.dataset.title
        }
    })
    //视频
import Video from 'video.js';
import 'video.js/dist/video-js.css';

Vue.prototype.$video = Video;


export const eventBus = new Vue();

//less
import less from 'less'
Vue.use(less)

// 全局lodash
import _ from 'lodash'
Vue.prototype._ = _
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
    key: '35df7fe10d67c109d06d13c4a5861cdc', // 个人
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    v: '1.4.4'
})


// 路由进入前(进度条)
router.beforeEach((to, from, next) => {
    nprogress.start() // 每次切换页面调用滚动条
    next()
})
router.afterEach(() => {
        nprogress.done() // 路由进入后关闭进度条
    })
    //
new Vue({
    router,
    store,
    nprogress,
    render: h => h(App)
}).$mount('#app')