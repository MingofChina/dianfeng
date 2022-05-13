<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/focusBg.png"
           alt="">
      <div>
        <div class="cha">巅峰要闻</div>
        <div class="eng">News of the peak</div>
      </div>
    </div>
    <div class="focMain">
      <div class="title">中国文旅产业巅峰大会</div>
      <div class="mes">{{focMes}}</div>
      <ul class="banner">
        <li class="show">
          <img src="../../../assets/imgs/banner.png"
               alt="">
          <div class="btn">
            <img class="first"
                 src="../../../assets/imgs/focLeft.png"
                 alt="">
            <img class="second"
                 src="../../../assets/imgs/focRight.png"
                 alt="">
          </div>
          <div class="bgMes">第七届中国文旅产业巅峰大会</div>
        </li>
      </ul>
    </div>
    <div class="focFoot"
         v-for="(item,i) in econInfo"
         :key="i">
      <img :src="require(`../../../assets/bei/${item.img}.png`)"
           alt="">
      <div class="right">
        <div class="footTitle">{{item.title}}</div>
        <div class="footMes">{{item.mes}}</div>
        <div class="mark">
          <div class="markCon">
            <!-- <div class="markInfo">{{item.detail}}</div> -->
            <img src="../../../assets/bei/icon_more(2).png"
                 alt="">
            <div class="markInfo">{{item.detail}}</div>
          </div>
          <div class="date">{{item.date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      focMes: '巅峰智业秉承“资源有限 智慧无穷”的理念，信守“人才至上”的价值观，将员工教育作为企业文化建设的突破口和提升企业竞争力的利器。构建了自己的黄埔军校——“巅峰大讲堂”，结合“导师制”、“金鹰特训班”、“项目经典沙龙”、“专家讲座”等多种形式，通过新员工培训、业务技能培训、管理技能培训、通用技能培训等多维度课程体系，为公司发展和员工成长提供学习解决方案。',
      econInfo: [
        {
          img: 'epcjianshe',
          title: '掘金夜间经济：夜景醉游人遇见...',
          mes: '夜景塑造即利用灯光将城市或某区域内的构筑物、景观等加以重塑，并将其...',
          detail: '查看详情',
          date: '2020-02-22'
        },
        {
          img: 'epcjianshe',
          title: '掘金夜间经济：夜景醉游人遇见...',
          mes: '夜景塑造即利用灯光将城市或某区域内的构筑物、景观等加以重塑，并将其...',
          detail: '查看详情',
          date: '2020-02-22'
        },
        {
          img: 'epcjianshe',
          title: '掘金夜间经济：夜景醉游人遇见...',
          mes: '夜景塑造即利用灯光将城市或某区域内的构筑物、景观等加以重塑，并将其...',
          detail: '查看详情',
          date: '2020-02-22'
        },
        {
          img: 'epcjianshe',
          title: '掘金夜间经济：夜景醉游人遇见...',
          mes: '夜景塑造即利用灯光将城市或某区域内的构筑物、景观等加以重塑，并将其...',
          detail: '查看详情',
          date: '2020-02-22'
        },
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
    left: 14.25rem;
    height: 1.25rem;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.focMain {
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
  .banner {
    position: relative;
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    .show {
      width: 34.8rem;
      height: 20.67rem;
      img {
        width: 34.8rem;
        height: 20.67rem;
      }
      .btn {
        img {
          width: 2rem;
          height: 2rem;
        }
        .first {
          position: absolute;
          top: 50%;
          text-align: left;
        }
        .second {
          position: absolute;
          top: 50%;
          right: 0;
          text-align: right;
        }
      }
    }
    .bgMes {
      position: absolute;
      bottom: 0;
      width: 34.8rem;
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
      font-size: 1.17rem;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #231914;
      line-height: 1.37rem;
    }
    .footMes {
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
</style>
