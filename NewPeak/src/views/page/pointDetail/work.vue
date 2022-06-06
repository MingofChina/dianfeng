<template>
  <div id="app"
       style="width: 100vw;
    overflow-x: hidden;">
    <div class="showImg">
<!--      <img src="../../../assets/imgs/work.png"-->
<!--           alt="">-->
      <el-carousel arrow="never"
                   :autoplay="false"
      >
        <el-carousel-item v-for="(it, idx) in bannerList"
                          :key="idx">
          <img :src="getImgUrl(it.original_image)"
               alt="" />
        </el-carousel-item>
      </el-carousel>
      <div>
<!--        <div class="cha">巅峰著作</div>-->
<!--        <div class="eng">Professional work</div>-->
      </div>
    </div>
    <div class="content"
         v-for="(item,i) in searchInfo"
         :key="i"
         @click="jump(item.id)">
      <img :src=getImgUrl(item.original_image)
           alt="">
      <div class="mes">
        <div class="title">{{item.title}}</div>
        <div class="info">{{item.summary}}</div>
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
import { books_h5,banner_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      bannerList:'',
      searchInfo: '',
      baseUrl: 'http://ceshi.davost.com',
      total: 0,
      pages: 1,
      pagesize: 10,
    }
  },
  created () {
    this.getList()
    this.getBanner()
  },
  methods: {
    getList () {
      const data = {
        pages: this.pages,
        pagesize: this.pagesize
      }
      books_h5(data).then((res) => {
        console.log(res, '著作');
        this.searchInfo = res.data.data.books
        this.total = 10 * res.data.data.books_pages_number
      })
    },
    getBanner(){
      banner_h5().then((res)=>{
        console.log(res,'res')
        this.bannerList = res.data.data
      })
    },
    onPageChange (e) {
      this.pages = e
      this.getList()
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    jump (info) {
      console.log(info, '777');
      this.$router.push({
        path: '/viewpoint_h5',
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
    height: 100%;
  }
  .cha {
    position: absolute;
    top: 40%;
    // left: 15.25rem;
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
    height: 1.25rem;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.content {
  padding: 1.67rem 1.33rem 1.67rem 1.33rem;
  margin: 0 auto;
  margin-top: 1.67rem;
  margin-bottom: 1.67rem;
  width: 85%;
  border: 0.08rem solid #cacaca;
  background: #f4f4f4;
  display: flex;
  img {
    // margin-left: 1rem;
    width: 7.67rem;
    height: 10.17rem;
  }
  .mes {
    margin-left: 1rem;
    .title {
      font-size: 1.17rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.37rem;
    }
    .info {
      margin-top: 1rem;
      font-size: 1rem;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #6e6e6e;
      line-height: 1.5rem;
    }
  }
}
.pagination {
  text-align: center;
  margin-bottom: 1.33rem;
}
</style>
