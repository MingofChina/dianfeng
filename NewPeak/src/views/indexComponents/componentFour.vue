<template>
  <div id="app">
    <div class="four-background">
      <div class="four-title">
      <div class="four-title-left">
        NEWS /
      </div>
      <div class="four-title-right">
        巅峰要闻
      </div>
      <div class="four-title-nav-left">
        巅峰新闻
      </div>
      <div class="four-title-nav-right">
        媒体新闻
      </div>
      </div>
      <div class="four-trends">
        <div class="four-trends-title">
          最新动态
        </div>
        <div class="four-trends-time">
          2022.02.22
        </div>
      </div>
      <div class="four-news-title">
        江西麻姑山景区旅游策划暨景区总江西麻姑山景区
      </div>
      <div class="four-watch-link-top">
        查看详情
      </div>
      <div class="four-news-images">
        <div class="four-news-image1">
          <div class="four-news-day1">
            22
          </div>
          <div class="four-news-year-month1">
            2022.02
          </div>
          <div class="four-news-title1">
            江西麻姑山景区旅游策划暨景区总江西麻姑山景区
          </div>
          <div class="four-news-content1">
            麻姑山景区位于江西省抚州市南城县，距离南城县城4km，约10分钟车程，距离抚州市70km...
          </div>
          <div class="four-news-link1">
            查看详情
          </div>
        </div>
        <div class="four-news-image2">
          <div class="four-news-day2">
            25
          </div>
          <div class="four-news-year-month2">
            2022.02
          </div>
          <div class="four-news-title2">
            江西麻姑山景区旅游策划暨景区总江西麻姑山景区
          </div>
          <div class="four-news-content2">
            麻姑山景区位于江西省抚州市南城县，距离南城县城4km，约10分钟车程，距离抚州市70km...
          </div>
          <div class="four-news-link2">
            查看详情
          </div>
        </div>
        <div class="four-news-image3">
          <div class="four-news-day3">
            22
          </div>
          <div class="four-news-year-month3">
            2022.02
          </div>
          <div class="four-news-title3">
            江西麻姑山景区旅游策划暨景区总江西麻姑山景区
          </div>
          <div class="four-news-content3">
            麻姑山景区位于江西省抚州市南城县，距离南城县城4km，约10分钟车程，距离抚州市70km...
          </div>
          <div class="four-news-link3">
            查看详情
          </div>
        </div>
      </div>
      <div class="four-more-link">
        MORE
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      a:""
    };
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
.four-background{
  position: relative;
  background-image: url("../../assets/bei/beijing@2x(2).png");
  width: 1920px;
  height: 1080px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.four-title{
  display: flex;
  position:relative;
  top:100px;
  left:109px;
  text-align: center;
}
.four-title-nav-left{
  position:relative;
  top: 15px;
  left: 1116px;
  width: 120px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #C8000A;
  line-height: 35px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-title-nav-right{
  position:relative;
  top: 23px;
  left: 1196px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-title-left{
  width: 196px;
  height: 75px;
  font-size: 50px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 59px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-title-right{
  position:relative;
  top:17px;
  left:16px;
  width: 112px;
  height: 42px;
  font-size: 28px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 33px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-trends{
  position:relative;
  top:125px;
  left:109px;
  display: flex;
}
.four-trends-title{
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-trends-time{
  position: relative;
  left: 100px;
  width: 89px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-title{
  position: relative;
  top: 176px;
  left: 109px;
  width: 1125px;
  height: 64px;
  font-size: 44px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 52px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-watch-link-top{
  position: relative;
  top: 197px;
  left: 125px;
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #C8000A;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-images{
  position: relative;
  top: 284px;
  display: flex;
}
.four-news-image1{
  position:relative;
  width: 640px;
  height: 444px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.four-news-image2{
  position:relative;
  width: 640px;
  height: 444px;
  background: rgba(0, 0, 0, 0.21) url("../../assets/img/wenlvjiaoyu.png");
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.four-news-image3{
  position:relative;
  width: 640px;
  height: 444px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.four-news-day1{
  position: absolute;
  top: 50px;
  left: 109px;
  width: 57px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #A0A0A0;
  line-height: 56px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-year-month1{
  position: absolute;
  top: 122px;
  left: 109px;
  width: 58px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #A0A0A0;
  line-height: 19px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-title1{
  position: absolute;
  top: 178px;
  left: 109px;
  width: 465px;
  height: 76px;
  font-size: 26px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 30px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-content1{
  position: absolute;
  top: 278px;
  left: 109px;
  width: 409px;
  height: 60px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-link1{
  position: absolute;
  top: 362px;
  left: 125px;
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #A0A0A0;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-day2{
  position: absolute;
  top: 50px;
  left: 109px;
  width: 57px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 56px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-year-month2{
  position: absolute;
  top: 122px;
  left: 109px;
  width: 58px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 19px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-title2{
  position: absolute;
  top: 178px;
  left: 109px;
  width: 465px;
  height: 76px;
  font-size: 26px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 30px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-content2{
  position: absolute;
  top: 278px;
  left: 109px;
  width: 409px;
  height: 60px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-link2{
  position: absolute;
  top: 362px;
  left: 109px;
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-day3{
  position: absolute;
  top: 50px;
  left: 109px;
  width: 57px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #A0A0A0;
  line-height: 56px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-year-month3{
  position: absolute;
  top: 122px;
  left: 109px;
  width: 58px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #A0A0A0;
  line-height: 19px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-title3{
  position: absolute;
  top: 178px;
  left: 109px;
  width: 465px;
  height: 76px;
  font-size: 26px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 30px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-content3{
  position: absolute;
  top: 278px;
  left: 109px;
  width: 409px;
  height: 60px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-link3{
  position: absolute;
  top: 362px;
  left: 109px;
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #A0A0A0;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-more-link{
  position: relative;
  top: 350px;
  left: 865px;
  width: 50px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 21px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
</style>