<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/focusBg.png"
           alt="">
      <div>
        <div class="cha">巅峰要闻</div>
        <div class="eng">Davost News</div>
      </div>
    </div>
    <div class="focMain">
      <div class="title">中国文旅产业巅峰大会</div>
      <div class="mes">{{focMes}}</div>
      <div class="bannerNums">
        <el-carousel arrow="never"
                     ref="cardShow"
                     :autoplay="false"
                     indicator-position="none">
          <el-carousel-item v-for="(item,i) in bannerList"
                            :key="i">
            <img :src=getImgUrl(item.original_image)
                 alt="">
            <div class="bgMes"
                 @click="details(item.id)">{{item.title}}</div>
          </el-carousel-item>
        </el-carousel>
        <div class="btn">
          <img class="left" src="../../../assets/imgs/focLeft.png" alt="" @click="imgInfo('left')">
          <img class="right" src="../../../assets/imgs/focRight.png" alt="" @click="imgInfo('right')">
        </div>
      </div>
    </div>
    <div class="focFoot"
         v-for="(item,i) in econInfo"
         :key="i">
      <img :src=getImgUrl(item.original_image)
           alt="">
      <div class="right">
        <div class="footTitle">{{item.title}}</div>
        <div class="footMes">{{item.summary}}</div>
        <span v-show="item.summary.length<40?false:true">...</span>
        <div class="mark">
          <div class="markCon">
            <img src="../../../assets/bei/icon_more(2).png"
                 alt="">
            <div class="markInfo"
                 @click="details(item.id)">查看详情</div>
          </div>
          <div class="date">{{item.addtime}}</div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     @current-change="onPageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { top_h5, bottom_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      focMes: '',
      bannerList: '',
      baseUrl: 'http://ceshi.davost.com',
      econInfo: '',
      total: 0,
      pages: 1,
      pagesize: 10
    }
  },
  created () {
    this.getList()
    this.getInfo()
  },
  methods: {
    getList () {
      top_h5().then((res) => {
        console.log(res, '要闻');
        this.focMes = res.data.data.wenlv_description

        this.bannerList = res.data.data.wenlv_image
      })
    },
    getInfo () {
      const data = {
        pages: this.pages,
        pagesize: this.pagesize
      }
      bottom_h5(data).then((res) => {
        this.econInfo = res.data.data.peak_news
        this.total= res.data.data.page_numbers*10
        console.log(res, '瞅你那逼样');
      })
    },
    onPageChange (e) {
      this.pages = e
      this.getInfo()
    },
    details (info) {
      this.$router.push({
        path: '/focusDetail_h5',
        query: {
          id: info
        }
      })
      console.log('跳转go', info);
    },
    imgInfo(info){
      if (info === 'right') {
        this.$refs.cardShow.next()
      } else {
        this.$refs.cardShow.prev()
      }

    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    leftBanner (i) {
      console.log(i);
    },
    rightBanner (i) {
      console.log(i);
    }
  }
}
</script>
<style lang="less" scoped>
.showImg {
  position: relative;
  img {
    width: 100%;
  }
  .cha {
    width: 100%;
    position: absolute;
    top: 40%;
    // left: 15.25rem;
    text-align: center;
    // width: 7.83rem;
    height: 2.5rem;
    font-size: 1.67rem;
    font-weight: bold;
    color: #ffffff;
    line-height: 1.95rem;
    letter-spacing: 4px;
    z-index: 2;
  }
  .eng {
    width: 100%;
    margin-top: 0.33rem;
    position: absolute;
    text-align: center;
    top: 51%;
    /*text-transform: uppercase;*/
    // left: 14.25rem;
    height: 1.25rem;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.focMain {
  width: 100%;
  overflow: hidden;
  padding-top: 2.33rem;
  // margin-bottom: 1rem;
  background: #f4f4f4;
  .title {
    text-align: center;
    font-size: 1.67rem;
    font-weight: 500;
    color: #231914;
    line-height: 1.95rem;
  }
  .mes {
    margin: 1rem 1.33rem 0 1.33rem;
    text-align: left;
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
  }
  .bannerNums {
    position: relative;
    margin-left: 1.33rem;
    // margin-right: 1.33rem;
    margin-top: 1rem;
    .btn{
      z-index: 99;
      img{
        margin-right: 0.8rem;
        width: 2rem;
        height: 2rem;
      }
      .left{
        position: absolute;
        z-index: 99;
        top: 47%;
        left: 1rem;
      }
      .right{
        position: absolute;
        z-index: 99;
        top: 47%;
        right:1rem
      }
    }
    img {
      width: 97%;
    }
    .bgMes {
      position: absolute;
      bottom: 0;
      width: 97%;
      height: 4rem;
      text-align: center;
      background: #c8000a;
      font-size: 1.17rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #ffffff;
      line-height: 4rem;
      letter-spacing: 1px;
    }
    // margin-left: 1.33rem;
    // padding-right: 1.33rem;
  }
}
.focFoot {
  margin: 1.83rem 1.33rem 1.67rem 1.33rem;
  display: flex;
  img {
    width: 12.5rem;
    height: 9.08rem;
  }
  .right {
    margin-top: 0.66rem;
    margin-left: 1rem;
    .footTitle {
      margin-top: -0.3rem;
      height: 1.37rem;
      display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
      -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
      overflow: hidden; /*超出的文本隐藏*/
      text-overflow: ellipsis; /* 溢出用省略号*/
      -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
      font-size: 1.17rem;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #231914;
      line-height: 1.37rem;
    }
    .footMes {
      height: 3.2rem;
      overflow: hidden;
      margin-top: 0.3rem;
      font-size: 1rem;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #6e6e6e;
      line-height: 1.67rem;
    }
    .mark {
      // margin-top: 0.3rem;
      display: flex;
      margin-top: 0.67rem;
      justify-content: space-between;
      .markCon {
        margin-top: 0.67rem;
        display: flex;
        img {
          // margin-top: 2rem;
          width: 0.5rem;
          height: 0.88rem;
        }
        .markInfo {
          margin-left: 0.3rem;
          // margin-top: -0.4rem;
          font-size: 0.83rem;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #6e6e6e;
          line-height: 0.98rem;
        }
      }
      .date {
        margin-top: 0.67rem;
        font-size: 0.83rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #6e6e6e;
        line-height: 0.98rem;
      }
    }
  }
}
.pagination {
  text-align: center;
  margin-bottom: 1.33rem;
}
</style>
