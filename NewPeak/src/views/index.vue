<template>
  <div id="app">
    <img class="code-bk" v-if="flag"/>
    <img class="shut-down" v-if="flag"
         src="../../src/assets/img/icon_shut down@2x.png"
      v-on:click="closeBk()"
    />
    <img class="index-phone"
         src="../../src/assets/bei/icon_the phone@2x.png"
         v-if="flag"/>
    <div class="phone-text" v-if="flag">联系电话</div>
    <div class="phone-number1" v-if="flag">{{free_phone}}</div>
    <div class="phone-number2" v-if="flag">{{company_phone}}</div>
    <img class="code-url" v-if="flag" :src=getImgUrl(this.public_number_url) />
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
      flag: true,
      free_phone: "",
      company_phone: "",
      public_number_url: "",
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
    closeBk(){
      this.flag = false;
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getTanChuang() {
      let { data } = await BottomMessage();
      this.public_number_url = data.data.public_number_url;
      this.free_phone = data.data.free_phone;
      this.company_phone = data.data.company_phone;
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
  top: 740px;
  right: 100px;
  width: 142px;
  height: 142px;
  background-size: 100% 100%;
  z-index: 100;
}
.code-bk{
  position: fixed;
  top: 400px;
  right: 0px;
  background-image: url("../../src/assets/bei/fixed.png");
  width: 340px;
  height: 530px;
  background-size: 100% 100%;
  z-index: 90;
}
.shut-down{
  position: fixed;
  top: 436px;
  right: 31px;
  background-image: url("../../src/assets/img/icon_shut down@2x.png");
  width: 32px;
  height: 32px;
  background-size: 100% 100%;
  z-index: 100;
}
.index-phone{
  position: fixed;
  top: 530px;
  right: 270px;
  background-image: url("../../src/assets/bei/icon_the phone@2x.png");
  width: 24px;
  height: 24px;
  background-size: 100% 100%;
  z-index: 100;
}
.phone-text{
  position: fixed;
  top: 530px;
  right: 155px;
  height: 28px;
  font-size: 26px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 28px;
  z-index: 100;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.phone-number1{
  position: fixed;
  top: 600px;
  right: 111px;
  /*width: 103px;*/
  height: 28px;
  font-size: 26px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 28px;
  z-index: 100;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.phone-number2{
  position: fixed;
  top: 650px;
  right: 115px;
  /*width: 111px;*/
  height: 28px;
  font-size: 26px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 28px;
  z-index: 100;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
</style>