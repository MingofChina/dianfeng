<template>
  <div id="app"
       style="background: #F4F4F4;padding-bottom:1rem">
    <div class="showImg">
<!--      <img src="../../../assets/imgs/team.png" />-->
      <el-carousel arrow="never"
                   :autoplay="false"
      >
        <el-carousel-item v-for="(it, idx) in bannerList"
                          :key="idx">
          <img :src="getImgUrl(it.original_image)"
               alt="" />
        </el-carousel-item>
      </el-carousel>
      <div>
<!--        <div class="cha">巅峰团队</div>-->
<!--        <div class="eng">Our Teams</div>-->
      </div>
    </div>
    <div class="team">
      <div style="display: flex;margin-top: 20px;">
        <div v-for="(item1, index111) in list"
             :key="index111"
             @click="jumpTeam(index111)"
             style="display: flex;margin-left: 20px; ">
          <div class="btnCon"
               :class="changeColor == index111 ? 'active' : ''"
               @click="changeInfo(item1.cate_id)">{{ item1.name }}</div>
        </div>
      </div>
    </div>
    <div class="peopleInfo">
      <div class="people">
        <div class="info"
             style="background-color: #FFFFFF;margin:0 auto 0.67rem auto;padding: 0.67rem;box-sizing: border-box;"
             v-for="(item, i11) in peopleInfo"
             :key="i11"
             @click="jump(item)">
          <img :src="getImgUrl(item.original_image)"
               style="width: 9rem;" />
          <div style="margin-left: 1rem;">
            <div class="people-tit">{{ item.name }}</div>
            <div class="people-zw">{{ item.title }}</div>
            <div class="people-text">{{ item.profile }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ul class="staff">
        <li v-for="(items, index22) in staffInfo"
            :key="index22"
            @click="jump(items)">
          <img :src="getImgUrl(items.original_image)" />
          <div class="name">{{ items.name }}</div>
          <div class="mes">{{ items.title }}</div>
        </li>
      </ul>
    </div>
<!--    <div style="text-align: center;"-->
<!--         @click="addData"-->
<!--         v-if="isShow">加载更多</div>-->
  </div>
</template>
<script>
import { dianfengh5team, team } from '@/api/api';
import { banner_h5 } from '../../../api/api.js';

export default {
  data () {
    return {
      bannerList:'',
      staffInfo: [],
      baseUrl: 'http://ceshi.davost.com',
      datalist: [],
      list: [],
      peopleInfo: [],
      changBtn: true,
      changeColor: 0,
      pages: 1,
      pagesize: 10,
      tabId: null,
      totalList: [],
      isShow: true,
      infoId:'',
    };
  },
  mounted () {
    this.getdianfengteamdat();
    this.getBanner()
  },
  methods: {
    //tab切换
    async checkTab (id) {
      this.tabId = id;
      this.pages = 1;
      this.isShow = true;
      let params = {
        pages: this.pages,
        pagesize: this.pagesize,
        cate_id: id
      };
      const res = await team(params);
      if (res.data.code == 0) {
        this.peopleInfo = res.data.data.team.slice(0, 3);
        this.staffInfo = res.data.data.team.slice;
      }
    },
      changeInfo(id){
        this.infoId = id
        this.getdianfengteamdat()
      },
    getBanner(){
      banner_h5().then((res)=>{
        console.log(res,'res')
        this.bannerList = res.data.data
      })
    },
    //分页
    async addData () {
      this.pages++;
      let len = this.totalList.length;
      if (this.pagesize > len) {
        return;
      }
      let params = {
        pages: this.pages,
        pagesize: this.pagesize,
        cate_id: this.tabId
      };
      const res = await team(params);
      if (res.data.code == 0) {
        if (res.data.data.team.length > 0) {
          this.staffInfo = this.staffInfo.concat(res.data.data.team);
        } else {
          this.isShow = false;
        }
      }
    },
    jump (e) {
      this.$router.push({ path: '/teamDetail_h5', query: { name: e } });
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    //初始化数据
    async getdianfengteamdat () {
      let data = {
        pages: this.pages,
        pagesize: this.pagesize,
        cate_id: this.infoId
      };
      const res = await dianfengh5team(data);
      if (res.data.code === 0) {
        this.list = res.data.data.team_cate;
        this.totalList = res.data.data.team;
        this.peopleInfo = res.data.data.team.slice(0, 3);
        this.staffInfo = res.data.data.team;
      }
    },
    jumpTeam (info) {
      this.changBtn = false;
      this.changeColor = info;
    }
  }
};
</script>
<style scoped lang="less">
.showImg {
  position: relative;
  img {
    width: 100%;
    height: 100%;
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
    font-size: 0.83rem;
    /*text-transform: uppercase;*/
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.team {
  // padding-bottom: 1.33rem;
  // background: #f4f4f4;
  .btnCon {
    width: 7rem;
    height: 2.67rem;
    color: #000;
    border: 0.08rem solid #cacaca;
    background-color: #ffffff;
    line-height: 2.67rem;
    text-align: center;
    opacity: 1;
    font-size: 1.17rem;
    font-weight: 600;
  }
  .active {
    background: #c8000a;
    color: #ffffff;
  }
}
.teamBtn {
  background-color: #f4f4f4;
  margin: 1rem 0 1rem 1.33rem;
  .btn {
    width: 8rem;
    height: 2.67rem;
    background: #cacaca;
    border: 0;
    margin-left: 2rem;
    font-size: 1.17rem;
    font-weight: 500;
    /*color: #FFFFFF;*/
    line-height: 2.17rem;
    padding-left: 1rem;
    padding-right: 1rem;
    letter-spacing: 2px;
    /*padding: 1rem;*/
    /*padding-bottom: 2rem;*/
  }
  .active {
    background: #c8000a;
    // color: #ffffff;
  }
}
.peopleInfo {
  .people {
    margin-top: 1.58rem;
    // background: #f4f4f4;
    .people-tit {
      font-size: 1.5rem;
      font-weight: 700;
      color: #231914;
      line-height: 3.08rem;
    }
    .people-zw {
      font-size: 1.17rem;
      font-weight: 400;
      color: #3c3c3c;
      line-height: 1.5rem;
    }
    .people-text {
      font-size: 1rem;
      font-weight: 400;
      color: #6e6e6e;
      line-height: 1.5rem;
      margin-top: 0.5rem;
    }
    .info {
      width: 93%;
      // height: 12.33rem;
      display: flex;
      img {
        width: 13rem;
        height: 11rem;
      }
      .describe {
        margin-left: 3rem;
        .peoTitle {
          margin-top: 1.33rem;
          display: flex;
          .name {
            font-size: 1.5rem;
            font-weight: 500;
            color: #231914;
            line-height: 3.08rem;
          }
          .position {
            margin-left: 1rem;
            font-size: 1.17rem;
            font-weight: 400;
            color: #3c3c3c;
            line-height: 3.08rem;
          }
        }
        .mes {
          font-size: 1rem;
          font-weight: 400;
          color: #6e6e6e;
          line-height: 1.17rem;
        }
      }
    }
  }
}

.staff {
  list-style: none;
  /*padding: 0;*/
  /*padding-top: 0;*/
  background: #f4f4f4;
  padding-left: 1.33rem;
  padding-right: 1.33rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    margin-top: 1rem;
    width: 40%;
    // height: 22.17rem;
    background: #ffffff;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    img {
      margin-top: 1rem;

      // margin-left: 1.42rem;
      width: 100%;
      height: 17rem;
    }
    .name {
      margin-top: 0.67rem;
      text-align: center;
      font-size: 1.33rem;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
    .mes {
      text-align: center;
      font-size: 1rem;
      font-weight: 400;
      color: #3c3c3c;
      line-height: 1.3rem;
      /*margin-bottom: 2rem;*/
    }
  }
}
</style>
