<template>
  <div>
    <div class="top-background">
        <div class="title-wrapper">
          <div class="top-title">巅峰风采</div>
          <div class="top-desc">TOP TALENT</div>
          <div class="top-divide"></div>
        </div>
        <img class="icon-home"
             @click="toIndex()"
             src = "../../assets/bei/icon_home.png"/>
        <img class="icon-jiantou1" src = "../../assets/bei/icon.png"/>
        <div class="link1"
             @click=toIntroduction()
        >走进巅峰</div>
        <img class="icon-jiantou2" src = "../../assets/bei/icon.png"/>
        <div class="link2">巅峰风采</div>
    </div>

    <div class="back-bg">
      <div class="back-bg-title">巅峰风采</div>
      <div class="back-bg-desc">TOP TALENT</div>
    </div>
    <div class="mission-list" >
      <div class="mission-item" v-for="(item,i) in mission">
        <img class="mission-item-img" :src=getImgUrl(item.original_image) />
      <div class="mission-wrapper">
        <div class="mission-item-title">{{item.title}}</div>
        <div class="mission-item-desc">{{ item.description }}</div>
      </div>
      </div>
    </div>
    <div class="reveal" v-for="(item,i) in reveal">
      <img class="reveal-img" :src=getImgUrl(item.original_image)>
    </div>

    <div class="lecture-background">
      <div class="lecture-title-list">
        <div class="lecture-title-item"
             :class="{'high-light1' : i === currentIndex1}"
          v-for="(item,i) in lecture_hall"
             v-on:click="changeCurrentHall(i)"
        >{{item.title}}
        </div>
      </div>

      <div class="lecture-description">
        {{currentHall.description}}
      </div>

      <div class="lecture-img-list">
        <img class="lecture-img-item"
             :src=getImgUrl(filterHallImgs[currentHallImgIndex].original_image)
             alt="没有图片"
             />
      </div>
      <div class="left-btn1"
           v-if="filterHallImgs.length > 1"
           src="../../assets/bei/Maskgroup.png"
           v-on:click="toHallLeft()"
      ></div>
      <div class="right-btn1"
           v-if="filterHallImgs.length > 1"
           src="../../assets/bei/Maskgroup2.png"
           v-on:click="toHallRight()"
      ></div>

    </div>

    <div class="siqing-background">
      <div class="siqing-title-list">
        <div class="siqing-title-item"
             :class="{'high-light2' : k === currentIndex2}"
             v-for="(item,k) in peak_siqing"
             v-on:click="changeCurrentSiqing(k)"
        >{{item.title}}
        </div>
      </div>

      <div class="siqing-description">
        {{currentSiqing.description}}
      </div>

      <div class="siqing-img-list">
        <img class="siqing-img-item"
             :src=getImgUrl(filterSiqingImgs[currentHallImgIndex].original_image)
             alt="没有图片"
        />
      </div>
      <div class="left-btn2"
           v-if="filterSiqingImgs.length > 1"
           src="../../assets/bei/Maskgroup.png"
           v-on:click="toSiqingLeft()"
      ></div>
      <div class="right-btn2"
           v-if="filterSiqingImgs.length > 1"
           src="../../assets/bei/Maskgroup2.png"
           v-on:click="toSiqingRight()"
      ></div>

    </div>
  </div>

</template>

