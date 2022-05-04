<template>
  <!-- 合作伙伴 -->
  <div class="cooperative-partner">
    <div class="partner-top-wrapper">
      <div class="partner-top-wrapper-title">
        <div class="partner-top-title">合作伙伴</div>
        <div class="partner-title-translate">PARTNERS</div>
        <div class="partner-top-title-item"></div>
      </div>
      <ul class="partner-current-place">
        <li class="partner-current-first-item"></li>
        <li class="partner-current-second-item"></li>
        <li>走进巅峰</li>
        <li class="partner-current-third-item"></li>
        <li class="partner-current-place-child">合作伙伴</li>
      </ul>
    </div>
    <div v-if="showClient" class="partner-main-info-wrapper">
      <div class="partner-main-title">客户名录</div>
      <div class="partner-main-titletrans">CLIENT LIST</div>
      <div class="partner-main-info-nav">
        <div
          :class="[item.title==='政府机构' || item.title==='知名景区' ? 'partner-nav-middle-item-hl':'partner-nav-middle-item']"
          v-for="(item) in customer_list"
          :key="item.id"
        >{{ item.title }}</div>
      </div>
      <div class="partner-display-part">
        <img
          class="partner-display-client"
          v-for="(item, index) in customer_list[0].child"
          :key="index"
          :src=getImgUrl(item.original_image)
          @click="toLinkFun(item.linkurl)"
        />
      </div>
    </div>
    <div v-if="showClient" class="partner-main-info-wrapper">
      <div class="partner-main-title">合作伙伴</div>
      <div class="partner-main-titletrans">PARTNERS</div>
      <div class="partner-display-part">
        <img
          class="partner-display-partner"
          v-for="(item, index) in cooperative_partner"
          :key="index"
          :src=getImgUrl(item.original_image)
          @click="toLinkFun(item.linkurl)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { cooperation } from "@/api/api";
export default {
  data() {
    return {
      showClient: true,
      showPartner: true,
      customer_list: [],
      cooperative_partner: [],
      baseUrl:'http://ceshi.davost.com',
    };
  },
  watch:{
    $route: {
      handler() {
        this.cooperation();
      },
      deep: true,
    }
  },
  created() {},
  mounted() {
    this.getCooper();
  },
  methods: {
    toLinkFun(toUrl){
      location.href = toUrl;
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getCooper() {
      let { data } = await cooperation();
      this.customer_list = data.data.customer_list;
      this.cooperative_partner = data.data.cooperative_partner;
    },
  }
};
</script>

<style scoped>
.cooperative-partner {
  /*width: 1920px;*/
  width: 100%;
}
.partner-top-wrapper {
  /*widows: 1920px;*/
  height: 700px;
  background-image: url("../../assets/img/Group 506.png");
  background-size: 100% 100%;
  width: 100%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.partner-top-wrapper-title {
  height: 126px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.partner-top-title {
  width: 295px;
  height: 62px;
  font-size: 60px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  line-height: 100%;
  letter-spacing: 13px;
}
.partner-title-translate {
  width: 124px;
  height: 32px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 300;
  color: #ffffff;
  line-height: 32px;
  letter-spacing: 2px;
  margin-bottom: 2px;
}
.partner-top-title-item {
  width: 80px;
  height: 4px;
  background: #ffffff;
}
/* 左下角底部的显示 */
.partner-current-place {
  width: 232px;
  height: 25px;
  list-style: none;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 236px;
  bottom: 30px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  /* line-height: 19px; */
}
.partner-current-first-item {
  height: 30px;
  width: 30px;
  background-image: url("../../assets/img/路径84.png");
  background-size: 90% 93%;
  background-color: transparent;
}
.partner-current-second-item,
.current-third-item {
  height: 20px;
  background-image: url("../../assets/img/路径83.png");
  background-position: 0px 1px;
  background-size: 100% 100%;
  background-color: transparent;
  width: 16px;
  height: 16px;
  border: 0px;
  line-height: 25px;
}
.partner-current-place-child {
  color: #ffffff;
}

.partner-main-info-wrapper {
  width: 1920px;
  width: 100%;
}
.partner-main-title {
  padding-top: 60px;
  padding-left: 236px;
  /*width: 176px;*/
  height: 66px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
}
.partner-main-titletrans {
  padding-top: 8px;
  padding-left: 236px;
  width: 120px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  margin: 0px;
  margin-bottom: 40px;
}
.partner-main-info-nav {
  list-style: none;
  /*width: 1920px;*/
  display: flex;
  align-items: center;
  align-content: space-between;
  /*padding-left: 236px;*/
  margin-bottom: 30px;
  margin-left: 236px;
}
.partner-main-info-nav div {
  width: 170px;
  height: 54px;
  border: 1px solid #cacaca;
  text-align: center;
  line-height: 54px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;

}

.partner-nav-middle-item {
  margin-right: 40px;
  color: #231914;
}
.partner-nav-middle-item:hover{
  margin-right: 40px;
  background-color: #C8000A;
  color: #FFFFFF;
}
.partner-nav-middle-item-hl{
  margin-right: 40px;
  background-color: #C8000A;
  color: #FFFFFF;
}
.partner-display-part {
  margin-left: 236px;
  width: 1484px;
  display: flex;
  flex-wrap: wrap;
}
.partner-display-client {
  width: 178px;
  height: 130px;
  margin-right: 34px;
  margin-bottom: 12px;
  box-sizing: border-box;
}
.partner-display-partner {
  width: 178px;
  height: 82px;
  margin-right: 34px;
  margin-bottom: 12px;
  box-sizing: border-box;
}
</style>