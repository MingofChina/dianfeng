<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/fengCai.png"
           alt="">
      <div>
        <div class="cha">巅峰风采</div>
        <div class="eng">Top talent</div>
      </div>
    </div>
    <div class="title">
      <div class="cha">巅峰风采</div>
      <div class="eng">Top talent</div>
    </div>
    <div class="show"
         v-for="(item,i) in viewArr"
         :key="i">
      <img :src="require(`../../../assets/imgs/${item.img}.png`)"
           alt="">
      <div>
        <div class="cha">{{item.title}}</div>
        <div class="eng">{{item.mes}}</div>
      </div>
    </div>
    <div class="pic">
      <div class="bar">
        <div class="barNums"
             v-for="(item,i) in barInfo"
             :key="i">
          <div class="barTitle">{{item.name}}</div>
          <div class="stick">|</div>
        </div>
      </div>
      <div class="title">
        {{picMes}}
      </div>
      <div class="img">
        <img src="../../../assets/imgs/fengCai.png"
             alt="">
        <div class="imgTitle">《金鹰特训班》</div>
      </div>
    </div>
    <div class="foot">
      <div class="bar">
        <div class="barNums"
             v-for="(item,i) in footBarInfo"
             :key="i">
          <div class="barTitle">{{item.name}}</div>
          <div class="stick">|</div>
        </div>
      </div>
      <div class="title">
        {{footInfo}}
      </div>
      <div class="footImg">
        <img src="../../../assets/imgs/fengCai.png"
             alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      picMes: '资源有限，智慧无穷。巅峰信守着“人才至上”的价值观，将员工教育作为企业文化建设的突破口和企业竞争力增长的利器。我们构建了自己的“黄埔军校”——“巅峰大讲堂”，结合“导师制”、“金鹰特训班”、“项目经典沙龙”、“专家讲座”等多种形式，通过多维度课程体系，为公司发展和员工成长提供“工具+知识”的学习解决方案，打造持续成长的学习型企业。',
      footInfo: '巅峰智业已走过20年的风雨历程，有坎坷、坚持，有辉煌、感动，不同的“巅峰”时期，每个人的心里都有一个不一样的巅峰。每年的巅峰司庆庆典都会邀请到文旅产业的重要领导、资深专家、以及头部企业的掌门人等文旅巨擘共襄盛宴，共庆巅峰璀璨。更有“十八般”武艺俱全的巅峰人齐聚巅峰星球村，展现实践成果的创意结晶，表达饱含激情的收获领悟。',
      barInfo: [
        { name: '巅峰大讲堂' },
        { name: '巅峰第三空间' },
        { name: '巅峰所见' },
      ],
      footBarInfo: [
        { name: '巅峰司庆' },
        { name: '年会集市' },
        { name: '活动考察' },
      ],
      viewArr: [
        {
          img: 'feng1',
          title: '巅峰使命',
          mes: '制造美丽中国 缔造美好生活',
        },
        {
          img: 'feng2',
          title: '巅峰愿景',
          mes: '制造美丽中国 缔造美好生活',
          // mes: '让14亿人旅游更美好 让文旅发展少走弯路',
        },
        {
          img: 'feng3',
          title: '巅峰价值观',
          // mes: '成功客户 成就员工',
          mes: '制造美丽中国 缔造美好生活',
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
    left: 16.25rem;
    height: 1.25rem;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.title {
  margin-top: 2rem;
  text-align: center;
  margin-bottom: 1.33rem;
  .cha {
    font-size: 1.67rem;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 1.95rem;
  }
  .eng {
    font-size: 1rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #231914;
    line-height: 1.17rem;
  }
}
.show {
  // padding: 1rem;,
  margin-top: -0.3rem;
  position: relative;
  .cha {
    position: absolute;
    top: 12.8rem;
    left: 15.25rem;
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
    margin-top: 0.33rem;
    position: absolute;
    top: 15.8rem;
    left: 12.5rem;
    height: 1.25rem;
    margin: 0 auto;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.pic {
  background: #f4f4f4;
  .bar {
    padding-top: 1.33rem;
    // padding-bottom: 1rem;
    margin-left: 1.33rem;
    display: flex;
    /*justify-content: space-between;*/
    .barNums {
      display: flex;
      /*justify-content: space-between;*/
      .barTitle {
        width: 7.5rem;
        height: 1.75rem;
        font-size: 1.17rem;
        font-weight: 400;
        color: #6e6e6e;
        line-height: 1.37rem;
      }
      .stick {
        color: #231914;
        margin: -0.3rem 1.33rem 0 1.33rem;
      }
    }
  }
  .title {
    margin-top: 1rem;
    padding-left: 1.33rem;
    padding-right: 1.33rem;
    font-size: 1rem;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
    text-align: left;
    margin-bottom: 0.67rem;
  }
  .img {
    position: relative;
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    img {
      // width: 28.58rem;
      height: 18.92rem;
      margin-bottom: 1.67rem;
    }
    .imgTitle {
      position: absolute;
      top: 0.67rem;
      left: 0.67rem;
      width: 10.33rem;
      height: 2.5rem;
      text-align: center;
      background: rgba(0, 0, 0, 0.49);
      font-size: 1rem;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 2.67rem;
    }
  }
}
.foot {
  .bar {
    margin-top: 2rem;
    margin-bottom: 1rem;
    // padding-bottom: 1rem;
    margin-left: 1.33rem;
    display: flex;
    /*justify-content: space-between;*/
    .barNums {
      display: flex;
      /*justify-content: space-between;*/
      .barTitle {
        width: 7.5rem;
        height: 1.75rem;
        font-size: 1.17rem;
        font-weight: 400;
        color: #6e6e6e;
        line-height: 1.37rem;
      }
      .stick {
        color: #231914;
        margin: -0.3rem 1.33rem 0 1.33rem;
      }
    }
  }
  .title {
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    text-align: left;
    font-size: 1rem;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
  }
  .footImg {
    margin: 0 1.33rem 2.08rem 1.33rem;
    img {
      width: 35rem;
      height: 18.92rem;
    }
  }
}
</style>
