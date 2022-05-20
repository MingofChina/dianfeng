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
      <div class="engTitle"
           style="margin-top:1rem">ABOUT US</div>
      <div class="paragraph"
           v-html="message"></div>
    </div>
    <div class="radio"
         style="display: flex;justify-content: center;">
      <video height="200"
             controls
             autoplay
             :src=getImgUrl(srcs)
             type="video/mp4">
        <!-- <source >
    <source :src="srcs" type="video/ogg"> -->
      </video>
    </div>
    <div class="brand">
      <div class="title"
           style="margin-top: 1.67rem;">巅峰旗下品牌</div>
      <!-- <div class="cancelNum">
        <img class="cancelImg" src="../../../assets/img/logo.png" alt="">
        <img class="cancel" src="../../../assets/imgs/cancel.png" alt="">
      </div> -->
      <div class="selectNum"
           v-for="(item,index) in selectArr"
           :key="index">
        <div style="display:flex;justify-content: space-between;align-items: center">
          <img class="selectImg"
               :src=getImgUrl(item.logo)
               alt="">
          <div class="selectInfo">{{item.brand_slogan}}</div>
          <img class="select"
               :src="index===indexs?showdetail===true?require(`../../../assets/imgs/cancel.png`):require(`../../../assets/imgs/select.png`):require(`../../../assets/imgs/select.png`)"
               @click="chosepicture(item,index)">
        </div>
        <div v-show="index===indexs?showdetail===true?true:false:false"
             style="display:flex;flex-direction: column;">
          <div style="color:#c8000a;font-size: 1.6rem;">{{item.small_descrip}}</div>
          <div style="margin-top: 5px;font-size:1.4rem">{{item.summary}}</div>
        </div>
      </div>
    </div>
    <div class="backgroun-styles">
      <div style="width: 100%;text-align: center;margin-top: 20px;font-size: 1.67rem;color: #FFFFFF;padding-left: 1px;padding-top: 20px;font-weight: 500;letter-spacing: 0.125rem;">大事记</div>
      <div style="display: flex;">
        <div style="position: relative;">

          <div style="border-right: 1px  solid #FFFFFF;height: 174px;width: 64px;position: relative;margin-top: 20px;">
            <div v-for="(item,index) in  datelist"
                 :key="index">
              <div class="datalist-style"
                   :style="{opacity:(idindex===index?'100%':'60%')}"
                   @click="timerinfo(item,index)">{{item.addtime}}

                <img v-if="idindex===index?true:false"
                     src="../../../assets/imgs/whitedot.png"
                     style="width: 10px;height: 10px;position: absolute;right: -6px;" />
                <div v-else
                     style="width: 7px;height: 7px;border-radius: 100%;background-color: #FFFFFF;position: absolute;right: -4px;"></div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex;flex-flow: column;">
          <!-- overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical; -->
          <div class="message-info"
               style="">{{infos}}</div>
          <img :src=getImgUrl(scrs)
               style="margin-top: 1rem;margin-left: 1.25rem;width: 80%;height: 80px;" />
        </div>
      </div>
      <div style="position: relative;width: 100%;margin-top: 10px;height: 20px;width: 100%;">
        <img src="../../../assets/imgs/downarrow.png"
             style="position: absolute;left: 15%;"
             @click="arrowsgetdata" />
      </div>

      <div style="display: flex;justify-content: center;margin-top: 1rem;">
        <div style="width: 90%; display: flex;justify-content: space-between;">
          <div style="display: flex;flex-flow: column-reverse;margin-bottom: 5px;">
            <img src="../../../assets/imgs/leftarrows.png"
                 style="width: 2.22rem;height: 2.22rem;"
                 @click="leftyears" />
          </div>
          <div style="border-bottom: 1px  solid #FFFFFF;width: 100%;display: flex;justify-content: space-around;">
            <div style="position: relative;display: flex;align-items: center;"
                 v-for="(items,indexs) in yeardate"
                 :key="indexs">
              <div class="year-style"
                   :style="{fontSize:(indexxx===indexs?numberlist.length!=0?'2rem':'1rem':'1rem'),opacity:(indexxx===indexs?numberlist.length!=0?'100%':'60%':'60%'),}"
                   @click="choseyear(items.year,indexs,items)">{{items.year}}

                <div v-if="indexxx===indexs?numberlist.length!=0?true:false:false"
                     style="width: 0;height: 0;position: absolute;left:40%;top:1.6rem;	border:6px solid transparent;border-bottom-color: #FFFFFF;"></div>
                <div v-else
                     style="width: 7px;height: 7px;border-radius: 100%;background-color: #FFFFFF;position: absolute;left:40%;top:2.4rem;"></div>

              </div>
            </div>
          </div>
          <div style="display: flex;flex-flow: column-reverse;margin-bottom: 5px;">
            <img src="../../../assets/imgs/rightarrows.png"
                 style="width: 2.22rem;height: 2.22rem;"
                 @click="rightyear" />
          </div>
        </div>
      </div>
    </div>
    <div class="honor">
      <div class="title"
           style="font-size: 1.67rem;font-weight: 800;color: #231914;">资质荣誉</div>
      <div class="label"
           style="font-size: 1.17rem;font-family: Source Han Sans CN-Medium, Source Han Sans CN;font-weight: 800;color: #231914;margin-top: 20px;">荣誉证书</div>
      <ul class="certificate">
        <li class="certificateNums"
            v-for="(item,i) in certificateArr"
            :key="i">
          <div class="imgCon">
            <img :src=getImgUrl(item.original_image)>
          </div>
          <div class="reson">{{item.title}}</div>
        </li>
      </ul>
      <div class="direction">
        <img style="width: 2.22rem;height: 2.22rem"
             :src="datacolor==1?require(`../../../assets/imgs/leftselect.png`):require(`../../../assets/imgs/left.png`)"
             @click="leftclick(1)">
        <img style="margin-left: 3.33rem;width: 2.22rem;height: 2.22rem"
             :src="datacolors==2?require(`../../../assets/imgs/right.png`):require(`../../../assets/imgs/rightselect.png`)"
             @click="rightclick(2)">
      </div>
    </div>
    <div class="qualifications">
      <div class="title"
           style="font-size: 1.17rem;font-family: Source Han Sans CN-Medium, Source Han Sans CN;font-weight: 600;color: #231914;margin-top: 20px;">企业资质</div>
      <ul class="qua">
        <li class="quaNums"
            v-for="(items,index1) in quaArr"
            :key="index1">
          <div class="quaImg">
            <img :src=getImgUrl(items.original_image)>
          </div>
          <div>{{items.title}}</div>
        </li>
      </ul>
      <div class="direction">
        <img style="width: 2.22rem;height: 2.22rem"
             :src="datacolor3==3?require(`../../../assets/imgs/leftselect.png`):require(`../../../assets/imgs/left.png`)"
             @click="left(3)">
        <img style="margin-left: 3.33rem;width: 2.22rem;height: 2.22rem"
             :src="datacolor4==4?require(`../../../assets/imgs/right.png`):require(`../../../assets/imgs/rightselect.png`)"
             @click="right(4)">
      </div>
    </div>
  </div>

