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
      </div>
      <div class="four-trends">
        <div class="four-trends-title">
          最新动态
        </div>
        <div class="four-trends-divide"></div>
        <div class="four-trends-time">
          {{currentNews[currentIndex].add_date}}
        </div>
      </div>
      <div class="four-news-title">
        {{currentNews[currentIndex].title}}
      </div>
      <div class="to-right-icon"></div>
      <div class="four-watch-link-top" @click="toNewsDetail(currentNews[currentIndex].id)">
        查看详情
      </div>





      <div class="four-news-images">


        <div class="no-back"
             v-on:mouseover="setBacK($event,0)"
             v-on:mouseleave="setBacK2($event,0)"
             >
          <div v-if="currentFlag == 0"  style="width: 40rem;height: 27.75rem; background: #000000;opacity:.4;position:absolute;top:0"></div>
          <img class="four-news-img1"
              :src=getImgUrl(currentNews[currentIndex].original_image)
            v-show="currentImgIndex === 0"
          />
          <div class="four-news-day1"
               :class="[{'four-news-day1-hl':currentFlag === 0}]"
          >
            {{currentNews[currentIndex].add_date.substr(8,2)}}
          </div>
          <div class="four-news-year-month1"
               :class="[{'four-news-year-month1-hl':currentFlag === 0}]"
          >
            {{currentNews[currentIndex].add_date.substr(0,7)}}
          </div>
          <div class="four-news-title1"
               :class="[{'four-news-title1-hl':currentFlag === 0}]"
          >
            {{currentNews[currentIndex].title}}
          </div>
          <div class="four-news-content1"
               :class="[{'four-news-content1-hl':currentFlag === 0}]"
               v-if="currentNews[currentIndex].summary.length>43">
            {{currentNews[currentIndex].summary.slice(0,43)}}...
          </div>
          <div class="four-news-content1"
               :class="[{'four-news-content1-hl':currentFlag === 0}]"
               v-else>
            {{currentNews[currentIndex].summary}}
          </div>
          <div class="four-news-link1"
               :class="[{'four-news-link1-hl':currentFlag === 0}]"
               @click="toNewsDetail(currentNews[currentIndex].id)">
            <img class="icon-more111"
                 :class="[{'icon-more111-hl':currentFlag === 0}]"
                 src="../../assets/img/icon_more111.png" />
            查看详情
          </div>
        </div>

        <div class="no-back"
             v-on:mouseover="setBacK($event,1)"
             v-on:mouseleave="setBacK2($event,1)"
        >
          <div v-if="currentFlag == 1"  style="width: 40rem;height: 27.75rem; background: #000000;opacity:.4;position:absolute;top:0"></div>
          <img class="four-news-img2"
               :src=getImgUrl(currentNews[currentIndex+1].original_image)
               v-show="currentImgIndex === 1"
          />
          <div class="four-news-day2"
            :class="[{'four-news-day2-hl':currentFlag === 1}]"
          >
            {{currentNews[currentIndex+1].add_date.substr(8,2)}}
          </div>
          <div class="four-news-year-month2"
               :class="[{'four-news-year-month2-hl':currentFlag === 1}]"
          >
            {{currentNews[currentIndex+1].add_date.substr(0,7)}}
          </div>
          <div class="four-news-title2"
               :class="[{'four-news-title2-hl':currentFlag === 1}]"
          >
            {{currentNews[currentIndex+1].title}}
          </div>
          <div class="four-news-content2" v-if="currentNews[currentIndex+1].summary.length>43">
            :class="[{'four-news-title2-hl':currentFlag === 1}]"
            {{currentNews[currentIndex+1].summary.slice(0,43)}}...
          </div>
          <div class="four-news-content2"
               :class="[{'four-news-content2-hl':currentFlag === 1}]"
               v-else>
            {{currentNews[currentIndex+1].summary}}
          </div>
          <div class="four-news-link2"
               :class="[{'four-news-link2-hl':currentFlag === 1}]"
               @click="toNewsDetail(currentNews[currentIndex].id)">
            <img class="icon-more222"
                 :class="[{'icon-more222-hl':currentFlag === 1}]"
                 src="../../assets/img/icon_more111.png" />
            查看详情
          </div>
        </div>



        <div class="no-back"
             v-on:mouseover="setBacK($event,2)"
             v-on:mouseleave="setBacK2($event,2)"
        >
          <div v-if="currentFlag == 3"  style="width: 40rem;height: 27.75rem; background: #000000;opacity:.4;position:absolute;top:0"></div>
          <img class="four-news-img3"
               :src=getImgUrl(currentNews[currentIndex+2].original_image)
               v-show="currentImgIndex === 2"
          />
          <div class="four-news-day3"
               :class="[{'four-news-day3-hl':currentFlag === 2}]"
          >
            {{currentNews[currentIndex+2].add_date.substr(8,2)}}
          </div>
          <div class="four-news-year-month3"
               :class="[{'four-news-year-month3-hl':currentFlag === 2}]"
          >
            {{currentNews[currentIndex+2].add_date.substr(0,7)}}
          </div>
          <div class="four-news-title3"
               :class="[{'four-news-title3-hl':currentFlag === 2}]"
          >
            {{currentNews[currentIndex+2].title}}
          </div>
          <div class="four-news-content3"
               :class="[{'four-news-content3-hl':currentFlag === 2}]"
               v-if="currentNews[currentIndex+2].summary.length>43">
            {{currentNews[currentIndex+2].summary.slice(0,43)}}...
          </div>
          <div class="four-news-content3"
               :class="[{'four-news-content3-hl':currentFlag === 2}]"
               v-else>
            {{currentNews[currentIndex+2].summary}}
          </div>
          <div class="four-news-link3"
               :class="[{'four-news-link3-hl':currentFlag === 2}]"
               @click="toNewsDetail(currentNews[currentIndex].id)">
            <img class="icon-more333"
                 :class="[{'icon-more333-hl':currentFlag === 2}]"
                 src="../../assets/img/icon_more111.png"/>
            查看详情
          </div>
        </div>






      </div>










      <div class="four-more-link"
        @click="toTopNews(45)">
        <div
            src="../../assets/img/Group 391.png"
            class="four-more-link-img"></div>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
