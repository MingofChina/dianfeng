<template>
  <!-- 巅峰团队尝试版区块 -->
  <div class="total-wrapper">
    <div class="top-wrapper">
      <div class="top-wrapper-title">
        <div class="top-title">巅峰团队</div>
        <div class="title-translate">TOP TEAM</div>
        <div class="top-title-item"></div>
      </div>
      <ul class="current-place">
        <li class="current-first-item"
            @click=toIndex()
        ></li>
        <li class="current-second-item"></li>
        <li
            @click=toIntroduction()
        >走进巅峰</li>
        <li class="current-third-item"></li>
        <li class="current-place-child">巅峰团队</li>
      </ul>
    </div>
    <div class="main-info-wrapper">
      <div class="main-info-nav">
        <div class="tab-item" :class="{ 'light': active === 1 }" @click="changeTab(1)"
        v-on:click="getTeam('2,10',true)"
        >管理团队</div>
        <div class="tab-item"
          :class="{ 'light': active === 2 }"
          @click="changeTab(2)"
          v-on:click="getTeam('2,11',true)"
        >
          专家团队
        </div>
        <div class="tab-item" :class="{ 'light': active === 3 }" @click="changeTab(3)"
             v-on:click="getTeam('2,23',true)"
        >技术团队</div>
      </div>
      <div v-if="active === 1" class="team-introduction-part"
      >
        <div class="intr-partone">
          <img class="partone-first-child" @click="toTeamDetail(team[0].id)" :src=getImgUrl(team[0].original_image)>
          <div class="partone-inner">
            <div class="inner-information1">
              <div style="margin-bottom: 15px" @click="toTeamDetail(team[0].id)"> {{ team[0].name }} </div>
              <div class="inner-information-item"> {{ team[0].title }} </div>
            </div>
            <div class="inner-introduce" @click="toTeamDetail(team[0].id)"> {{ team[0].profile }} </div>
          </div>
        </div>
        <div class="intr-parttwo">
          <div class="parttwo-left">
            <img class="left-first-child" @click="toTeamDetail(team[1].id)" :src=getImgUrl(team[1].original_image)>
            <div class="left-inner">
              <div class="left-information">
                <span @click="toTeamDetail(team[1].id)"> {{ team[1].name }} </span>
                <span class="left-information-item">{{ team[1].title }}</span>
              </div>
              <div class="left-introduce" @click="toTeamDetail(team[1].id)"> {{ team[1].profile }} </div>
            </div>
          </div>
          <div class="parttwo-right">
            <img class="right-first-child" @click="toTeamDetail(team[2].id)" :src=getImgUrl(team[2].original_image)>
            <div class="right-inner">
              <div class="right-information">
                <span  @click="toTeamDetail(team[2].id)"> {{ team[2].name }} </span>
                <span class="right-information-item">{{ team[2].title }}</span>
              </div>
              <div class="right-introduce" @click="toTeamDetail(team[2].id)"> {{ team[2].profile }} </div>
            </div>
          </div>
        </div>
        <div class="intr-partthree">
          <div class="partthree-wrapper">
            <div class="partthree-child" v-if="index>2" v-for="(item, index) in team">
              <img class="partthree-image" @click="toTeamDetail(item.id)" :src=getImgUrl(item.original_image)>
              <div class="partthree-name"  @click="toTeamDetail(item.id)">{{ item.name }}</div>
              <div class="partthree-title"  >{{ item.title }}</div>
            </div>
          </div>
          <div class="load-more"
               v-if="!loadDoneFirst"
               @click="loadMore">
            加载更多...
          </div>
        </div>
      </div>

      <div v-if="active === 2" class="master-introduction-part">
        <div class="intr-partthree">
          <div class="partthree-wrapper">
            <div class="partthree-child" v-for="(item, index) in team">
              <img class="partthree-image" @click="toTeamDetail(item.id)" :src=getImgUrl(item.original_image)>
              <div class="partthree-name"  @click="toTeamDetail(item.id)">{{ item.name }}</div>
              <div class="partthree-title">{{ item.title }}</div>
            </div>
          </div>
          <div class="load-more"
               v-if="!loadDoneSecond"
               @click="loadMore">
            加载更多...
          </div>
        </div>
      </div>

      <div v-if="active === 3" class="team-introduction-part">
        <div class="intr-partthree">
          <div class="partthree-wrapper">
              <div class="partthree-child" v-for="(item, index) in team">
                <img class="partthree-image" @click="toTeamDetail(item.id)" :src=getImgUrl(item.original_image)
                  v-on:click="toTeamDetail(item.id)">
                <div class="partthree-name">{{ item.name }}</div>
                <div class="partthree-title"
                  @click="toTeamDetail(item.id)">{{ item.title }}</div>
              </div>
          </div>
          <div class="load-more"
               v-if="!loadDoneThird"
               @click="loadMore">
            加载更多...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { team } from "@/api/api";
