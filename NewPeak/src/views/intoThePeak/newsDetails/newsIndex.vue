<template>
  <div class="box">
    <div class="banner">
      <div class="top-wrapper-title">
        <div class="top-title">巅峰要闻</div>
        <div class="title-translate">NEWS OF THE PEAK</div>
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
        <li class="current-place-child">巅峰要闻</li>
      </ul>
    </div>
    <div class="center">
      <div class="center-title">中国文旅产业巅峰大会</div>
      <div class="text">{{ text }}</div>


      <div class="carousel">

        <div class="left-arrow carousel-left" @click="leftMove(wenlv_image)">
<!--          <div class="part-one"></div>
          <div class="part-two"></div>-->
          <div class="left-jiantou"></div>
        </div>

        <div class="message-group">
          <div v-if="carouselList.length > 0" class="message-box">
            <img class="message-image"
                 @click="toDetial(carouselList[0].id)"
                 v-on:mouseover="overImg($event,0)"
                 v-on:mouseout="leaveImg($event,0)"
                 :src="carouselList[0].original_image | transformImageUrl" />
            <div class="message-text "
                 :class="[{highlight:currentIndex===0}]"
                 v-on:mouseover="overTitle($event,0)"
                 v-on:mouseout="leaveTitle($event,0)"
                 @click="toDetial(carouselList[0].id)"
            >{{ carouselList[0].title }}</div>
          </div>
          <div v-if="carouselList.length > 1" class="message-box">
            <img class="message-image"
                 v-on:mouseover="overImg($event,index)"
                 v-on:mouseout="leaveImg($event,index)"
                 @click="toDetial(carouselList[1].id)"
                 :src="carouselList[1].original_image | transformImageUrl" />
            <div class="message-text"
                 v-on:mouseover="overTitle($event,index)"
                 v-on:mouseout="leaveTitle($event,index)"
                 @click="toDetial(carouselList[1].id)"
            >{{ carouselList[1].title }}</div>
          </div>
          <div v-if="carouselList.length > 2" class="message-box">
            <img class="message-image"
                 @click="toDetial(carouselList[2].id)"
                 v-on:mouseover="overImg($event,index)"
                 v-on:mouseout="leaveImg($event,index)"
                 :src="carouselList[2].original_image | transformImageUrl" />
            <div class="message-text"
                 v-on:mouseover="overTitle($event,index)"
                 v-on:mouseout="leaveTitle($event,index)"
                 @click="toDetial(carouselList[2].id)"
            >{{ carouselList[2].title }}</div>
          </div>
        </div>
        <div class="right-arrow carousel-right" @click="rightMove(wenlv_image)">
<!--          <div class="part-one"></div>
          <div class="part-two"></div>-->
          <div class="right-jiantou"></div>
        </div>
      </div>




    </div>
    <div class="news-list">
      <div v-for="(info, index) in peak_news"
           :key="index"
           @mouseenter="moveOnTab(index)"
           @mouseleave="moveAwayTab()">
        <div class="news">
          <img class="news-image"
               @click="toDetial(info.id)"
               :src="info.original_image | transformImageUrl" />
          <div class="news-info">
            <div class="create-time">{{ info.addtime }}</div>
            <div class="news-title"
                 @click="toDetial(info.id)"
                 :class="[{ highlight: index === moveOnIndex }]">
              {{ info.title }}
            </div>
            <div class="news-text"
                 @click="toDetial(info.id)"
            >{{ info.summary }}</div>
            <div
              class="read-more"
              :class="[{ highlight: index === moveOnIndex }]"
              @click="toDetial(info.id)">
              > 查看详情
            </div>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="totalRows"
        :page-size="pageSize"
        @current-change="currentPageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { commonMixin } from "@/components/mixin/all.mixin";
