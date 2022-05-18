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
      <div class="circle"
           v-for="(it,idx) in company"
           :key="idx"
           @click="jump(idx)">
        <button class="btn"
                :class="changeColor == idx?'active':''">{{it.title}}</button>
      </div>
    </div>
    <ul class="content">
      <li class="child"
          v-for="(item,i) in company[chooseInfo].child"
          :key="i">
        <img :src=getImgUrl(item.original_image)
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
        <img :src=getImgUrl(item.original_image)
             alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { partner_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      company: '',
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
      chooseInfo: 0,
      changBtn: true,
      changeColor: 0,
      BdInfo: '',
      baseUrl: 'http://ceshi.davost.com',
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      partner_h5().then((res) => {
        console.log(res);
        this.BdInfo = res.data.data.cooperative_partner
        this.company = res.data.data.customer_list
      })
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    jump (i) {
      this.chooseInfo = i
      this.changBtn = false
      this.changeColor = i
      console.log(i, 'nnn');
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
    // left: 15.25rem;
    text-align: center;
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
    width: 100%;
    top: 51%;
    text-align: center;
    // left: 16.25rem;
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
  .circle {
    display: inline-block;
    .btn {
      width: 8rem;
      height: 2.67rem;
      background: #fff;
      border: 0.08rem solid #cacaca;

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