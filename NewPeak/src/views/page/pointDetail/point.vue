<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/point.png"
           alt="">
      <div>
        <div class="cha">行业观点</div>
        <div class="eng">Top view</div>
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
        <span v-show="item.summary.length<60?false:true">...</span>
        <div class="mark">
          <div class="markCon">
            <!-- <div class="markInfo">{{item.detail}}</div> -->
            <img src="../../../assets/bei/icon_more(2).png"
                 alt="">
            <div class="markInfo"
                 @click="jump(item.id)">查看详情</div>
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
import { industry_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      econInfo: '',
      total: 0,
      baseUrl: 'http://ceshi.davost.com',
      pages: 1,
      pagesize: 10
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      const data = {
        pages: this.pages,
        pagesize: this.pagesize
      }
      industry_h5(data).then((res) => {
        console.log(res, '观点数据');
        this.econInfo = res.data.data.idea
        this.total = res.data.data.idea.length
        console.log(this.econInfo[0].summary.length, 'hhh');
      })
    },
    onPageChange (e) {
      console.log(e, 8888);
      this.pages = e
      this.getlist()
    },
    // 返回图片
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    jump (info) {
      console.log(info, 444);
      this.$router.push({
        path: '/pointDetail_h5',
        query: {
          id: info
        }
      })
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
    position: absolute;
    top: 40%;
    // left: 15.8rem;
    width: 100%;
    text-align: center;
    height: 2.5rem;
    font-size: 1.67rem;
    font-weight: bold;
    color: #ffffff;
    line-height: 1.95rem;
    letter-spacing: 4px;
    z-index: 2;
  }
  .eng {
    margin-top: 0.33rem;
    position: absolute;
    top: 51%;
    width: 100%;
    text-align: center;
    // left: 16.8rem;
    height: 1.25rem;
    font-size: 0.83rem;
    font-weight: 400;
    color: #ffffff;
    text-transform: uppercase;
    line-height: 0.98rem;
  }
}
.focFoot {
  margin: 1.83rem 1.33rem 1.67rem 1.33rem;
  display: flex;
  img {
    width: 15.5rem;
    height: 11.08rem;
  }
  .right {
    margin-top: 0.66rem;
    margin-left: 1rem;
    .footTitle {
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
      height: 3.3rem;
      overflow: hidden;
      // text-overflow: ellipsis;
      margin-top: 0.66rem;
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
          // margin-top: -0.4rem;
          margin-left: 0.38rem;
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