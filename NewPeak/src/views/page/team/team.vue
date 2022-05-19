<template>
  <div id="app"
       style="background: #F4F4F4;">
    <div class="showImg">
      <img src="../../../assets/imgs/team.png">
      <div>
        <div class="cha">巅峰团队</div>
        <div class="eng">Top team</div>
      </div>
    </div>
    <div class="team">
      <div style="display: flex;margin-top: 20px;">
        <div v-for="(item1,index111) in  list"
             :key="index111"
             @click="jumpTeam(index111)"
             style="display: flex;margin-left: 20px; ">
          <div class="btnCon"
               :class="changeColor == index111?'active':''">{{item1.name}}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="people">
        <div class="info"
             style="margin-top: 15px;background-color: #FFFFFF;margin: 0 auto;"
             v-for="(item,i11) in peopleInfo"
             :key="i11"
             @click="jump(item)">
          <img :src=getImgUrl(item.original_image)
               style="width: 9rem;height: 11rem;border-radius: 0rem 0rem 0rem 0rem;opacity: 1;margin-top: 10px;">
          <div style="display: flex;flex-direction: column;margin-left: 10px;margin-top: 1.6rem">
            <div style="display: flex;align-items: center;">
              <div style="color: #231914;font-size: 1.5rem;font-weight: 600;">{{item.name}}</div>
              <div style="margin-left: 10px;font-size: 1.17rem;">{{item.title}}</div>
            </div>
            <div style="margin-top: 10px;font-size: 1rem;font-family: Source Han Sans CN-Normal, Source Han Sans CN;font-weight: 400;color: #6E6E6E;">{{item.profile}}</div>
          </div>

        </div>
      </div>
    </div>
    <div>
      <ul class="staff">
        <li v-for="(items,index22) in staffInfo"
            :key="index22"
            @click="jump(items)">
          <img :src=getImgUrl(items.original_image)>
          <div class="name">{{items.name}}</div>
          <div class="mes">{{items.title}}</div>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>


import { dianfengh5team } from "@/api/api";

export default {
  data () {
    return {
      staffInfo: [

      ],
      baseUrl: 'http://ceshi.davost.com',
      datalist: [],
      list: [],
      peopleInfo: [
      ],
      changBtn: true,
      changeColor: 0,
      pages: 1,
      pagesize: 10
    }
  },
  mounted () {
    this.getdianfengteamdat()
  },
  methods: {
    jump (e) {
      this.$router.push({ path: '/teamDetail_h5', query: { 'name': e } })
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    async getdianfengteamdat () {
      let data = {
        pages: this.pages,
        pagesize: this.pagesize,
        cate_id: ""

      }
      const res = await dianfengh5team(data)
      console.log(res, 99999999)
      if (res.data.code === 0) {
        this.list = []
        this.list = res.data.data.team_cate
        this.peopleInfo = res.data.data.team.slice(0, 3)
        this.staffInfo = []
        this.datalist = res.data.data.team
        this.datalist.shift()
        this.datalist.shift()
        this.datalist.shift()
        this.staffInfo = this.datalist
      }
    },
    jumpTeam (info) {
      this.changBtn = false
      this.changeColor = info
    }
  },
}
</script>
<style scoped lang="less">
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
    font-size: 0.83rem;
    text-transform: uppercase;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
  }
}
.team {
  .btnCon {
    width: 7rem;
    height: 2.67rem;
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
.people {
  margin-top: 1.58rem;
  // background: #f4f4f4;

  .info {
    width: 31.25rem;
    height: 12.33rem;
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
