
<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/union.png"
           alt="">
      <div>
        <div class="cha">产业联盟</div>
        <div class="eng">Industry alliance</div>
      </div>
    </div>
    <div class="law"
         v-for="(item,i) in unionInfo"
         :key="i">
      <div class="viTitle">
        <div class="stork">|</div>
        <div class="title">{{item.title}}</div>
      </div>
      <div class="content">{{item.small_descrip}}</div>
      <div class="ban">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(it,idx) in unionInfo"
                            :key="idx">
            <img :src=getImgUrl(it.original_image)
                 alt="">
          </el-carousel-item>
        </el-carousel>

        <!-- <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4"
                            :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel> -->
        <!-- <ul class="bannerNums">
          <li class="banner"
              v-for="(it,idx) in item.original_image"
              :key="idx">
            <img :src=getImgUrl(it.original_image)
                 alt="">
            <div class="btn">
              <img class="left"
                   src="../../../assets/imgs/focLeft.png"
                   alt="">
              <img class="right"
                   src="../../../assets/imgs/focRight.png"
                   alt="">
            </div>
          </li>
        </ul> -->
      </div>
      <div class="news"
           v-for="(itemm,index) in item.document"
           :key="index">
        <div class="newTitle">{{itemm.title}}</div>
        <div class="newInfo">{{itemm.summary}}</div>
        <!--        <span v-show="itemm.summary.length<40?false:true">...</span>-->
        <div class="newDetail">
          <div class="detail">
            <img src="../../../assets/bei/icon_more(2).png"
                 alt="">
            <div class="detailName">查看详情</div>
          </div>
          <div class="date">{{itemm.addtime}}</div>
        </div>
      </div>
    </div>
    <!--    <ul class="bannerNums">-->
    <!--      <li class="banner">-->
    <!--        <img src="../../../assets/imgs/unionBanner.png"-->
    <!--             alt="">-->
    <!--        <div class="btn">-->
    <!--          <img class="left"-->
    <!--               src="../../../assets/imgs/focLeft.png"-->
    <!--               alt="">-->
    <!--          <img class="right"-->
    <!--               src="../../../assets/imgs/focRight.png"-->
    <!--               alt="">-->
    <!--        </div>-->
    <!--      </li>-->
    <!--    </ul>-->
    <!--    <div class="news"-->
    <!--         v-for="(item,i) in news"-->
    <!--         :key="i">-->
    <!--      <div class="newTitle">{{item.title}}</div>-->
    <!--      <div class="newInfo">{{item.info}}</div>-->
    <!--      <div class="newDetail">-->
    <!--        <div class="detail">-->
    <!--          <img src="../../../assets/bei/icon_more(2).png"-->
    <!--               alt="">-->
    <!--          <div class="detailName">查看详情</div>-->
    <!--        </div>-->
    <!--        <div class="date">{{item.date}}</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!-- 数字化 -->
    <!--    <div class="nums">-->
    <!--      <div class="viTitle">-->
    <!--        <div class="stork">|</div>-->
    <!--        <div class="title">文旅好IP 文旅产业数字化平台</div>-->
    <!--      </div>-->
    <!--      <div class="content">{{infoTwo}}</div>-->
    <!--      <div class="ban">-->
    <!--        <ul class="bannerNums">-->
    <!--          <li class="banner">-->
    <!--            <img src="../../../assets/imgs/nums.png"-->
    <!--                 alt="">-->
    <!--            <div class="btn">-->
    <!--              <img class="left"-->
    <!--                   src="../../../assets/imgs/focLeft.png"-->
    <!--                   alt="">-->
    <!--              <img class="right"-->
    <!--                   src="../../../assets/imgs/focRight.png"-->
    <!--                   alt="">-->
    <!--            </div>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--      <div class="news"-->
    <!--           v-for="(item,i) in news"-->
    <!--           :key="i">-->
    <!--        <div class="newTitle">{{item.title}}</div>-->
    <!--        <div class="newInfo">{{item.info}}</div>-->
    <!--        <div class="newDetail">-->
    <!--          <div class="detail">-->
    <!--            <img src="../../../assets/bei/icon_more(2).png"-->
    <!--                 alt="">-->
    <!--            <div class="detailName">查看详情</div>-->
    <!--          </div>-->
    <!--          <div class="date">{{item.date}}</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    &lt;!&ndash; 经济联盟 &ndash;&gt;-->
    <!--    <div class="enc"-->
    <!--         v-for="(item,i) in encInfo"-->
    <!--         :key="i">-->
    <!--      <div class="viTitle">-->
    <!--        <div class="stork">|</div>-->
    <!--        <div class="title">{{item.title}}</div>-->
    <!--      </div>-->
    <!--      <div class="content"-->
    <!--           v-for="(res,idx) in item.content"-->
    <!--           :key="idx">{{res.name}}</div>-->
    <!--      <ul class="bannerNums">-->
    <!--        <li class="banner">-->
    <!--          <img :src="require(`../../../assets/imgs/${item.img}.png`)"-->
    <!--               alt="">-->
    <!--          <div class="btn">-->
    <!--            <img class="left"-->
    <!--                 src="../../../assets/imgs/focLeft.png"-->
    <!--                 alt="">-->
    <!--            <img class="right"-->
    <!--                 src="../../../assets/imgs/focRight.png"-->
    <!--                 alt="">-->
    <!--          </div>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--      <div class="news"-->
    <!--           v-for="(item,i) in news"-->
    <!--           :key="i">-->
    <!--        <div class="newTitle">{{item.title}}</div>-->
    <!--        <div class="newInfo">{{item.info}}</div>-->
    <!--        <div class="newDetail">-->
    <!--          <div class="detail">-->
    <!--            <img src="../../../assets/bei/icon_more(2).png"-->
    <!--                 alt="">-->
    <!--            <div class="detailName">查看详情</div>-->
    <!--          </div>-->
    <!--          <div class="date">{{item.date}}</div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
