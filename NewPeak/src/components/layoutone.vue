<template>
  <div class="wai">
    <div class="container">
      <div class="ban">
        <!-- 第一列分组 -->
        <div>
          <!-- <div class="list">
          <li v-for="item in teamarr" :key="item.cate_id" @click="links(item.cate_id)">
            {{ item.name }}
          </li>
        </div> -->
          <!-- 第二例创始人详情 -->
          <!-- <div class="originnator"  >
          <p v-for="item in liufeng" :key="item.id"   >
            <img :src="bianliang + item.original_image" alt="" />
          </p>
          <p v-for="(items, index) in liufeng" :key="index">
               <router-link
                    :to="{ path: '/Teamdetail', query: { id: items.id } }"
                    class="around titlehover"
                  >
                   {{ items.name }}
                  </router-link>
                  
            <span>{{ items.title }}</span> <br>
            <span>{{ items.profile }}</span>
          </p>
        </div> -->
          <!-- 第三行两列人物详情 -->
          <!-- <div class="twolines">
          <div v-for="item in layout2" :key="item.id">
            <p><img :src="bianliang + item.original_image" alt="" /></p>
            <p>
             <router-link
                    :to="{ path: '/Teamdetail', query: { id: item.id } }"
                    class="around titlehover"
                  >
                   {{ item.name }}
                  </router-link>
              <span> {{item.title}} </span> <br />
             <ul>
              {{item.profile}}
             </ul>
            </p>
          </div>
        </div> -->
          <!-- 第四行横向布局 -->
          <div class="layout">
            <ul>
              <li v-for="item in teamarr" :key="item.id">
                <img :src="bianliang + item.original_image" alt="" />
                <router-link
                  :to="{ path: '/Teamdetail', query: { id: item.id } }"
                  class="around titlehover"
                >
                  {{ item.name }}
                </router-link>
                <p>{{ item.title }}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- <div class="layout">
          <ul>
            <li v-for="item in teamarr" :key="item.id">
              <img :src="bianliang + item.original_image" alt="" />
              <router-link
                :to="{ path: '/Teamdetail', query: { id: item.id } }"
                class="around titlehover"
              >
                {{ item.name }}
              </router-link>
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </div> -->
      </div>
      <footernavs></footernavs>
    </div>
  </div>
</template>

<script scoped>
import { team, banner, column } from "@/api/api";