<script>
import { Mien } from "@/api/api";
export default {
  data() {
    return {
      "currentHallImgIndex":0,
      "currentSiqingImgIndex":0,
      "currentId1":"",
      "currentId2":"",
      "currentIndex1": 0,
      "currentIndex2": 0,
      "currentHallIndex":0,
      "currentHallImgNum":1,
      "filterHallImgs":[],
      "currentHall":{},
      "currentSiqingIndex":0,
      "currentSiqingImgNum":1,
      "filterSiqingImgs":[],
      "currentSiqing":{},
      "mission": [],
      "reveal": [],
      "lecture_hall": [],
      "peak_siqing": [],
      baseUrl:'http://ceshi.davost.com',
    }
  },
  watch:{
    $route: {
      handler() {
        this.Mien();
      },
      deep: true,
    }
  },
  methods:{
    toIndex(id){
      this.$router.push(`/index`);
    },
    toIntroduction() {
      this.$router.push({ name: "peakIntroduction"});
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getPeakStyle() {
      let { data } = await Mien({id:this.$route.params.id});
      document.title = data.data.seo_message.meta_title;
      this.mission = data.data.mission;
      this.reveal = data.data.reveal;
      this.lecture_hall = data.data.lecture_hall;
      this.peak_siqing = data.data.peak_siqing;
      this.initData();
    },
    toHallLeft(){
      var length = this.filterHallImgs.length;
      if(this.currentHallImgIndex === 0){
        this.currentHallImgIndex = length-1;
      }
      else{
        this.currentHallImgIndex--;
      }
    },
    toHallRight(){
      var length = this.filterHallImgs.length;
      if(this.currentHallImgIndex === length-1){
        this.currentHallImgIndex = 0;
      }
      else{
        this.currentHallImgIndex++;
      }
    },
    changeCurrentHall(index){
      this.currentHallIndex = index;
      this.currentHall = this.lecture_hall[index];
      this.changeCurrentHallImgs();
      this.currentIndex1 = index;
      this.currentHallImgIndex = 0;
    },
    changeCurrentSiqing(index){
      this.currentSiqingIndex = index;
      this.currentSiqing = this.peak_siqing[index];
      this.changeCurrentSiqingImgs();
      this.currentIndex2 = index;
      this.currentSiqingImgIndex = 0;
    },
    changeCurrentHallImgs(){
      let temp = this.currentHall.original_image;
      this.filterHallImgs = temp;
    },
    toSiqingLeft(){
      var length = this.filterSiqingImgs.length;
      if(this.currentSiqingImgIndex === 0){
        this.currentSiqingImgIndex = length-1;
      }
      else{
        this.currentSiqingImgIndex--;
      }
    },
    toSiqingRight(){
      var length = this.filterSiqingImgs.length;
      if(this.currentSiqingImgIndex === length-1){
        this.currentSiqingImgIndex = 0;
      }
      else{
        this.currentSiqingImgIndex++;
      }
    },

    changeCurrentSiqingImgs(){
      let temp = this.currentSiqing.original_image;
      this.filterSiqingImgs = temp;
    },
    initData(){
      this.changeCurrentHall(0);
      this.changeCurrentSiqing(0);
    }
  },
  created: function(){
  },
  mounted() {
    this.getPeakStyle();
  }
};

</script>

<style scoped>
/*html,body{
  width: 100%;
  height: 100%;
}*/
*{
  margin: 0;
  padding: 0;
}
.top-background{
  background-image: url("../../assets/bei/Group 509.png");
  /*width: 1920px;*/
  height: 700px;
  width: 100%;
  /*background-size: 100% 100%;*/
  overflow-x: hidden;
}
.title-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 270px 0;
}
.top-title{
  /*position: absolute;
  top: 400px;
  left: 813px;*/
  /*width: 500px;*/
  height: 62px;
  font-size: 60px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 32px;
  letter-spacing: 14px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.top-desc{
  /*position: absolute;
  top: 470px;
  left: 885px;*/
  /*width: 300px;*/
  height: 32px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 32px;
  letter-spacing: 4px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  margin-top: 10px;
}
.top-divide{
  /*position: absolute;
  top: 525px;
  left: 920px;*/
  width: 80px;
  height: 4px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-top: 20px;
}
.icon-home{
  position: absolute;
  top: 744px;
  left: 236px;
  width: 24px;
  height: 24px;
  opacity: 1;
  box-sizing: border-box;
}
.icon-jiantou1{
  position: absolute;
  top: 748px;
  left: 272px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.icon-jiantou2{
  position: absolute;
  top: 748px;
  left: 380px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.link1{
  position: absolute;
  top: 745px;
  left: 300px;
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
  top: 745px;
  left: 404px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 24px;
  /* -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;*/
}
.back-bg{
  /*width: 1920px;*/
  width: 100%;
  height: 224px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
}
.back-bg-title{
  position: absolute;
  top: 881px;
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
.back-bg-desc{
  position: absolute;
  top: 955px;
  left: 236px;
  width: 200px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.mission-list{
  display: flex;
  flex-direction: row;
  /*justify-content: center;*/
  /*width: 100%;*/
  /*background-color: yellow;*/
}
.mission-item{
  width: 33.3%;
}
.mission-item-img{
  width: 100%;
  /*height: 527px;*/
  background-size: 100% 100%;
  /*background-color: #808080;*/
}
.mission-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -330px;
  padding-bottom: 50px;
}
.mission-item-title{
  /*position: relative;
  top: -283px;
  left: 244px;*/
  /*width: 152px;*/
  height: 57px;
  font-size: 38px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 45px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  z-index: 100;
  margin-bottom: 20px;
}
.mission-item-desc{
  /*position: relative;
  top: -252px;
  left: 196px;*/
  /*width: 249px;*/
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 23px;
  margin-bottom: -92px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  z-index: 100;
}
.reveal{
  display: flex;
  justify-content: center;
}
.reveal-img{
  /*width: 1920px;*/
  /*width: 100%;
  height: 1134px;*/
  width: 1592px;
  height: 752px;
  background-size: 100% 100%;
  /*background-color: #808080;*/
  margin-bottom: 70px;
}
.lecture-background{
  background: #F0F0F0;
  background-size: 100% 100%;
  /*width: 1920px;*/
  width: 100%;
  height: 752px;
  margin-top: -6px;
  position: relative;
}
.lecture-title-list{
  display: flex;
  position: absolute;
  top: 70px;
  left: 236px;
}
.lecture-high-light{
  width: auto;
  height: 42px;
  font-size: 28px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 33px;
  margin-right: 60px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.lecture-high-light:nth-child(n+2)::after{
  content: "";
  height: 80%;
  display: block;
  border-left: 2px solid #CACACA;
  position: relative;
  top: -30px;
  left: -26px;
}
.lecture-title-item{
  width: auto;
  height: 42px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 500;
  color: #6E6E6E;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  margin-right: 57px;
}
.high-light1{
  /*width: 160px;*/
  height: 42px;
  font-size: 28px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}

.lecture-title-item:nth-child(n+2)::after{
  content: "";
  height: 80%;
  display: block;
  border-left: 2px solid #CACACA;
  position: relative;
  top: -30px;
  left: -26px;
}
.lecture-description{
  position: absolute;
  top: 136px;
  left: 236px;
  width: 1448px;
  height: 90px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.lecture-img-list{
  position: absolute;
  top: 276px;
  left: 236px;
  height: 414px;
}
.lecture-img-item{
  width: 1440px;
  height: 450px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
}

.left-btn1{
  position: absolute;
  top: 467px;
  left: 138px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-image: url("../../assets/img/jiantou37left1.png");
  background-size: 100% 100%;
}
.left-btn1:hover,click{
  position: absolute;
  top: 467px;
  left: 138px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-image: url("../../assets/img/jiantou37left2.png");
  background-size: 100% 100%;
}
.right-btn1{
  position: absolute;
  top: 467px;
  right: 154px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-image: url("../../assets/img/jiantou37right1.png");
  background-size: 100% 100%;
}
.right-btn1:hover,click{
  position: absolute;
  top: 467px;
  right: 154px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-image: url("../../assets/img/jiantou37right2.png");
  background-size: 100% 100%;
}
.siqing-background{
  background: #FFFFFF;
  background-size: 100% 100%;
  /*width: 1920px;*/
  width: 100%;
  height: 752px;
  margin-top: -6px;
  position: relative;
}
.siqing-title-list{
  display: flex;
  position: absolute;
  top: 70px;
  left: 236px;
}
.siqing-title-item{
  width: auto;
  height: 42px;
  font-size: 24px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #6E6E6E;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  margin-right: 57px;
}
.high-light2{
  /*width: 112px;*/
  height: 42px;
  font-size: 28px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.siqing-title-item:nth-child(n+2)::after{
  content: "";
  height: 80%;
  display: block;
  border-left: 2px solid #CACACA;
  position: relative;
  top: -30px;
  left: -26px;
}
.siqing-description{
  position: absolute;
  top: 136px;
  left: 236px;
  width: 1448px;
  height: 90px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.siqing-img-list{
  position: absolute;
  top: 276px;
  left: 236px;
  height: 414px;
}
.siqing-img-item{
  position: absolute;
  top: 0px;
  width: 1440px;
  height: 450px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}

.left-btn2{
  position: absolute;
  top: 467px;
  left: 138px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-image: url("../../assets/img/jiantou37left1.png");
  background-size: 100% 100%;
}
.left-btn2:hover,click{
  position: absolute;
  top: 467px;
  left: 138px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-image: url("../../assets/img/jiantou37left2.png");
  background-size: 100% 100%;
}
.right-btn2{
  position: absolute;
  top: 467px;
  right: 154px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-image: url("../../assets/img/jiantou37right1.png");
  background-size: 100% 100%;
}
.right-btn2:hover,click{
  position: absolute;
  top: 467px;
  right: 154px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-image: url("../../assets/img/jiantou37right2.png");
  background-size: 100% 100%;
}
</style>