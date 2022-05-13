<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/partnerBg.png"
           alt="">
      <div>
        <div class="cha">合作伙伴</div>
        <div class="eng">partners</div>
      </div>
    </div>
    <div class="partTitle">
      <div class="customer">客户名录</div>
      <div class="custEng">Client list</div>
    </div>
    <div class="teamBtn">
      <button class="btn active">管理团队</button>
      <button class="btn">专家团队</button>
      <button class="btn">技术团队</button>
    </div>
    <ul class="content">
      <li class="child"
          v-for="(item,i) in companyInfo"
          :key="i">
        <img :src="require(`../../../assets/imgs/${item.img}.png`)"
             alt="">
      </li>
    </ul>
    <div class="partTitle">
      <div class="customer">合作伙伴</div>
      <div class="custEng">partners</div>
    </div>
    <ul class="content">
      <li class="child"
          v-for="(item,i) in BdInfo"
          :key="i">
        <img :src="require(`../../../assets/imgs/${item.img}.png`)"
             alt="">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      companyInfo: [
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
        { img: 'company' },
      ],
      BdInfo: [
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
        { img: 'bd' },
      ],
    }
  },
  methods: {

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
    left: 16.25rem;
    height: 1.25rem;
    text-transform: uppercase;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.partTitle {
  margin-top: 3.33rem;
  text-align: center;
  .customer {
    font-size: 1.67rem;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 1.95rem;
  }
  .custEng {
    font-size: 1rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #231914;
    line-height: 1.17rem;
  }
}
.teamBtn {
  margin: 1rem 0 1rem 1.33rem;
  .btn {
    width: 8rem;
    height: 2.67rem;
    background: #cacaca;
    border: 0;
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
.content {
  margin-left: 1.33rem;
  margin-right: 1.33rem;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .child {
    border: 1px dashed black;
    margin-bottom: 0.66rem;
    img {
      width: 6.33rem;
      height: 3.9rem;
    }
  }
}
</style>