import footernavs from "../components/footernav.vue";
import topnavs from "../components/topNav.vue";
export default {
  components: {
    footernavs,
    topnavs,
  },
  data() {
    return {
      teamarr: [], // 第一行可选择的筛选按钮
      liufeng: [], //第一个刘峰
      bianliang: "http://ceshi.davost.com", //要拼接的数组
      layout2: [], //中间两行并排的数据
      flexout: [], //全部横向排列布局
      banner: [], //大图
      pagesize: 1,
      page_count: 5,
    };
  },
  mounted() {
    // 距离底部200px时加载一次
    this.teamfn({ pages: 1, pagesize: 10, cate_id: "2,11" });
    window.addEventListener("scroll", this.lazyLoading); // 滚动到底部，再加载的处理事件
    window.addEventListener("scroll", this.lazyLoading2); // 滚动到底部，再加载的处理事件
    // window.addEventListener("scroll", this.lazyLoading3); // 滚动到底部，再加载的处理事件
    this.bannerfn();
    this.columnfn();
  },
  methods: {
    lazyLoading() {
      // 滚动到底部，再加载的处理事件
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; // 滚动条滚动时，距离顶部的距离
      const clientHeight = document.documentElement.clientHeight; // 可视区的高度
      const scrollHeight = document.documentElement.scrollHeight; // 滚动条的总高度

      // const scrollTop =document.documentElement.scrollTop || document.body.scrollTop;
      // const clientHeight = document.documentElement.clientHeight;
      // const scrollHeight = document.documentElement.scrollHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        this.pagesize++;
        console.log(this.pagesize);
        if (this.page > this.page_count) return;
        this.teamfn({ pages: this.pagesize, pagesize: 10, cate_id: "2,11" });
      }

      // if (scrollTop + clientHeight >= scrollHeight) {
      //   // 滚动到底部，逻辑代码
      //   console.log(this.pagesize);
      //   this.teamfn({ pages: this.pagesize, pagesize: 10, cate_id: "2,10" });
      //   console.log("111");
      // }
    },
    lazyLoading2() {
      // 滚动到底部，再加载的处理事件
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        // 滚动到底部，逻辑代码
        this.teamfn({ pages: 2, pagesize: 10, cate_id: "2,11" });
        console.log("111");
      }
    },
    // lazyLoading3() {
    //   // 滚动到底部，再加载的处理事件
    //   const scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   const clientHeight = document.documentElement.clientHeight;
    //   const scrollHeight = document.documentElement.scrollHeight;

    //   if (scrollTop + clientHeight >= scrollHeight) {
    //     // 滚动到底部，逻辑代码
    //     this.teamfn({ pages: 2, pagesize: 10, cate_id: "2,10" });
    //     console.log("111");
    //   }
    // },

    // .event-list 监听滚轮事件的方法
    // onScroll() {
    //   let inner = document.querySelector(".event-list");
    //   const scrollTop = inner.scrollTop; // 滚动条滚动时，距离顶部的距离
    //   const windowHeight = inner.clientHeight; // 可视区的高度
    //   const scrollHeight = inner.scrollHeight; // 滚动条的总高度
    //   // 滚动条到底部
    //   if (scrollTop + windowHeight === scrollHeight) {
    //     // this.page++
    //     console.log(scrollTop + windowHeight === scrollHeight);
    //     if (this.page > this.page_count) return;
    //     // this.getData()
    //     console.log("改调用接口了");
    //     this.teamfn({ pages: 2, pagesize: 10, cate_id: "2,10" })

    //   }
    //   console.log("111");
    // },
    links(item) {
      console.log(item);
      // this.teamfn({ pages: 1, pagesize: 10, cate_id: item });
    },

    // 调用team总函数
    async teamfn(val) {
      let { data } = await team(val);
      // this.jieshao = data.data;
      this.teamarr = data.data.team;
      // console.log(data.data.team);
      // console.log(this.teamarr);
      // this.liufeng = data.data.team.splice(0, 1); //截取到第一个
      // this.layout2 = data.data.team.splice(0, 2); //截取到两列布局
      // this.flexout = data.data.team.splice(0, 7); //截取到7个并排布局
    },
    // 大图banner接口函数
    async bannerfn() {
      let { data } = await banner({ id: 44 });
      // this.jieshao = data.data;
      // console.log(data.data);
    },
    async columnfn() {
      let { data } = await column({ id: 4 });
      // this.jieshao = data.data;
      // console.log(data.data);
    },
  },
};
</script>

<style lang="less" >
// .event-list {
//   width: 100%;
//   border: 1px solid red;
//   height: 20.475rem /* 1638/80 */;

