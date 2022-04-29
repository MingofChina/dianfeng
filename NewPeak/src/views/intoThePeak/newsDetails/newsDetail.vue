<template>

  <div class="background">
    <div class="box">
      <div class="navbar">
<!--        <breadcrumb class="breadcrumb" />-->
        <ul class="breadcrumb">
          <li class="current-first-item"></li>
          <li class="current-second-item"></li>
          <li>走进巅峰</li>
          <li class="current-second-item"></li>
          <li>巅峰要闻</li>
          <li class="current-third-item"></li>
          <li class="current-place-child">详情</li>
        </ul>
        <img class="close" @click="close()" src="../../../assets/story-detail/Group 397.png"/>
      </div>
      <div class="main">
        <div class="news">
          <div class="news-title">{{ peak_news_detail.title }}</div>
          <div class="news-info">
            <div class="source">来源：{{ peak_news_detail.branch }}</div>
            <div class="create-time">发布时间：{{ peak_news_detail.addtime }}</div>
          </div>




          <div v-html="peak_news_detail.description" class="news-text"></div>

        </div>
        <div class="side-bar">
          <div class="hot-news">
            <div class="hot-news-title">
              <div class="marker title-marker"></div>
              <div>热点新闻</div>
            </div>
            <div
              v-for="(item, index) in peak_news_hots"
              :key="index"
              class="hot-news-box"
            >
              <div class="hot-news-content">
                <div class="hot-news-text">
                  <div class="hot-title">{{ item.title }}</div>
                  <div class="hot-text"
                       @click="toDetial(item.id)"
                  >{{ item.summary }}</div>
                </div>
                <img class="hot-news-image"
                     @click="toDetial(item.id)"
                     :src="item.original_image | transformImageUrl" />
              </div>
              <div v-if="index < (peak_news_hots.length - 1)" class="hot-news-split"></div>
            </div>
          </div>
          <div class="recommend-news">
            <div class="recommend-news-title">
              <div class="marker title-marker"></div>
              <div>相关文章推荐</div>
            </div>
            <div
              v-for="(item, index) in peak_news_relevant"
              :key="index"
              class="recommend-news-box"
            >
              <div class="hot-news-content">
                <div class="recommend-news-text">
                  <div class="recommend-title">{{ item.title }}</div>
                  <div class="recommend-text"
                       @click="toDetial(item.id)"
                  >{{ item.summary }}</div>
                </div>
                <img class="recommend-news-image"
                     @click="toDetial(item.id)"
                     :src="item.original_image | transformImageUrl" />
              </div>
              <div v-if="index < (peak_news_relevant.length - 1)" class="hot-news-split"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import breadcrumb from "@/components/breadcrumb";
import { Storydetail } from "@/api/api";
import commonMixin from "@/components/mixin/common.mixin";
export default {
  mixins: [commonMixin],
  components: {
    breadcrumb,
  },
  data() {
    return {
      title: "掘金夜间经济：夜景“醉”游人，遇见“夜”来香",
      html: "",
      peak_news_detail: {},
      peak_news_hots: [],
      peak_news_relevant: [],
    };
  },
  methods: {
    toDetial(id) {
      this.$router.push({ name: "newsDetail", params: { id: id } });
      location.reload();
    },
    close() {
      this.$router.go(-1);
    },
    async getDetailData() {
      const { data } = await Storydetail({id: this.$route.params.id});
      const queryData = data?.data;
      this.peak_news_detail = queryData?.peak_news_detail || {};
      this.peak_news_hots = queryData?.peak_news_hots || {};
      this.peak_news_relevant = queryData?.peak_news_relevant || {};
    }
  },
  created() {
    this.getDetailData();
  }
};
</script>

<style scoped>
.background {
  width: 1920px;
  height: 100%;
  background: #F4F4F4;
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
  margin: 0 auto 0 auto;
  width: 1448px;
  padding-top: 86px;

}
.box .navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.navbar .breadcrumb {
  padding: 0px;
  width: 300px;
  height: 25px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 236px;
  bottom: 30px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(35, 25, 20, 0.5);
}
.current-first-item {
  height: 30px;
  width: 30px;
  background-image: url("../../../assets/img/路径85.png");
  background-size: 90% 93%;
  background-color: transparent;
}
.current-second-item {
  background-image: url("../../../assets/img/icon_more(2).png");
  background-size: 100% 100%;
  background-color: transparent;
  width: 8px;
  height: 14px;
  border: 0px;
}
.current-third-item {
  margin-top: 1px;
  background-image: url("../../../assets/img/icon_right.png");
  background-size: 100% 100%;
  background-color: transparent;
  width: 14px;
  height: 14px;
  border: 0px;

}
.current-place-child {
  /*width: 32px;*/
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;

}
.navbar .close {
  width: 64px;
  height: 37px;
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
  width: 868px;
  font-size: 34px;
  font-family: Source Han Sans CN-Medium;
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
  font-size: 18px;
  font-weight: 400;
  color: #231914;
  line-height: 32px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;

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
  width: 456px;
  height: 130px;
}
.hot-news-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}
.hot-news-split {
  margin-top: 16px;
  width: 456px;
  height: 1px;
  background: #F0F0F0;
  border-radius: 0px 0px 0px 0px;
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
  width: 130px;
  height: 93px;
}
.recommend-news {
  margin-top: 32px;
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