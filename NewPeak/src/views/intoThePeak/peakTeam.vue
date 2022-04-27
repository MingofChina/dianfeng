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
        <li class="current-first-item"></li>
        <li class="current-second-item"></li>
        <li>走进巅峰</li>
        <li class="current-third-item"></li>
        <li class="current-place-child">巅峰团队</li>
      </ul>
    </div>
    <div class="main-info-wrapper">
      <ul class="main-info-nav">
        <li :class="{'light': active === 1}" @click="changeTab(1)">管理团队</li>
        <li :class="{'light': active === 2}" class="nav-middle-item" @click="changeTab(2)">专家团队</li>
        <li :class="{'light': active === 3}" @click="changeTab(3)">技术团队</li>
      </ul>
      <div v-if="active === 1" class="team-introduction-part">
        <div class="intr-partone">
          <div class="partone-first-child">图片</div>
           <div class="partone-inner">
            <div class="inner-information">
            <span>刘峰</span>
            <span class="inner-information-item">创始人</span>
            </div>
           <div class="inner-introduce">中国旅游规划少壮派领军人物，60多个省市旅游发展高级顾问，多所大学客座教授，多次获得国家奖项。</div>
          </div>
          </div>
        <div class="intr-parttwo">
          <div class="parttwo-child">束盈</div>
          <div class="parttwo-child">邸倩</div>
        </div>
        <div class="intr-partthree">
          <div class="partthree-child" v-for="(item, index) in manageData"> {{ item.name }} </div>
        </div>
        
      </div>
      <div v-if="active === 2" class="team-introduction-part">
        <div class="intr-partthree">
          <div class="partthree-child" v-for="(item, index) in masterData"> {{ item.name }} </div>
        </div>
      </div>
      <div v-if="active === 3" class="team-introduction-part">
        <div class="intr-partthree">
          <div class="partthree-child" v-for="(item, index) in techoData"> {{ item.name }} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          "id": "34",
          "name": "刘锋",
          "title": "创始人",
          "profile": "中国旅游规划少壮派领军人物，60多个省市旅游发展高级顾问，多所大学客座教授，多次获得国家奖项。",
          "original_image": "/attachs/team/2017/0105/3falltnpa3kiii9.jpg"
        },
        {
          "id": "94",
          "name": "束盈",
          "title": "董事长",
          "profile": "中欧国际工商学院EMBA、北京邮电大学MBA十大杰出校友、2013年度中国城镇化建设特别贡献人物、中国旅游投资先锋人物。",
          "original_image": "/attachs/team/2016/1110/5xubo5wcxinumki.jpg"
        },
        {
          "id": "177",
          "name": "邸倩",
          "title": "首席运营官/COO",
          "profile": "清华大学-法国国立路桥大学-法国国立民航大学高级管理人员工商管理硕士学位，中国注册会计师，曾任上市公司董事职务。",
          "original_image": "/attachs/team/2021/0209/8qhuyct8hioknl8.jpg"
        },
        {
          "id": "93",
          "name": "刘惠",
          "title": "执行总裁",
          "profile": "长江商学院EMBA、国际旅游联合会（中国区）副主席。曾任职于《中国旅游报》、《中国经济导报》、国家发改委新闻办。",
          "original_image": "/attachs/team/2016/1104/chbckhvxn9x1hut.jpg"
        },
        {
          "id": "89",
          "name": "李晓东",
          "title": "副总裁/上海院院长",
          "profile": "同济大学建筑城规学院建筑学硕士，国家一级注册建筑师。擅长总体规划、控制性详细规划和城市设计，熟悉房地产市场动态。",
          "original_image": "/attachs/team/2016/1104/yn0myezsatmeqrz.jpg"
        },
        {
          "id": "88",
          "name": "曹璐",
          "title": "副总裁/南方大区总经理",
          "profile": "美国MBA。旅游规划专家、旅游项目投融资分析及运营专家、旅游项目品牌及营销管理专家。",
          "original_image": "/attachs/team/2021/0209/i9ujkl2shpbhsxb.jpg"
        },
        {
          "id": "178",
          "name": "冯君",
          "title": "副总裁/巅峰生态总经理",
          "profile": "中国矿业大学建筑工程专业，对于大型上市公司经营治理、工程项目全周期统筹管理、上市集团公司人员管理有着丰富的实践经验。",
          "original_image": "/attachs/team/2021/0209/ikssp2lpmhonzfy.jpg"
        },
        {
          "id": "179",
          "name": "殷嵘",
          "title": "首席顾问",
          "profile": "国内知名地产实操型专家，中欧国际工商学院EMBA，房地产经济师。30年房地产行业经验，擅长以经营视角发现产品价值，挖掘土地最大收益。",
          "original_image": "/attachs/team/2021/0209/codkrmbgklllure.jpg"
        },
        {
          "id": "150",
          "name": "钱晓丽",
          "title": "总裁助理/渠道中心总经理",
          "profile": "　　拥有景观设计、旅游规划、企业管理等多重专业背景，十年旅游规划与景观设计的研究与实战经验，五年市场营销和管理工作、两年企业项目的运营管理经验。",
          "original_image": "/attachs/team/2019/1213/o4gpbwacpmnyzpe.jpg"
        },
        {
          "id": "180",
          "name": "温雅",
          "title": "总裁助理/华南大区总经理",
          "profile": "毕业于北京大学，曾就职世界五百强企业美的集团。擅长文旅全产业链项目规划、落地、建设、运营。广东省文旅厅、福建省文旅厅、湖北省文旅厅合",
          "original_image": "/attachs/team/2021/0209/aj3plhw2svr0gyj.jpg"
        }
      ],
      manageData: [],
      masterData: [],
      techoData: [],
      active: 1
    }
  },
  mounted() {
    this.manageData = this.team.slice(3);
    this.masterData = this.team;
    this.techoData = this.team.slice(1);
  },
  methods: {
    changeTab(index) {
      this.active = index;
    }
  }
};

