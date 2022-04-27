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
<!--        <div
            :class="{'four-title-nav-left-selected':currentId!=-1,'four-title-nav-left':currentId==-1}"
            v-on:click="getNews(currentId)">
          巅峰新闻
        </div>
        <div :class="{'four-title-nav-right-selected':currentId==-1,'four-title-nav-right':currentId!=-1}"
             v-on:click="getNews(-1)">
          媒体新闻
        </div>-->
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
      <div class="four-watch-link-top">
        查看详情
      </div>

      <div class="four-news-images">

        <div class="four-news-image1">
          <div class="four-news-day1">
            {{currentNews[currentIndex].add_date.substr(8,2)}}
          </div>
          <div class="four-news-year-month1">
            {{currentNews[currentIndex].add_date.substr(0,7)}}
          </div>
          <div class="four-news-title1">
            {{currentNews[currentIndex].title}}
          </div>
          <div class="four-news-content1" v-if="currentNews[currentIndex].summary.length>43">
            {{currentNews[currentIndex].summary.slice(0,43)}}...
          </div>
          <div class="four-news-content1" v-else>
            {{currentNews[currentIndex].summary}}
          </div>
          <div class="four-news-link1">
            查看详情
          </div>
        </div>

        <div class="four-news-image2">
          <div class="four-news-day2">
            {{currentNews[currentIndex+1].add_date.substr(8,2)}}
          </div>
          <div class="four-news-year-month2">
            {{currentNews[currentIndex+1].add_date.substr(0,7)}}
          </div>
          <div class="four-news-title2">
            {{currentNews[currentIndex+1].title}}
          </div>
          <div class="four-news-content2" v-if="currentNews[currentIndex+1].summary.length>43">
            {{currentNews[currentIndex+1].summary.slice(0,43)}}...
          </div>
          <div class="four-news-content2" v-else>
            {{currentNews[currentIndex+1].summary}}
          </div>
          <div class="four-news-link2">
            查看详情
          </div>
        </div>

        <div class="four-news-image3">
          <div class="four-news-day3">
            {{currentNews[currentIndex+2].add_date.substr(8,2)}}
          </div>
          <div class="four-news-year-month3">
            {{currentNews[currentIndex+2].add_date.substr(0,7)}}
          </div>
          <div class="four-news-title3">
            {{currentNews[currentIndex+2].title}}
          </div>
          <div class="four-news-content3" v-if="currentNews[currentIndex+2].summary.length>43">
            {{currentNews[currentIndex+2].summary.slice(0,43)}}...
          </div>
          <div class="four-news-content3" v-else>
            {{currentNews[currentIndex+2].summary}}
          </div>
          <div class="four-news-link3">
            查看详情
          </div>
        </div>

      </div>
      <div class="four-more-link">
        MORE<img class="four-more-link-img"/>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      "currentBId":0,
      "currentIndex":0,
      "currentNews":[],
      "currentLength":0,
      "news":[
        {
          "id":"6418",
          "title":"再折桂冠！巅峰智业上榜2022年度杰出雇主奖 ",
          "business_ids":"45",
          "original_image":"/uploads/20220419/342353b3604223f9316679c7dbd62de8.png",
          "summary":"2021年9月，前程无忧发起的2022人力资源管理杰出奖以“张弛有度 竞合共赢”为主题再度启航，在近日揭晓的榜单中，巅峰智业荣获2022“人力资源管理杰出奖”之“杰出雇主”殊荣，展现了巅峰智业在战略调整、人才吸引、发展、激励、保留、关怀等方面的杰出表现。\r\n\r\n",
          "add_date":"2022.02.18"
        },
        {
          "id":"6419",
          "title":"新春贺词｜乘风破浪，共赢未来！",
          "business_ids":"45",
          "original_image":"/uploads/20220419/e52a52efb5dac5db6cc7b42afaa2b8b2.png",
          "summary":"中国文旅产业和乡村振兴领先的全过程服务商",
          "add_date":"2022.01.31"
        },
        {
          "id":"6414",
          "title":"新春将至，巅峰智业迎来喜报“四重奏”！",
          "business_ids":"45",
          "original_image":"attachs/archive/gallery/2022/0128/4plada4qcdorvl5.jpg",
          "summary":"作为文旅规划建设运营全程服务商，巅峰智业从“四甲级”实现资质倍增为“八项甲级”再到专业资质破“十”，拥有城乡规划编制甲级，风景园林工程设计专项甲级，城市及道路照明工程专业承包壹级，旅游规划设计甲级，展陈工程设计与施工一体化一级，专业舞台灯光设计、安装及调试甲级，专业舞台设计制作工程甲级，等十余项专业权威资质。",
          "add_date":"2022.01.28"
        },
        {
          "id":"6415",
          "title":"官方推荐 | 10条冰雪精品线路、196个冰雪旅游景区等你来！",
          "business_ids":"45",
          "original_image":"",
          "summary":"随着冰雪运动的普及，越来越多的年轻人喜欢上了滑雪。从计划在冬奥会时建立“带动3亿人参加冰雪运动”的目标，到迎接即将到来的冬奥会时，“冷”冰雪已逐渐成为一种“热”时尚。",
          "add_date":"2022.01.28"
        },
        {
          "id":"6420",
          "title":"恭祝榜上有名！首批国家级旅游休闲街区名单公示 ",
          "business_ids":"45",
          "original_image":"/uploads/20220419/ce167d0e1c4403d767ab095219e4419d.png",
          "summary":"近日，文化和旅游部办公厅 国家发展改革委办公厅公示了55家国家级旅游休闲街区名单，江西省赣州市章贡区江南宋城旅游休闲街区榜上有名。巅峰智业有幸为其核心区域——郁孤台历史文化街区提供过从前期投资、规划建设、运营管理、营销推广的全面服务。",
          "add_date":"2022.01.14"
        }
      ]
    };
  },
  methods: {
    getNews(currentBId){
      let temp = this.news.filter(item => item.business_ids === currentBId);
      console.log(temp);
      this.currentNews = temp;
      this.currentIndex = 0;
    }
  },
  created(){
    this.currentBId = this.news[0].business_ids;
    this.getNews(this.currentBId);
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
  background-size: 100% 100%
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
  background: url("../../assets/img/wenlvjiaoyu.png");
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
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
  width: 190px;
  height: 52px;
  border-radius: 0px 12px 0px 12px;
  opacity: 1;
  border: 1px solid #A0A0A0;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 52px;
  text-align: center;

  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/

}
.four-more-link-img{
  margin-left: 8px;
  background: url("../../assets/img/icon_more.png");
  width: 8px;
  height: 14px;
  background-size: 100% 100%;
}

</style>