<template>
  <div id="app"
       style="width: 100vw;
    overflow-x: hidden;">
    <div class="teamBtn">
      <button class="btn"
              v-for="(item,i) in btnInfo"
              :key="i"
              :class="changeColor == i?'active':''"
              @click="jump(i,item.id)">{{item.title}}</button>
      <button class="btn"  @click="positionLocal()">经典案例</button>
      <button class="btn"  @click="positionLocalInfo()">延伸阅读</button>
    </div>
    <div class="law">
      <!-- <div class="viTitle">
        <div class="stork">|</div>
        <div class="title">权利声明</div>
      </div> -->
      <div class="contenter"
           v-html="btnInfo[changeColor].description"></div>
    </div>
    <div class="law" ref="case">
      <div class="viTitle"
           v-show="this.imgGroup.length>0?true:false">
        <div class="stork">|</div>
        <div class="title">经典案例</div>
      </div>
      <ul class="imgShow">
        <li class="imgs"
            v-for="(item,i) in imgGroup"
            :key="i"
            @click="jumpInfo(item.id)">
          <img :src=getImgUrl(item.original_image)
               alt="">
          <div class="title">{{item.title}}</div>
          <div class="message">{{item.summary}}</div>
          <span v-show="item.summary.length<40?false:true">...</span>
        </li>
      </ul>
    </div>
    <div class="viewFoot" ref="read">
      <div class="viTitle"
           v-show="this.recommend.length>0?true:false">
        <div class="stork">|</div>
        <div class="title">延伸阅读</div>
      </div>
      <div class="info"
           v-for="(item,i) in recommend"
           :key="i">
        <img :src=getImgUrl(item.original_image)
             alt="">
        <div class="infoCon"
             @click="jumpInfo(item.id)">
          <div class="title">{{item.title}}</div>
          <div class="mes">{{item.summary}}</div>
          <span v-show="item.summary.length<40?false:true">...</span>
        </div>
      </div>
    </div>
    <div class="law">
      <div class="viTitle">
        <div class="stork">|</div>
        <div class="title">联系我们</div>
      </div>
      <div class="mark"
           v-for="(item,i) in addressInfo"
           :key="i">
        <div class="address">
          <img src="../../../assets/imgs/local.png"
               alt="">
          <div class="addressInfo">{{item.company_name}}</div>
        </div>
        <div class="detail">{{item.company_address}}</div>
        <div class="phone">
          <img src="../../../assets/imgs/phone.png"
               alt="">
          <div class="name">咨询电话: <span>{{item.company_phone}}</span></div>
        </div>
        <div class="mail">
          <img src="../../../assets/imgs/e-mail.png"
               alt="">
          <div class="name">业务邮箱: <span>{{item.company_email}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { business_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      btnInfo: '',
      addressInfo: '',
      baseUrl: 'http://ceshi.davost.com',
      recommend: '',
      imgGroup: '',
      changeColor: 0,
      pages: 1,
      busId: '',
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     this.$router.go(0);
  //   }
  // },
  created () {
    console.log(this.$route.query.id, '8888');
    // if(!this.busId){
    //   this.busId = this.$route.query.id
    // }
    this.getList()
  },
  methods: {
    getList () {
      const data = {
        id: this.$route.query.id
      }
      console.log(data.id);
      business_h5(data).then((res) => {
        console.log(res, 'ggg');
        this.addressInfo = res.data.data.branch_office
        this.imgGroup = res.data.data.case
        this.recommend = res.data.data.news
        this.btnInfo = res.data.data.business_detail
      })
    },
    positionLocal(){
      let a = this.$refs.case
      a.scrollIntoView()
    },
    positionLocalInfo(){
      let a = this.$refs.read
      a.scrollIntoView()
    },
    jumpInfo (info) {
      // console.log(info,'jj')
      // this.busId = info
      this.$router.push({
        path: '/caseDetail_h5',
        query: {
          id: info
        }
      })
      // this.getList()
      // this.topFn()
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    jump (i, info) {
      this.changBtn = false
      this.changeColor = i
      console.log(i, 'nnn', info);
    },
    topFn () {
      if (this.isHidden == 2) {
        console.log('pc');
        document.documentElement.scrollTop = 0
      } else if (this.isHidden == 1) {
        console.log('移动');
        let top = document.documentElement.scrollTop || document.body.scrollTop
        // 实现滚动效果
        const timeTop = setInterval(() => {
          document.body.scrollTop = document.documentElement.scrollTop = top -= 50
          if (top <= 0) {
            clearInterval(timeTop)
          }
        }, 10)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.teamBtn {
  margin: 1rem 0 1rem 1.33rem;
  white-space: nowrap;
  width: 96%;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .btn {
    width: 8rem;
    height: 2.67rem;
    background: #fff;
    color: #000;
    border: 0.08rem solid #cacaca;
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
.law {
  margin: 1.58rem 1.33rem 1rem 1.33rem;
  .viTitle {
    display: flex;
    .stork {
      margin-top: 0rem;
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
  .contenter {
    margin-top: 0.67rem;
    margin-bottom: 1.33rem;
    width: 100%;
    // height: 15.5rem;
  }
  .imgShow {
    margin-bottom: 2.67rem;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .imgs {
      width: 48%;
      height: 24.83rem;
      margin-bottom: 1rem;
      background-color: #fff;
      border-radius: 3px;
      img {
        width: 100%;
        height: 17.42rem;
      }
      .title {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden; /*超出的文本隐藏*/
        text-overflow: ellipsis; /* 溢出用省略号*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
        margin-left: 0.67rem;
        width: 12.42rem;
        text-align: left;
        font-size: 1.17rem;
        font-weight: 400;
        color: #231914;
        line-height: 1.37rem;
      }
      .message {
        margin-left: 0.67rem;
        margin-top: 0.33rem;
        // width: 12.42rem;
        height: 2.8rem;
        overflow: hidden;
        font-size: 0.92rem;
        font-weight: 400;
        color: #a0a0a0;
        line-height: 1.47rem;
      }
      span {
        margin-left: 0.67rem;
        font-size: 0.92rem;
      }
    }
  }
  .mark {
    background: #f4f4f4;
    margin: 1.67rem 1.33rem 1.5rem 1.33rem;
    .address {
      display: flex;
      img {
        margin-top: 2.17rem;
        margin-left: 2rem;
        width: 1.8rem;
        height: 2rem;
      }
      .addressInfo {
        margin-left: 0.67rem;
        margin-top: 2.3rem;
        font-size: 1.33rem;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #231914;
        line-height: 1.56rem;
      }
    }
    .detail {
      margin-top: 1rem;
      margin-left: 2rem;
      margin-right: 2rem;
      font-size: 1.17rem;
      font-family: Source Han Sans CN-Normal, Source Han Sans CN;
      font-weight: 400;
      color: #3c3c3c;
      line-height: 1.37rem;
    }
    .phone {
      margin-top: 1rem;
      margin-left: 2rem;
      margin-right: 2rem;
      display: flex;
      img {
        margin-top: 0.2rem;
        margin-right: 0.5rem;
        width: 1.8rem;
        height: 1.6rem;
      }
      .name {
        margin-top: 0.4rem;
        font-size: 1.17rem;
        color: #3c3c3c;
        margin-left: 0.36rem;
        span {
          font-size: 1.17rem;
          font-family: Source Han Sans CN-Bold, Source Han Sans CN;
          font-weight: bold;
          color: #231914;
          line-height: 1.37rem;
        }
      }
    }
    .mail {
      margin-top: 0.4rem;
      margin-left: 2rem;
      margin-right: 2rem;
      padding-bottom: 1.83rem;
      display: flex;
      img {
        margin-top: 0.2rem;
        margin-right: 0.5rem;
        width: 1.8rem;
        height: 1.6rem;
      }
      .name {
        margin-top: 0.4rem;
        font-size: 1.17rem;
        color: #3c3c3c;
        margin-left: 0.36rem;
        span {
          font-size: 1.17rem;
          font-family: Source Han Sans CN-Bold, Source Han Sans CN;
          font-weight: bold;
          color: #231914;
          line-height: 1.37rem;
        }
      }
    }
  }
}
.viewFoot {
  // background: #f4f4f4;
  padding: 1.67rem 1.33rem 0 1.33rem;
  .viTitle {
    display: flex;
    padding-bottom: 1rem;
    .stork {
      margin-top: 0rem;
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
  .info {
    display: flex;
    .infoCon {
      margin-left: 1rem;
      .title {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden; /*超出的文本隐藏*/
        text-overflow: ellipsis; /* 溢出用省略号*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
        margin-top: 0.55rem;
        font-size: 1.17rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #3c3c3c;
        line-height: 1.37rem;
        margin-bottom: 0.67rem;
      }
      .mes {
        height: 3.2rem;
        overflow: hidden;
        font-size: 1rem;
        font-family: Source Han Sans CN-Light, Source Han Sans CN;
        font-weight: 300;
        color: #6e6e6e;
        line-height: 1.5rem;
      }
    }
    img {
      width: 10.83rem;
      height: 7.75rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
