<template>
  <div class="bk" id="app">
    <div class="introduce-background">
        <div class="introduce-title">
          巅峰介绍
        </div>
        <div class="introduce-title2">
          THE PEAK IS INTRODUCED
        </div>
      <div class="introduce-divide"></div>
      <img class="icon-home"
           @click=toIndex()
           src = "../../assets/bei/icon_home.png"/>
      <img class="icon-jiantou1" src = "../../assets/bei/icon.png"/>
      <div class="link1">
          走进巅峰
      </div>
      <img class="icon-jiantou2" src = "../../assets/bei/icon.png"/>
      <div class="link2">巅峰介绍</div>
        <div class="top-card">
          <div class="chuangli">创立</div>
          <div class="data1">{{brand_messa.found_years}}</div>
          <div class="suffix1">年</div>
          <div class="desc1">文旅行业实践者</div>
          <div class="wanchengxiangmu">完成项目</div>
          <div class="data2">{{brand_messa.finish_projects}}</div>
          <div class="suffix2">+</div>
          <div class="desc2">美丽中国价值经典</div>
          <div class="yunyingjingqu">运营景区</div>
          <div class="data3">{{brand_messa.scenic_spot_num}}</div>
          <div class="suffix3">+</div>
          <div class="desc3">专业运营旅游景区</div>
          <div class="ronghuojiangxiang">荣获奖项</div>
          <div class="data4">{{brand_messa.prize_num}}</div>
          <div class="suffix4">+</div>
          <div class="desc4">国内外奖项获得者</div>
          <div class="gugan">骨干员工近</div>
          <div class="data5">{{brand_messa.member_num}}</div>
          <div class="desc5">业界骨干创意精英</div>
        </div>
      </div>
    <div class="introduce2-background">
      <div class="introduce2-title">
        巅峰介绍
      </div>
      <div class="about-us">
        ABOUT US
      </div>
      <div class="introduce2-content1">
        北京巅峰智业旅游文化创意股份有限公司始创于2001年，目前已发展成为中国旅游规划行业的头部企业、文旅产业的创新引领者和开拓者，提出了 “规划设计、落地建设、产品打造、运营管理”四位一体全链服务战略，为客户提供文旅产业创新发展线上线下一站式解决方案。
      </div>
      <div class="introduce2-content2">
        作为文旅规划建设运营全程服务商，巅峰智业资质全面, 拥有旅游规划设计甲级、城乡规划编制甲级、风景园林工程设计专项甲级、城市及道路照明工程专业承包壹级、专业舞台灯光设计、安装及调试甲级，专业舞台设计制作工程甲级，专业舞台音视频设计、安装及调试甲级，专业舞台音响设计、安装及调试甲级的“八项甲级”资质；业务覆盖全国，完成3000余项高品质项目，累计运管景区100余家，在1000余项国际、国内项目竞标中拔得头筹。创新推出安庆太湖文博园《天仙配新传》、张家口下花园《西游归来》、济南大石崮《好汉山东》等“巅峰震撼”系列光影剧强势新IP，其中《天仙配新传》还作为安庆文旅新名片，被央视新闻联播重点报道。《顺德华侨城空间秀》等系列夜游目的地新地标，已成为年轻人喜爱的网红打卡地。此外，还推动了松鼠森林、绿心童乡、欢乐星球、峰物文创、旅豆学堂等一系列落地产品。
      </div>
      <div class="introduce2-video">
        <video ref="videoPlayer" controls :src=videoUrl
               :poster=getImgUrl(brand_messa.video_cover)
               controlslist="nodownload"
               :class="['porel','fullwidth','mal','fla','mat','movie-show-video']"
               style="width: 100%;height: 100%;object-fit: fill">
        </video>
      </div>
    </div>
    <div class="introduce3-background">
      <div class="introduce3-title">
        巅峰旗下品牌
      </div>
      <div class="introduce3-list">
        <div class="introduce3-item" v-for="(item,i) in brand_slogan" >
          <div class="introduce3-item-row">
            <img class="introduce3-item-logo" :src=getImgUrl(item.logo) />
            <div
                v-if="i == currentBrandIndex? false: true"
                class="introduce3-item-slogan"
            >{{item.brand_slogan}}</div>
            <img
                v-if="i == currentBrandIndex? true: false"
                class="introduce3-item-btn1"
                src="../../assets/mines/icon_shut down@2x.png"
                v-on:click="closeBrand(i)"
            />
            <img
                v-if="i == currentBrandIndex? false: true"
                class="introduce3-item-btn2" src="../../assets/presentation/icon_xiala@2x.png"
                v-on:click="openBrand(i)"
            />
          </div>

          <div
              v-if="i == currentBrandIndex? true: false"
              class="introduce3-item-brief">
            {{ item.small_descrip }}
          </div>

          <div
              v-if="i == currentBrandIndex? true: false"
              class="introduce3-item-summary">
            {{ item.summary}}
          </div>
          <div class="introduce3-divide"></div>

        </div>
      </div>

    </div>






    <div class="introduce4-background">
      <div class="introduce4-title">
        大事记
      </div>
      <div class="introduce4-time">
        {{currentYear}}年
      </div>
      <div class="introduce4-content">
        {{ currentDate.title}}
      </div>
      <div class="introduce4-img-wrapper">
        <div class="introduce4-img">
          <img :src=getImgUrl(currentDate.original_image) />
        </div>
      </div>



      <div class="introduce4-y-time-list">
        <div class="introduce4-y-time-item" v-for="(item,i) in filter_dates" >
            <div class="introduce4-y-item-date" v-on:click="changeDate(item.addtime)">

              <div class="wrapper-y">
                <span :class="{'active2' : item.addtime === currentDate.addtime}">{{item.addtime}} </span>
                <div :class="{'y-dot' : item.addtime === currentDate.addtime}"></div>
                <div :class="{'y-dot-no' : item.addtime !== currentDate.addtime}"></div>
              </div>


            </div>
        </div>
      </div>

      <div class="introduce4-x-time-list">
        <div class="introduce4-x-time" v-for="(item,i) in filter_memorabilia" :key="item.year"
             v-on:click="changeYear(item.year)">
          <div class="wrapper-x">
            <span :class="{'active' : item.year === currentYear}">{{item.year}}</span>
            <div :class="{'x-dot' : item.year === currentYear}"></div>
            <div :class="{'x-dot-no' : item.year !== currentYear}"></div>
          </div>
        </div>
      </div>

      <div class="introduce4-y-line">
      </div>
      <div class="introduce4-to-down" v-on:click="toDown4()">
      </div>


      <div class="introduce4-left-and-right">
      <div class="introduce4-to-left" v-on:click="toLeft4()">
      </div>
      <div class="introduce4-to-right" v-on:click="toRight4()">
      </div>
      <div class="introduce4-divider">
      </div>
      </div>
    </div>








    <div class="introduce5-background">
      <div class="introduce5-title">
        资质荣誉
      </div>
      <div class="introduce5-zizhi">
        企业资质
      </div>
      <div class="introduce5-list">
        <div class="introduce5-item" v-for="(item,i) in filter_enterprise_qualification" :key="item.id">
          <img class="introduce5-image" :src=getImgUrl(item.original_image)>
          <div class="introduce5-item-title">{{item.title}}</div>
        </div>
      </div>
      <div class="introduce5-to-left" v-on:click="toLeft5()">
      </div>
      <div class="introduce5-to-right" v-on:click="toRight5()">
      </div>
    </div>
    <div class="introduce6-background">
      <div class="introduce6-title">
        荣誉证书
      </div>
      <div class="introduce6-list">
        <div class="introduce6-item" v-for="(item,i) in filter_certificate_honor" :key="item.id">
          <img class ="introduce6-image" :src=getImgUrl(item.original_image)>
        </div>
      </div>
      <div class="introduce6-to-left" v-on:click="toLeft6()">
      </div>
      <div class="introduce6-to-right" v-on:click="toRight6()">
      </div>
    </div>
  </div>
