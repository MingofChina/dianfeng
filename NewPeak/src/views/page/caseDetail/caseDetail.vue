<template>
  <div id="app">
    <div class="head">
      <div class="viewTitle">{{fwbType.title}}</div>
      <div class="article"
           v-html="fwbType.description">
      </div>
    </div>
    <div class="viewMain">
      <div class="viTitle">
        <div class="stork">|</div>
        <div class="title">热点案例</div>
      </div>
      <div class="info"
           v-for="(item,i) in caseDet"
           :key="i">
        <div class="infoCon">
          <div class="title">{{item.title}}</div>
          <div class="mes">{{item.summary}}</div>
          <span v-show="item.summary.length<40?false:true">...</span>
        </div>
        <img :src=getImgUrl(item.original_image)>
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
import { caseDetail_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      caseDet: '',
      baseUrl: 'http://ceshi.davost.com',
      recommend: '',
      fwbType: '',

    }
  },
  created () {
    console.log('案例进来的');
    console.log(this.$route.query.id, 'ttt');
    this.getList()
  },
  methods: {
    getList () {
      const data = {
        id: this.$route.query.id
      }
      caseDetail_h5(data).then((res) => {
        console.log(res, '0000');
        // this.fwbType = 
        this.fwbType = res.data.data.case_detail
        this.caseDet = res.data.data.peak_case_hots
        this.recommend = res.data.data.peak_case_relevant

      })
    },
    getImgUrl (imgUrl) {
      console.log(this.baseUrl + imgUrl, 'iii');
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
}
.viewMain {
  margin: 1.67rem 0rem 0 1.33rem;
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
    // width: 100%;
    display: flex;
    // justify-content: space-between;
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
      // margin-right: 1.33rem;
      margin: 0;
      width: 10.83rem;
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
    .infoCon {
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
      width: 10.83rem;
      height: 7.75rem;
      margin-bottom: 1rem;
    }
  }
}
</style>