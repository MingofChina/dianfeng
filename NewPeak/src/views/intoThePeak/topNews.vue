<template>
  <div class="box">
    <div class="banner" :style="setBackgroundImage(banner)"></div>
    <div class="center">
      <div class="center-title">中国文旅产业巅峰大会</div>
      <div class="text">{{ text }}</div>
      <div class="carousel">
        <div class="left-arrow carousel-left">左</div>
        <div class="message-group">
          <div v-for="(info, index) in messageList" :key="index">
            <div class="message-box">
              <div class="message-image"></div>
              <div class="message-text"></div>
            </div>
          </div>
        </div>
        <div class="right-arrow carousel-right">右</div>
      </div>
    </div>
    <div class="messageList">
      <div v-for="(info, index) in newsList" :key="index">
        <div class="messageInfo">
          <div class="messageImg"></div>
          <div class="messageText"></div>
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
import { commonMixin } from "../../components/mixin/all.mixin";
export default {
  mixins: [commonMixin],
  data() {
    return {
      banner: require("../../assets/img/guihuasheji.png"),
      text: "巅峰智业秉承“资源有限 智慧无穷”的理念，信守“人才至上”的价值观，将员工教育作为企业文化建设的突破口和提升企业竞争力的利器。构建了自己的黄埔军校——“巅峰大讲堂”，结合“导师制”、“金鹰特训班”、“项目经典沙龙”、“专家讲座”等多种形式，通过新员工培训、业务技能培训、管理技能培训、通用技能培训等多维度课程体系，为公司发展和员工成长提供学习解决方案。",
      messageList: [1, 2, 3],
      newsList: [1, 2, 3, 4],
    };
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
  background: gray;
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
  background: green;
  float: left;
  width: 468px;
  height: 430px;
}
.message-box .message-image {
  background: pink;
  width: 100%;
  height: 338px;
}
.message-box .message-text {
  background: aqua;
  width: 100%;
  height: 92px;
}
.carousel .left-arrow {
}
.carousel .right-arrow {
}
.carousel .carousel-left {
  float: left;
  margin-top: 175px;
}
.carousel .carousel-right {
  float: right;
  margin-top: 175px;
}

.messageList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.messageInfo {
  background: red;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 1448px;
  height: 320px;
}
.messageImg {
  width: 510px;
  height: 320px;
  background: #c4c4c4;
}
.messageText {
  background: blue;
  width: 898px;
  margin-left: 40px;
}

.messageList .pagination {
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