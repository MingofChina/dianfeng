
<template>
  <div id="Header">
    <div class="title">
      <div class="navBar">
        <img src="../assets/img/logo.png"
             alt=""
             @click="homeFn()"
             class="logo-img" />
        <img v-show="this.isHidden==1?true:false"
             src="../assets/imgs/title.png"
             alt=""
             @click="openMenu()"
             class="change-img" />
        <div class="imgCon"
             v-show="this.isHidden==2?true:false">
          <div></div>
          <img src="../assets/imgs/Mask group@2x.png"
               alt=""
               class="change-img"
               @click="closeMenu" />
        </div>
        <!-- <div v-show="this.isHidden==2?true:false">|</div>
        <img v-show="this.isHidden==2?true:false"
             src="../assets/imgs/close.png"
             alt=""
             class="change-img"
             @click="closeMenu" /> -->
        <div class="content"
             v-show="this.isHidden == 2?true:false">
          <div v-for="(item,index) in menus"
               :key="index">

            <div class="infoFirst"
                 @click="jump(index)"
                 :class="changeColor == index?'active':''">{{item.firstName}}
            </div>
            <div class="two"
                 v-show="changeColor==1?false:true">
              <ul class="infoSecond"
                  v-if="idx==index">
                <li v-for="(it,i) in item.second"
                    :key="i">
                  <div class="secCon">
                    <div class="secondMeg"
                         @click="jumpSecond(index,i)"
                         :class="changeColorTwo == i?'activeTwo':''">
                      {{it.name}}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- :class="index==1?'list':'infoSecond'" -->

            <div v-show="changeColor==1?true:false"
                 class="third"
                 v-if="idx==index">
              <el-tabs tab-position="left"
                       style="height: 32%;">
                <el-tab-pane style="color:#c8000a"
                             v-for="(it,i) in item.second"
                             :key="i"
                             :label="it.name"
                             @tab-click="handleClick">
                  <ul>
                    <li v-for="(last,next) in it.childcontent"
                        :key="next"
                        @click="jumpThird(next,last.id)"
                        :class="changeColorThird==next?'activeThird':''">
                      {{last.title}}
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { case_h5, index_h5 } from "@/api/api";
export default {
  data () {
    return {
      idx: -1,
      idxOne: -1,
      isHidden: 1,
      changeColorTwo: -1,
      changeColorThird: -1,
      changeColor: -1,
      menus: [
        {
          firstName: '走进巅峰',
          second: [
            {
              name: '巅峰介绍',
            },
            {
              name: '巅峰团队',
            },
            {
              name: '巅峰风采',
            },
            {
              name: '巅峰要闻',
            },
            {
              name: '产业联盟',
            },
            {
              name: '加入巅峰',
            },
            {
              name: '合作伙伴',
            },
          ]
        },
        {
          firstName: '巅峰业务',
          second: []
        },
        {
          firstName: '巅峰案例',
          second: []
        },
        {
          firstName: '巅峰观点',
          second: [
            // {
            //   secondTitle: '巅峰著作',
            // },
            // {
            //   secondTitle: '详情',
            // },
            {
              name: '行业观点',
            },
            {
              name: '巅峰著作',
            }
          ]
        },
        {
          firstName: '巅峰公开课',
          second: []
        },
        {
          firstName: '联系我们',
          second: [
            // {
            //   name: '联系我们',
            // },
            // {
            //   name: '法律声明',
            // }
          ]
        },
      ],
      btnInfo: '',
      pages: 1,
      pagesize: 10
    };
  },
  // watch: {
  //   '$route' (to, from) {
  //     this.$router.go(0);
  //   }
  // },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      const data = {
        pages: this.pages,
        pagesize: this.pagesize
      }
      case_h5(data).then((res) => {
        this.btnInfo = res.data.data.column
      })
    },
    homeFn () {
      this.$router.replace('/index_h5');
    },
    openMenu () {
      this.$router.replace('/index_h5');
      this.isHidden = 2
      index_h5().then(res => {
        // childcontent->title
        // 父name
        this.menus[1].second = res.data.data.column_introduce
        console.log(this.menus[1].second, 'ooo');
      })
    },
    closeMenu () {
      this.isHidden = 1
    },
    jump (index) {
      this.changeColor = index
      console.log(index, 'ff');
      this.idx = this.idx == index ? -1 : index
      if (index == 4) {
        window.location.href = 'https://www.douschool.com/'
      } else if (index == 2) {
        this.$router.replace(`/introduce_h5/${index}`)
        this.closeMenu()
      }else if(index==5){
        this.$router.replace(`introduce_h5/${index}`)
        this.closeMenu()
      }
    },
    jumpSecond (i, idx) {
      this.idxOne = this.idxOne == i ? -1 : i
      this.changeColorTwo = idx
      console.log(i, 'yyy', idx);
      if (i !== 1) {
        if (`/introduce_h5/${i}/${idx}` == '/introduce_h5/0/5') {
          console.log('4774');
          window.location.href = 'https://www.liepin.com/company/7884213'
        } else {
          this.$router.replace(`/introduce_h5/${i}/${idx}`)
        }
      }
      this.closeMenu()
    },
    handleClick () {
      this.changeColorThird = -1
      console.log('准备清空');
    },
    jumpThird (num, info) {
      console.log('触发？', info);
      this.changeColorThird = num
      this.$router.push({
        path: '/business_h5',
        query: {
          id: info
        }
      })
      this.closeMenu()
    }
  }
}
</script>

