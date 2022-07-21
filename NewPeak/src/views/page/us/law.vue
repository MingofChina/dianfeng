<template>
  <div id="app"
       style="width: 100vw;
    overflow-x: hidden;">
    <div class="showImg">
<!--      <img src="../../../assets/imgs/us.png"-->
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
<!--        <div class="cha">联系我们</div>-->
<!--        <div class="eng">Contact work</div>-->
      </div>
    </div>
    <div class="title">
      <div class="titleName">{{lawInfo.title}}</div>
      <div class="info"
           v-html="lawInfo.description"></div>
    </div>
  </div>
</template>
<script>
import { law_h5,banner_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      bannerList:'',
      lawInfo: '',
      baseUrl: 'http://ceshi.davost.com',
    }
  },
  created () {
    this.getList()
    this.getBanner()
  },
  methods: {
    getList () {
      law_h5().then((res) => {
        console.log(res, 'hhh');
        this.lawInfo = res.data.data.message
      })
    },
    getBanner(){
      banner_h5().then((res)=>{
        console.log(res,'res')
        this.bannerList = res.data.data
      })
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
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
    text-align: center;
    // left: 15.25rem;
    width: 100%;
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
    text-align: center;
    // left: 14.15rem;
    width: 100%;
    height: 1.25rem;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    text-transform: uppercase;
    line-height: 0.98rem;
  }
}
.title {
  margin: 2rem 1.33rem 0 1.33rem;
  .titleName {
    text-align: center;
    font-size: 1.67rem;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #231914;
    line-height: 1.95rem;
  }
  .info {
    margin-top: 1rem;
    font-size: 1rem;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #3c3c3c;
    line-height: 2rem;
  }
}
</style>
