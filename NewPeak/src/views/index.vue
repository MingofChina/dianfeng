<template>
  <div id="app">
    <componentOne :company_information="company_information"></componentOne>
    <indexGrid></indexGrid>
    <componentThree></componentThree>
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
      company_information: {},
      column_introduce: [],
      product_cate: [],
      product: [],
      news: [],
      brand_message: {},
      branch_office: [],
      seo_message: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
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
</style>