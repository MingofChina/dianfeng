import axios from 'axios'
// import { getToken } from '@/utils/auth'
// import errorCode from '@/utils/errorCode'
// import { tansParams } from "@/utils/ruoyi";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.get['Cache-Control'] = 'no-cache'

axios.defaults.headers.get['Pragma'] = 'no-cache'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 50000
})

// // request拦截器
// service.interceptors.request.use(config => {
//   // 是否需要设置 token
//   const isToken = (config.headers || {}).isToken === false
//   if (getToken() && !isToken) {
    
//     config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//   }else{
//     config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
//   }
//   // get请求映射params参数
//   if (config.method === 'get' && config.params) {
//     let url = config.url + '?';
//     for (const propName of Object.keys(config.params)) {
//       const value = config.params[propName];
//       var part = encodeURIComponent(propName) + "=";
//       if (value !== null && typeof(value) !== "undefined") {
//         if (typeof value === 'object') {
//           for (const key of Object.keys(value)) {
//             let params = propName + '[' + key + ']';
//             var subPart = encodeURIComponent(params) + "=";
//             url += subPart + encodeURIComponent(value[key]) + "&";
//           }
//         } else {
//           url += part + encodeURIComponent(value) + "&";
//         }
//       }
//     }
//     url = url.slice(0, -1);
//     config.params = {};
//     config.url = url;
//   }
//   store.commit('SET_DELAGLOADING',true)
//   return config
// }, error => {
  
//   store.commit('SET_DELAGLOADING',false)
//     Promise.reject(error)
// })

// // 响应拦截器
// service.interceptors.response.use(res => {
//   //  this.dolagLoading  = true
//     // 未设置状态码则默认成功状态
//     store.commit('SET_DELAGLOADING',false)
//     const code = res.data.code || 200||101;
//     // 获取错误信息
//     const msg = errorCode[code] || res.data.msg || errorCode['default']
//     if (code === 401) {
//       MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }
//       ).then(() => {
//         store.dispatch('LogOut').then(() => {
//           location.href = '/index';
//         })
//       })
//     } else if (code === 500) {
//       Message({
//         message: msg,
//         type: 'error',
//         showClose: true
//       })
//       return Promise.reject(new Error(msg))
//     }else if (code==101){
//       return res.data
//     } else if (code==600){
//       Message({
//         message: msg,
//         type: 'error',
//         showClose: true
//       })
//       return Promise.reject(res.data)
//     } else if (code==700){
//       Message({
//         message: msg,
//         type: 'error',
//         showClose: true
//       })
//       return Promise.reject(res.data)
//     } else if (code !== 200) {
      
//       Message({
//         message: msg,
//         type: 'error',
//         showClose: true
//       })
//       return Promise.reject('error')
//     } else {
//       return res.data
//     }
//   },
//   error => {
//     store.commit('SET_DELAGLOADING',false)
//     let { message } = error;
//     if (message == "Network Error") {
//       message = "系统异常，请稍后再试";
//     }
//     else if (message.includes("timeout")) {
//       message = "系统异常，请稍后再试";
//     }
//     else if (message.includes("Request failed with status code")) {
//       message = "系统异常，请稍后再试";
//     }
//     Message({
//       message: message,
//       type: 'error',
//       duration: 5 * 1000,
//       showClose: true
//     })

//     return Promise.reject(error)
//   }
// )

// // 通用下载方法
// export function download(url, params, filename) {
//   return service.post(url, params, {
//     transformRequest: [(params) => {
//       return tansParams(params)
//     }],
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     responseType: 'blob'
//   }).then((data) => {
//     const content = data
//     let blob = new Blob([content], {type: "application/xlsx"})
//     if ('download' in document.createElement('a')) {
//       const elink = document.createElement('a')
//       elink.download = filename
//       elink.style.display = 'none'
//       elink.href = URL.createObjectURL(blob); 
//       document.body.appendChild(elink);
//       elink.click();
//       document.body.removeChild(elink);
//     } else {
//       navigator.msSaveBlob(blob, filename)
//     }
//   })
// }

export default service
