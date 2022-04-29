<template>
  <div id="homes">
    <el-container>
        <el-header style="margin-bottom: 45px">
            <Header></Header>
        </el-header>
        <el-main style="padding: 0px">
            <router-view />
        </el-main>
        <el-footer>
            <Footer></Footer>
        </el-footer>
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
      
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    
  },
};
</script>

<style scoped>
/deep/ .el-footer{
  padding: 0 !important;
}
</style>
