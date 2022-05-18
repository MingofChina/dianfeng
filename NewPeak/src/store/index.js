import Vue from 'vue'
import Vuex from 'vuex'
// 使用vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    num: 0,
    accoutList:[{user:1234,pass:'123456'}],
    //登录与否
    isLogin:false,
    //固定值 直接用就行
    nicheng:"一路阳光",
    zhenshixingming:"小小怪",
    shenfenzhenghao:"26451721632678123681",
    shengri:"1999-9-09",
    age:"1",


    
   

},
  //放置函数
  //使用mutatinos和actions对state中的值进行修改
  mutations: {
    changeLogin(state){
      state.isLogin = true
    },
    gaibian(state,val){
        state.accoutList[0].user=val.user;
        state.accoutList[0].pass=val.pass;
    },
   
   
  },


  //实时监听state值的变化(最新状态)
  getters: {
  
  },
  mutations: {
   
   
  },
  actions: {
    // 这边context是传入的 是上文的mutations方法, num是点击页面所传入的值
  

},
  actions: {
    checkNameandPass(context,val){
      console.log(val.user);
      // console.log(this);
      console.log(this.state.accoutList[0].user);
      if(val.user == this.state.accoutList[0].user && val.pass ==this.state.accoutList[0].pass ){
        context.commit('changeLogin')
      }
      
    },
    pas(state, sum) {
      this.state.num = sum
    }
  },
  modules: {
  },
})
