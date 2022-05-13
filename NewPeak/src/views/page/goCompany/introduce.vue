<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/introduce.png"
           alt="">
      <div>
        <div class="cha">巅峰介绍</div>
        <div class="eng">The peak is introduced</div>
      </div>
    </div>
    <div class="intMeg">
      <div class="two">
        <div class="first">
          <div class="title">创立<span style="color:#C8000A">21年</span></div>
          <div class="mes">文旅行业实践者</div>
        </div>
        <div class="second">
          <div class="title">完成项目<span style="color:#C8000A">3000+</span></div>
          <div class="mes">美丽中国价值经典</div>
        </div>
      </div>
      <div class="three">
        <div class="third">
          <div class="title">运营景区<span style="color:#C8000A">100+</span></div>
          <div class="mes">专业运营旅游景区</div>
        </div>
        <div class="fourth">
          <div class="title">荣获奖项<span style="color:#C8000A">100+</span></div>
          <div class="mes">国内外奖项获得者</div>
        </div>
        <div class="fifth">
          <div class="title">骨干员工近<span style="color:#C8000A">1000</span></div>
          <div class="mes">业界骨干创意精英</div>
        </div>
      </div>
    </div>
    <div class="article">
      <div class="chaTitle">巅峰介绍</div>
      <div class="engTitle">ABOUT US</div>
      <div class="paragraph">{{message}}</div>
      <div class="paragraphOne">{{info}}</div>
    </div>
    <div class="radio">
      <img src="../../../assets/bei/1.png" alt="" class="city">
      <img src="../../../assets/imgs/suspend.png" alt="" class="suspend">
    </div>
    <div class="brand">
      <div class="title">巅峰旗下品牌</div>
      <div class="cancelNum">
        <img class="cancelImg" src="../../../assets/img/logo.png" alt="">
        <img class="cancel" src="../../../assets/imgs/cancel.png" alt="">
      </div>
      <div class="selectNum" v-for="(item,i) in selectArr" :key="i">
        <img class="selectImg" :src="require(`../../../assets/img/${item.img}.png`)" alt="">
        <div class="selectInfo">{{item.message}}</div>
        <img class="select" :src="require(`../../../assets/imgs/${item.select}.png`)" alt="">
      </div>
    </div>
    <div class="honor">
      <div class="title">资质荣誉</div>
      <div class="label">企业资质</div>
      <ul class="certificate">
        <li class="certificateNums" v-for="(item,i) in certificateArr" :key="i">
          <div class="imgCon">
            <img :src="require(`../../../assets/imgs/${item.img}.png`)" alt="">
          </div>
          <div class="reson">{{item.info}}</div>
        </li>
      </ul>
      <div class="direction">
        <img style="width: 2.22rem;height: 2.22rem" src="../../../assets/imgs/left.png" alt="">
        <img style="margin-left: 3.33rem;width: 2.22rem;height: 2.22rem" src="../../../assets/imgs/right.png" alt="">
      </div>
    </div>
    <div class="qualifications">
      <div class="title">企业资质</div>
      <ul class="qua">
        <li class="quaNums" v-for="(item,i) in quaArr">
          <div class="quaImg">
            <img :src="require(`../../../assets/imgs/${item.img}.png`)" alt="">
          </div>
        </li>
      </ul>
      <div class="direction">
        <img style="width: 2.22rem;height: 2.22rem" src="../../../assets/imgs/left.png" alt="">
        <img style="margin-left: 3.33rem;width: 2.22rem;height: 2.22rem" src="../../../assets/imgs/right.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: '北京巅峰智业旅游文化创意股份有限公司始创于2001年，目前已发展成为中国旅游规划行业的头部企业、文旅产业的创新引领者和开拓者，提出了 “规划设计、落地建设、产品打造、运营管理”四位一体全链服务战略，为客户提供文旅产业创新发展线上线下一站式解决方案。',
      info: '作为文旅规划建设运营全程服务商，巅峰智业资质全面, 拥有旅游规划设计甲级、城乡规划编制甲级、风景园林工程设计专项甲级、城市及道路照明工程专业承包壹级、专业舞台灯光设计、安装及调试甲级，专业舞台设计制作工程甲级，专业舞台音视频设计、安装及调试甲级，专业舞台音响设计、安装及调试甲级的“八项甲级”资质；业务覆盖全国，完成3000余项高品质项目，累计运管景区100余家，在1000余项国际、国内项目竞标中拔得头筹。创新推出安庆太湖文博园《天仙配新传》、张家口下花园《西游归来》、济南大石崮《好汉山东》等“巅峰震撼”系列光影剧强势新IP，其中《天仙配新传》还作为安庆文旅新名片，被央视新闻联播重点报道。《顺德华侨城空间秀》等系列夜游目的地新地标，已成为年轻人喜爱的网红打卡地。此外，还推动了松鼠森林、绿心童乡、欢乐星球、峰物文创、旅豆学堂等一系列落地产品。',
      selectArr:[
        {
          img:'logo',
          message: '智慧光影 缔造传奇',
          select: 'select'
        },
        {
          img:'logo',
          message: '峰物文创，创意巅峰',
          select: 'select'
        },
        {
          img:'logo',
          message: '智慧光影 缔造传奇',
          select: 'select'
        },
        {
          img:'logo',
          message: '学文旅 上旅豆',
          select: 'select'
        },
        {
          img:'logo',
          message: '赋能中国文旅产业高质量发展',
          select: 'select'
        }
      ],
      certificateArr:[
        {
          img:'introduce',
          info:'旅游规划甲级资质'
        },
        {
          img:'introduce',
          info:'旅游规划甲级资质'
        },
        {
          img:'introduce',
          info:'旅游规划甲级资质'
        },
        {
          img:'introduce',
          info:'旅游规划甲级资质'
        },
        {
          img:'introduce',
          info:'旅游规划甲级资质'
        },
        {
          img:'introduce',
          info:'旅游规划甲级资质'
        }
      ],
      quaArr:[
        {
          img:'introduce',
        },
        {
          img:'introduce',
        },
        {
          img:'introduce',
        },
        {
          img:'introduce',
        },
        {
          img:'introduce',
        },
        {
          img:'introduce',
        }
      ],
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="less">
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
    left: 12.25rem;
    height: 1.25rem;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.intMeg {
  background: #f4f4f4;
  padding-top: 1.33rem;
  .two {
    margin-left: 1.33rem;
    display: flex;
    text-align: center;
    .first {
      width: 17.25rem;
      height: 5.5rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
        // margin-bottom: 1rem;
      }
      .mes {
        margin-top: 1rem;
        font-size: 0.83rem;
        font-family: Source Han Sans CN-Light, Source Han Sans CN;
        font-weight: 300;
        color: #3c3c3c;
        line-height: 0.98rem;
      }
    }
    .second {
      margin-left: 0.3rem;
      width: 17.25rem;
      height: 5.5rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
      }
      .mes {
        margin-top: 1rem;
        font-size: 0.83rem;
        font-family: Source Han Sans CN-Light, Source Han Sans CN;
        font-weight: 300;
        color: #3c3c3c;
        line-height: 0.98rem;
      }
    }
  }
  .three {
    margin-top: 0.3rem;
    margin-left: 1rem;
    display: flex;
    text-align: center;
    .third {
      margin-left: 0.3rem;
      width: 11.4rem;
      height: 5.83rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
      }
      .mes {
        margin-top: 1rem;
        font-size: 0.83rem;
        font-family: Source Han Sans CN-Light, Source Han Sans CN;
        font-weight: 300;
        color: #3c3c3c;
        line-height: 0.98rem;
      }
    }
    .fourth {
      margin-left: 0.3rem;
      width: 11.4rem;
      height: 5.83rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
      }
      .mes {
        margin-top: 1rem;
        font-size: 0.83rem;
        font-family: Source Han Sans CN-Light, Source Han Sans CN;
        font-weight: 300;
        color: #3c3c3c;
        line-height: 0.98rem;
      }
    }
    .fifth {
      margin-left: 0.3rem;
      width: 11.4rem;
      height: 5.83rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
      }
      .mes {
        margin-top: 1rem;
        font-size: 0.83rem;
        font-family: Source Han Sans CN-Light, Source Han Sans CN;
        font-weight: 300;
        color: #3c3c3c;
        line-height: 0.98rem;
      }
    }
  }
}
.article {
  background-color: #f4f4f4;
  padding-top: 2rem;
  text-align: center;
  .chaTitle {
    font-size: 1.67rem;
    font-weight: 500;
    color: #231914;
    line-height: 1.95rem;
  }
  .engTitle {
    font-size: 1rem;
    font-weight: 400;
    color: #231914;
    line-height: 1.17rem;
    padding-bottom: 2rem;
  }
  .paragraph {
    margin-left: 1.33rem;
    margin-right: 1rem;
    width: 35.2rem;
    /*height: 8.42rem;*/
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
    text-align: left;
    margin-bottom: 0.67rem;
  }
  .paragraphOne {
    margin-left: 1.33rem;
    margin-right: 1rem;
    width: 35.2rem;
    /*height: 8.42rem;*/
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
    text-align: left;
  }
}
.radio{
  background-color: #f4f4f4;
  padding-top: 2rem;
  position: relative;
  width: 37.58rem;
  height: 17.58rem;
  margin-bottom: 1.67rem;
  .city{
    margin-left: 1rem;
    width: 35.58rem;
    height: 17.58rem;
  }
  .suspend{
    position: absolute;
    top:50%;
    left: 48%;
  }
}
.brand{
  margin-top: 1.67rem;
  .title{
    /*margin-top: 1.67rem;*/
    text-align: center;
    font-size: 1.67rem;
    font-weight: 500;
    color: #231914;
    line-height: 1.95rem;
  }
  .cancelNum{
    margin: 1rem 1rem 0 1rem;
    display: flex;
    justify-content: space-between;
    .cancelImg{
      width: 10rem;
      height: 2.76rem;
    }
    .cancel{
      width: 1.33rem;
      height: 1.33rem;
      margin-top: 1rem;
    }
  }
  .selectNum{
    display: flex;
    justify-content: space-between;
    /*width: 100%;*/
    margin: 1.33rem 1rem 0.67rem 1rem;
    .selectImg{
      width: 10rem;
      height: 2.76rem;
    }
    .selectInfo{
      /*margin-left: 2.92rem;*/
      margin-top: 0.3rem;
    }
    .select{
      width: 1.33rem;
      height: 1.33rem;
      /*margin-right: 0rem;*/
      /*text-align: right;*/
      /*float: right;*/
    }

  }
}
.honor{
  background-color: #f4f4f4;
  .title{
    padding-top: 2rem;
    text-align: center;
    font-size: 1.67rem;
    font-weight: 500;
    color: #231914;
    line-height: 1.95rem;
  }
  .label{
    margin-left: 1.33rem;
  }
  .certificate{
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    .certificateNums{
      width: 13.83rem;
      margin-top: 0.67rem;
      margin-bottom: 1rem;
      .imgCon{
        width: 14.5rem;
        height: 11.33rem;
        background-color: #fff;
        img{
          margin-left: 0.75rem;
          margin-top: 0.67rem;
          width: 13rem;
          height: 9.75rem;
        }
      }
      .reson{
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
        color: #231914;
        line-height: 2.17rem;
      }
    }
  }
  .direction{
    margin-top: 1rem;
    padding-bottom: 1.67rem;
    text-align: center;
  }
}
.qualifications{
  .title{
    margin-left: 1.33rem;
    margin-top: 1.67rem;
    font-size: 1.17rem;
    font-weight: 500;
    color: #231914;
    line-height: 2.17rem;
  }
  .qua{
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    .quaNums {
      width: 13.83rem;
      margin-top: 0.67rem;
      margin-bottom: 1rem;

      .quaImg {
        width: 14.5rem;
        height: 11.33rem;
        background-color: #fff;
        border: 0.08rem solid #CACACA;
        img {
          margin-left: 0.75rem;
          margin-top: 0.67rem;
          width: 13rem;
          height: 9.75rem;
        }
      }
    }
  }
  .direction{
    margin-top: 1rem;
    padding-bottom: 1.67rem;
    text-align: center;
  }
}
</style>
