<template>
  <div id="homes">
    <el-container>
        <el-header style="height:6.22rem">
            <Header></Header>
        </el-header>
        <el-main style="padding:0">
            <router-view />
        </el-main>
        <el-footer style="padding:0">
            <Footer></Footer>
        </el-footer>
        <div class="top1" @click="topFn" v-if="iShow">
          <img src="../assets/bei/Group 465@2x.png"/>
        </div>
    </el-container>

  </div>
</template>
<script>
import Header from "../components/topNav.vue";
import Footer from "../components/footernav.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      iShow:false
    };
  },
  computed: {
  },
  mounted() {
    window.addEventListener("scroll", this.windowScroll, true);
  },
  methods: {
    topFn(){
      document.documentElement.scrollTop = 0
    },
    windowScroll(e) {  
       e.stopPropagation()
       let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

        if(scrollTop>800){
          this.iShow=true
        }else{
          this.iShow=false
        }
    },
  },
};
</script>

<style scoped>
/deep/ .el-footer{
  padding: 0 !important;
}
.top1{
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  z-index: 99999;
}
.top1 img{
  width: 100%;
  height: 100%;
}
</style>
