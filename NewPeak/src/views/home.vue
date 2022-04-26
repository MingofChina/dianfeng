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

<style>
/deep/ .el-footer{
  padding: 0 !important;
}
</style>
