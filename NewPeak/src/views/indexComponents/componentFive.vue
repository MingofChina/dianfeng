<template>
  <div id="app">
    <div class="five-background">
      <div class="first-row">
        <div class="chuangli">创立</div>
        <div class="content1">{{brand_message.found_years}}</div>
        <div class="suffix1">年</div>
        <div class="desc1">文旅行业实践者</div>
        <img class="img1"/>

      </div>
      <div class="divide-line1"></div>

      <div class="second-row">
        <div class="wanchengxiangmu">完成项目</div>
        <div class="content2">{{brand_message.finish_projects}}</div>
        <div class="suffix2">+</div>
        <div class="desc2">美丽中国价值经典</div>
        <img class="img2"/>
      </div>

      <div class="divide-line2"></div>

      <div class="third-row">
        <div class="yunyingjingqu">运营景区</div>
        <div class="content3">{{brand_message.scenic_spot_num}}</div>
        <div class="suffix3">+</div>
        <div class="desc3">专业运营旅游景区</div>
        <img class="img3"/>
      </div>

      <div class="divide-line3"></div>

      <div class="forth-row">
        <div class="ronghuojiangxiang">荣获奖项</div>
        <div class="content4">{{brand_message.prize_num}}</div>
        <div class="suffix4">+</div>
        <div class="desc4">国内外奖项获得者</div>
        <img class="img4"/>
      </div>

      <div class="divide-line4"></div>

      <div class="fifth-row">
        <div class="gugan">骨干员工近</div>
        <div class="content5">{{brand_message.member_num}}</div>
        <div class="desc5">业界骨干创意精英</div>
        <img class="img5"/>
      </div>

      <div class="divide-line5"></div>
    </div>

    <router-view />
  </div>
</template>
<script>
import { firstone } from "@/api/api";
export default {
  data() {
    return {
      "brand_message" : {}
    };
  },
  watch:{
    $route: {
      handler() {
        this.firstone();
      },
      deep: true,
    }
  },
  mounted() {
    this.getBrandMessage();
  },
  methods: {
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getBrandMessage() {
      let { data } = await firstone();
      console.log("获取数据"+data);
      this.brand_message= data.data.brand_message;
    },
  }
};
</script>
<style scoped="scoped">
html,body{
  width: 100%;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
.divide-line1 {
  position: relative;
  top: 228px;
  left: 1145px;
  width: 534px;
  height: 1px;
  background: #C4C4C4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.divide-line2{
  position: relative;
  top: 383px;
  left: 1145px;
  width: 534px;
  height: 1px;
  background: #C4C4C4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.divide-line3{
  position: relative;
  top: 538px;
  left: 1145px;
  width: 534px;
  height: 1px;
  background: #C4C4C4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.divide-line4{
  position: relative;
  top: 693px;
  left: 1145px;
  width: 534px;
  height: 1px;
  background: #C4C4C4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.divide-line5{
  position: relative;
  top: 850px;
  left: 1145px;
  width: 534px;
  height: 1px;
  background: #C4C4C4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.five-background{
  position: relative;
  background-image: url("../../assets/bei/beijing(1).png");
  width: 1920px;
  height: 1080px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
}
.chuangli{
  position: absolute;
  top: 134px;
  right: 647px;
  width: 40px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 23px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.content1{
  position: absolute;
  top: 110px;
  left: 1285px;
  width: 57px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 56px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix1{
  position: absolute;
  top: 137px;
  left: 1346px;
  width: 24px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 28px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc1{
  position: absolute;
  top: 184px;
  left: 1161px;
  width: 120px;
  height: 64px;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 19px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.img1{
  position: absolute;
  top: 124px;
  left: 1615px;
  width: 64px;
  height: 64px;
  opacity: 1;
  background: url("../../assets/bei/icon_chuangli.png");
  background-size: 100% 100%;
}
.wanchengxiangmu{
  position: absolute;
  top: 289px;
  right: 647px;

  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 23px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.content2{
  position: absolute;
  top: 265px;
  left: 1285px;
  width: 114px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix2{
  position: absolute;
  top: 285px;
  left: 1403px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 35px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc2{
  position: absolute;
  top: 339px;
  left: 1145px;
  width: 128px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.img2{
  position: absolute;
  top: 279px;
  left: 1615px;
  width: 64px;
  height: 64px;
  opacity: 1;
  background: url("../../assets/bei/icon_wancheng.png");
  background-size: 100% 100%;
}
.yunyingjingqu{
  position: absolute;
  top: 444px;
  right: 647px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 23px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.content3{
  position: absolute;
  top: 420px;
  left: 1285px;
  width: 85px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix3{
  position: absolute;
  top: 440px;
  left: 1374px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc3{
  position: absolute;
  top: 494px;
  left: 1145px;
  width: 128px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.img3{
  position: absolute;
  top: 434px;
  left: 1615px;
  width: 64px;
  height: 64px;
  opacity: 1;
  background: url("../../assets/bei/icon_yunying.png");
  background-size: 100% 100%;
}
.ronghuojiangxiang{
  position: absolute;
  top: 599px;
  right: 647px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 23px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.content4{
  position: absolute;
  top: 575px;
  left: 1285px;
  width: 85px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix4{
  position: absolute;
  top: 595px;
  left: 1374px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc4{
  position: absolute;
  top: 649px;
  left: 1145px;
  width: 128px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.img4{
  position: absolute;
  top: 589px;
  left: 1615px;
  width: 64px;
  height: 64px;
  opacity: 1;
  background: url("../../assets/bei/icon_rongyu.png");
  background-size: 100% 100%;
}
.gugan{
  position: absolute;
  top: 754px;
  right: 647px;
  width: 100px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 23px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.content5{
  position: absolute;
  top: 732px;
  left: 1285px;
  width: 114px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc5{
  position: absolute;
  top: 804px;
  left: 1145px;
  width: 128px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}

.img5{
  position: absolute;
  top: 744px;
  left: 1615px;
  width: 64px;
  height: 64px;
  opacity: 1;
  background: url("../../assets/bei/icon_yuangong.png");
  background-size: 100% 100%;
}
</style>