import { firstone } from "@/api/api";
export default {
  data() {
    return {
      "currentBId":0,
      "currentIndex":0,
      "currentImgIndex": -1,
      "currentNews":[],
      "currentLength":0,
      "news":[],
      "flag" : false,
      currentFlag: -1,
      baseUrl:'http://ceshi.davost.com/',
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
  methods: {
    setBacK($event,flag){
      if(flag === 0){
        $event.currentTarget.className = "four-news-image1";
        /*$event.currentTarget.style.background = ""+this.baseUrl + this.news[1].original_image;
        */
        this.currentImgIndex = 0;
      }
      else if(flag === 1){
        $event.currentTarget.className = "four-news-image2";
        this.currentImgIndex = 1;
      }
      else if(flag === 2){
        $event.currentTarget.className = "four-news-image3";
        this.currentImgIndex = 2;
      }

      this.currentFlag = flag;
    },
    setBacK2($event,flag){
      $event.currentTarget.className = "no-back";
      this.currentFlag = -1;
      this.currentImgIndex = -1;
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getIndexNews() {
      let { data } = await firstone();
      this.news = data.data.news;
      this.initData();
    },
    initData(){
      this.currentBId = this.news[0].business_ids;
      this.getNews(this.currentBId);
    },
    toNewsDetail(id){
      this.$router.push(`topNews/45/newsDetail/${id}`);
    },
    getNews(currentBId){
      let temp = this.news.filter(item => item.business_ids === currentBId);
      this.currentNews = temp;
      this.currentIndex = 0;
    },
    toTopNews(id) {
      this.$router.push(`/topNews/${id}`);
    }
  },
  created(){

  },
  mounted(){
    this.getIndexNews();
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
.no-back{
  position:relative;
  width: 640px;
  height: 444px;
  background-color: #FFFFFF;
  border-radius: 0px 0px 0px 0px;

}
.four-background{
  position: relative;
  background-image: url("../../assets/bei/beijing@2x(2).png");
  width: 100%;
  height: 1080px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
  overflow: hidden;
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
  top: 23px;
  left: 1116px;
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
.four-title-nav-left-selected{
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

.four-title-nav-left-selected::after{
  content: "";
  width:23%;
  height: 10px;
  display: block;
  margin: 0 auto;
  border-bottom: 2px solid #C8000A;
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
.four-title-nav-right-selected{
  position:relative;
  top: 15px;
  left: 1196px;
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
.four-title-nav-right-selected::after{
  content: "";
  width:23%;
  height: 10px;
  display: block;
  margin: 0 auto;
  border-bottom: 2px solid #C8000A;
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
  align-items: center;
}
.four-trends-title{
  width: 100px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 21px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.four-trends-divide{
  margin-left: 20px;
  width: 60px;
  height: 2px;
  background: #CACACA;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.four-trends-time{
  margin-left: 20px;
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
.to-right-icon{
  position: absolute;
  top: 379px;
  left: 109px;
  background-image: url("../../assets/bei/icon_more.png");
  width: 8px;
  height: 14px;
  background-size: 100% 100%;
}
.four-watch-link-top{
  position: relative;
  top: 210px;
  left: 130px;
  width: 90px;
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
  /*background: url("../../assets/img/111.png");*/
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.four-news-img1{
  width: 640px;
  height: 444px;
  background-size: 100% 100%;
}
.four-news-image2{
  position:relative;
  width: 640px;
  height: 444px;
  /*background: url("../../assets/img/222.png");*/
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
}
.four-news-img2{
  width: 640px;
  height: 444px;
  background-size: 100% 100%;
}
.four-news-image3{
  position:relative;
  width: 640px;
  height: 444px;
  /*background: url("../../assets/img/333.jpeg");*/
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.four-news-img3{
  width: 640px;
  height: 444px;
  background-size: 100% 100%;
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
.four-news-day1-hl{
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
  /*-webkit-background-clip: text;
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
.four-news-year-month1-hl{
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
  /*-webkit-background-clip: text;
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
.four-news-title1-hl{
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
 /* -webkit-background-clip: text;
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
.four-news-content1-hl{
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
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-link1{
  position: absolute;
  top: 362px;
  left: 107px;
  width: 90px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #A0A0A0;
  line-height: 21px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.four-news-link1-hl{
  position: absolute;
  top: 362px;
  left: 107px;
  width: 90px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 21px;
  /*-webkit-background-clip: text;
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
  /*color: #FFFFFF;*/
  color: #A0A0A0;
  line-height: 56px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.four-news-day2-hl{
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
  /*-webkit-background-clip: text;
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
  /*color: #FFFFFF;*/
  color: #A0A0A0;
  line-height: 19px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.four-news-year-month2-hl{
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
  /*-webkit-background-clip: text;
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
  /*color: #FFFFFF;*/
  color: #231914;
  line-height: 30px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.four-news-title2-hl{
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
  /*-webkit-background-clip: text;
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
  /*color: #FFFFFF;*/
  color: #6E6E6E;
  line-height: 21px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.four-news-content2-hl{
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
 /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.icon-more111{
  width: 8px;
  height: 14px;
  background-size: 100% 100%;
}
.icon-more111-hl{
  width: 8px;
  height: 14px;
  color: #FFFFFF;
  background-image: url("../../assets/img/icon_more66.png");
  background-size: 100% 100%;
}
.icon-more222{
  width: 8px;
  height: 14px;
  background-size: 100% 100%;
}
.icon-more222-hl{
  width: 8px;
  height: 14px;
  color: #FFFFFF;
  background-image: url("../../assets/img/icon_more66.png");
  background-size: 100% 100%;
}
.icon-more333{
  width: 8px;
  height: 14px;
  background-size: 100% 100%;
}
.icon-more333-hl{
  width: 8px;
  height: 14px;
  color: #FFFFFF;
  background-image: url("../../assets/img/icon_more66.png");
  background-size: 100% 100%;
}
.four-news-link2{
  position: absolute;
  top: 362px;
  left: 109px;
  width: 90px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  /*color: #FFFFFF;*/
  color: #A0A0A0;
  line-height: 21px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.four-news-link2-hl{
  position: absolute;
  top: 362px;
  left: 109px;
  width: 90px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 21px;
 /*-webkit-background-clip: text;
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
.four-news-day3-hl{
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
  /*-webkit-background-clip: text;
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
.four-news-year-month3-hl{
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
  /*-webkit-background-clip: text;
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
.four-news-title3-hl{
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
  /*-webkit-background-clip: text;
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
.four-news-content3-hl{
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
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-news-link3{
  position: absolute;
  top: 362px;
  left: 109px;
  width: 100px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #A0A0A0;
  line-height: 21px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.four-news-link3-hl{
  position: absolute;
  top: 362px;
  left: 109px;
  width: 100px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.four-more-link{
  position: relative;
  top: 350px;
  left: 865px;
  width: 138px;
  height: 52px;

  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/

}
.four-more-link-img{
  margin-left: 8px;
  background: url("../../assets/img/Group 391.png");
  width: 138px;
  height: 52px;
  background-size: 100% 100%;
}
.four-more-link-img:hover{
  margin-left: 8px;
  background: url("../../assets/img/Group 392.png");
  width: 138px;
  height: 52px;
  background-size: 100% 100%;
}

</style>