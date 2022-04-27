<template>
  <div>
    <div class="top-background">
        <div class="top-title">巅峰风采</div>
        <div class="top-desc">TOP TALENT</div>
        <div class="top-divide"></div>
        <img class="icon-home"  src = "../../assets/bei/icon_home.png"/>
        <img class="icon-jiantou1" src = "../../assets/bei/icon.png"/>
        <div class="link1">走进巅峰</div>
        <img class="icon-jiantou2" src = "../../assets/bei/icon.png"/>
        <div class="link2">巅峰风采</div>
    </div>

    <div class="back-bg">
      <div class="back-bg-title">巅峰风采</div>
      <div class="back-bg-desc">TOP TALENT</div>
    </div>
    <div class="mission-list" >
      <div class="mission-item" v-for="(item,i) in mission">
        <img class="mission-item-img" src="item.original_image"/>
        <div class="mission-item-title">{{item.title}}</div>
        <div class="mission-item-desc">{{ item.description }}</div>
      </div>
    </div>
    <div class="reveal">
      <img class="reveal-img" src="reveal.original_image">
    </div>

    <div class="lecture-background">
      <div class="lecture-title-list">
        <div class="lecture-title-item"
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
             :src="item.original_image"
             v-for="(item,i) in filterHallImgs"
             />
      </div>
      <img class="left-btn1"
           src="../../assets/bei/Maskgroup.png"
           v-on:click="toHallLeft()"
      />
      <img class="right-btn1"
           src="../../assets/bei/Maskgroup2.png"
           v-on:click="toHallRight()"
      />

    </div>

    <div class="siqing-background">
      <div class="siqing-title-list">
        <div class="siqing-title-item"
             v-for="(item,i) in peak_siqing"
             v-on:click="changeCurrentSiqing(i)"
        >{{item.title}}
        </div>
      </div>

      <div class="siqing-description">
        {{currentSiqing.description}}
      </div>

      <div class="siqing-img-list">
        <img class="siqing-img-item"
             :src="item.original_image"
             v-for="(item,i) in filterSiqingImgs"
        />
      </div>
      <img class="left-btn2"
           src="../../assets/bei/Maskgroup.png"
           v-on:click="toSiqingLeft()"
      />
      <img class="right-btn2"
           src="../../assets/bei/Maskgroup2.png"
           v-on:click="toSiqingRight()"
      />

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      "currentHallIndex":0,
      "currentHallImgNum":1,
      "filterHallImgs":[],
      "currentHall":{},
      "currentSiqingIndex":0,
      "currentSiqingImgNum":1,
      "filterSiqingImgs":[],
      "currentSiqing":{},
      "mission": [
        {
          "title": "巅峰使命",
          "description": "制造美丽中国 缔造美好生活",
          "original_image": "/uploads/20220329/538d0a05c8ca4f4b982df44642803a3c.jpg"
        },
        {
          "title": "巅峰使命",
          "description": "制造美丽中国 缔造美好生活",
          "original_image": "/uploads/20220329/538d0a05c8ca4f4b982df44642803a3c.jpg"
        },
        {
          "title": "巅峰使命",
          "description": "制造美丽中国 缔造美好生活",
          "original_image": "/uploads/20220329/538d0a05c8ca4f4b982df44642803a3c.jpg"
        }
      ],
      "reveal": [
        {
          "title": "展示图",
          "original_image": "/uploads/20220329/6c14a9795fb061c01bf141ae950bb8d3.jpg"
        }
      ],
      "lecture_hall": [
        {
          "id": "1",
          "title": "巅峰大讲堂",
          "description": "资源有限，智慧无穷。",
          "original_image": [
            {
              "title": "747",
              "original_image": "/uploads/20220329/d1db8ef7c52103c34b14d41041a3ef2c.jpg"
            },
            {
              "title": "747",
              "original_image": "/uploads/20220329/d1db8ef7c52103c34b14d41041a3ef2c.jpg"
            },
            {
              "title": "747",
              "original_image": "/uploads/20220329/d1db8ef7c52103c34b14d41041a3ef2c.jpg"
            },
            {
              "title": "747",
              "original_image": "/uploads/20220329/d1db8ef7c52103c34b14d41041a3ef2c.jpg"
            },
            {
              "title": "747",
              "original_image": "/uploads/20220329/d1db8ef7c52103c34b14d41041a3ef2c.jpg"
            },
            {
              "title": "747",
              "original_image": "/uploads/20220329/d1db8ef7c52103c34b14d41041a3ef2c.jpg"
            },
            {
              "title": "747",
              "original_image": "/uploads/20220329/d1db8ef7c52103c34b14d41041a3ef2c.jpg"
            }
          ]
        },
        {
          "id": "2",
          "title": "巅峰第三空间",
          "description": "巅峰第三空间",
          "original_image": [
            {
              "title": "图片1",
              "original_image": null
            }
          ]
        }
      ],
      "peak_siqing": [
        {
          "id": "3",
          "title": "巅峰司庆",
          "description": "巅峰智业",
          "original_image": [
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            },
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            }
          ]
        },
        {
          "id": "4",
          "title": "巅峰司庆1",
          "description": "巅峰智业11",
          "original_image": [
            {
              "title": "图片1",
              "original_image": "/uploads/20220329/708ab9ed893e01463b00cd9a3715af56.jpg"
            }
          ]
        },
      ],
      "seo_message": {
        "meta_title": "巅峰风采_北京巅峰智业旅游文化创意股份有限公司官方网站",
            "meta_keywords": "",
            "meta_description": "巅峰风采_北京巅峰智业旅游文化创意股份有限公司官方网站",
            "meta_author": "巅峰智业,davost.com",
            "meta_copyright": "巅峰智业 Copyright (C), All Rights Reserved."
      }
    }
  },
  methods:{
    toHallLeft(){
      let number = this.currentHallImgNum;
      let nowImgs = this.currentHall.original_image;
      if(number === 1){
        this.currentHallImgNum = Math.ceil(nowImgs.length / 5);
        number = Math.ceil(nowImgs.length / 5);
      }
      else{
        this.currentHallImgNum = this.currentHallImgNum - 1;
        number = this.currentHallImgNum;
      }
      this.filterHallImgs = nowImgs.slice((number-1)*5,number*5);
    },
    toHallRight(){
      let number = this.currentHallImgNum;
      let nowImgs = this.currentHall.original_image;
      if(number === Math.ceil(nowImgs.length / 5)){
        number = 1;
        this.currentHallImgNum = 1;
      }
      else{
        this.currentHallImgNum = this.currentHallImgNum + 1;
        number = this.currentHallImgNum;
      }
      this.filterHallImgs = nowImgs.slice((number-1)*5,number*5);
    },
    changeCurrentHall(index){
      this.currentHallIndex = index;
      this.currentHall = this.lecture_hall[index];
      console.log(index);
      this.changeCurrentHallImgs();
    },
    changeCurrentHallImgs(){
      let temp = this.currentHall.original_image;
      this.filterHallImgs = temp.slice(0,5);
      console.log(this.filterHallImgs)
    },
    toSiqingLeft(){
      let number = this.currentSiqingImgNum;
      let nowImgs = this.currentSiqing.original_image;
      if(number === 1){
        this.currentSiqingImgNum = Math.ceil(nowImgs.length / 5);
        number = Math.ceil(nowImgs.length / 5);
      }
      else{
        this.currentSiqingImgNum = this.currentSiqingImgNum - 1;
        number = this.currentSiqingImgNum;
      }
      this.filterSiqingImgs = nowImgs.slice((number-1)*5,number*5);
    },
    toSiqingRight(){
      let number = this.currentSiqingImgNum;
      let nowImgs = this.currentSiqing.original_image;
      if(number === Math.ceil(nowImgs.length / 5)){
        number = 1;
        this.currentSiqingImgNum = 1;
      }
      else{
        this.currentSiqingImgNum = this.currentSiqingImgNum + 1;
        number = this.currentSiqingImgNum;
      }
      this.filterSiqingImgs = nowImgs.slice((number-1)*5,number*5);
    },
    changeCurrentSiqing(index){
      this.currentSiqingIndex = index;
      this.currentSiqing = this.peak_siqing[index];
      this.changeCurrentSiqingImgs();
    },
    changeCurrentSiqingImgs(){
      let temp = this.currentSiqing.original_image;
      this.filterSiqingImgs = temp.slice(0,5);
    },
  },
  created: function(){
    this.changeCurrentHall(0);
    this.changeCurrentSiqing(0);
  }
};

