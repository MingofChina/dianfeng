<template>
  <div id="app">
    <div class="content">
      <img src="../../assets/imgs/bg1.png"
           alt="">
    </div>
    <div class="title">中国文旅产业</div>
    <div class="describe">乡村振兴领先的全过程服务商</div>

    <div class="info">
      <div class="left">中国<span style="color: #C8000A">{{info.wenlv_head_enterprise}}</span></div>
      <div class="right"><span style="color: #C8000A">{{info.wenlv_scenic_spot}}</span>专业运营旅游景区</div>
    </div>
    <div class="info">
      <div class="left"><span style="color: #C8000A">{{info.wenlv_industries_num}}</span>美丽中国价值经典</div>
      <div class="right">文旅产业<span style="color: #C8000A">{{info.wenlv_title}}</span></div>
    </div>
    <div class="info">
      <div class="left"><span style="color: #C8000A">{{info.wenlv_years_num}}</span>文旅行业不辍耕耘</div>
      <!-- <div class="right"></div> -->
    </div>

    <div class="view">
      <img src="../../assets/imgs/bgNum1.png"
           alt="">
      <div class="meg">
        <div class="megTitle">规划设计</div>
        <div class="meglotImg">
          <div class="lot">查看更多</div>
          <img style="color: #FFF"
               src="../../assets/imgs/mark.png"
               alt="">
        </div>
      </div>
    </div>
    <div class="views">
      <div class="zero">
        <img src="../../assets/imgs/bgNum2.png"
             alt="">
        <div class="meg">
          <div class="megTitle">规划设计</div>
          <div class="megLotImg">
            <div class="lot">查看更多</div>
            <img style="color: #FFF"
                 src="../../assets/imgs/mark.png"
                 alt="">
          </div>
        </div>
      </div>
      <div class="son">
        <div class="first">
          <img src="../../assets/imgs/bgNum3.png"
               alt="">
          <div class="meg">
            <div class="megTitle">规划设计</div>
            <div class="megLotImg">
              <div class="lot">查看更多</div>
              <img style="color: #FFF"
                   src="../../assets/imgs/mark.png"
                   alt="">
            </div>
          </div>
        </div>
        <div class="second">
          <img src="../../assets/imgs/bgNum4.png"
               alt="">
          <div class="meg">
            <div class="megTitle">规划设计</div>
            <div class="megLotImg">
              <div class="lot">查看更多</div>
              <img style="color: #FFF"
                   src="../../assets/imgs/mark.png"
                   alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="project">
      <div class="proTitle">
        <div class="title">
          <div class="name">PROJECTS</div>
          <div class="chaName">巅峰案例</div>
        </div>
        <div class="imgInfo">
          <img src="../../assets/imgs/mode.png"
               alt="">
        </div>
      </div>
      <div class="bar">
        <div class="barNums"
             v-for="(item,i) in barInfo"
             :key="i">
          <div class="barTitle">{{item.name}}</div>
          <div class="stick">|</div>
        </div>
      </div>
      <ul class="imgShow">
        <li class="imgs"
            v-for="(item,i) in imgGroup"
            :key="i">
          <img :src="require(`../../assets/imgs/${item.img}.png`)"
               alt="">
          <div class="title">{{item.title}}</div>
          <div class="message">{{item.message}}</div>
        </li>
      </ul>
    </div>
    <div class="news">
      <div class="newsTitle">
        <div class="newsBar">
          <div class="newsFirst">NEWS /</div>
          <div class="newsSecond">巅峰要闻</div>
        </div>
        <div class="mode">
          <img src="../../assets/imgs/mode.png"
               alt="">
        </div>
      </div>
      <div class="showImg"
           v-for="(item,i) in newInfo"
           :key="i">
        <div class="num">{{item.num}}</div>
        <div class="date">{{item.date}}</div>
        <div class="imgTitle">{{item.title}}</div>
        <div class="imgInfo">{{item.message}}</div>
        <div class="first">
          <img :src="require(`../../assets/bei/${item.img}`)"
               alt="">
        </div>
        <br>
        <div class="second">
          <img src="../../assets/imgs/detail.png"
               alt="">
        </div>
      </div>
    </div>
    <div class="brand">
      <div class="brandTitle">
        中国文旅智业<span style="color: #C8000A">头部品牌</span>
      </div>
      <ul class="brandNums">
        <li class="brandNum"
            v-for="(item,i) in brandInfo"
            :key="i">
          <div class="img">
            <img :src="require(`../../assets/bei/${item.img}.png`)"
                 alt="">
          </div>
          <!--                    <img :src="require(`../../assets/bei/${item.img}.png`)" alt="">-->
          <div class="markTitle">{{item.title}}</div>
          <div class="markMes">{{item.markMes}}</div>
        </li>
      </ul>
      <div class="brandFooter">
        <div class="brandContent"
             v-for="(item,i) in brandName"
             :key="i">
          <div class="cityName">{{item.name}}</div>
          <div class="footerStick">|</div>
        </div>
      </div>
    </div>
    <div class="message">
      <div class="messageFirst">
        <div class="onlineTitle">Contact us /</div>
        <div class="onlineMes">在线留言</div>
      </div>
      <div class="messageSecond">
        <div class="company">
          <input class="posInp"
                 v-model="company"
                 placeholder="请输入您的企业名称" />
          <img class="inpIcon"
               src="../../assets/bei/icon_qiye.png"
               alt="">
        </div>
        <div class="company">
          <input class="posInp"
                 v-model='name'
                 placeholder="请输入您的姓名" />
          <img class="inpIcon"
               src="../../assets/bei/icon_xingming.png"
               alt="">
        </div>
        <div class="company">
          <input class="posInp"
                 v-model="phone"
                 placeholder="请输入您的电话号码" />
          <img class="inpIcon"
               src="../../assets/bei/icon_dianhua.png"
               alt="">
        </div>
        <div class="btn">
          <button class="btnSub"
                  @click="sendForm">确认提交</button>
        </div>
        <!-- <el-input placeholder=""></el-input> -->
      </div>
    </div>

  </div>
