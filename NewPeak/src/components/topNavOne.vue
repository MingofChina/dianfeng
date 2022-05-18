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
        <img v-show="this.isHidden==2?true:false"
             src="../assets/imgs/close.png"
             alt=""
             class="change-img"
             @click="closeMenu" />
        <div class="content"
             v-show="this.isHidden == 2?true:false">
          <div v-for="(item,index) in menus"
               :key="index">

            <div class="infoFirst"
                 @click="jump(index)"
                 :class="changeColor == index?'active':''">{{item.name}}
            </div>

            <ul class="infoSecond"
                v-if="idx==index">
              <li v-for="(it,i) in item.second"
                  :key="i">
                <div class="secondMeg"
                     @click="jumpSecond(index,i)"
                     :class="changeColorTwo == i?'activeTwo':''">
                  {{it.secondTitle}}
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { column, formsjie, search } from "@/api/api";
export default {
  data () {
    return {
      idx: -1,
      isHidden: 1,
      changeColorTwo: -1,
      changeColor: -1,
      menus: [
        {
          name: '走进巅峰',
          second: [
            {
              secondTitle: '巅峰介绍',
            },
            {
              secondTitle: '巅峰团队',
            },
            {
              secondTitle: '巅峰风采',
            },
            {
              secondTitle: '巅峰要闻',
            },
            {
              secondTitle: '产业联盟',
            },
            {
              secondTitle: '加入巅峰',
            },
            {
              secondTitle: '合作伙伴',
            },
          ]
        },
        {
          name: '巅峰业务',
          second: []
        },
        {
          name: '巅峰案例',
          second: [
            // {
            //   secondTitle: '业务详情',
            // },
            {
              secondTitle: '巅峰案例',
            },
          ]
        },
        {
          name: '巅峰观点',
          second: [
            // {
            //   secondTitle: '巅峰著作',
            // },
            // {
            //   secondTitle: '详情',
            // },
            {
              secondTitle: '行业观点',
            },
            {
              secondTitle: '专业著作',
            }
          ]
        },
        {
          name: '巅峰公开课',
          second: []
        },
        {
          name: '联系我们',
          second: [
            {
              secondTitle: '联系我们',
            },
            {
              secondTitle: '法律声明',
            }
          ]
        },
      ],
    };
  },
  methods: {
    homeFn () {
      this.$router.replace('/index_h5');
    },
    openMenu () {
      this.isHidden = 2
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
      }
    },
    jumpSecond (i, idx) {
      this.changeColorTwo = idx
      console.log(i, 'yyy', idx);
      //https://www.liepin.com/company/7884213
      if (`/introduce_h5/${i}/${idx}` == '/introduce_h5/0/5') {
        console.log('4774');
        window.location.href = 'https://www.liepin.com/company/7884213'
      } else {
        this.$router.replace(`/introduce_h5/${i}/${idx}`)
      }
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
.logo-img {
  width: 9rem;
  height: 3rem;
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
      .infoSecond {
        margin: 0;
        margin-left: 0.2rem;
        padding: 0;
        list-style: none;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        background-color: #f4f4f4;
        li {
          margin-top: 1rem;
          // width: 4.67rem;
          height: 1.75rem;
          font-size: 1.17rem;
          font-weight: 500;

          line-height: 1.37rem;
          .secondMeg {
            text-align: center;
            padding-left: 1rem;
            color: #000;
            width: 7.3rem;
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
</style>
