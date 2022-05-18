<template>
  <div id="app">
    <div class="head">
      <div class="viewTitle">{{details.title}}</div>
      <div class="article"
           v-html="details.description">
      </div>
    </div>
    <div class="viewMain">
      <div class="viTitle">
        <div class="stork">|</div>
        <div class="title">著作推荐</div>
      </div>
      <div class="info"
           v-for="(item,i) in detailsRecommend"
           :key="i">
        <div class="infoCon">
          <div class="title">{{item.title}}</div>
          <div class="mes">{{item.summary}}</div>
          <span v-show="item.summary.length<40?false:true">...</span>
        </div>
        <img :src=getImgUrl(item.original_image)
             alt="">
      </div>
    </div>
    <div class="viewFoot">
      <div class="viTitle">
        <div class="stork">|</div>
        <div class="title">相关文章推荐</div>
      </div>
      <div class="info"
           v-for="(item,i) in recommend"
           :key="i">
        <img :src=getImgUrl(item.original_image)>
        <div class="infoCon">
          <div class="title">{{item.title}}</div>
          <div class="mes">{{item.summary}}</div>
          <span v-show="item.summary.length<40?false:true">...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { newsDetail_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      detailsRecommend: '',
      headTitle: '掘金夜间经济：夜景“醉”游人，遇见“夜” 来香',
      recommend: '',
      baseUrl: 'http://ceshi.davost.com',
      details: '',
      articleArr: '',
    }
  },
  created () {
    console.log('要闻进来的，要闻详情');
    console.log(this.$route.query.id, 'ttt');
    this.getList()
  },
  methods: {
    getList () {
      const data = {
        id: this.$route.query.id
      }
      newsDetail_h5(data).then((res) => {
        this.details = res.data.data.peak_news_detail
        this.detailsRecommend = res.data.data.peak_news_hots
        this.recommend = res.data.data.peak_news_relevant
      })
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
  }
}
</script>

<style lang="less" scoped>
.head {
  background: #f4f4f4;
  padding: 2rem 1.33rem 0 1.33rem;
  text-align: center;
  .viewTitle {
    height: 5rem;
    // margin: 0 auto;
    font-size: 1.33rem;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #231914;
    line-height: 1.56rem;
  }
  .article {
    margin-bottom: 0.67rem;
    text-align: left;
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
  }
  .imgCon {
    img {
      width: 100%;
    }
  }
}
.viewMain {
  margin: 1.67rem 1.33rem 0 1.33rem;
  .viTitle {
    display: flex;
    margin-bottom: 1rem;
    .stork {
      margin-top: -0.1rem;
      color: #c8000a;
    }
    .title {
      margin-left: 0.5rem;
      font-size: 1.33rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
  }
  .info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .infoCon {
      width: 60%;
      margin-right: 1.33rem;
      .title {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden; /*超出的文本隐藏*/
        text-overflow: ellipsis; /* 溢出用省略号*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
        margin-top: 0.55rem;
        font-size: 1.17rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #3c3c3c;
        line-height: 1.37rem;
        margin-bottom: 0.67rem;
      }
      .mes {
        height: 3.2rem;
        overflow: hidden;
        font-size: 1rem;
        font-family: Source Han Sans CN-Light, Source Han Sans CN;
        font-weight: 300;
        color: #6e6e6e;
        line-height: 1.5rem;
      }
      span {
        color: #6e6e6e;
      }
    }
    img {
      width: 35%;
      height: 7.75rem;
      margin-bottom: 1rem;
    }
  }
}
.viewFoot {
  background: #f4f4f4;
  padding: 1.67rem 1.33rem 0 1.33rem;
  .viTitle {
    display: flex;
    padding-bottom: 1rem;
    .stork {
      margin-top: -0.1rem;
      color: #c8000a;
    }
    .title {
      margin-left: 0.5rem;
      font-size: 1.33rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
  }
  .info {
    display: flex;
    width: 100%;
    .infoCon {
      width: 60%;
      margin-left: 1rem;
      .title {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden; /*超出的文本隐藏*/
        text-overflow: ellipsis; /* 溢出用省略号*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
        margin-top: 0.55rem;
        font-size: 1.17rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #3c3c3c;
        line-height: 1.37rem;
        margin-bottom: 0.67rem;
      }
      .mes {
        height: 3.2rem;
        overflow: hidden;
        font-size: 1rem;
        font-family: Source Han Sans CN-Light, Source Han Sans CN;
        font-weight: 300;
        color: #6e6e6e;
        line-height: 1.5rem;
      }
      span {
        color: #6e6e6e;
      }
    }
    img {
      margin-right: 1.33rem;
      width: 35%;
      height: 7.75rem;
      margin-bottom: 1rem;
    }
  }
}
</style>