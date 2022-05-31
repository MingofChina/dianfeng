<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/fengCai.png"
           alt="" />
      <div>
        <div class="cha">巅峰风采</div>
        <div class="eng">Our Careers</div>
      </div>
    </div>
    <div class="title">
      <div class="cha">巅峰风采</div>
      <div class="eng">Top talent</div>
    </div>
    <div class="show"
         v-for="(item, i) in viewArr"
         :key="i">
      <img :src="getImgUrl(item.original_image)"
           alt="" />
      <div>
        <div class="cha">{{ item.title }}</div>
        <div class="eng">{{ item.description }}</div>
      </div>
    </div>
    <div class="pic">
      <div class="bar">
        <div class="barNums"
             v-for="(item, i) in barInfo"
             :key="i"
             @click="jump(i)">
          <div class="barTitle "
               :class="changeColor == i ? 'active' : ''">{{ item.title }}</div>
          <div class="stick">|</div>
        </div>
      </div>
      <div class="title">{{ barInfo[openTitle].description }}</div>

      <el-carousel arrow="always"
                   :autoplay="false"
                   indicator-position="none">
        <el-carousel-item v-for="(it, idx) in barInfo[openTitle].original_image"
                          :key="idx">
          <img :src="getImgUrl(it.original_image)"
               alt="" />
          <!-- <div class="imgTitle">{{it.title}}</div> -->
        </el-carousel-item>
      </el-carousel>

      <!-- <div class="img"
           v-for="(it,idx) in barInfo[openTitle].original_image"
           :key="idx">
        <img :src=getImgUrl(it.original_image)
             alt="">
        <div class="imgTitle">{{it.title}}</div>
      </div> -->
    </div>
    <div class="foot">
      <div class="bar">
        <div class="barNums"
             v-for="(item, i) in footBarInfo"
             :key="i"
             @click="jumpOne(i)">
          <div class="barTitle"
               :class="changeColorOne == i ? 'active' : ''">{{ item.title }}</div>
          <div class="stick">|</div>
        </div>
      </div>
      <div class="title">{{ footBarInfo[openTitleOne].description }}</div>

      <el-carousel arrow="always"
                   :autoplay="false"
                   indicator-position="none">
        <el-carousel-item v-for="(it, idx) in footBarInfo[openTitleOne].original_image"
                          :key="idx">
          <img :src="getImgUrl(it.original_image)"
               alt="" />
          <!-- <div class="imgTitle">{{it.title}}</div> -->
        </el-carousel-item>
      </el-carousel>

      <!-- <div class="footImg"
           v-for="(it,idx) in footBarInfo[openTitleOne].original_image"
           :key="idx">
        <img :src=getImgUrl(it.original_image)
             alt="">
      </div> -->
    </div>
  </div>
</template>
<script>
import { style_h5 } from '../../../api/api.js';
export default {
  data () {
    return {
      footInfo:
        '巅峰智业已走过20年的风雨历程，有坎坷、坚持，有辉煌、感动，不同的“巅峰”时期，每个人的心里都有一个不一样的巅峰。每年的巅峰司庆庆典都会邀请到文旅产业的重要领导、资深专家、以及头部企业的掌门人等文旅巨擘共襄盛宴，共庆巅峰璀璨。更有“十八般”武艺俱全的巅峰人齐聚巅峰星球村，展现实践成果的创意结晶，表达饱含激情的收获领悟。',
      barInfo: '',
      footBarInfo: '',
      openTitle: 0,
      openTitleOne: 0,
      changBtn: true,
      changeColor: 0,
      changBtnOne: true,
      changeColorOne: 0,
      viewArr: '',
      baseUrl: 'http://ceshi.davost.com'
    };
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      style_h5().then(res => {
        console.log(res);
        this.viewArr = res.data.data.mission;
        this.barInfo = res.data.data.lecture_hall;
        this.footBarInfo = res.data.data.peak_siqing;
      });
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    jump (i) {
      this.openTitle = i;
      this.changBtn = false;
      this.changeColor = i;
      console.log(i, 'nnn');
    },
    jumpOne (i) {
      this.openTitleOne = i;
      this.changBtnOne = false;
      this.changeColorOne = i;
      console.log(i, 'nnn');
    }
  }
};
</script>
<style lang="less" scoped>
 /deep/ .el-carousel__arrow--left{
    left: 1.3rem;
  }
 /deep/ .el-carousel__arrow{
   width: 2.5rem;
   height: 2.5rem;
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
  margin-top: -0.45rem;
  position: relative;
  text-align: center;
  img {
    width: 100%;
    // height: 30%;
    // height: 30vh;
  }
  .cha {
    position: absolute;
    top: 40%;
    left: 0;
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
    width: 100%;
    left: 0;
    height: 1.25rem;
    // margin: 0 auto;
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
    width: 100%;
    overflow-x: scroll;
    padding-top: 1.33rem;
    display: flex;
    overflow: -moz-scrollbars-none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar {
      display: none;
    }
    .barNums {
      margin-left: 1.33rem;
      display: flex;
      .barTitle {
        width: 7.5rem;
        height: 2rem;
        font-size: 1.17rem;
        font-weight: 400;
        color: #6e6e6e;
        line-height: 1.37rem;
      }
      .active {
        width: 9rem;
        font-size: 1.5rem;
        text-align: center;
        color: #c8000a;
        font-weight: bold;
      }
      .stick {
        color: #231914;
        margin: 0rem 1.33rem 0 1.33rem;
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
  img {
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    width: 94%;
    height: 19.24rem;
  }
}
.foot {
  margin-bottom: 2.08rem;
  .bar {
    width: 100%;
    overflow-x: scroll;
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: flex;
    .barNums {
      display: flex;
      .barTitle {
        margin-left: 1.33rem;
        width: 7.5rem;
        height: 2.1rem;
        font-size: 1.17rem;
        font-weight: 400;
        color: #6e6e6e;
        line-height: 1.37rem;
      }
      .active {
        width: 8rem;
        font-size: 1.5rem;
        text-align: center;
        color: #c8000a;
        font-weight: bold;
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
  img {
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    width: 94%;
    height: 19.24rem;
  }
}
</style>
