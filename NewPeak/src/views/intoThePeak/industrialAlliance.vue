<template>
  <div class="bk">
    <div class="top-background">
      <div class="top-title">产业联盟</div>
      <div class="top-desc">TOP TALENT</div>
      <div class="top-divide"></div>
      <img class="icon-home"  src="../../assets/bei/icon_home.png"/>
      <img class="icon-jiantou1" src = "../../assets/bei/icon.png"/>
      <div class="link1">走进巅峰</div>
      <img class="icon-jiantou2" src = "../../assets/bei/icon.png"/>
      <div class="link2">产业联盟</div>
    </div>

    <div class="union-background-list" v-for="(item1, i) in union">
      <div class="row1">
        <div class="row1-divide">
        </div>
        <div class="row1-title">
          {{item1.title}}
        </div>
        <div class="row1-link-more" v-if="item1.linkurl" @click="toMoreInfo()">
        </div>
      </div>



      <div class="row2-desc" ref="row2Desc">
        {{item1.small_descrip}}
      </div>
      <div class="row3-to-left"
          v-if="item1.original_image.length > 1"
          v-on:click="toLeft(i)"
      ></div>

      <img class="row3-image"
           :src=getImgUrl(itemImg.original_image)
            v-for="(itemImg,j) in item1.original_image"
      />

      <div class="row3-to-right"
           v-if="item1.original_image.length > 1"
           v-on:click="toRight(i)"
      ></div>

      <div class="row3-document-list">
        <div class="row3-document-item" v-for="(itemDocument,j) in item1.document">
          <div class="document-title-time">
            <div class="document-title"
            >{{itemDocument.title}}</div>
            <div class="document-time">{{itemDocument.addtime}}</div>
          </div>
          <div class="document-summary"
          >
            {{itemDocument.summary}}
          </div>
          <div class="document-link" v-if="item1.linkurl">
            <img class="icon-more-document"  src="../../assets/img/Group40.png"/>
            查看详情
          </div>
        </div>
      </div>




    </div>


  </div>

</template>

<script>
import { leagues } from "@/api/api";
export default {
  components: {},

  data() {
    return {
      "unionLength":0,
      "currentImgIndex":[],
      "union": [],
      "moreInfoUrl": 'http://xczx.news.cn/mobile.htm',
      baseUrl:'http://ceshi.davost.com',
    }
  },
  watch:{
    $route: {
      handler() {
        this.leagues();
      },
      deep: true,
    }
  },
  methods:{
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getAlliance() {
      let { data } = await leagues({id:this.$route.params.id});
      this.union = data.data.union;

      this.initData();
    },
    toMoreInfo(){
        window.location.href = this.moreInfoUrl;
    },
    toLeft(i){
      let number = this.currentImgIndex[i];
      if(number === 0){
        number = this.union[i].original_image.length;
      }
      else{
        number = number - 1;
      }
      this.currentImgIndex[i] = number;
    },
    toRight(i){
      let number = this.currentImgIndex[i];
      if(number >= this.union[i].original_image.length-1){
        number = 0;
      }
      else{
        number = number + 1;
      }
      this.currentImgIndex[i] = number;
    },
    initData() {
      this.unionLength = this.union.length;
      for(let i =0;i<this.unionLength;++i){
        this.currentImgIndex.push(0);
      }
    }
  },
  created(){

  },
  mounted() {
    this.getAlliance();
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
.bk{
  width: 100%;
  overflow: hidden;
}
.top-background{
  background-image: url("../../assets/bei/Group 507.png");
  /*width: 1920px;*/
  height: 700px;
  width: 100%;
  /*background-size: 100% 100%;*/

}
.top-title{
  position: absolute;
  top: 400px;
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
  top: 470px;
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
  top: 520px;
  left: 920px;
  width: 80px;
  height: 4px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.icon-home{
  position: absolute;
  top: 750px;
  left: 236px;
  width: 24px;
  height: 24px;
  opacity: 1;
  box-sizing: border-box;
}
.icon-jiantou1{
  position: absolute;
  top: 756px;
  left: 272px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.icon-jiantou2{
  position: absolute;
  top: 756px;
  left: 378px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.link1{
  position: absolute;
  top: 752px;
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
  top: 752px;
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
.icon-more-document{
  width: 8px;
  height: 8px;
  background-size: 100% 100%;
}
.union-background-list{
  padding-left: 245px;
  padding-top: 70px;
}
.union-background-list:nth-child(2n){
  /*position: relative;
  width: 1919px;
  height: 930px;*/
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  width: 100%;
}
.union-background-list:nth-child(2n+1){
  /*position: relative;
  width: 1920px;
  height: 930px;*/
  background: #F4F4F4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.row1{
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.row1-divide{
  /*position: absolute;
  top: 87px;
  left: 235px;*/
  position: relative;
  top: 10px;
  width: 4px;
  height: 24px;
  background: #C8000A;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-right: 8px;
}
.row1-title{
  /*position: absolute;
  top: 77px;
  left: 247px;*/

  height: 51px;
  font-size: 34px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 40px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.row1-link-more{
  /*position: absolute;
  top: 85px;
  left: 1543px;*/
  margin-left: 900px;
  background-image: url("../../assets/mien/Group 374more.png");
  width: 140px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 28px;
  background-size: 100% 100%;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.row1-link-more:hover{
  /*position: absolute;
  top: 85px;
  left: 1543px;*/
  margin-left: 900px;
  background-image: url("../../assets/mien/Group 397more.png");
  width: 140px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 28px;
  background-size: 100% 100%;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.row2-desc{
  /*position: absolute;
  top: 160px;
  left: 235px;*/
  width: 1448px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 32px;
  margin-bottom: 50px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}

.row3-to-left{
  position: relative;
  top: 160px;
  left: -50px;
  width: 37px;
  height: 37px;
  background-image: url("../../assets/bei/Maskcy1.png");
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
}
.row3-to-left:hover,click{
  position: relative;
  top: 160px;
  left: -50px;
  width: 37px;
  height: 37px;
  background-image: url("../../assets/bei/Mask groupzh.png");
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
}
.row3-to-right{
  position: relative;
  top: -187px;
  left: 1435px;
  width: 37px;
  height: 37px;
  background-image: url("../../assets/bei/Mask group111.png");
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
  margin-left: 23px;
}
.row3-to-right:hover,click{
  position: relative;
  top: -189px;
  left: 1435px;
  width: 37px;
  height: 37px;
  background-image: url("../../assets/bei/Mask group222.png");
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-size: 100% 100%;
  margin-left: 23px;
}
.row3-image{
  /*position: relative;
  top: 400px;
  left: 236px;*/
  width: 1448px;
  height: 280px;
  background-color: red;
  margin-bottom: 30px;
}
.row3-document-list{
  /*position: absolute;
  top: 700px;
  left: 235px;*/
  width: 1448px;
}

.row3-document-item{
  margin-top: 24px;
  border-bottom: 1px solid #CACACA;
}
.document-title-time{
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.document-title{
  height: 42px;
  font-size: 28px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.document-title-hl{
  height: 42px;
  font-size: 28px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: red;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.document-title:hover,click{
  height: 42px;
  font-size: 28px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: red;
  line-height: 33px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.document-time{

  height: 40px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 40px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.document-summary{
  width: 1448px;
  height: 60px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 30px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.document-summary-hl{
  width: 1448px;
  height: 60px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: red;
  line-height: 30px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.document-summary:hover,click{
  width: 1448px;
  height: 60px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: red;
  line-height: 30px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.document-link{
  margin-top: 16px;
  margin-bottom: 20px;
  width: 100px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #A0A0A0;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}

</style>