<template>
  <div class="box">
    <div class="banner" :style="setBackgroundImage(banner)"></div>
    <div class="center">
      <div class="center-title">中国文旅产业巅峰大会</div>
      <div class="text">{{ text }}</div>
      <div class="carousel">
        <div class="left-arrow carousel-left" @click="leftMove(messageList)">
          左
        </div>
        <div class="message-group">
          <div v-if="carouselList.length > 0" class="message-box">
            <div class="message-image"></div>
            <div class="message-text highlight">{{ carouselList[0].text }}</div>
          </div>
          <div v-if="carouselList.length > 1" class="message-box">
            <div class="message-image"></div>
            <div class="message-text">{{ carouselList[1].text }}</div>
          </div>
          <div v-if="carouselList.length > 2" class="message-box">
            <div class="message-image"></div>
            <div class="message-text">{{ carouselList[2].text }}</div>
          </div>
        </div>
        <div class="right-arrow carousel-right" @click="rightMove(messageList)">
          右
        </div>
      </div>
    </div>
    <div class="news-list">
      <div v-for="(info, index) in newsList" :key="index">
        <div class="news">
          <div class="news-image"></div>
          <div class="news-info">
            <div class="create-time">{{ info.createdOn }}</div>
            <div class="news-title" :class="[{ highlight: index === 0 }]">
              {{ info.title }}
            </div>
            <div class="news-text">{{ info.text }}</div>
            <div
              class="read-more"
              :class="[{ highlight: index === 0 }]"
              @click="toDetial(1)"
            >
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
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { commonMixin } from "@/components/mixin/all.mixin";
export default {
  mixins: [commonMixin],
  computed: {
    carouselList() {
      return _.cloneDeep(this.messageList)?.slice(0, 3) || [];
    },
  },
  data() {
    return {
      banner: require("@/assets/img/guihuasheji.png"),
      text: "巅峰智业秉承“资源有限 智慧无穷”的理念，信守“人才至上”的价值观，将员工教育作为企业文化建设的突破口和提升企业竞争力的利器。构建了自己的黄埔军校——“巅峰大讲堂”，结合“导师制”、“金鹰特训班”、“项目经典沙龙”、“专家讲座”等多种形式，通过新员工培训、业务技能培训、管理技能培训、通用技能培训等多维度课程体系，为公司发展和员工成长提供学习解决方案。",
      messageList: [
        {
          text: "111",
        },
        {
          text: "222",
        },
        {
          text: "333",
        },
        {
          text: "444",
        },
        {
          text: "555",
        },
        {
          text: "666",
        },
      ],
      newsList: [
        {
          createdOn: "123",
          title: "456",
          text: "789",
        },
        {
          createdOn: "a123",
          title: "a456",
          text: "a789",
        },
      ],
    };
  },
  methods: {
    leftMove(list) {
      const fitst = list.shift();
      list.push(fitst);
    },
    rightMove(list) {
      const last = list.pop();
      list.unshift(last);
    },
    toDetial(id) {
      this.$router.push({ name: "newsDetail", query: { id: id } });
    },
  },
};
</script>
<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner {
  width: 100%;
  height: 700px;
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
.message-group .message-box {
  float: left;
  width: 468px;
  height: 430px;
}
.message-box .message-image {
  background: gray;
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
  width: 100%;
  height: 92px;
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
}
.carousel .carousel-right {
  float: right;
  margin-top: 175px;
}

.news-list {
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
  background: #c4c4c4;
}
.news .news-info {
  position: relative;
  width: 898px;
  margin-left: 40px;
}
.news-info .create-time {
  height: 40px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #6e6e6e;
  line-height: 40px;
}
.news-info .news-title {
  height: 54px;
  font-size: 36px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 42px;
}
.news-info .news-text {
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #6e6e6e;
  line-height: 40px;
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
  width: 540px;
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