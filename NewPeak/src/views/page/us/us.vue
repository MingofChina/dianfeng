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
    <div class="content">
      <img src="../../../assets/bei/beijing(1).png"
           alt="">
    </div>
    <div class="mark"
         v-for="(item,i) in addressInfo"
         :key="i">
      <div class="address">
        <img src="../../../assets/bei/icong_weizhi.png"
             alt="">
        <div class="addressInfo">{{item.address}}</div>
      </div>
      <div class="detail"></div>
      <div>
        <img src="../../../assets/bei/icom_dianhua.png"
             alt="">
        <div>咨询电话<span>{{item.phone}}</span></div>
      </div>
      <div>
        <img src="../../../assets/bei/icom_youxiang.png"
             alt="">
        <div>业务邮箱<span>{{item.qq}}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      addressInfo: [
        {
          address: '',
          detail: '',
          phone: '',
          qq: ''
        },
        {
          address: '',
          detail: '',
          phone: '',
          qq: ''
        },
        {
          address: '',
          detail: '',
          phone: '',
          qq: ''
        }
      ]
    }
  },
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
.content {
  // margin-top: 1.67rem;
  // margin-left: 1.33rem;
  // margin-right: 1.33rem;
  margin: 1.67rem 1.33rem 2rem;
  img {
    width: 34.8rem;
    height: 18.42rem;
  }
}
</style>