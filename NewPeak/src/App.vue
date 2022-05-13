<template>
  <div id="app" :style="this.isHidden==2?'minWidth:1200px':''" >
    <router-view />
  </div>
</template>

<script>
  export default {
    data(){
      return{
        isHidden: '',
      }
    },
    mounted() {
      if (this._isMobile()) {
        this.isHidden = 1
        this.$router.replace('/index_h5');
      } else {
        this.isHidden = 2
        // alert("pc端");
        this.$router.replace('/index');
      }
    },
    methods:{

      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      },
    }
  }
</script>
<style>
body{
  width: 100%;
  height: 100%;
   margin: 0 !important;
  padding: 0 !important;
}
/* #app{
   margin: 0 !important;
  padding: 0 !important;
}
*{
 margin: 0 !important;
  padding: 0 !important;
}
.el-header{
  height: 6.312rem !important;
}
.el-footer{
  padding: 0 !important;
}
.el-main{
  padding: 0 !important;
  margin: 0 !important;
  background: #F4F4F4 !important;
} */

.el-pagination.is-background .el-pager li:not(.disabled).active{
  color: #ffffff !important;
  background: #C8000A !important;
}
</style>
