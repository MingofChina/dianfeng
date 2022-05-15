<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/us.png"
           alt="">
      <div>
        <div class="cha">联系我们</div>
        <div class="eng">Contact work</div>
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
import { law_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      lawInfo: '',
      baseUrl: 'http://ceshi.davost.com',
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      law_h5().then((res) => {
        console.log(res, 'hhh');
        this.lawInfo = res.data.data.message
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
  .cha {
    position: absolute;
    top: 7.8rem;
    left: 15.25rem;
    width: 7.83rem;
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
    top: 9.8rem;
    left: 14.15rem;
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