export default {
  data() {
    return {
      team: [],
      active: 1,
      baseUrl:'http://ceshi.davost.com',
      currentCateId: "2,10",
      pages: 0,
      pageSize: 10,
      firstRequest: true,
      secondRequest: true,
      thirdRequest: true,
      loadDoneFirst: false,
      loadDoneSecond: false,
      loadDoneThird: false
    };
  },
  watch:{
    $route: {
      handler() {
        this.team();
      },
      deep: true,
    },
  },
  mounted() {
    var dataFlag = false;
    if(this.$route.query.cateId){
      this.currentCateId = this.$route.query.cateId;
    }
    if(this.currentCateId === "2,10"){
      this.active = 1;
    }
    else if(this.currentCateId === "2,11"){
      this.active = 2;
    }
    else if(this.currentCateId === "2,23"){
      this.active = 3;
    }
    if(this.$route.query.teamList) {
      this.team = this.$route.query.teamList;
      dataFlag = true;
    }
    if(!dataFlag){
      this.getTeam(this.currentCateId,true);
    }
  },
  methods: {
    toIndex() {
      this.$router.push({ name: "index"});
    },
    toIntroduction() {
      this.$router.push({ name: "peakIntroduction"});
    },
    loadMore() {
        this.getTeam(this.currentCateId,false);
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getTeam(cateId, refreshFlag) {
      if(this.currentCateId !== cateId || refreshFlag){
        this.team = [];
        this.pages = 0;
      }
      this.pages++;
      this.currentCateId = cateId;
      this.pageSize = 8;
      if(this.active === 1 && this.firstRequest){
        this.pageSize = 11;
        this.firstRequest = false;
      }
      else if(this.active === 2 && this.secondRequest){
        this.pageSize = 12;
        this.secondRequest = false;
      }
      else if(this.active === 3 && this.thireRequest){
        this.pageSize = 12;
        this.thirdRequest = false;
      }
      let {data} = await team({pages:this.pages,
        pagesize: this.pageSize,
        cate_id: this.currentCateId});
      document.title = data.data.seo_message.meta_title;
      if(this.pages === 1){
        this.team = data.data.team;
      }
      else{
        for(let i = 0;i<data.data.team.length;++i){
          this.team.push(data.data.team[i]);
        }
      }
      if(this.active === 1 && data.data.team.length <this.pageSize){
        this.loadDoneFirst = true;
      }
      else if(this.active === 2 && data.data.team.length <this.pageSize){
        this.loadDoneSecond = true;
      }
      else if(this.active === 3 && data.data.team.length <this.pageSize){
        this.loadDoneThird = true;
      }
    },
    changeTab(index) {
      this.active = index;
    },
    toTeamDetail(id){
      this.$router.push({path:`/peakTeamDetail/${id}`,query: {cateId: this.currentCateId,teamList:this.team, cateActive:this.active}});
    },
  },
};
</script>

<style scoped>
/* 设置巅峰团队的样式 */
.total-wrapper {
  /*width: 1920px;*/
  width: 100%;
  overflow: hidden;
}
.top-wrapper {
  /*width: 1920px;*/
  height: 700px;
  background-image: url("../../assets/img/Group 508.png");
  background-size: 100% 100%;
  width: 100%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.top-wrapper-title {
  height: 126px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.top-title {
  width: 295px;
  height: 62px;
  font-size: 60px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  line-height: 100%;
  letter-spacing: 13px;
}
.title-translate {
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
.top-title-item {
  width: 80px;
  height: 4px;
  background: #ffffff;
}
/* 左下角底部的显示 */
.current-place {
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
.current-first-item {
  height: 30px;
  width: 30px;
  background-image: url("../../assets/img/路径84.png");
  background-size: 90% 93%;
  background-color: transparent;
}
.current-second-item,
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
.current-place-child {
  color: #ffffff;
}

.main-info-wrapper {
  width: 1920px;
  /*width: 100%;*/
  background: #f4f4f4;
  padding-bottom: 137px;
}
/* 团队人员介绍块 */
.main-info-nav {
  list-style: none;
  height: 154px;
  /*width: 1920px;*/
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
  padding-left: 236px;
  box-sizing: border-box;
}
.tab-item {
  width: 170px;
  height: 54px;
  border: 1px solid #cacaca;
  text-align: center;
  line-height: 54px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  margin-right: 40px;
}
.light {
  background-color: #C8000A;
  color: #FFFFFF;
}
.nav-middle-item {
  margin: 0px 40px;
}

.intr-partone {
  width: 1368px;
  height: 446px;
  margin: 0px auto;
  padding: 40px 40px;
  display: flex;
  background-color: #ffffff;
}
.partone-first-child {
  width: 364px;
  height: 446px;
}
.partone-inner {
  width: 870px;
  height: 190px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  padding-top: 68px;
  padding-left: 60px;
}
.inner-information {

  height: 38px;
  font-size: 42px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  display: flex;
}
.inner-information1 {
  /*height: px;*/
  font-size: 42px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
}
.inner-information-item {
  /*display: inline-block;
  margin-left: 20px;*/
  height: 37px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3c3c3c;
  line-height: 37px;
  margin-bottom: 15px;
}
.inner-introduce {

  height: 103px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6e6e6e;
  line-height: 44px;
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.intr-parttwo {
  width: 1448px;
  height: 366px;
  background-color: #f4f4f4;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.parttwo-left,
.parttwo-right {
  box-sizing: border-box;
  width: 716px;
  height: 366px;
  background-color: #ffffff;
  padding: 40px 40px;
  display: flex;
}
.left-first-child,
.right-first-child {
  width: 238px;
  height: 286px;
}
.left-inner,
.right-inner {
  width: 358px;
  height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
  padding-left: 32px;
}
.left-information,
.right-information {
  width: 360px;
  height: 38px;
  font-size: 42px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
}
.left-information-item,
.right-information-item {
  display: inline-block;
  margin-left: 20px;
  width: 188px;
  height: 37px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3c3c3c;
  line-height: 37px;
}
.left-introduce,
.right-introduce {
  width: 357px;
  height: 137px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6e6e6e;
  line-height: 36px;
  display: flex;
  flex-direction: row;
  align-content: space-between;
}
.intr-partthree {
  width: 1464px;
  margin: 0px auto;
  padding-left: 16px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: start;
  display: flex;
  flex-direction: column;
}
.partthree-wrapper{
  display: flex;
  flex-wrap: wrap;
}
.partthree-child {
  margin-bottom: 20px;
  margin-right: 16px;
  width: 350px;
  height: 494px;
  background-color: #ffffff;
  position: flex;
  flex-direction: row;
  justify-items: center;
  align-content:space-between;
  justify-content: space-between;
  /*align-items: ;*/
}
.partthree-image {
  height: 324px;
  width: 270px;
  margin: 32px 40px 24px;
}
.partthree-name {
  width: 320px;
  height: 37px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  text-align: center;
}
.partthree-title {
  width: 320px;
  height: 37px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3c3c3c;
  line-height: 37px;
  text-align: center;
}
.load-more{
  width: 100px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #A0A0A0;
  line-height: 21px;
  margin-left: 685px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/

}
</style>












