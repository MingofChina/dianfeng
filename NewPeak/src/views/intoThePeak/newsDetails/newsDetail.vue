<template>
  <div class="background">
    <div class="box">
      <div class="navbar">
        <breadcrumb class="breadcrumb" />
        <div class="close" @click="close()">关闭</div>
      </div>
      <div class="main">
        <div class="news">
          <div class="news-title">{{ title }}</div>
          <div class="news-info">
            <div class="source">来源</div>
            <div class="create-time">发布时间</div>
          </div>
          <div v-html="html" class="news-text"></div>
        </div>
        <div class="side-bar">
          <div class="hot-news">
            <div class="hot-news-title">
              <div class="marker title-marker"></div>
              <div>热点新闻</div>
            </div>
            <div
              v-for="(item, index) in hotNews"
              :key="index"
              class="hot-news-box"
            >
              <div class="hot-news-text">
                <div class="hot-title">{{ item.title }}</div>
                <div class="hot-text">{{ item.text }}</div>
              </div>
              <div class="hot-news-image"></div>
            </div>
          </div>
          <div class="recommend-news">
            <div class="recommend-news-title">
              <div class="marker title-marker"></div>
              <div>相关文章推荐</div>
            </div>
            <div
              v-for="(item, index) in recommendNews"
              :key="index"
              class="recommend-news-box"
            >
              <div class="recommend-news-text">
                <div class="recommend-title">{{ item.title }}</div>
                <div class="recommend-text">{{ item.text }}</div>
              </div>
              <div class="recommend-news-image"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb";
export default {
  components: {
    breadcrumb,
  },
  data() {
    return {
      title: "掘金夜间经济：夜景“醉”游人，遇见“夜”来香",
      html: "",
      hotNews: [
        {
          title: "1111111111111111333333333333333333333333333",
          text: "11111111111111111111111111111111111111111111111111111111111111111111113333333333333333333333333",
        },
        {
          title: "22222222222222222222",
          text: "123",
        },
        {
          title: "33333333444444444444444444555555555555555555",
          text: "11111111111112222222222233333333333444444444445555555555556666666666",
        },
      ],
      recommendNews: [
        {
          title: "1111111111111111333333333333333333333333333",
          text: "11111111111111111111111111111111111111111111111111111111111111111111113333333333333333333333333",
        },
      ],
    };
  },
  methods: {
    close() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
}
.marker {
  width: 4px;
  height: 24px;
  background: #c8000a;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.title-marker {
  margin-right: 12px;
}
.box {
  margin: 86px auto 0 auto;
  width: 1448px;
}
.box .navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.navbar .breadcrumb {
}
.navbar .close {
  user-select: none;
  cursor: pointer;
}
.main {
  display: flex;
  flex-direction: row;
}
.news {
  margin-top: 57px;
  margin-bottom: 70px;
  width: 868px;
  height: 1000px;
}
.news .news-title {
  font-size: 34px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 40px;
}
.news .news-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 28px;
  width: 100%;
  height: 32px;
}
.news .news-text {
  margin-top: 40px;
  width: 100%;
}
.side-bar {
  float: right;
  margin-top: 57px;
  margin-left: 60px;
}
.hot-news {
  width: 520px;
  padding-top: 40px;
  background: #ffffff;
}
.hot-news .hot-news-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 32px;
  margin-bottom: 36px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 32px;
}
.hot-news .hot-news-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 41px;
  width: 456px;
  height: 130px;
}
.hot-news-box .hot-news-text {
  width: 310px;
  height: 93px;
}
.hot-news-text .hot-title {
  margin-left: 32px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3c3c3c;
  line-height: 21px;
}
.hot-news-text .hot-text {
  margin-top: 16px;
  margin-left: 32px;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #6e6e6e;
  line-height: 24px;
}
.hot-news-box .hot-news-image {
  background: gray;
  width: 130px;
  height: 93px;
}
.recommend-news {
  width: 520px;
  padding-top: 40px;
  background: #ffffff;
}
.recommend-news .recommend-news-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 32px;
  margin-bottom: 36px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 32px;
}
.recommend-news .recommend-news-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 41px;
  width: 456px;
  height: 130px;
}
.recommend-news-box .recommend-news-text {
  width: 310px;
  height: 93px;
}
.recommend-news-text .recommend-title {
  margin-left: 32px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3c3c3c;
  line-height: 21px;
}
.recommend-news-text .recommend-text {
  margin-top: 16px;
  margin-left: 32px;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  font-size: 16px;
  font-family: Source Han Sans CN-Light, Source Han Sans CN;
  font-weight: 300;
  color: #6e6e6e;
  line-height: 24px;
}
.recommend-news-box .recommend-news-image {
  background: gray;
  width: 130px;
  height: 93px;
}
</style>