</template>
<script>
import { productions } from "@/api/api";
export default {
  data() {
    return {
      "currentBrandIndex":0,
      "currentDate":{},
      "currentYear":2020,
      "memorabilia_dates":[],
      "filter_dates":[],//月份
      "date_filter_number":1,//切换月份
      "filter_certificate_honor":[],
      "qualification_filter_number":1,//切换荣誉图片
      "filter_enterprise_qualification":[],
      "honor_filter_number":1,//切换资质图片
      "filter_memorabilia":[],//大事件年份
      "memorabilia_filter_number":1,//切换大事件年份

      "videoUrl":"",
      "brand_messa": {},
      "brand_slogan": [],
      "memorabilia": [],
      "enterprise_qualification": [],
      "certificate_honor": [],
      "seo_message": {},
      baseUrl:'http://ceshi.davost.com',
    }
  },
  watch:{
    $route: {
      handler() {
        this.productions();
      },
      deep: true,
    }
  },
  methods:{
    toIndex() {
      this.$router.push({ name: "index"});
    },
    async getIntroduceInfo() {
      let { data } = await productions({id:this.$route.params.id});
      this.brand_messa = data.data.brand_messa;
      this.brand_slogan = data.data.brand_slogan;
      this.memorabilia = data.data.memorabilia;
      this.enterprise_qualification = data.data.enterprise_qualification;
      this.certificate_honor = data.data.certificate_honor;
      this.initData();
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    openBrand(index){
      this.currentBrandIndex = index;
    },
    closeBrand(index){
      this.currentBrandIndex = -1;
    },
    changeYear(year){
      let temp = this.memorabilia.filter(item => item.year === year);
      this.memorabilia_dates = temp[0].child;
      this.filter_dates = this.memorabilia_dates.slice(0,4);
      this.currentYear = year;
      this.currentDate = this.filter_dates[0];
    },
    changeDate(date){
      let temp = this.filter_dates.filter(item => item.addtime === date);
      this.currentDate = temp[0];

    },
    toLeft4(){
      let number = this.memorabilia_filter_number;
      if(number === 1){
        this.memorabilia_filter_number = Math.ceil(this.memorabilia.length / 7);
        number = Math.ceil(this.memorabilia.length / 7);
      }
      else{
        this.memorabilia_filter_number = this.memorabilia_filter_number -1;
        number = this.memorabilia_filter_number;
      }
      this.filter_memorabilia = this.memorabilia.slice((number-1)*7,number*7);
    },
    toRight4(){
      let number = this.memorabilia_filter_number;
      if(number === Math.ceil(this.memorabilia.length / 7)){
        number = 1;
        this.memorabilia_filter_number = 1;
      }
      else{
        this.memorabilia_filter_number = this.memorabilia_filter_number + 1;
        number = this.memorabilia_filter_number;
      }
      this.filter_memorabilia = this.memorabilia.slice((number-1)*7,number*7);
    },
    toLeft5(){
      let number = this.qualification_filter_number;
      if(number === 1){
        this.qualification_filter_number = Math.ceil(this.enterprise_qualification.length / 8);
        number = Math.ceil(this.enterprise_qualification.length / 8);
      }
      else{
        this.qualification_filter_number = this.qualification_filter_number -1;
        number = this.qualification_filter_number;
      }
      this.filter_enterprise_qualification = this.enterprise_qualification.slice((number-1)*8,number*8);
    },
    toRight5(){
      let number = this.qualification_filter_number;
      if(number === Math.ceil(this.enterprise_qualification.length / 8)){
        number = 1;
        this.qualification_filter_number = 1;
      }
      else{
        this.qualification_filter_number = this.qualification_filter_number + 1;
        number = this.qualification_filter_number;
      }
      this.filter_enterprise_qualification = this.enterprise_qualification.slice((number-1)*8,number*8);
      },
    toLeft6(){
      let number = this.honor_filter_number;
      if(number === 1){
        this.honor_filter_number = Math.ceil(this.certificate_honor.length / 8);
        number = Math.ceil(this.certificate_honor.length / 8);
      }
      else{
        this.honor_filter_number = this.honor_filter_number -1;
        number = this.honor_filter_number;
      }
      this.filter_certificate_honor = this.certificate_honor.slice((number-1)*8,number*8);
    },
    toRight6(){
      let number = this.honor_filter_number;
      if(number === Math.ceil(this.certificate_honor.length / 8)){
        number = 1;
        this.honor_filter_number = 1;
      }
      else{
        this.honor_filter_number = this.honor_filter_number + 1;
        number = this.honor_filter_number;
      }
      this.filter_certificate_honor = this.certificate_honor.slice((number-1)*8,number*8);
    },
    toDown4(){
      let number = this.date_filter_number;
      if(number === Math.ceil(this.memorabilia_dates.length / 4)){
        number = 1;
        this.date_filter_number = 1;
      }else{
        this.date_filter_number = this.date_filter_number + 1;
        number = this.date_filter_number;
      }
      this.filter_dates = this.memorabilia_dates.slice((number-1)*4,number*4);
      this.currentDate = this.filter_dates[0];
    },
    initData(){
      this.filter_certificate_honor = this.certificate_honor.slice(0,8);
      this.filter_enterprise_qualification = this.enterprise_qualification.slice(0,8);
      this.filter_memorabilia = this.memorabilia.slice(0,7);
      this.filter_dates = this.memorabilia_dates.slice(0,4);
      this.changeYear(this.filter_memorabilia[0].year);
      this.changeDate(this.filter_dates[0].addtime);
      this.currentBrandIndex = 0;
      this.videoUrl = this.baseUrl + this.brand_messa.peak_video;
    },

  },
  created: function(){

  },
  mounted() {
    this.getIntroduceInfo();
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
a {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
.bk{
  width: 100%;
  overflow: hidden;
}
.introduce-background{
  position: relative;
  /*width: 1920px;*/
  width: 100%;
  height: 700px;
  background: url("../../assets/presentation/Group 377.png");
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
}
.introduce-title{
  position: absolute;
  top: 248px;
  left: 813px;
  width: 395px;
  height: 62px;
  font-size: 60px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 32px;
  letter-spacing: 14px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce-title2{
  position: absolute;
  top: 322px;
  left: 795px;
  width: 630px;
  height: 32px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 32px;
  letter-spacing: 4px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce-divide{
  position: absolute;
  top: 370px;
  left: 920px;
  width: 80px;
  height: 4px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}

.active{
  width: 100px;
  height: 35px;
  font-size: 32px;
  font-family: D-DIN-DIN-Bold, D-DIN-DIN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 38px;

}
.active2{
  color: #FFFFFF;
}
.icon-home{
  position: absolute;
  top: 570px;
  left: 236px;
  width: 24px;
  height: 24px;
  opacity: 1;
  box-sizing: border-box;
}
.icon-jiantou1{
  position: absolute;
  top: 574px;
  left: 272px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.icon-jiantou2{
  position: absolute;
  top: 574px;
  left: 388px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.link1{
  position: absolute;
  top: 570px;
  left: 300px;
  width: 100px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.link2{
  position: absolute;
  top: 570px;
  left: 410px;
  width: 100px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 24px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.top-card{
  position: absolute;
  top: 624px;
  left: 236px;
  background: url("../../assets/bei/beijing.png");
  width: 1448px;
  height: 192px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  z-index: 100;
}
.chuangli{
  position: absolute;
  top: 80px;
  left: 105px;
  width: 40px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data1{
  position: absolute;
  top: 50px;
  left: 157px;
  width: 57px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix1{
  position: absolute;
  top: 77px;
  left: 218px;
  width: 24px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 28px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc1{
  position: absolute;
  top: 130px;
  left: 118px;
  /*width: 113px;*/
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.wanchengxiangmu{
  position: absolute;
  top: 80px;
  left: 304px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data2{
  position: absolute;
  top: 50px;
  left: 392px;
  width: 114px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix2{
  position: absolute;
  top: 70px;
  left: 520px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc2{
  position: absolute;
  top: 130px;
  left: 354px;
 /* width: 128px;*/
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.yunyingjingqu{
  position: absolute;
  top: 80px;
  left: 594px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data3{
  position: absolute;
  top: 50px;
  left: 686px;
  width: 85px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix3{
  position: absolute;
  top: 70px;
  left: 785px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc3{
  position: absolute;
  top: 130px;
  left: 630px;
  /*width: 128px;*/
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.ronghuojiangxiang{
  position: absolute;
  top: 80px;
  left: 855px;
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data4{
  position: absolute;
  top: 50px;
  left: 947px;
  width: 85px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.suffix4{
  position: absolute;
  top: 70px;
  left: 1045px;
  width: 18px;
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc4{
  position: absolute;
  top: 130px;
  left: 891px;
  /*width: 128px;*/
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.gugan{
  position: absolute;
  top: 80px;
  left: 1116px;
  width: 100px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.data5{
  position: absolute;
  top: 50px;
  left: 1228px;
  width: 114px;
  height: 72px;
  font-size: 48px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 56px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.desc5{
  position: absolute;
  top: 130px;
  left: 1165px;
  /*width: 128px;*/
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #3C3C3C;
  line-height: 19px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce2-background{
  position: relative;
  /*width: 1920px;*/
  width: 100%;
  height: 1000px;
  background: url("../../assets/bei/Group 526.png");
  background-size: 100% 100%;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  overflow-x: hidden;
}
.introduce2-title{
  position: absolute;
  top: 216px;
  left: 236px;
  width: 176px;
  height: 66px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.about-us{
  position: absolute;
  top: 290px;
  left: 236px;
  width: 198px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce2-content1{
  position: absolute;
  top: 380px;
  left: 236px;
  width: 594px;
  height: 123px;
  font-size: 18px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #000000;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce2-content2{
  position: absolute;
  top: 534px;
  left: 236px;
  width: 584px;
  height: 384px;
  font-size: 18px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #000000;
  line-height: 32px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce2-video{
  position: absolute;
  top: 380px;
  left: 920px;
  background: url("../../assets/bei/epcjianshe.png");
  width: 764px;
  height: 470px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce3-background{
  position: relative;
  /*width: 1920px;*/
  width: 100%;
  height: 1420px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  overflow-x: hidden;
}
.introduce3-title{
  position: absolute;
  top: 100px;
  left: 828px;
  width: 264px;
  height: 66px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce3-list{
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 210px;
  left:236px;
}
.introduce3-item{
  margin-top: 32px;
}
.introduce3-item-row{
  display: flex;
  justify-content: space-between;
}
.introduce3-item-logo{
  background-color: #808080;
  width: 240px;
  height: 104px;
  border-radius: 0px 0px 0px 0px;
  background-size: 100% 100%;
  opacity: 1;
}
.introduce3-item-slogan{
  padding-top: 25px;
  width: 390px;
  height: 60px;
  font-size: 30px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 35px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce3-item-btn1{
  width: 32px;
  height: 32px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce3-item-btn2{
  width: 32px;
  height: 32px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce3-item-brief{
  margin-top: 12px;
  /*margin-bottom: 50px;*/
  width: 1440px;
  /*height: 48px;*/
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #C8000A;
  line-height: 38px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce3-item-summary{
  margin-top: 40px;
  width: 1312px;
  height: 100px;
  font-size: 20px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce3-divide{
  width: 1448px;
  height: 1px;
  background: #CACACA;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-top: 12px;
}


/*
.introduce3-img{
  position: absolute;
  top: 226px;
  left: 236px;
  background: url("../../assets/bei/logo.png");
  width: 282px;
  height: 68px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
*/
.introduce4-background{
  position: relative;
  background: url("../../assets/presentation/Group 390.png");
  /*width: 1919px;*/
  width: 100%;
  height: 773px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  overflow-x: hidden;
}
.introduce4-title{
  position: absolute;
  top: 70px;
  left: 885px;
  width: 150px;
  height: 75px;
  font-size: 50px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 59px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-time{
  position: absolute;
  top: 300px;
  left: 373px;
  width: 250px;
  height: 65px;
  font-size: 60px;
  font-family: D-DIN-DIN-Bold, D-DIN-DIN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 70px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-content{
  position: absolute;
  top: 200px;
  left: 810px;
  width: 800px;
  height: 81px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-img-wrapper{
  object-fit: fill;
}
.introduce4-img{
  position: absolute;
  top: 270px;
  left: 810px;
  background: #808080;
  width: 608px;
  height: 260px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
  object-fit: fill;
}
.introduce5-background{
  position: relative;
  /*width: 1920px;*/
  width: 100%;
  height: 1136px;
  background: #F4F4F4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  overflow-x: hidden;
}
.introduce5-title{
  position: absolute;
  top: 102px;
  left: 872px;
  width: 176px;
  height: 66px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce5-zizhi{
  position: absolute;
  top: 228px;
  left: 153px;
  width: 128px;
  height: 26px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 26px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce5-to-left{
  position: absolute;
  top: 1042px;
  left: 895px;
  background: url("../../assets/presentation/Group 185.png");
  height: 42px;
  width: 42px;
  background-size: 100% 100%;
}
.introduce5-to-left:hover,click{
  position: absolute;
  top: 1042px;
  left: 895px;
  background: url("../../assets/img/Group 331.png");
  height: 42px;
  width: 42px;
  background-size: 100% 100%;
}
.introduce5-to-right{
  position: absolute;
  top: 1042px;
  left: 980px;
  background: url("../../assets/presentation/Group 321.png");
  height: 42px;
  width: 42px;
  margin-left: 18px;
  background-size: 100% 100%;
  /*background-color: #C8000A;*/
}
.introduce5-to-right:hover,click{
  position: absolute;
  top: 1042px;
  left: 980px;
  background: url("../../assets/img/Group 184.png");
  height: 42px;
  width: 42px;
  background-size: 100% 100%;
}
.introduce6-background{
  position: relative;
  /*width: 1920px;*/
  width: 100%;
  height: 1000px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  overflow-x: hidden;
}
.introduce6-title{
  position: absolute;
  top: 140px;
  left: 155px;
  width: 128px;
  height: 26px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 26px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}

.introduce6-to-left{
  position: absolute;
  top: 930px;
  left: 880px;
  background: url("../../assets/presentation/Group 185.png");
  height: 42px;
  width: 42px;
  background-size: 100% 100%;
}
.introduce6-to-left:hover,click{
  position: absolute;
  top: 930px;
  left: 880px;
  background: url("../../assets/img/Group 331.png");
  height: 42px;
  width: 42px;
  background-size: 100% 100%;
}
.introduce6-to-right{
  position: absolute;
  top: 930px;
  left: 980px;
  background: url("../../assets/presentation/Group 321.png");
  height: 42px;
  width: 42px;
  margin-left: 12px;
  background-size: 100% 100%;
}

.introduce6-to-right:hover,click{
  position: absolute;
  top: 930px;
  left: 980px;
  background: url("../../assets/img/Group 184.png");
  height: 42px;
  width: 42px;
  background-size: 100% 100%;
}
.introduce6-list{
  position: absolute;
  top: 235px;
  /*left: 170px;*/
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.introduce6-list > div{
  width: 20%
}
.introduce6-item{
  width: 400px;
  height: 270px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-right: 19px;
  margin-bottom: 40px;
  border: 1px solid #CACACA;
  text-align: center;
  padding-top: 34px;
}
.introduce6-image{
  background-color: #545454;
  width: 358px;
  height: 230px;
}
.introduce5-list{
  position: absolute;
  top: 294px;
  left: 90px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /*justify-content: center;*/
  padding-top: 20px;
}
/*.introduce5-list > div{
  width: 20%
}*/
.introduce5-item{
  width: 400px;
  height: 270px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-right: 19px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-left: 23px;
  padding-top: 28px;
  margin-top: 5px;
  margin-bottom: 16px;
}
.introduce5-item:nth-child(n+5){
  margin-top: 40px;
}
.introduce5-image{
  background-color: #545454;
  width: 358px;
  height: 230px;
  display: block;
  margin-bottom: 8px;
  background-size: 100% 100%;
}
.introduce5-item-title{
  width: 100%;
  height: 26px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 26px;
  margin-top: 50px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.introduce4-left-and-right{
  justify-content: center;
  vertical-align: middle;
}
.introduce4-to-left{
  position: absolute;
  top: 709px;
  left: 115px;
  background: url("../../assets/bei/icon_x_left.png");
  background-size: 100% 100%;
  height: 42px;
  width: 42px;
}
.introduce4-to-right{
  position: absolute;
  top: 709px;
  left: 1730px;
  background: url("../../assets/bei/icon_x_right.png");
  background-size: 100% 100%;
  height: 42px;
  width: 42px;
}
.introduce4-divider{
  position: absolute;
  top: 730px;
  left: 200px;
  width: 1470px;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.introduce4-x-time-list{
  position: absolute;
  top: 649px;
  left: 276px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

}
.introduce4-x-time-list > div{
   width: 4%
 }
.wrapper-x{
  display: flex;
  flex-direction: column;
  position: relative;
  left: -88px;
}
.introduce4-x-time{
  width: 60px;
  height: 35px;
  font-size: 32px;
  font-family: D-DIN-DIN-Bold, D-DIN-DIN;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.4);
  line-height: 38px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.click-link-x:visited{

  color: #FFFFFF;
}

.introduce4-x-time:nth-child(n+1){
  margin-right: 160px;
}
.introduce4-y-time-list{
  position: absolute;
  top: 214px;
  left: 667px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /*justify-content: center;*/

}
.introduce4-y-time-item{
  margin-top: 30px;
  width: 100px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 28px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.y-dot{
  position: relative;
  top: -22px;
  left: 85px;
  width: 24px;
  height: 24px;
  background-image: url("../../assets/bei/Group 376.png");
  background-size: 100% 100%;
  opacity: 1;
}
.y-dot-no{
  position: relative;
  top: -17px;
  left: 93px;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 1;
}
.introduce4-y-item-date{
  color: rgba(255, 255, 255, 0.6);
}
/*.introduce4-x-time-list{

}
.introduce4-x-time-list > div{
  width: 4%
}*/
.introduce4-to-down{
  position: absolute;
  top: 522px;
  left: 752px;
  background: url("../../assets/bei/iconjiantou.png");
  background-size: 100% 100%;
  width: 24px;
  height: 24px;
  opacity: 1;
}
.introduce4-y-line{
  position: absolute;
  top: 185px;
  left: 763px;
  width: 2px;
  height: 320px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
}
.x-dot{
  position: relative;
  top: 31px;
  left: 28px;
  width: 16px;
  height: 16px;
  opacity: 1;
  background-image: url("../../assets/bei/Polygon 6.png");
  background-size: 100% 100%;
}
.x-dot-no{
  position: relative;
  top: 40px;
  left: 34px;
  width: 6px;
  height: 6px;
  opacity: 1;
  background: #FFFFFF;
  background-size: 100% 100%;
}

</style>
