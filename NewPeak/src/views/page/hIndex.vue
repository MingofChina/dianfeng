<template>
  <div id="app"
       style="width: 100vw;
    overflow-x: hidden;-webkit-text-size-adjust: none;">
    <div class="content">
<!--        <img src="../../assets/imgs/bg1.png" alt="" />-->
        <el-carousel arrow="never"
                     :autoplay="false"
                     >
            <el-carousel-item v-for="(it, idx) in bannerList"
                              :key="idx">
                <img :src="getImgUrl(it.original_image)"
                     alt="" />
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="title">中国文旅产业</div>
    <div class="describe">乡村振兴领先的全过程服务商</div>

    <div class="info">
      <div class="left">
        <div class="left">
          中国
          <span style="color: #C8000A;font-weight: 800;">{{ info.wenlv_head_enterprise }}</span>
        </div>
        <div class="left">
          <span style="color: #C8000A;font-weight: 800;">{{ info.wenlv_industries_num }}</span>
          美丽中国价值经典
        </div>
        <div class="left">
          <span style="color: #C8000A;font-weight: 800;">{{ info.wenlv_years_num }}</span>
          文旅行业不辍耕耘
        </div>
      </div>
      <div class="line"></div>
      <div class="right">
        <div class="right">
          <span style="color: #C8000A;font-weight: 800;">{{ info.wenlv_scenic_spot }}</span>
          专业运营旅游景区
        </div>
        <div class="right">
          文旅产业
          <span style="color: #C8000A;font-weight: 800;">{{ info.wenlv_title }}</span>
        </div>
        <!-- <div class="right"><span style="color: #C8000A;font-weight: 800;">{{info.wenlv_description}}</span></div> -->
      </div>
    </div>

    <!--second-->
    <div class="views">
      <div class="zero"
           @click="jumpPlan(views[0].childcontent[0].id)">
        <img :src="getImgUrl(this.views[0].original_image)"
             alt="" />
        <div class="meg">
          <div class="megTitle">{{ this.views[0].name }}</div>
          <div class="megLotImg">
            <div class="lot">查看更多</div>
            <img style="color: #FFF"
                 src="../../assets/imgs/mask.png"
                 alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="views">
      <div class="zero"
           @click="jumpPlan(views[1].childcontent[0].id)">
        <img :src="getImgUrl(this.views[1].original_image)"
             alt="" />
        <div class="meg">
          <div class="megTitle">{{ this.views[1].name }}</div>
          <div class="megLotImg">
            <div class="lot">查看更多</div>
            <img style="color: #FFF"
                 src="../../assets/imgs/mask.png"
                 alt="" />
          </div>
        </div>
      </div>
      <div class="son">
        <div class="first"
             @click="jumpPlan(views[2].childcontent[0].id)">
          <img :src="getImgUrl(this.views[2].original_image)"
               alt="" />
          <div class="meg">
            <div class="megTitle">{{ this.views[2].name }}</div>
            <div class="megLotImg">
              <div class="lot">查看更多</div>
              <img style="color: #FFF"
                   src="../../assets/imgs/mask.png"
                   alt="" />
            </div>
          </div>
        </div>
        <div class="second"
             @click="jumpPlan(views[3].childcontent[0].id)">
          <img :src="getImgUrl(this.views[3].original_image)"
               alt="" />
          <div class="meg">
            <div class="megTitle">{{ this.views[3].name }}</div>
            <div class="megLotImg">
              <div class="lot">查看更多</div>
              <img style="color: #FFF"
                   src="../../assets/imgs/mask.png"
                   alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="views">
      <div class="zero"
           @click="jumpPlan(views[4].childcontent[0].id)">
        <img :src="getImgUrl(this.views[4].original_image)"
             alt="" />
        <div class="meg">
          <div class="megTitle">{{ this.views[4].name }}</div>
          <div class="megLotImg">
            <div class="lot">查看更多</div>
            <img style="color: #FFF"
                 src="../../assets/imgs/mask.png"
                 alt="" />
          </div>
        </div>
      </div>
      <div class="son">
        <div class="first"
             @click="jumpPlan(views[5].childcontent[0].id)">
          <img :src="getImgUrl(this.views[5].original_image)"
               alt="" />
          <div class="meg">
            <div class="megTitle">{{ this.views[5].name }}</div>
            <div class="megLotImg">
              <div class="lot">查看更多</div>
              <img style="color: #FFF"
                   src="../../assets/imgs/mask.png"
                   alt="" />
            </div>
          </div>
        </div>
        <div class="second"
             @click="jumpPlan(views[6].childcontent[0].id)">
          <img :src="getImgUrl(this.views[6].original_image)"
               alt="" />
          <div class="meg">
            <div class="megTitle">{{ this.views[6].name }}</div>
            <div class="megLotImg">
              <div class="lot">查看更多</div>
              <img style="color: #FFF"
                   src="../../assets/imgs/mask.png"
                   alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--案例-->
    <div class="project">
      <div class="proTitle">
        <div class="title">
          <div class="name">PROJECTS</div>
          <div class="chaName">巅峰案例</div>
        </div>
        <div class="imgInfo"><img src="../../assets/imgs/mode.png"
               @click="jumpCaseDetails()"
               alt="" /></div>
      </div>

      <div class="bar">
        <div class="barNums"
             v-for="(item, i) in introduce"
             :key="i"
             @click="jump(i, item)">
          <div class="barTitle"
               :class="changeColor == i ? 'active' : ''">{{ item.name }}</div>
          <div class="stick"
               v-if="i !== introduce.length - 1">|</div>
        </div>
      </div>
      <ul class="imgShow">
        <li class="imgs"
            v-for="(item, i) in imgGroup"
            :key="i"
            @click="goLast(item.id)">
          <img :src="getImgUrl(item.original_image)"
               alt="" />
          <div class="title">{{ item.title }}</div>
          <div class="message">{{ item.summary }}</div>
          <!-- <span v-show="item.summary.length < 40 ? false : true">...</span> -->
        </li>
      </ul>
    </div>

    <!--news-->
    <div class="news">
      <div class="newsTitle">
        <div class="newsBar">
          <div class="newsFirst">NEWS /</div>
          <div class="newsSecond">巅峰要闻</div>
        </div>
        <div class="mode"><img src="../../assets/imgs/mode.png"
               @click="jumpNews()"
               alt="" /></div>
      </div>
      <div class="showImg"
           v-for="(item, i) in news"
           :key="i"
           @click="newJump(item.id)">
        <div class="num">{{ item.add_date.substring(item.add_date.length - 2) }}</div>
        <div class="date">{{ item.add_date }}</div>
        <div class="imgTitle">{{ item.title }}</div>
        <div class="imgInfo">{{ item.summary }}</div>
        <div class="first"><img :src="getImgUrl(item.original_image)"
               alt="" /></div>
        <br />
        <div class="second"><img src="../../assets/imgs/detail.png"
               alt="" /></div>
      </div>
    </div>
    <div class="brandTitle">
      中国文旅智业
      <span style="color: #C8000A">头部品牌</span>
    </div>
    <div class="brand">
      <ul class="brandNums">
        <li class="brandNum"
            v-for="(item, i) in brandInfo"
            :key="i">
          <div class="img"><img :src="require(`../../assets/bei/${item.img}.png`)"
                 alt="" /></div>
          <!--                    <img :src="require(`../../assets/bei/${item.img}.png`)" alt="">-->
          <div class="markTitle">
            {{ item.title }}
            <span>{{ item.info }}</span>
          </div>
          <div class="markMes">{{ item.markMes }}</div>
        </li>
      </ul>
      <div class="brandFooter">
        <div class="brandContent"
             v-for="(item, i) in brandName"
             :key="i"
             @click="jumpInfo(i)"
             :class="changeColorOne == i ? 'active' : ''">
          <div class="cityName"
               :class="changeColorOne == i ? 'activeName' : ''">{{ item.company_name }}</div>
          <div class="footerStick"
               :class="changeColorOne == i ? 'activeStock' : ''">|</div>
        </div>
      </div>
    </div>
    <div class="mark">
      <div class="address">
        <img src="../../assets/imgs/local.png"
             alt="" />
        <div class="addressInfo">{{ brandName[chooseInfoOne].company_name }}</div>
      </div>
      <div class="detail">{{ brandName[chooseInfoOne].company_address }}</div>
      <div class="phone">
        <img src="../../assets/imgs/phone.png"
             alt="" />
        <div class="name">
          咨询电话:
          <span>{{ brandName[chooseInfoOne].company_phone }}</span>
        </div>
      </div>
      <div class="mail">
        <img src="../../assets/imgs/e-mail.png"
             alt="" />
        <div class="name">
          业务邮箱:
          <span>{{ brandName[chooseInfoOne].company_email }}</span>
        </div>
      </div>
      <div class="btn">
        <button class="work"
                @click="jumpAsk(brandName[chooseInfoOne].id)">业务咨询</button>
        <button class="join"
                @click="jumpCompany()">加入我们</button>
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
               src="../../assets/imgs/city.png"
               alt="" />
        </div>
        <div class="company">
          <input class="posInp"
                 v-model="name"
                 placeholder="请输入您的姓名" />
          <img class="inpIcon"
               src="../../assets/imgs/people.png"
               alt="" />
        </div>
        <div class="company">
          <input class="posInp"
                 v-model="phone"
                 placeholder="请输入您的电话号码" />
          <img class="inpIcon"
               src="../../assets/imgs/tel.png"
               alt="" />
        </div>
        <div class="btn"><button class="btnSub"
                  @click="sendForm">确认提交</button></div>
        <!-- <el-input placeholder=""></el-input> -->
      </div>
    </div>
  </div>
