<template>
  <div id="app" style="minWidth:1200px">
    <router-view />
  </div>
</template>

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
