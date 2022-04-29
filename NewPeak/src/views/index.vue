<template>
  <div id="app">
    <img class="code-url" :src=getImgUrl(this.public_number_url) />
    <componentOne :company_information="company_information"></componentOne>
    <indexGrid></indexGrid>
    <componentThree :product_cate="product_cate" :product="product"></componentThree>
    <componentFour></componentFour>
    <componentFive></componentFive>
    <componentSix></componentSix>
  </div>
</template>
<script>
import componentOne from "./indexComponents/componentOne";
import indexGrid from "./indexComponents/indexGrid";
import componentThree from "./indexComponents/componentThree";
import componentFour from "./indexComponents/componentFour";
import componentFive from "./indexComponents/componentFive";
import componentSix from "./indexComponents/componentSix";
import { firstone } from "../api/api.js";
import { BottomMessage } from "../api/api.js";
export default {
  components: {
    indexGrid,
    componentOne,
    componentThree,
    componentFour,
    componentFive,
    componentSix
  },
  data() {
    return {
      public_number_url:"",
      company_information: {},
      column_introduce: [],
      product_cate: [],
      product: [],
      news: [],
      brand_message: {},
      branch_office: [],
      seo_message: {},
      baseUrl:'http://ceshi.davost.com'
    };
  },
  watch:{
    $route: {
      handler() {
        this.BottomMessage();
      },
      deep: true,
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.getTanChuang();
  },
  methods: {
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getTanChuang() {
      let { data } = await BottomMessage();
      this.public_number_url = data.data.public_number_url;
    },
    async getData() {
      const { data } = await firstone();
      const queryData = data?.data;
      this.company_information = queryData?.company_information || {};
      this.column_introduce = queryData?.column_introduce || [];
      this.product_cate = queryData?.product_cate || [];
      this.product = queryData?.product || [];
      this.news = queryData?.news || [];
      this.brand_message = queryData?.brand_message || {};
      this.branch_office = queryData?.branch_office || [];
      this.seo_message = queryData?.seo_message || {};
    }
  }
};
</script>

<style>
.code-url{
  position: fixed;
  top: 500px;
  left: 1780px;
  width: 142px;
  height: 142px;
  background-size: 100% 100%;
  z-index: 100;
}
</style>