import { alliance_h5 } from "../../../api/api.js"
export default {
  data () {
    return {
      unionInfo: '',
      encInfo: [
        {
          title: '乡村振兴产业联合发展平台',
          content: [
            { name: '中国文旅夜游经济联盟（以下简称“联盟”），是北京巅峰智业旅游文化创意股份有限公司发起，由北京巅峰智业文化创意股份有限公司和焦作中旅银行股份有限公司联合牵头，由国内的文旅夜游创意科技板块、灯光照明产业链、文旅金融资本机构、政府平台集团、演出剧场和空间、演艺经纪机构等文化和旅游业相关企业及个人等自愿结成的全国性、行业性的非社会团体组织，是文旅夜游经营产品一站式综合服务平台。旨在推动中国文旅夜游经济板块实现快速开发，提升运营服务水平，打造爆款经营产品，实现提质增效和产业蓬勃发展。' },
            { name: '联盟将遵循“资源共享，互惠互利，优势互补，联合发展”的宗旨，秉承“顺应中国文旅夜游经济市场的供需发展，整合领域中的权威精英与机构，构建市场体系与资源高效对接的大型专业文旅夜游经济平台，推动中国文旅夜游经济板块实现快速开发，提升运营服务水平，打造爆款经营产品，实现提质增效和产业蓬勃发展”的使命，与您们一起共同推进中国文旅夜游经济板块实现快速发展！' },
            { name: '首批29家成员还包括北京中视巅峰光影科技有限公司、北京巅峰光华科技发展有限公司、江苏创一佳照明股份有限公司、深圳市文业照明实业有限公司、汉合天辰（厦门）科技有限公司、南京夫子庙文化旅游集团有限公司、华谊启明东方暖文化发展有限责任公司、清华大学美术学院艺术设计系等。' },
          ],
          img: 'enc',
        },
        {
          title: '自定义模块',
          content: [
            { name: '文旅好IP于2021年5月发布，致力于引领文旅行业互联网创新、赋能中国文旅产业高质量发展的文旅产业数字化平台。为文旅从业者提供行业动态资讯门户、功能强大的企业库和案例库、在线营销工具和文旅项目推介招商平台等产品，一站式打造文旅产业数字化营销工具，便利行业信息交流。将推动文化和旅游企业在数字化转型和创新性增长中探索更多可能，同时也带动数以万计的行业精英在平台上发现机遇、链接资源、拓展渠道、共享价值。' },
          ],
          img: 'enc1',
        },
      ],
      news: [
        {
          title: '掘金夜间经济：夜景“醉”游人，遇见“夜”来香',
          summary: '夜景塑造即利用灯光将城市或某区域内的构筑物、景观等加以重塑，并将其有机地组合成一个和谐优美、富有特色的夜景图...',
          addtime: '2020-02-22',
        },
        {
          title: '掘金夜间经济：夜景“醉”游人，遇见“夜”来香',
          info: '夜景塑造即利用灯光将城市或某区域内的构筑物、景观等加以重塑，并将其有机地组合成一个和谐优美、富有特色的夜景图...',
          date: '2020-02-22',
        }
      ],
      baseUrl: 'http://ceshi.davost.com',
      infoOne: '新华网、巅峰智业与旅豆学堂积极响应国家乡村振兴发展战略，推动乡村振兴之产业振兴，于2021年5月27日第七届中国文旅产业巅峰大会上，共同倡议发起乡村振兴产业联合发展平台。聚合致力乡村振兴事业的全行业力量，凝聚优质资源，助力构建乡村振兴全产业链，打造具有落地性和影响力的共享、共赢的交流服务平台。乡村振兴产业联合发展平台集合行业专家，汇集政府、资本和乡村相关产业各方资源，建立信息对接平台，实现资源全面整合，并为平台成员提供一站式乡村振兴落地服务，包含顶层规划、产品产业资源导入、建设落地与运营、乡村品牌打造、乡村人才培训等。',
      infoTwo: '文旅好IP于2021年5月发布，致力于引领文旅行业互联网创新、赋能中国文旅产业高质量发展的文旅产业数字化平台。为文旅从业者提供行业动态资讯门户、功能强大的企业库和案例库、在线营销工具和文旅项目推介招商平台等产品，一站式打造文旅产业数字化营销工具，便利行业信息交流。将推动文化和旅游企业在数字化转型和创新性增长中探索更多可能，同时也带动数以万计的行业精英在平台上发现机遇、链接资源、拓展渠道、共享价值。',
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      alliance_h5().then((res) => {
        console.log(res, '产业联盟')
        this.unionInfo = res.data.data.union
      })
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  list-style: none;
}
.showImg {
  position: relative;
  img {
    width: 100%;
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
    width: 100%;
    margin-top: 0.33rem;
    position: absolute;
    top: 50%;
    text-align: center;
    // left: 12.8rem;
    height: 1.25rem;
    font-size: 0.83rem;
    font-weight: 400;
    color: #ffffff;
    text-transform: uppercase;
    line-height: 0.98rem;
  }
}
.law {
  width: 95%;
  overflow: hidden;
  margin: 1.58rem 1.33rem 0rem 1.33rem;
  margin-right: 2.33rem;
  // background: #f4f4f4;
  .viTitle {
    display: flex;
    .stork {
      margin-top: -0.15rem;
      color: #c8000a;
    }
    .title {
      /*margin-left: 0.5rem;*/
      /*padding-right: 1.33rem;*/
      font-size: 1.33rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
  }
  .content {
    /*margin-right: 1.33rem;*/
    margin-top: 1rem;
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
  }
  .ban {
    // width: 100%;
    img {
      width: 100%;
      height: 20.08rem;
    }
    /*margin-right: 1.33rem;*/
    // position: relative;
    // .bannerNums {
    //   min-width: 300%;
    //   display: flex;
    //   margin-right: 1.33rem;
    //   .banner {
    //     /*padding-left: 1.33rem;*/
    //     /*padding-right: 1.33rem;*/
    //     /*padding: 0;*/
    //     width: 100%;
    //     img {
    //       width: 100%;
    //       height: 18.08rem;
    //     }
    //     .btn {
    //       img {
    //         width: 2rem;
    //         height: 2rem;
    //       }
    //       .left {
    //         position: absolute;
    //         top: 48%;
    //         left: 3%;
    //         /*left: 1rem;*/
    //       }
    //       .right {
    //         position: absolute;
    //         top: 48%;
    //         /*right: 1rem;*/
    //         margin-left: 91%;
    //       }
    //     }
    //   }
    // }
  }
  .news {
    /*margin: 1.33rem 1.22rem 1.33rem 1.22rem;*/
    margin-bottom: 1.33rem;

    .newTitle {
      font-size: 1.17rem;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #231914;
      line-height: 1.37rem;
    }
    .newInfo {
      margin-top: 0.63rem;
      font-size: 1rem;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #6e6e6e;
      line-height: 1.67rem;
      margin-bottom: 0.67rem;
    }
    .newDetail {
      display: flex;
      justify-content: space-between;
      .detail {
        display: flex;
        img {
          margin-top: 0.4rem;
          color: #000;
          width: 0.5rem;
          height: 0.88rem;
        }
        .detailName {
          margin-left: 0.37rem;
          margin-top: 0.4rem;
          font-size: 0.83rem;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #6e6e6e;
          line-height: 0.98rem;
        }
      }
      .date {
        margin-right: 1.33rem;
        margin-top: 0.4rem;
        font-size: 0.83rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #6e6e6e;
        line-height: 0.98rem;
      }
    }
  }
}
.nums {
  padding: 1.58rem 1.33rem 0rem 1.33rem;
  background: #f4f4f4;
  .viTitle {
    display: flex;
    .stork {
      margin-top: -0.15rem;
      color: #c8000a;
    }
    .title {
      margin-left: 0.5rem;
      font-size: 1.33rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
  }
  .content {
    margin-top: 1rem;
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
  }
  .bannerNums {
    list-style: none;
    padding: 0;
    .banner {
      position: relative;
      img {
        margin: 0;
        width: 34.88rem;
        height: 9.08rem;
      }
      .btn {
        img {
          width: 2rem;
          height: 2rem;
        }
        .left {
          position: absolute;
          top: 48%;
          left: 1rem;
        }
        .right {
          position: absolute;
          top: 48%;
          right: 1rem;
        }
      }
    }
  }
  .news {
    margin: 1.33rem 1.22rem 1.33rem 1.22rem;
    padding-bottom: 1.4rem;
    .newTitle {
      font-size: 1.17rem;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #231914;
      line-height: 1.37rem;
    }
    .newInfo {
      font-size: 1rem;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #6e6e6e;
      line-height: 1.67rem;
      margin-bottom: 0.67rem;
    }
    .newDetail {
      display: flex;
      justify-content: space-between;
      .detail {
        display: flex;
        img {
          margin-top: 0.4rem;
          color: #000;
          width: 0.5rem;
          height: 0.88rem;
        }
        .detailName {
          margin-left: 0.37rem;
          margin-top: 0.4rem;
          font-size: 0.83rem;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #6e6e6e;
          line-height: 0.98rem;
        }
      }
      .date {
        margin-top: 0.4rem;
        font-size: 0.83rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #6e6e6e;
        line-height: 0.98rem;
      }
    }
  }
}
.enc {
  margin: 1.58rem 1.33rem 0rem 1.33rem;
  // background: #f4f4f4;
  .viTitle {
    display: flex;
    .stork {
      margin-top: -0.15rem;
      color: #c8000a;
    }
    .title {
      margin-left: 0.5rem;
      font-size: 1.33rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
  }
  .content {
    margin-top: 1rem;
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
  }
  .bannerNums {
    // background: #f4f4f4;
    padding: 1.58rem 1.33rem 1rem 1.33rem;
    list-style: none;
    padding: 0;
    .banner {
      position: relative;
      img {
        margin: 0;
        width: 34.88rem;
        height: 18.08rem;
      }
      .btn {
        img {
          width: 2rem;
          height: 2rem;
        }
        .left {
          position: absolute;
          top: 48%;
          left: 1rem;
        }
        .right {
          position: absolute;
          top: 48%;
          right: 1rem;
        }
      }
    }
  }
}
</style>



