import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./utils/rem"
Vue.config.productionTip = false;

//进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//全局element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.directive('title', {//单个修改标题
    inserted: function (el, binding) {
        console.log(el)
      document.title = el.dataset.title
    }
})
//视频
import Video from 'video.js';
import 'video.js/dist/video-js.css';

Vue.prototype.$video = Video;


//全局axios
// import axios from 'axios'
// Vue.prototype.$http = axios;
// Vue.use(axios)

export const eventBus = new Vue();

//less
import less from 'less'
Vue.use(less)

// 全局lodash
import _ from 'lodash'
Vue.prototype._ = _


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