</script>

<style scoped>
html,body{
  width: 100%;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
.top-background{
  background-image: url("../../assets/bei/Group 509.png");
  width: 1920px;
  height: 700px;
  /*background-size: 100% 100%;*/

}
.top-title{
  position: absolute;
  top: 287px;
  left: 813px;
  width: 500px;
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
  position: absolute;
  top: 361px;
  left: 885px;
  width: 300px;
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
.top-divide{
  position: absolute;
  top: 409px;
  left: 920px;
  width: 80px;
  height: 4px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.icon-home{
  position: absolute;
  top: 649px;
  left: 236px;
  width: 24px;
  height: 24px;
  opacity: 1;
  box-sizing: border-box;
}
.icon-jiantou1{
  position: absolute;
  top: 651px;
  left: 272px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.icon-jiantou2{
  position: absolute;
  top: 651px;
  left: 376px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.link1{
  position: absolute;
  top: 646px;
  left: 300px;
  width: 64px;
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
  top: 646px;
  left: 404px;
  width: 64px;
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
  width: 1920px;
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
}
.mission-item-img{
  width: 630px;
  height: 527px;
  background-size: 100% 100%;
  background-color: #808080;
}
.mission-item-title{
  position: relative;
  top: -283px;
  left: 244px;
  width: 152px;
  height: 57px;
  font-size: 38px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 45px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.mission-item-desc{
  position: relative;
  top: -252px;
  left: 196px;
  width: 249px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 23px;
  margin-bottom: -92px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.reveal-img{
  width: 1920px;
  height: 1134px;
  background-size: 100% 100%;
  background-color: #808080;
}
.lecture-background{
  background-image: url("../../assets/mien/Rectangle 381.png");
  background-size: 100% 100%;
  width: 1920px;
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
.lecture-title-item{
  width: auto;
  height: 42px;
  font-size: 28px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  margin-right: 57px;
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
/*{
  width: 1448px;
  height: 90px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  !*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*!
}*/
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
.lecture-img-item:nth-child(1){
  width: 625px;
  height: 414px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: red;
}
.lecture-img-item:nth-child(2){
  position: absolute;
  top: 0px;
  margin-left: 16px;
  width: 396px;
  height: 199px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: blue;
}
.lecture-img-item:nth-child(3){
  position: absolute;
  top: 0px;
  left: 1055px;
  width: 396px;
  height: 199px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: blue;
}
.lecture-img-item:nth-child(4){
  position: absolute;
  top: 215px;
  margin-left: 16px;
  width: 396px;
  height: 199px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: blue;
}
.lecture-img-item:nth-child(5){
  position: absolute;
  top: 215px;
  left: 1055px;
  width: 396px;
  height: 199px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: blue;
}
.left-btn1{
  position: absolute;
  top: 467px;
  left: 138px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-size: 100% 100%;
}
.right-btn1{
  position: absolute;
  top: 467px;
  right: 154px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-size: 100% 100%;
}
.siqing-background{
  background-image: url("../../assets/mien/Rectangle 381.png");
  background-size: 100% 100%;
  width: 1920px;
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
  font-size: 28px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  margin-right: 57px;
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
/*{
  width: 1448px;
  height: 90px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  !*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*!
}*/
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
.siqing-img-item:nth-child(1){
  position: absolute;
  top: 0px;
  width: 396px;
  height: 199px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: yellow;
}
.siqing-img-item:nth-child(2){
  position: absolute;
  top: 0px;
  left: 392px;
  margin-left: 16px;
  width: 396px;
  height: 199px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: pink;
}
.siqing-img-item:nth-child(3){
  position: absolute;
  top: 215px;
  left: 0px;
  width: 396px;
  height: 199px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: black;
}
.siqing-img-item:nth-child(4){
  position: absolute;
  top: 215px;
  left: 392px;
  margin-left: 16px;
  width: 396px;
  height: 199px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: white;
}
.siqing-img-item:nth-child(5){
  position: relative;
  left: 830px;
  width: 625px;
  height: 414px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: red;
}
.left-btn2{
  position: absolute;
  top: 467px;
  left: 138px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-size: 100% 100%;
}
.right-btn2{
  position: absolute;
  top: 467px;
  right: 154px;
  width: 37px;
  height: 37px;
  opacity: 1;
  background-size: 100% 100%;
}
</style>