</template>
<script>
import { subForm, index_h5 } from "../../api/api.js";
export default {
  data () {
    return {
      company: '',
      name: '',
      phone: '',
      info: '',
      barInfo: [
        { name: '规划设计' },
        { name: '运营招商' },
        { name: 'EPC建设' },
        { name: '光影夜游' },
      ],
      brandName: [
        {
          name: '北京',
        },
        {
          name: '上海',
        },
        {
          name: '深圳',
        },
        {
          name: '成都',
        },
        {
          name: '西安',
        }
      ],
      brandInfo: [
        {
          img: 'icon_chuangli',
          title: '创立21年',
          markMes: '文旅行业实践者',
        },
        {
          img: 'icon_rongyu',
          title: '完成项目3000+',
          markMes: '文旅行业实践者',
        },
        {
          img: 'icon_wancheng',
          title: '运营景区100+',
          markMes: '文旅行业实践者',
        },
        {
          img: 'icon_yuangong',
          title: '荣获奖项100+',
          markMes: '文旅行业实践者',
        },
        {
          img: 'icon_yunying',
          title: '骨干员工近1000',
          markMes: '文旅行业实践者',
        },
      ],
      newInfo: [
        {
          num: '22',
          date: '2022-02',
          title: '江西麻姑山景区旅游策划暨景区总江西麻...',
          message: '麻姑山景区位于江西省抚州市南城县，距离南城县城4km，约10分钟车程，距离抚州市70km...',
          img: 'banner.png',
        },
        {
          num: '22',
          date: '2022-02',
          title: '江西麻姑山景区旅游策划暨景区总江西麻...',
          message: '麻姑山景区位于江西省抚州市南城县，距离南城县城4km，约10分钟车程，距离抚州市70km...',
          img: 'banner.png',
        }
      ],
      imgGroup: [
        {
          img: 'bgNum3',
          title: '顺德华侨城',
          message: '麻姑山景区位于江西省抚州市南城县，距离南城县城...'
        },
        {
          img: 'bgNum4',
          title: '内蒙古呼和浩特小黑河景观工程',
          message: '麻姑山景区位于江西省抚州市南城县，距离南城县城...'
        },
        {
          img: 'bgNum3',
          title: '顺德华侨城',
          message: '麻姑山景区位于江西省抚州市南城县，距离南城县城...'
        },
        {
          img: 'bgNum4',
          title: '内蒙古呼和浩特小黑河景观工程',
          message: '麻姑山景区位于江西省抚州市南城县，距离南城县城...'
        }
      ]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      index_h5().then((res) => {
        console.log(res, 'tt');
        this.info = res.data.data.company_information
      })
    },
    sendForm () {
      console.log('提交');
      const data = {
        company: this.company,
        name: this.name,
        phone: this.phone
      }
      console.log(data, 'yy');
      subForm(data).then((res) => {
        console.log(res);
        this.$message.success('提交成功')
        this.clearInfo()
      })
    },
    // 提交后清空数据
    clearInfo () {
      this.company = ''
      this.name = ''
      this.phone = ''
    },
  },
}
</script>
<style scoped lang="less">
  .content{
    img{
      width: 100%;
      /*height: 30vh;*/
    }
  }