</template>
<script>


import { dianfengintroduce } from "@/api/api";
import viewpoint from '../viewpoint/viewpoint.vue';


export default {
  components: { viewpoint },
  data () {
    return {
      yeardate: [],
      datelist: [],
      baseUrl: 'http://ceshi.davost.com',
      scrs: "",
      quaArr: [],
      infos: "",
      datacolor3: "",
      datacolor4: "",
      message: '',
      lists: [],
      showdetail: true,
      srcs: "",
      indexs: 0,
      selectArr: [],
      certificateArr: [],
      datalist: [],
      pageone: 0,
      pagetwo: 1,
      flag: false,
      switch: "",
      zizhilist: [],
      pageones: 0,
      pagetwos: 1,
      datacolor: "",
      datacolors: "",
      Ddate: [],
      childrendata: [],
      pagenumber1: 0,
      pagenumber2: 1,
      indexxx: 0,
      yesrs: "",
      numberlist: [],
      riqilist: [],
      yearlist: [],
      pages: 0,
      pages2: 1,
      nowtimer: "",
      idindex: 0,
    }
  },
  methods: {
    timerinfo (e, indexs) {
      this.infos = ""
      this.infos = e.title
      this.scrs = e.original_image
      this.nowtimer = ""
      this.nowtimer = e.addtime
      this.idindex = indexs
    },
    //箭头循环数据  
    arrowsgetdata () {

      this.pages = this.pages + 1
      this.pages2 = this.pages2 + 1
      let a = (4 * this.pages)
      let b = (4 * this.pages2)

      this.datelist = []
      this.datelist = this.yearlist.slice(a, b)
      if (this.datelist.length === 0) {
        this.datelist = this.yearlist.slice(0, 4)
        this.pages = 0
        this.pages2 = 1
      }
      this.infos = this.datelist[0].title
      this.scrs = this.datelist[0].original_image



    },
    //选择年份 
    choseyear (e, indexsss, items) {

      this.pages = 0
      this.pages2 = 1
      this.years = ""
      this.years = e
      this.indexxx = indexsss
      this.numberlist = []
      this.numberlist.push(items)
      this.yearlist = []
      this.yearlist = items.child
      this.datelist = this.yearlist.slice(0, 4)

    },
    //获取走进巅峰介绍列表
    async getdianfengintroduce () {
      const res = await dianfengintroduce()
      console.log(res, 777777777777)
      if (res.data.code === 0) {
        this.message = res.data.data.brand_messa.peak_introduce
        this.srcs = res.data.data.brand_messa.peak_video
        this.selectArr = res.data.data.brand_slogan
        this.datalist = res.data.data.certificate_honor
        this.certificateArr = this.datalist.slice(0, 8)
        this.zizhilist = res.data.data.enterprise_qualification
        this.quaArr = this.zizhilist.slice(0, 8)

        this.Ddate = res.data.data.memorabilia
        this.years = res.data.data.memorabilia[0].year
        this.yeardate = this.Ddate.slice(0, 4)
        this.childrendata = this.yeardate[0].child
        this.datelist = this.childrendata.slice(0, 4)
        this.scrs = this.datelist[0].original_image
        this.infos = this.datelist[0].title

        this.numberlist = []
        this.numberlist = this.yeardate.filter((el) => {
          return el.year == this.years ? true : false
        })
      }
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    //左边时间增加
    leftyears () {
      this.idindex = 0
      this.pages = 0
      this.pages2 = 1
      this.pagenumber1 = this.pagenumber1 - 1
      this.pagenumber2 = this.pagenumber2 - 1
      let a = (4 * this.pagenumber1)
      let b = (4 * this.pagenumber2)

      if (b === 0) {
        this.yeardate = []
        this.yeardate = this.Ddate.slice(-4)
      } else {
        if (this.yeardate.length != 0) {
          this.yeardate = this.Ddate.slice(a, b)
          if (this.yeardate.length === 0) {
            this.yeardate = []
            this.yeardate = this.Ddate.slice(-4)
            this.pagenumber1 = 0
            this.pagenumber2 = 1
            this.leftyears()
          }
        } else {
          this.yeardate = []
          this.yeardate = this.Ddate.slice(-4)
          this.pagenumber1 = 0,
            this.pagenumber2 = 1,
            this.leftyears()
        }
      }

      this.numberlist = []
      this.numberlist = this.yeardate.filter((el) => {
        return el.year == this.years ? true : false
      })


    },
    //右边时间增加
    rightyear () {
      this.pages = 0
      this.pages2 = 1
      this.idindex = 0
      this.pagenumber1 = this.pagenumber1 + 1
      this.pagenumber2 = this.pagenumber2 + 1
      let a = (4 * this.pagenumber1)
      let b = (4 * this.pagenumber2)
      this.yeardate = []
      this.yeardate = this.Ddate.slice(a, b)
      if (this.yeardate.length === 0) {
        this.yeardate = []
        this.pagenumber1 = 0
        this.pagenumber2 = 1
        this.yeardate = this.Ddate.slice(0, 4)
      }
      this.numberlist = []
      this.numberlist = this.yeardate.filter((el) => {
        return el.year == this.years ? true : false
      })


    },
    left (e) {
      this.datacolor4 = ""
      this.datacolor3 = e
      this.pageones = this.pageones - 1
      this.pagetwos = this.pagetwos - 1
      let a = (8 * this.pageones)
      let b = (8 * this.pagetwos)



      if (b === 0) {

        this.quaArr = []
        this.quaArr = this.zizhilist.slice(-8)
      } else {
        if (this.quaArr.length != 0) {

          this.quaArr = this.zizhilist.slice(a, b)

          if (this.quaArr.length === 0) {

            this.quaArr = []
            this.quaArr = this.zizhilist.slice(-8)
            this.pageones = 0
            this.pagetwos = 1
            this.left()
          }
        } else {
          this.quaArr = []
          this.quaArr = this.zizhilist.slice(-8)
          this.pageones = 0,
            this.pagetwos = 1,
            this.left()
        }
      }


    },
    right (e) {
      this.datacolor3 = ""
      this.datacolor4 = e
      this.pageones = this.pageones + 1
      this.pagetwos = this.pagetwos + 1
      let a = (8 * this.pageones)
      let b = (8 * this.pagetwos)
      this.quaArr = []
      this.quaArr = this.zizhilist.slice(a, b)
      if (this.quaArr.length === 0) {
        this.quaArr = []
        this.pageones = 0
        this.pagetwos = 1
        this.quaArr = this.zizhilist.slice(0, 8)
      }

    },
    leftclick (e) {
      this.datacolors = ""
      this.datacolor = e
      this.pageone = this.pageone - 1
      this.pagetwo = this.pagetwo - 1
      let a = (8 * this.pageone)
      let b = (8 * this.pagetwo)
      if (b === 0) {

        this.certificateArr = this.datalist.slice(-8)
      } else {
        if (this.certificateArr.length != 0) {
          this.certificateArr = this.datalist.slice(a, b)

          if (this.certificateArr.length === 0) {

            this.certificateArr = this.datalist.slice(-8)
            this.pageone = 0
            this.pagetwo = 1
            this.leftclick()
          }
        } else {
          this.certificateArr = this.datalist.slice(-8)
          this.pageone = 0,
            this.pagetwo = 1,
            this.leftclick()
        }
      }

    },
    rightclick (e) {
      this.datacolor = ""
      this.datacolors = e

      this.pageone = this.pageone + 1
      this.pagetwo = this.pagetwo + 1
      let a = (8 * this.pageone)
      let b = (8 * this.pagetwo)
      this.certificateArr = []
      this.certificateArr = this.datalist.slice(a, b)
      if (this.certificateArr.length === 0) {
        this.certificateArr = []
        this.pageone = 0
        this.pagetwo = 1
        this.certificateArr = this.datalist.slice(0, 8)
      }


    },
    //选中巅峰旗下产品时
    chosepicture (item, index) {
      this.indexs = index
      this.showdetail = !this.showdetail

    },
  },
  created () {

    this.getdianfengintroduce()




  },
  mounted () {


  },


}
</script>
<style scoped lang="less">
.datalist-style {
  margin-left: 1.33rem;
  font-size: 1rem;
  color: #ffffff;
  opacity: 60%;
  padding-top: 12px;
  display: flex;
  align-items: center;
}
.year-style {
  font-size: 1rem;
  color: #ffffff;
  opacity: 60%;
  line-height: 0px;
  height: 20px;
}
.backgroun-styles {
  background-image: url(../../../assets/imgs/background.png);
  background-size: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  height: 35.25rem;
  width: 100%;
  margin-top: 30px;
}

.message-info {
  padding-top: 2.625rem;
  padding-left: 1.25rem;
  font-size: 0.83rem;
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 1px;
  display: flex;
  flex-wrap: wrap;
  width: 92%;
}

.showImg {
  position: relative;
  img {
    width: 100%;
    // img {
    //   width: 100%;
    // }
  }
  .cha {
    width: 100%;
    position: absolute;
    top: 40%;
    // left: 15.25rem;
    text-align: center;
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
    width: 100%;
    text-align: center;
    margin-top: 0.33rem;
    position: absolute;
    top: 51%;
    text-transform: uppercase;
    // left: 12.25rem;
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
  // padding-left: 1.33rem;
  .two {
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    display: flex;
    text-align: center;
    .first {
      width: 50%;
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
        span {
          font-size: 1.5rem;
          font-weight: 800;
        }
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
      width: 50%;
      height: 5.5rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
        span {
          font-size: 1.5rem;
          font-weight: 800;
        }
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
    margin-right: 1rem;
    display: flex;
    text-align: center;
    .third {
      margin-left: 0.3rem;
      width: 32.3%;
      height: 5.83rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
        span {
          font-size: 1.5rem;
          font-weight: 800;
        }
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
      width: 32.3%;
      height: 5.83rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
        span {
          font-size: 1.5rem;
          font-weight: 800;
        }
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
      width: 32.3%;
      height: 5.83rem;
      background: #ffffff;
      .title {
        padding-top: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
        span {
          font-size: 1.5rem;
          font-weight: 800;
        }
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
  // width: ;
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
    width: 93%;
    /*height: 8.42rem;*/
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
    text-align: left;
    // margin-bottom: 0.67rem;
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
.radio {
  width: 100%;
  background-color: #f4f4f4;
  padding-top: 2rem;
  margin-bottom: 1.67rem;
  video {
    width: 100%;
  }
}
.brand {
  margin-top: 1.67rem;
  .title {
    /*margin-top: 1.67rem;*/
    text-align: center;
    font-size: 1.67rem;
    font-weight: 500;
    color: #231914;
    line-height: 1.95rem;
  }
  .cancelNum {
    margin: 1rem 1rem 0 1rem;
    display: flex;
    justify-content: space-between;
    .cancelImg {
      width: 10rem;
      height: 2.76rem;
    }
    .cancel {
      width: 1.33rem;
      height: 1.33rem;
      margin-top: 1rem;
    }
  }
  .selectNum {
    display: flex;
    flex-direction: column;
    /*width: 100%;*/
    margin: 1.33rem 1rem 0.67rem 1rem;
    .selectImg {
      // width: 10rem;
      height: 4.76rem;
    }
    .selectInfo {
      width: 100%;
      margin-left: 2rem;
      margin-top: 0.3rem;
    }
    .select {
      width: 1.33rem;
      height: 1.33rem;
      /*margin-right: 0rem;*/
      /*text-align: right;*/
      /*float: right;*/
    }
  }
}
.honor {
  background-color: #f4f4f4;
  .title {
    padding-top: 2rem;
    text-align: center;
    font-size: 1.67rem;
    font-weight: 500;
    color: #231914;
    line-height: 1.95rem;
  }
  .label {
    margin-left: 1.33rem;
  }
  .certificate {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1rem;
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    .certificateNums {
      width: 45%;
      margin-top: 0.67rem;
      margin-bottom: 1rem;
      .imgCon {
        width: 100%;
        height: 11.33rem;
        background-color: #fff;
        img {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          margin-top: 0.67rem;
          width: 94%;
          height: 9.75rem;
        }
      }
      .reson {
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
        color: #231914;
        line-height: 2.17rem;
      }
    }
  }
  .direction {
    margin-top: 1rem;
    padding-bottom: 1.67rem;
    text-align: center;
  }
}
.qualifications {
  .title {
    margin-left: 1.33rem;
    margin-top: 1.67rem;
    font-size: 1.17rem;
    font-weight: 500;
    color: #231914;
    line-height: 2.17rem;
  }
  .qua {
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
        border: 0.08rem solid #cacaca;
        img {
          margin-left: 0.75rem;
          margin-top: 0.67rem;
          width: 13rem;
          height: 9.75rem;
        }
      }
    }
  }
  .direction {
    margin-top: 1rem;
    padding-bottom: 1.67rem;
    text-align: center;
  }
}
</style>