//   overflow: scroll;
// }
@border: 1px;
@fontsize: 80px;
@px: 0px;
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 80px;
}
a {
  text-decoration: none;
  color: #221a16;
}
.wai {
  width: 100%;
  height: 100%;
  .container {
    // width: (1970rem / @fontsize);
    margin: auto;
    .screen {
      position: relative;
      display: flex;
      box-sizing: border-box;
      color: #ffff;
      text-align: center;
      width: 100%;
      height: (700rem / @fontsize);
      line-height: (20rem / @fontsize);
      // background: url(../../assets/img/Group\ 506.png);
      .crumbs-l {
        position: absolute;
        bottom: 0;
        left: 3rem /* 240/80 */;
        height: 1.25rem /* 100/80 */;
        line-height: 1.25rem /* 100/80 */;
        font-size: 0.2875rem /* 23/80 */;
        // flex: 1;
        // width: (264rem / @fontsize);
        // height: (167rem / @fontsize);
        // font-size: (12rem / @fontsize);
        // color: #918c8b;
        span {
          margin-right: 0.25rem /* 20/80 */;
          img {
            vertical-align: middle;
          }
        }
      }
      .screen-content {
        width: (220rem / @fontsize);
        height: (300rem / @fontsize);
        margin: auto;
        h1 {
          font-size: (39rem / @fontsize);
          padding: (14rem / @fontsize);
        }
        span:nth-of-type(1) {
          display: inline-block;
          width: (185rem / @fontsize);
          font-size: (18rem / @fontsize);
        }
        span:nth-of-type(2) {
          display: inline-block;
          width: (65rem / @fontsize);
          height: (2rem / @fontsize);
          border-bottom: (4rem / @fontsize) solid #fff;
        }
      }
    }
    .ban {
      width: (1448rem / @fontsize);
      margin: auto;
      .list {
        display: flex;
        width: 100%;
        height: (154rem / @fontsize);
        align-items: center;
        margin-bottom: (20rem / @fontsize);
        li {
          width: (170rem / @fontsize);
          height: (54rem / @fontsize);
          line-height: (54rem / @fontsize);
          text-align: center;
          border: 1px solid #cacaca;
          background-color: #fff;
          margin-right: (40rem / @fontsize);
          font-size: (20rem / @fontsize);
        }
        li:hover {
          background-color: #c8000a;
          color: #fff;
        }
      }
      .originnator {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        height: (526rem / @fontsize);
        margin-bottom: (20rem / @fontsize);
        p:nth-of-type(1) {
          width: (364rem / @fontsize);
          height: (446rem / @fontsize);
          padding: (40rem / @fontsize) (60rem / @fontsize) (40rem / @fontsize)
            (40rem / @fontsize);
          img {
            width: (364rem / @fontsize);
            height: (446rem / @fontsize);
          }
        }
        p:nth-of-type(2) {
          width: (868rem / @fontsize);
          height: (446rem / @fontsize);
          span {
            // display: inline-block;
          }
          a {
            width: (100rem / @fontsize);
            height: (90rem / @fontsize);
            margin: (68rem / @fontsize) (24rem / @fontsize) (50rem / @fontsize)
              (5rem / @fontsize);
            font-size: (50rem / @fontsize);
          }
          span:nth-of-type(1) {
            width: (72rem / @fontsize);
            height: (37rem / @fontsize);
            margin-bottom: (50rem / @fontsize);
            font-size: (20rem / @fontsize);
            color: #525252;
          }
          span:nth-of-type(2) {
            width: 100%;
            font-size: (25rem / @fontsize);
            line-height: (45rem / @fontsize);
            color: #525252;
          }
        }
      }
      .twolines {
        display: flex;
        width: 100%;
        margin-bottom: (52rem / @fontsize);
        height: (366rem / @fontsize);
        margin-bottom: (52rem / @fontsize);
        div {
          display: flex;
          box-sizing: border-box;
          width: (706rem / @fontsize);
          height: (366rem / @fontsize);
          margin-right: (36rem / @fontsize);
          p:nth-of-type(1) {
            width: (238rem / @fontsize);
            height: (286rem / @fontsize);
            padding: (40rem / @fontsize) (32rem / @fontsize) (40rem / @fontsize)
              (40rem / @fontsize);
            img {
              width: (238rem / @fontsize);
              height: (286rem / @fontsize);
            }
          }
          p:nth-of-type(2) {
            width: (356rem / @fontsize);
            height: (366rem / @fontsize);
            a {
              font-size: (50rem / @fontsize);
              font-weight: bold;
              margin-bottom: (30rem / @fontsize);
            }
            span:nth-of-type(1) {
              font-size: (25rem / @fontsize);
              color: #525252;
              margin-left: (10rem / @fontsize);
            }
            ul {
              margin-top: (10rem / @fontsize);
              color: #525252;
              font-size: (20rem / @fontsize);
            }
          }
        }
      }
      .layout {
        width: 100%;
        margin-bottom: (70rem / @fontsize);

        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            box-sizing: border-box;
            width: (350rem / @fontsize);
            margin-right: (6rem / @fontsize);
            line-height: 0.125rem /* 10/80 */;
            img {
              width: (270rem / @fontsize);
              height: (324rem / @fontsize);
              padding: (32rem / @fontsize) (40rem / @fontsize)
                (24rem / @fontsize) (23rem / @fontsize);
            }
            a {
              display: inline-block;
              width: 100%;
              height: 0.625rem /* 50/80 */;
              text-align: center;
              font-size: 0.375rem /* 30/80 */;
            }
            p:nth-of-type(1) {
              font-size: (20rem / @fontsize);
              line-height: 0.625rem /* 50/80 */;
              color: #414141;
              text-align: center;
              height: 0.625rem /* 50/80 */;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
          }
        }
      }
    }
  }
}
</style>