</template>
<script>
import { subForm, index_h5, banner_h5 } from '../../api/api.js';
export default {
  data () {
    return {
      viewsDetailsInfo: '',
      introduce: '',
      company: '',
      baseUrl: 'http://ceshi.davost.com',
      views: '',
      name: '',
      phone: '',
      info: '',
      // barInfo: [{ name: '规划设计' }, { name: '运营招商' }, { name: 'EPC建设' }, { name: '光影夜游' }],
      brandName: [],
      brandInfo: [
        {
          img: 'icon_chuangli',
          title: '创立',
          info: '21年',
          markMes: '文旅行业实践者'
        },
        {
          img: 'icon_wancheng',
          title: '完成项目',
          info: '3000+',
          markMes: '文旅行业实践者'
        },
        {
          img: 'icon_yunying',
          title: '运营景区',
          info: '100+',
          markMes: '文旅行业实践者'
        },
        {
          img: 'icon_rongyu',
          title: '荣获奖项',
          info: '100+',
          markMes: '文旅行业实践者'
        },
        {
          img: 'icon_yuangong',
          title: '骨干员工',
          info: '1000+',
          markMes: '文旅行业实践者'
        }
      ],
      newInfo: [
        {
          num: '22',
          date: '2022-02',
          title: '江西麻姑山景区旅游策划暨景区总江西麻...',
          message: '麻姑山景区位于江西省抚州市南城县，距离南城县城4km，约10分钟车程，距离抚州市70km...',
          img: 'banner.png'
        },
        {
          num: '22',
          date: '2022-02',
          title: '江西麻姑山景区旅游策划暨景区总江西麻...',
          message: '麻姑山景区位于江西省抚州市南城县，距离南城县城4km，约10分钟车程，距离抚州市70km...',
          img: 'banner.png'
        }
      ],
      chooseInfoOne: 0,
      changBtnOne: true,
      changeColorOne: 0,
      openTitle: 0,
      changBtn: true,
      changeColor: 0,
      news: '',
      imgGroupNums: '',
      imgGroup: [
        // {
        //   img: 'bgNum3',
        //   title: '顺德华侨城',
        //   message: '麻姑山景区位于江西省抚州市南城县，距离南城县城...'
        // },
        // {
        //   img: 'bgNum4',
        //   title: '内蒙古呼和浩特小黑河景观工程',
        //   message: '麻姑山景区位于江西省抚州市南城县，距离南城县城...'
        // },
        // {
        //   img: 'bgNum3',
        //   title: '顺德华侨城',
        //   message: '麻姑山景区位于江西省抚州市南城县，距离南城县城...'
        // },
        // {
        //   img: 'bgNum4',
        //   title: '内蒙古呼和浩特小黑河景观工程',
        //   message: '麻姑山景区位于江西省抚州市南城县，距离南城县城...'
        // }
      ],
      bannerList:[],
      allList: []
    };
  },
  created () {
    this.getList();
    this.getBanner()
  },
  methods: {
    getList () {
      index_h5().then(res => {
        console.log(res, 'tt');
        this.views = res.data.data.column_introduce;
        this.info = res.data.data.company_information;
        this.introduce = res.data.data.product_cate;
        this.news = res.data.data.news.splice(0, 2);
        this.allList = res.data.data.product;
        this.brandName = res.data.data.branch_office
        let id = this.introduce[0].id;
        this.imgGroup = res.data.data.product.filter(item => item.business_ids == id).splice(0, 4);
      });
    },
    getBanner () {
      banner_h5().then(res => {
          this.bannerList = res.data.data
        console.log(res, 'ggggf');
      })
    },
    jump (i, info) {
      let id = info.id;
      this.imgGroup = this.allList.filter(item => item.business_ids == id).splice(0, 4);
      this.viewsDetailsInfo = '';
      // this.viewsDetailsInfo = this.introduce[i].childcontent.map(res => {
      // 	return res.id;
      // });
      this.openTitle = i;
      this.changBtn = false;
      this.changeColor = i;
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    newJump (info) {
      // console.log(nums, '444');
      this.$router.push({
        path: '/focusDetail_h5',
        query: {
          id: info
        }
      });
    },
    goLast (info) {
      console.log(info, 'ggg');
      this.$router.push({
        path: '/caseDetail_h5',
        query: {
          id: info
        }
      })
    },
    sendForm () {
      console.log('提交');
      if (this.company) {
        if (this.name) {
          if (this.phone) {
            const data = {
              company: this.company,
              name: this.name,
              phone: this.phone
            };
            console.log(data, 'yy');
            subForm(data).then(res => {
              console.log(res);
              this.$message.success('提交成功');
              this.clearInfo();
            });
          } else {
            this.$message.error('请填写您的电话号码');
          }
        } else {
          this.$message.error('请填写您的姓名');
        }
      } else {
        this.$message.error('请输入公司名称');
      }
    },
    // 跳转巅峰案例
    jumpCaseDetails () {
      this.$router.push({
        path: 'introduce_h5/2/0'
      });
    },
    //规划详情
    jumpPlan (info) {
      console.log(info, 'jumpPlan');
      this.$router.push({
        path: '/business_h5',
        query: {
          id: info
        }
      });
    },
    // 跳转巅峰要闻
    jumpNews () {
      this.$router.push({
        path: 'introduce_h5/0/3'
      });
    },
    jumpInfo (i) {
      this.chooseInfoOne = i;
      this.changBtnOne = false;
      this.changeColorOne = i;
      console.log(i, 'nnn');
    },
    jumpCompany () {
      window.location.href = 'https://www.liepin.com/company/7884213';
    },
    jumpAsk (info) {
      console.log(info, 'jj')
      this.$router.push({
        path: '/introduce_h5/5',
        query: {
          id: info
        }
      })
    },
    // 提交后清空数据
    clearInfo () {
      this.company = '';
      this.name = '';
      this.phone = '';
    }
  }
};
</script>
<style scoped lang="less">
.content {
  margin: 0;
  padding: 0;
  img {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    /*height: 30vh;*/
  }
  p {
    font-size: 1rem;
  }
}
.title {
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
  display: flex;
  /*justify-content: space-around;*/
  /*white-space: nowrap;*/
  .left {
    width: 100%;
    color: #231914;
    font-weight: bold;
    font-size: 0.8675rem;
    -webkit-text-size-adjust: none;
    margin-left: 0.7rem;
    margin-bottom: 0.5rem;
    float: left;
  }
  .line {
    margin-left: 0.35rem;
    width: 2px;
    height: 5.58rem;
    border-left: 0.08rem solid #f0f0f0;
  }
  .right {
    width: 100%;
    color: #231914;
    font-weight: bold;
    font-size: 0.8675rem;
    -webkit-text-size-adjust: none;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
    /*float: right;*/
    text-align: right;
  }
}
.view {
  width: 100%;
  /*margin: 0 auto;*/
  position: relative;
  // text-align: center;
  img {
    // width: 95%;
  }
  .meg {
    position: absolute;
    bottom: 0.2rem;
    text-align: left;
    // width: 95%;
    height: 4.375rem;
    // margin-left: 1rem;
    /*margin: 0 auto;*/
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    .megTitle {
      padding-top: 0.75rem;
      color: #ffffff;
      -webkit-text-size-adjust: none;
      font-size: 1rem;
      font-weight: 300;
      margin-left: 1rem;
      opacity: 0.9;
    }
    .meglotImg {
      display: flex;
      .lot {
        -webkit-text-size-adjust: none;
        margin-left: 1rem;
        color: #ffffff;
        font-size: 1.8rem;
        font-weight: 400;
        opacity: 0.7;
      }
      img {
        // color: #fff;
        /*margin-top: 0.2rem;*/
        width: 1.33rem;
        height: 1.33rem;
      }
    }
  }
}
.views {
  width: 99%;
  margin-bottom: 0.8rem;
  /*margin: 0 auto;*/
  // position: relative;
  text-align: center;
  .zero {
    margin-left: 0.5rem;
    position: relative;
    margin-bottom: 0.33rem;
    img {
      /*margin-left: 1rem;*/
      /*margin-right: 1rem;*/
      width: 95%;
      height: 25vh;
      // height: 10%;
      // height: 15.82rem;
    }
    .meg {
      position: absolute;
      bottom: 0.3rem;
      text-align: left;
      width: 95%;
      height: 4.375rem;
      margin-left: 2.3%;
      /*margin: 0 auto;*/
      background: rgba(0, 0, 0, 0.5);
      z-index: 2;
      .megTitle {
        // -webkit-text-size-adjust: none;
        padding-top: 0.75rem;
        color: #ffffff;
        font-size: 1.1rem;
        // font-weight: 500;
        margin-left: 1rem;
        opacity: 0.9;
      }
      .megLotImg {
        display: flex;
        .lot {
          margin-top: 0.5%;
          -webkit-text-size-adjust: none;
          color: #ffffff;
          font-size: 1rem;
          // font-weight: 400;
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
    margin-left: 0.8rem;
    width: 95%;
    height: 30vh;
    display: flex;
    justify-content: space-between;
    /*margin: 0 auto;*/
    .first {
      width: 50%;
      margin: 0;
      img {
        margin: 0;
        /*margin-left: 0.2rem;*/
        /*width: 17rem;*/
        width: 95%;
        height: 30vh;
      }
      .meg {
        margin-left: 0.32rem;
        position: absolute;
        bottom: 0rem;
        text-align: left;
        width: 47.5%;
        height: 4.375rem;
        /*margin-left: 1rem;*/
        /*margin: 0 auto;*/
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
        .megTitle {
          padding-top: 0.75rem;
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 500;
          margin-left: 1rem;
          opacity: 0.9;
        }
        .megLotImg {
          display: flex;
          .lot {
            margin-top: 0.7%;
            color: #ffffff;
            font-size: 1rem;
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
      width: 50%;
      img {
        width: 100%;
        /*width: 17rem;*/
        height: 30vh;
      }
      .meg {
        /*margin-left: 0.3rem;*/
        position: absolute;
        bottom: 0rem;
        text-align: left;
        width: 50%;
        height: 4.375rem;
        /*margin-left: 1rem;*/
        /*margin: 0 auto;*/
        background: rgba(0, 0, 0, 0.5);
        z-index: 2;
        .megTitle {
          padding-top: 0.75rem;
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 500;
          margin-left: 1rem;
          opacity: 0.9;
        }
        .megLotImg {
          display: flex;
          .lot {
            margin-top: 0.7%;
            color: #ffffff;
            font-size: 1rem;
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
        width: 3.67rem;
        height: 1.5rem;
      }
    }
  }
  .bar {
    width: 95%;
    overflow-x: scroll;
    margin-top: 1.33rem;
    margin-left: 1.33rem;
    margin-bottom: 1rem;
    display: flex;
    overflow: -moz-scrollbars-none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar {
      display: none;
    }
    .barNums {
      display: flex;
      .barTitle {
        width: max-content;
        padding-right: 1.33rem;
        font-size: 1.17rem;
        font-weight: bold;
        color: #6c6662;
        height: 2.4rem;
      }
      .active {
        font-size: 1.1rem;
        color: #c8000a;
        &::after {
          content: "";
          width: 2rem;
          height: 0.17rem;
          background-color: #c8000a;
          display: block;
          position: relative;
          margin-top: 0.2rem;
          margin-left: 1.3rem;
        }
      }
      .stick {
        margin-top: 0.15rem;
        color: #231914;
        margin-right: 1.33rem;
      }
    }
  }
  .imgShow {
    width: 95%;
    // height: 28vh;
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /*margin-bottom: 1rem;*/
    .imgs {
      width: 45%;
      height: 30%;
      margin-bottom: 1rem;
      background-color: #fff;
      border-radius: 3px;
      /*border:1px solid black;*/
      img {
        width: 100%;
        height: 50%;
      }
      .title {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden; /*超出的文本隐藏*/
        text-overflow: ellipsis; /* 溢出用省略号*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
        margin-left: 0.67rem;
        // width: 12.42rem;
        /*height: 1.83rem;*/
        text-align: left;
        font-size: 1.17rem;
        font-weight: 400;
        color: #231914;
        line-height: 1.37rem;
      }
      .message {
        display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
        -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
        overflow: hidden; /*超出的文本隐藏*/
        text-overflow: ellipsis; /* 溢出用省略号*/
        -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
        overflow: hidden;
        margin-left: 0.67rem;
        margin-top: 0.33rem;
        // width: 12.42rem;
        height: 2.67rem;
        font-size: 0.92rem;
        font-weight: 400;
        color: #a0a0a0;
        line-height: 1.3rem;
      }
      span {
        margin-left: 0.67rem;
      }
    }
  }
}
.news {
  -webkit-text-size-adjust: 100% !important;
  -webkit-text-size-adjust: none !important;
  margin-right: 1.33rem;
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
        // margin-right: 1.33rem;
        width: 3.67rem;
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
      display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
      -webkit-line-clamp: 1; /*显示的行数；如果要设置2行加...则设置为2*/
      overflow: hidden; /*超出的文本隐藏*/
      text-overflow: ellipsis; /* 溢出用省略号*/
      -webkit-box-orient: vertical; /*伸缩盒子的子元素排列：从上到下*/
      -webkit-text-size-adjust: 100% !important;
      -webkit-text-size-adjust: none !important;
      margin-top: 1rem;
      width: 70%;
      height: 1.67rem;
      font-size: 1.33rem;
      // max-height: 9999px;
      // -webkit-text-size-adjust: none;
      font-weight: 500;
      color: #231914;
      line-height: 1.8rem;
    }
    .imgInfo {
      margin-top: 0.67rem;
      /*width: 34rem;*/
      // height: 10%;
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
        // height: 30vh;
      }
    }
    .second {
      text-align: center;
      img {
        width: 5.67rem;
        height: 1.5rem;
      }
    }
  }
}
.brandTitle {
  /*margin-top: 2rem;*/
  padding-top: 2rem;
  margin: 0 auto;
  width: 100%;
  height: 2.25rem;
  overflow: hidden;
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
  color: #231914;
  line-height: 1.76rem;
  letter-spacing: 5px;
}
.brand {
  background: url("../../assets/imgs/Group.png") no-repeat;
  background-size: 99% 90%;
  .brandNums {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1.66rem;
    .brandNum {
      margin-left: 1rem;
      margin-right: 1rem;
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
        margin-top: 7%;
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
        color: #231914;
        line-height: 1.17rem;
        span {
          font-size: 1.5rem;
          font-weight: 800;
        }
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
    height: 2.33rem;
    line-height: 2.33rem;
    overflow-y: hidden;
    background: linear-gradient(
      225deg,
      #f2f2f2 0%,
      rgba(240, 240, 240, 0.7) 100%
    );
    display: flex;
    overflow: -moz-scrollbars-none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar {
      display: none;
    }
    .brandContent {
      display: flex;
      // line-height: 2.33rem;
      // overflow: hidden;
      width: 21%;
      // margin-top: 0.8rem;
      // line-height: 1rem;
      .cityName {
        width: 100%;
        padding-left: 2rem;
        padding-right: 2rem;
        font-size: 1.17rem;
        text-align: center;
        font-weight: 400;
        color: #231914;
      }
      .activeName {
        color: #fff;
      }
      .footerStick {
        color: #cacaca;
        /*padding-left: 2rem;*/
      }
      .activeStock {
        color: #c8000a;
      }
    }
    .active {
      text-align: center;
      width: 7.2rem;
      color: #fff;
      background-color: #c8000a;
    }
  }
}
.mark {
  background: #f4f4f4;
  // margin: 0 1.33rem 1.5rem 1.33rem;
  // img{
  //   margin-top: 2.17rem;
  //     margin-left: 2rem;
  //     width: 2rem;
  //     height: 2rem;
  // }
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
      font-weight: 800;
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
      // margin-top: 2.17rem;
      margin-right: 0.5rem;
      width: 1.8rem;
      height: 1.6rem;
    }
    .name {
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
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    padding-bottom: 1.83rem;
    display: flex;
    img {
      // margin-top: 2.17rem;
      margin-right: 0.5rem;
      width: 1.8rem;
      height: 1.6rem;
    }
    .name {
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
  .btn {
    text-align: center;
    // margin-bottom: 1.33rem;
    .work {
      width: 30%;
      height: 3.33rem;
      color: #fff;
      background: #c8000a;
      border: 0;
      margin-bottom: 1.33rem;
    }
    .join {
      width: 30%;
      height: 3.33rem;
      border: 1px solid #c8000a;
      color: #c8000a;
      margin-left: 2rem;
      margin-bottom: 1.33rem;
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
      // width: 10.5rem;
      height: 2.5rem;
      font-size: 1.67rem;
      font-weight: bold;
      color: #231914;
      line-height: 1.95rem;
    }
    .onlineMes {
      margin-left: 0.33rem;
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
      text-align: center;
      .posInp {
        width: 85%;
        // text-align: center;
        height: 3.5rem;
        border: 0px;
        background-color: #f0f0f0;
        padding-left: 3.67rem;
      }
      .inpIcon {
        position: absolute;
        width: 2rem;
        height: 2rem;
        top: 0.7rem;
        left: 5%;
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