.title {
  /*width: 7.5rem;*/
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.4375rem;
  margin-bottom: 0.25rem;
  color: #231914;
}
.describe {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 300;
  color: #6e6e6e;
  margin-bottom: 0.75rem;
}
.info {
  /*display: flex;*/
  /*justify-content: space-around;*/
  /*white-space: nowrap;*/
  .left {
    color: #231914;
    font-weight: bold;
    font-size: 0.8675rem;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    float: left;
  }
  .right {
    color: #231914;
    font-weight: bold;
    font-size: 0.8675rem;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    float: right;
  }
}
.view {
  width: 100%;
  /*margin: 0 auto;*/
  position: relative;
  text-align: center;
  img {
    width: 95%;
  }
  .meg {
    position: absolute;
    bottom: 0.2rem;
    text-align: left;
    width: 95%;
    height: 4.375rem;
    margin-left: 1rem;
    /*margin: 0 auto;*/
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    .megTitle {
      padding-top: 0.75rem;
      color: #ffffff;
      font-size: 1rem;
      font-weight: 500;
      margin-left: 1rem;
      opacity: 0.9;
    }
    .megLotImg {
      // display: flex;
      .lot {
        margin-left: 1rem;
        color: #ffffff;
        font-size: 0.75rem;
        font-weight: 400;
        opacity: 0.7;
      }
      img {
        margin-top: 0.2rem;
        width: 1.33rem;
        height: 1.33rem;
      }
    }
  }
}
.views {
  width: 100%;
  /*margin: 0 auto;*/
  // position: relative;
  text-align: center;
  .zero {
    position: relative;
    margin-bottom: 0.33rem;
    img {
      width: 95%;
    }
    .meg {
      position: absolute;
      bottom: 0.3rem;
      text-align: left;
      width: 94.8%;
      height: 4.375rem;
      margin-left: 1rem;
      /*margin: 0 auto;*/
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
      .megTitle {
        padding-top: 0.75rem;
        color: #ffffff;
        font-size: 1rem;
        font-weight: 500;
        margin-left: 1rem;
        opacity: 0.9;
      }
      .megLotImg {
        display: flex;
        .lot {
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 400;
          margin-left: 1rem;
          opacity: 0.7;
        }
        img {
          margin-top: 0.2rem;
          width: 1.33rem;
          height: 1.33rem;
        }
      }
    }
  }
  .son {
    position: relative;
    margin-left: 1rem;
    width: 95%;
    display: flex;
    justify-content: space-between;
    /*margin: 0 auto;*/
    .first {
      /*width: 50%;*/
      img {
        /*width: 17rem;*/
        width: 97%;
        height: 18.83rem;
      }
      .meg {
        margin-left: 0.3rem;
        position: absolute;
        bottom: 0.3rem;
        text-align: left;
        width: 48.5%;
        height: 4.375rem;
        /*margin-left: 1rem;*/
        /*margin: 0 auto;*/
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
        .megTitle {
          padding-top: 0.75rem;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          margin-left: 1rem;
          opacity: 0.9;
        }
        .megLotImg {
          display: flex;
          .lot {
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 400;
            margin-left: 1rem;
            opacity: 0.7;
          }
          img {
            margin-top: 0.2rem;
            width: 1.33rem;
            height: 1.33rem;
          }
        }
      }
    }
    .second {
      /*width: 50%;*/
      img {
        width: 97%;
        /*width: 17rem;*/
        height: 18.83rem;
      }
      .meg {
        margin-left: 0.3rem;
        position: absolute;
        bottom: 0.3rem;
        text-align: left;
        width: 48.5%;
        height: 4.375rem;
        /*margin-left: 1rem;*/
        /*margin: 0 auto;*/
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
        .megTitle {
          padding-top: 0.75rem;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 500;
          margin-left: 1rem;
          opacity: 0.9;
        }
        .megLotImg {
          display: flex;
          .lot {
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 400;
            margin-left: 1rem;
            opacity: 0.7;
          }
          img {
            margin-top: 0.2rem;
            width: 1.33rem;
            height: 1.33rem;
          }
        }
      }
    }
  }
}
.project {
  // height: 53.83rem;
  background-color: #f4f4f4;
  .proTitle {
    display: flex;
    justify-content: space-between;
    .title {
      margin-left: 1.33rem;
      margin-top: 2rem;
      /*float: left;*/
      .name {
        width: 8.58rem;
        height: 2.5rem;
        font-size: 1.67rem;
        font-weight: bold;
        color: #231914;
        line-height: 1.95rem;
      }
      .chaName {
        width: 5rem;
        height: 1.5rem;
        font-size: 1rem;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
      }
    }
    .imgInfo {
      margin-top: 3.25rem;
      margin-right: 1rem;
      /*float: right;*/
      img {
        width: 98%;
        height: 1.5rem;
      }
    }
  }
  .bar {
    width: 95%;
    overflow-x: scroll;
    margin-top: 1.33rem;
    margin-left: 1.33rem;
    display: flex;
    /*justify-content: space-between;*/
    .barNums {
      display: flex;
      /*justify-content: space-between;*/
      .barTitle {
        width: 5rem;
        /*width: 10%;*/
        overflow-x: scroll;
        height: 1.75rem;
        font-size: 1.17rem;
        font-weight: bold;
        color: #6c6662;
        line-height: 1.37rem;
      }
      .stick {
        color: #231914;
        margin: -0.3rem 1.33rem 0 1.33rem;
      }
    }
  }
  .imgShow {
    width: 95%;
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /*margin-bottom: 1rem;*/
    .imgs {
      width: 48%;
      height: 24.83rem;
      margin-bottom: 1rem;
      background-color: #fff;
      border-radius: 3px;
      /*border:1px solid black;*/
      img {
        width: 100%;
        /*width: 17rem;*/
        height: 15.42rem;
      }
      .title {
        margin-left: 0.67rem;
        width: 12.42rem;
        /*height: 1.83rem;*/
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
        height: 2.67rem;
        font-size: 0.92rem;
        font-weight: 400;
        color: #a0a0a0;
        line-height: 1.07rem;
      }
    }
  }
}
.news {
  margin-right: 1.33rem;
  // padding-top: 14rem;
  .newsTitle {
    display: flex;
    justify-content: space-between;
    .newsBar {
      margin-top: 2rem;
      margin-left: 1.33rem;
      display: flex;
      .newsFirst {
        width: 6.5rem;
        height: 2.5rem;
        font-size: 1.67rem;
        font-weight: bold;
        color: #231914;
        line-height: 1.95rem;
      }
      .newsSecond {
        width: 5rem;
        height: 1.5rem;
        font-size: 1rem;
        font-weight: 400;
        color: #a0a0a0;
        line-height: 2.2rem;
      }
    }
    .mode {
      img {
        margin-top: 2.2rem;
        margin-right: 1.33rem;
        width: 70%;
        height: 1.5rem;
      }
    }
  }
  .showImg {
    margin-left: 1.33rem;
    .num {
      width: 2rem;
      height: 2.5rem;
      font-size: 1.67rem;
      font-weight: bold;
      color: #a0a0a0;
      line-height: 1.95rem;
    }
    .date {
      width: 5rem;
      height: 1.25rem;
      font-size: 0.83rem;
      font-weight: 400;
      color: #a0a0a0;
      line-height: 0.98rem;
    }
    .imgTitle {
      margin-top: 1rem;
      width: 25.83rem;
      height: 1.67rem;
      font-size: 1.33rem;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
    .imgInfo {
      margin-top: 0.67rem;
      /*width: 34rem;*/
      height: 3rem;
      font-size: 1rem;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #6e6e6e;
      line-height: 1.8rem;
    }
    .first {
      display: flex;
      margin-top: 1rem;
      height: 18rem;
      img {
        width: 100%;
      }
    }
    .second {
      /*margin: 0 auto;*/
      display: flex;
      /*width: 100%;*/
      height: 1.5rem;
      margin-left: 44%;
      /*margin: 0 auto 1.33rem;*/
      /*text-align: center;*/
      /*margin-bottom: 1.33rem;*/
    }
  }
}
.brand {
  /*width: 37.5rem;*/
  /*height: 35.5rem;*/
  /*overflow: hidden;*/
  background: url("../../assets/bei/beijing(1).png") no-repeat;
  background-size: 100% 100%;
  .brandTitle {
    /*margin-top: 2rem;*/
    padding-top: 2rem;
    margin: 0 auto;
    width: 19.25rem;
    height: 2.25rem;
    overflow: hidden;
    font-size: 1.5rem;
    font-weight: bold;
    color: #231914;
    line-height: 1.76rem;
    letter-spacing: 5px;
  }
  .brandNums {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1.66rem;
    .brandNum {
      margin-left: 2rem;
      margin-right: 2rem;
      /*width: 14rem;*/
      width: 37%;
      height: 9rem;
      .img {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
        img {
          width: 2rem;
          height: 2rem;
        }
      }
      .markTitle {
        margin-top: 1.33rem;
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
      }
      .markMes {
        margin-top: 0.42rem;
        text-align: center;
        font-size: 1rem;
        font-weight: 300;
        color: #3c3c3c;
        line-height: 1.17rem;
      }
    }
  }
  .brandFooter {
    width: 100%;
    overflow-x: scroll;
    height: 3.33rem;
    background: rgba(240, 240, 240, 0.7);
    display: flex;
    /*justify-content: space-between;*/
    .brandContent {
      display: flex;
      line-height: 3.33rem;
      .cityName {
        width: 3.1rem;
        padding-left: 2rem;
        padding-right: 2rem;
        font-size: 1.17rem;
        font-weight: 400;
        color: #231914;
      }
      .active {
        /*display: none;*/
        width: 3.2rem;
        /*padding: 3rem;*/
        background-color: #c8000a;
      }
      .footerStick {
        color: #cacaca;
        /*padding-left: 2rem;*/
      }
    }
  }
}
.message {
  margin-top: 2.33rem;
  margin-left: 1.33rem;
  margin-right: 1.33rem;
  // display: flex;
  /*width: 9.75rem;*/
  .messageFirst {
    display: flex;
    .onlineTitle {
      margin-top: 2.33rem;
      width: 10.5rem;
      height: 2.5rem;
      font-size: 1.67rem;
      font-weight: bold;
      color: #231914;
      line-height: 1.95rem;
    }
    .onlineMes {
      margin-top: 2.83rem;
      font-size: 1rem;
      font-weight: 400;
      color: #a0a0a0;
      line-height: 1rem;
    }
  }
  .messageSecond {
    .company {
      margin-bottom: 0.67rem;
      position: relative;
      .posInp {
        width: 90%;
        height: 3.5rem;
        border: 0px;
        background-color: #f0f0f0;
        padding-left: 2.7rem;
      }
      .inpIcon {
        position: absolute;
        top: 1rem;
        left: 0.5rem;
      }
    }
  }
  .btn {
    text-align: center;
    margin-top: 1.67rem;
    margin-bottom: 2.67rem;
    .btnSub {
      width: 12.5rem;
      height: 3.33rem;
      color: #fff;
      letter-spacing: 3px;
      border: 0px;
      border-radius: 5px;
      background: #c8000a;
      font-size: 1.17rem;
      font-weight: 400;
      line-height: 1.37rem;
      // text-align: center;
      margin: 0 auto;
    }
  }
}
</style>
