<template>
  <div id="homes">
    <el-container>
      <el-header style="height:6.22rem"
                 v-show="this.isHidden==1?false:true">
        <Header></Header>
      </el-header>
      <el-header style="height:5.22rem;"
                 v-show="this.isHidden==2?false:true">

        <Head></Head>
      </el-header>
      <el-main style="padding:0">
        <router-view />
      </el-main>
      <el-footer style="padding:0"
                 v-show="this.isHidden==1?false:true">
        <Footer></Footer>
      </el-footer>
      <el-footer style="padding:0"
                 v-show="this.isHidden==2?false:true">
        <Foot></Foot>
      </el-footer>
      <div class="top1"
           @click="topFn"
           v-if="iShow">
        <img src="../assets/bei/Group 465@2x.png" />
      </div>
    </el-container>
  </div>
</template>
<script>
import Head from '../components/topNavOne'
import Header from "../components/topNav.vue";
import Footer from "../components/footernav.vue";
import Foot from "../components/footerNavTwo"

export default {
  components: {
    Header,
    Footer,
    Head,
    Foot
  },
  data () {
    return {
      iShow: false,
      isHidden: '',
      showMain: '',
    };
  },
  computed: {
  },
  mounted () {
    window.addEventListener("scroll", this.windowScroll, true);
    if (this._isMobile()) {
      this.isHidden = 1
      console.log(this._isMobile(), 'iii')
      // alert("手机端");
      this.$router.replace('/index_h5');
    } else {
      this.isHidden = 2
      // alert("pc端");
      this.$router.replace('/index');
    }

  },
  methods: {
    topFn () {
      if (this.isHidden == 2) {
        console.log('pc');
        document.documentElement.scrollTop = 0
      } else if (this.isHidden == 1) {
        console.log('移动');
        let top = document.documentElement.scrollTop || document.body.scrollTop
        // 实现滚动效果
        const timeTop = setInterval(() => {
          document.body.scrollTop = document.documentElement.scrollTop = top -= 50
          if (top <= 0) {
            clearInterval(timeTop)
          }
        }, 10)
      }
    },

    _isMobile () {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    windowScroll (e) {
      e.stopPropagation()
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > 800) {
        this.iShow = true
      } else {
        this.iShow = false
      }
    },
  },
};
</script>

<style scoped>
/deep/ .el-footer {
  padding: 0 !important;
}
.top1 {
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  z-index: 99999;
}
.top1 img {
  width: 100%;
  height: 100%;
}
</style>