</script>

<style scoped>
/* 设置巅峰团队的样式 */
.total-wrapper {
  width: 1920px;
}
.top-wrapper {
  widows: 1920px;
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
.current-first-item{
  height: 30px;
  width: 30px;
  background-image: url("../../assets/img/路径84.png");
  background-size: 90% 93%;
  background-color: transparent;
}
.current-second-item, .current-third-item{
  height: 20px;
  background-image: url("../../assets/img/路径83.png");
  background-position: 0px 1px;
  background-size: 100% 100%;
  background-color: transparent;
  width: 16px;
  height: 16px;
  border: 0px;
  line-height:25px;
}
.current-place-child{
  color: #ffffff
}

.main-info-wrapper{
  width: 1920px;
  background: #F4F4F4;
}
/* 团队人员介绍块 */
.main-info-nav{
  list-style: none;
  height: 154px;
  width: 1920px;
  display: flex;
  flex-direction: row;
  align-items:center;
  align-content: space-between;
  padding-left: 236px;
  padding-right: 1094px;
}
.main-info-nav li{
  width: 170px;
  height: 54px;
  border: 1px solid #CACACA;
  text-align: center;
  line-height: 54px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
}
.nav-middle-item{
  margin: 0px 40px;
}

.intr-partone{
  width: 1368px;
  height: 446px;
  margin: 0px auto;
  padding: 40px 40px;
  display: flex;
  background-color: #ffffff;
}
.partone-first-child{
  width: 364px;
  height: 446px;
  background-color: yellow;
}
.partone-inner{
  width: 870px;
  height:190px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  padding-top: 68px;
  padding-left: 60px;
}
.inner-information{
  width: 180px;
  height: 38px;
  font-size: 42px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
}
.inner-information-item{
  display: inline-block;
  margin-left: 20px;
  width: 72px;
  height: 37px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 37px;
}
.inner-introduce{
  width: 868px;
 height: 103px;
 font-size: 24px;
 font-family: Source Han Sans CN-Normal, Source Han Sans CN;
 font-weight: 400;
 color: #6E6E6E;
 line-height: 44px;
 display: flex;
 flex-direction: row;
 align-content: space-between;
}

.intr-parttwo{
  width: 1448px;
  height: 366px;
  background-color: #F4F4F4;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.parttwo-child {
  width: 716px;
  height: 366px;
  background-color: #ffffff;
}
.intr-partthree {
  width: 1464px;
  margin: 0px auto;
  padding-left: 16px;
  background-color: #F4F4F4;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.partthree-child {
  margin-bottom: 20px;
  margin-right: 16px;
  width: 350px;
  height: 494px;
  background-color: #ffffff;
}
</style>