import { Storyhead, meetingContent } from "@/api/api.js";
export default {
  mixins: [commonMixin],
  computed: {
    carouselList() {
      return _.cloneDeep(this.wenlv_image)?.slice(0, 3) || [];
    },
  },
  data() {
    return {
      banner: require("@/assets/img/guihuasheji.png"),
      text: "巅峰智业秉承“资源有限 智慧无穷”的理念，信守“人才至上”的价值观，将员工教育作为企业文化建设的突破口和提升企业竞争力的利器。构建了自己的黄埔军校——“巅峰大讲堂”，结合“导师制”、“金鹰特训班”、“项目经典沙龙”、“专家讲座”等多种形式，通过新员工培训、业务技能培训、管理技能培训、通用技能培训等多维度课程体系，为公司发展和员工成长提供学习解决方案。",
      wenlv_image: [],
      peak_news: [],
      currentPage: 1,
      totalRows: 0,
      pageSize: 5,
      moveOnIndex: -1,
      currentIndex: 0,
    };
  },
  methods: {
    toIndex() {
      this.$router.push({ name: "index"});
    },
    toIntroduction() {
      this.$router.push({ name: "peakIntroduction"});
    },
    overImg($event,index){
      $event.currentTarget.nextElementSibling.className = "message-text highlight";
      //console.log(index);
      this.currentIndex = index;
    },
    leaveImg($event,index){
      $event.currentTarget.nextElementSibling.className = "message-text"
      //console.log(index);
      this.currentIndex = index;
    },
    overTitle($event,index){
      $event.currentTarget.className = "message-text highlight";
      //console.log(index);
      this.currentIndex = index;
    },
    leaveTitle($event,index){
      $event.currentTarget.className = "message-text"
      //console.log(index);
      this.currentIndex = index;
    },
    leftMove(list) {
      const fitst = list.shift();
      list.push(fitst);
    },
    rightMove(list) {
      const last = list.pop();
      list.unshift(last);
    },
    toDetial(id) {
      this.$router.push({ name: "newsDetail", params: { id: id } });
    },
    currentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.getNewsList();
    },
    async getNewsList() {
      const params = {
        pages: this.currentPage,
        pagesize: this.pageSize,
      };
      const { data } = await Storyhead(params);
      const queryData = data?.data;

      this.peak_news = queryData?.peak_news || [];
      this.totalRows = (queryData?.page_numbers * this.pageSize) || 0;
    },
    async getWenlvImage() {
      const { data } = await meetingContent();
      const queryData = data?.data;
      document.title = data.data.seo_message.meta_title;
      this.wenlv_image = queryData?.wenlv_image || [];
    },
    moveOnTab(index) {
      this.moveOnIndex = index;
    },
    moveAwayTab() {
      this.moveOnIndex = -1;
    }
  },
  mounted() {
    this.getNewsList();
    this.getWenlvImage();
  }
};
</script>
<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner {
  background-image: url("../../../assets/img/Group 524.png");
  background-size: 100% 100%;
  width: 100%;
  height: 700px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.left-jiantou{
  background-image: url("../../../assets/img/jiantou37left1.png");
  width: 37px;
  height: 37px;
  background-size: 100% 100%;
}
.left-jiantou:hover,click{
  background-image: url("../../../assets/img/jiantou37left2.png");
  width: 37px;
  height: 37px;
  background-size: 100% 100%;
}
.right-jiantou{
  background-image: url("../../../assets/img/jiantou37right1.png");
  width: 37px;
  height: 37px;
  background-size: 100% 100%;
}
.right-jiantou:hover,click{
  background-image: url("../../../assets/img/jiantou37right2.png");
  width: 37px;
  height: 37px;
  background-size: 100% 100%;
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
  width: 243px;
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
  background-image: url("../../../assets/img/路径84.png");
  background-size: 90% 93%;
  background-color: transparent;
}
.current-second-item,
.current-third-item {
  height: 20px;
  background-image: url("../../../assets/img/路径83.png");
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
.center {
  height: 860px;
  width: 100%;
  background: #f6f6f6;
  opacity: 1;
}
.center .center-title {
  display: flex;
  justify-content: center;
  height: 66px;
  margin: 100px auto 0 auto;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
}
.center .text {
  margin: 24px auto 0 auto;
  width: 1238px;
  text-align: center;
  font-size: 18px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #000000;
  line-height: 32px;
}
.carousel {
  display: flex;
  justify-content: space-between;
  margin: 70px auto 0 auto;
  width: 1602px;
  height: 430px;
}
.carousel .message-group {
  display: flex;
  justify-content: space-between;
  width: 1448px;
  height: 430px;
}
.carousel-left .part-one {
  transform: rotate(45deg);
  margin-right: -10px;
  width: 18px;
  height: 18px;
  opacity: 1;
  border: 2px solid #A0A0A0;
  border-top: none;
  border-right: none;
}
.carousel-left .part-two {
  transform: rotate(45deg);
  width: 18px;
  height: 18px;
  opacity: 1;
  border: 2px solid rgba(160, 160, 160, 0.5);
  border-top: none;
  border-right: none;
}
.message-group .message-box {
  float: left;
  width: 468px;
  height: 430px;
}
.message-box .message-image {
  background-size: 100% 100%;
  margin-bottom: -4px;
  width: 100%;
  height: 338px;
}
.message-box .message-text {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 32px;
  /*width: 100%;*/
  height: 92px;
  padding-left: 12px;
  padding-right: 8px;

}
.message-box .highlight {
  background: #c8000a !important;
  font-size: 24px !important;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN !important;
  font-weight: 500 !important;
  line-height: 32px !important;

  color: #ffffff !important;
}
.carousel .left-arrow {
  user-select: none;
  cursor: pointer;
}
.carousel .right-arrow {
  user-select: none;
  cursor: pointer;
}
.carousel .carousel-left {
  float: left;
  margin-top: 175px;
  height: 37px;
  width: 37px;
  display: flex;
}
.carousel .carousel-right {
  float: right;
  margin-top: 175px;
  height: 37px;
  width: 37px;
  display: flex;
}
.carousel-right .part-one{
  transform: rotate(225deg);
  width: 18px;
  height: 18px;
  opacity: 1;
  margin-right: -10px;
  border: 2px solid rgba(200, 0, 10, 0.5);
  border-top: none;
  border-right: none;
}
.carousel-right .part-two{
  transform: rotate(225deg);
  width: 18px;
  height: 18px;
  opacity: 1;
  border: 2px solid #C8000A;
  border-top: none;
  border-right: none;
}
.news-list {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.news {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 1448px;
  height: 320px;
}
.news .highlight {
  color: #c8000a !important;
}
.news .news-image {
  width: 510px;
  height: 320px;
}
.news .news-info {
  position: relative;
  width: 898px;
  margin-left: 40px;
}
.news-info .create-time {
  width: 120px;
  height: 40px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #6e6e6e;
  line-height: 40px;
  margin-bottom: 20px;
}
.news-info .news-title {
  height: 54px;
  font-size: 36px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 42px;
  margin-bottom: 30px;
}
.news-info .news-text {
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #6e6e6e;
  line-height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-all;
}
.news-info .read-more {
  position: absolute;
  user-select: none;
  cursor: pointer;
  bottom: 0;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #a0a0a0;
  line-height: 21px;
}
.news-list .pagination {
  margin: 0 auto 70px auto;
  height: 50px;
}
.pagination >>> .active {
  background-color: #c8000a !important;
  color: #ffffff;
}
.pagination >>> .number {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.pagination >>> .el-icon {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.pagination >>> .btn-next {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
.pagination >>> .btn-prev {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
</style>