<template>
  <div id="app">
    <div class="showImg">
<!--      <img src="../../../assets/imgs/case.png"-->
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
<!--        <div class="cha">巅峰案例</div>-->
<!--        <div class="eng">Top case</div>-->
      </div>
    </div>
    <div class="teamBtn">
      <button class="btn"
              v-for="(item,i) in btnInfo"
              :key="i"
              :class="changeColor == i?'active':''"
              @click="jump(i,item.id)">{{item.name}}</button>
    </div>
    <ul class="imgShow">
      <li class="imgs"
          v-for="(item,i) in imgGroup"
          :key="i"
          @click="goLast(item.id)">
        <img :src=getImgUrl(item.original_image)
             alt="">
        <div class="title">{{item.title}}</div>
        <div class="message">{{item.summary}}</div>
        <span v-show="item.summary.length<40?false:true">...</span>
      </li>
    </ul>
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
import { case_h5,banner_h5 } from "../../../api/api.js";
// import {banner_h5} from "../../../api/api";
export default {
  data () {
    return {
      bannerList:'',
      imgGroup: '',
      baseUrl: 'http://ceshi.davost.com',
      btnInfo: '',
      changBtn: true,
      changeId: 24,
      changeColor: 0,
      pages: 1,
      total: 0,
      pagesize: 10
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
        pagesize: this.pagesize,
        id: this.changeId,
      }
      case_h5(data).then((res) => {
        console.log(res, '案例');
        this.btnInfo = res.data.data.column
        this.changeId = res.data.data.column[0].id
        this.imgGroup = res.data.data.case
        this.total = res.data.data.case_pages_number * 10
      })

    },
    // getListInfo () {
    //   const data = {
    //     pages: this.pages,
    //     pagesize: this.pagesize,
    //     id: this.changeId
    //   }
    //   case_h5(data).then((res) => {
    //     console.log(res, 'll');
    //     this.total = res.data.data.case_pages_number
    //     this.imgGroup = res.data.data.case
    //   })
    // },
    onPageChange (e) {
      this.pages = e
      this.getList()
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    getBanner(){
      banner_h5().then((res)=>{
        console.log(res,'res')
        this.bannerList = res.data.data
      })
    },
    goLast (info) {
      console.log(info, 'ggg');
      this.$router.push({
        path: '/caseDetail_h5',
        query: {
          id: info
        }
      })
    },
    jump (i, info) {
      this.changBtn = false
      this.changeColor = i
      this.changeId = info

      this.getList()
      // console.log(i, 'nnn', info);
      // this.$router.push({
      //   path: '/business_h5',
      //   query: {
      //     id: info
      //   }
      // })
    }

  }
}
</script>
<style lang="less" scoped>
.showImg {
  // width: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    /*height: 30vh;*/
  }
  .cha {
    position: absolute;
    top: 40%;
    /*left: 40%;*/
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
    width: 100%;
    margin-top: 0.33rem;
    position: absolute;
    top: 51%;
    text-align: center;
    height: 1.25rem;
    font-size: 0.83rem;
    font-weight: 400;
    color: #ffffff;
    /*text-transform: uppercase;*/
    line-height: 0.98rem;
  }
}

.teamBtn {
  margin: 1rem 0 1rem 1.33rem;
  white-space: nowrap;
  width: 95%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .btn {
    width: 8rem;
    height: 2.67rem;
    border: 0.068rem solid #cacaca;
    background: #fff;
    /*border: 0;*/
    // margin-left: 2rem;
    margin-right: 2rem;
    font-size: 1.17rem;
    font-weight: 500;
    line-height: 2.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    letter-spacing: 2px;
  }
  .active {
    background: #c8000a;
    color: #ffffff;
  }
}
.imgShow {
  margin: 1rem 1.33rem 1rem 1.33rem;
  margin-bottom: 2.67rem;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .imgs {
    width: 45%;
    // height: 24.83rem;
    margin-bottom: 1rem;
    background-color: #fff;
    border-radius: 3px;
    img {
      width: 100%;
      height: 17.42rem;
    }
    .title {
      display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
      -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
      overflow: hidden; /*超出的文本隐藏*/
      text-overflow: ellipsis; /* 溢出用省略号*/
      -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
      margin-left: 0.67rem;
      width: 12.42rem;
      text-align: left;
      font-size: 1.17rem;
      font-weight: 400;
      color: #231914;
      line-height: 1.37rem;
    }
    .message {
      margin-left: 0.67rem;
      margin-top: 0.33rem;
      width: 12.42rem;
      height: 2.8rem;
      overflow: hidden;
      font-size: 0.92rem;
      font-weight: 400;
      color: #a0a0a0;
      line-height: 1.47rem;
    }
    span {
      margin-left: 0.67rem;
      margin-top: 0.33rem;
      color: #a0a0a0;
    }
  }
}
.pagination {
  text-align: center;
  margin-bottom: 1.33rem;
}
</style>
