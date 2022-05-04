<template>
  <!-- 巅峰团队尝试版区块 -->
  <div class="team-detail-background">

    <img class="detail-img" :src=getImgUrl(team_detail.original_image) />

    <div class="detail-name">{{team_detail.name}}</div>
    <div class="detail-title">{{team_detail.title}}</div>
    <img class="detail-back"
         src="../../assets/story-detail/Group 397@2x.png"
         v-on:click="toPeakTeam(11)"/>
    <img class="detail-divider" src="../../assets/mien/Rectangle 381@2x.png">

      <div class="detail-brief-title">个人简介</div>
      <div class="detail-summary" v-html="team_detail.summary"></div>
      <div class="detail-awards-title">获奖经历</div>
      <div class="detail-awards-list" v-html="team_detail.awards"></div>
      <div class="detail-projects-title">项目经验</div>
      <div class="detail-projects-title-little">参与项目</div>
      <div class="detail-projects-list" v-html="team_detail.projects"></div>

  </div>
</template>

<script>
import { teamdetail } from "@/api/api";
export default {
  data(){
    return{
        "team_detail": {},
        baseUrl:'http://ceshi.davost.com',
      }
  },
  watch:{
    $route: {
      handler() {
        this.teamdetail();
      },
      deep: true,
    }
  },
  methods: {
    async getTeamDetail() {
      let {data} = await teamdetail({id: this.$route.params.id});
      this.team_detail = data.data.team_detail
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    toPeakTeam(id) {
      this.$router.push(`/PeakTeam/${id}`);
    },
  },
  mounted() {
    this.getTeamDetail();
  }
};

</script>

<style scoped>
/* 设置巅峰团队的样式 */

.team-detail-background{
  /*width: ;*/
  height: 100%;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  overflow-x: hidden;
  /*overflow-y: auto;*/
  display: flex;
  flex-direction: column;
  padding-top: 105px;
  padding-left: 741px;
  overflow-y: auto;
}

.detail-img{
  position: absolute;
  top: 211px;
  left: 237px;
  /*margin-top: 211px;
  margin-left: 237px;*/
  width: 398px;
  height: 488px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: #808080;
}
.detail-name{
  /*position: absolute;
  top: 211px;
  left: 741px;*/
  height: 37px;
  font-size: 42px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  margin-bottom: 20px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-title{
  /*position: absolute;
  top: 264px;
  left: 741px;*/
  height: 24px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 24px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-back{
  /*position: absolute;
  top: 211px;
  left: 1657px;*/
  position: relative;
  top: -79px;
  left: 915px;
  width: 64px;
  height: 37px;
  font-size: 20px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 37px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/

}
.detail-divider{
  /*position: absolute;
  top: 312px;
  left: 741px;*/
  width: 980px;
  height: 1px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-bottom: 20px;
}
.info-wrapper1{
  display: flex;
  flex-direction: column;
  margin-top: 105px;
  margin-left: 741px;
  /*position: absolute;
  top: 345px;
  left: 741px;*/


}
.detail-brief-title{
  /*position: relative;*/
  width: 80px;
  /*height: 37px;*/
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  margin-bottom: 15px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-summary{
  /*position: absolute;
  top: 394px;
  left: 741px;*/
  width: 940px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-awards-title{
  /*position: absolute;
  top: 699px;
  left: 741px;*/
  width: 80px;
  /*height: 37px;*/
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  margin-top: 10px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-awards-list{
  /*position: absolute;
  top: 758px;
  left: 741px;*/
  /*height: 32px;*/
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  float: left;
  display: block;
  margin-bottom: 10px;
}
.detail-awards-list li{
  /*height: 32px;*/
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  display:inline-block

}
.detail-projects-title{
  /*position: absolute;
  top: 896px;
  left: 741px;*/
  width: 80px;
  /*height: 37px;*/
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  margin-bottom: 10px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-projects-title-little{
  /*position: absolute;
  top: 953px;
  left: 741px;*/
  width: 72px;
  /*height: 24px;*/
  font-size: 18px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #3C3C3C;
  line-height: 24px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-projects-list{
  /*position: absolute;
  top: 989px;
  left: 744px;*/
  width: 900px;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/

}
</style>