<style scoped lang="less">
#Header {
  width: 100%;
  // height: 600px;
}

/deep/.el-tabs__active-bar {
  background-color: #c8000a;
  display: none;
}
/deep/.el-tabs__item {
  background-color: #f1f1f1;
}
/deep/.el-tabs__item.is-active {
  font-size: 1.17rem;
  font-weight: 600;
  background-color: #ffffff;
  color: #c8000a;
}
.logo-img {
  width: 9rem;
  height: 3rem;
}
.imgCon {
  display: flex;
  div {
    margin-top: 0.45rem;
    height: 2.3rem;
    border-left: 0.098rem solid #cacaca;
  }
  .change-img {
    margin-left: 1rem;
    width: 3rem;
    height: 3rem;
  }
}
.change-img {
  width: 3rem;
  height: 3rem;
}
.title {
  .navBar {
    margin: 1rem 0 1rem 0.8rem;
    display: flex;
    justify-content: space-between;
    height: 56px;
    .content {
      position: absolute;
      top: 5.2rem;
      // background-color: #f40;
      width: 100%;
      z-index: 100;
      margin-left: -2.3rem;
      .infoFirst {
        width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        background-color: #fff;
        text-align: center;
        border: 1px solid #f4f4f4;
      }
      .active {
        background: #c8000a;
        color: #fff;
      }

      // .list {
      //   display: block;
      //   padding: 0;
      //   margin: 0;
      //   margin-left: 0.2rem;
      //   padding-right: 0.2rem;
      //   // width: 7.33rem;
      //   width: 100%;
      //   background-color: #f4f4f4;
      //   list-style: 0;
      //   li {
      //     // margin-left: 0.5rem;
      //     width: 7.33rem;
      //     height: 3.75rem;
      //     text-align: center;
      //     line-height: 3.75rem;
      //   }
      //   .secondMeg {
      //     width: 7.33rem;
      //     font-size: 1.17rem;
      //     font-weight: 400;
      //     color: #3c3c3c;
      //   }
      //   .activeTwo {
      //     font-weight: 600;
      //     color: #c8000a;
      //   }
      //   .third {
      //     // width: 100%;
      //     list-style: none;
      //     padding: 0;
      //     margin-left: 8.33rem;
      //   }
      // }
      .third {
        background: #fff;
        width: 100%;
        /*height: 20%;*/
        margin-left: 0.2rem;
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-between;
          li {
            margin-top: 5%;
            // text-align: center;
            font-size: 1rem;
            color: #3c3c3c;
            // height: 3rem;
            padding: 0;
            width: 40%;
            margin-left: 8%;
            line-height: 2rem;
          }
          .activeThird {
            // text-align: center;
            font-size: 1rem;
            color: #c8000a;
            height: 3rem;
            padding: 0;
            width: 40%;
            font-weight: 700;
            margin-left: 2rem;
            line-height: 2rem;
          }
        }
      }
      .two {
        .infoSecond {
          margin: 0;
          margin-left: 0.2rem;
          padding: 0;
          list-style: none;
          width: 100%;
          text-align: center;
          display: flex;
          flex-wrap: wrap;
          background-color: #f4f4f4;
          li {
            margin-top: 1rem;
            width: 25%;
            height: 1.75rem;
            font-size: 1rem;
            font-weight: 500;

            line-height: 1.37rem;
            .secondMeg {
              text-align: center;
              padding-left: 1rem;
              color: #000;
              // width: rem;
              padding-right: 1rem;
            }
            .activeTwo {
              font-weight: 600;
              color: #c8000a;
            }
          }
        }
      }
    }
  }
}
</style>


