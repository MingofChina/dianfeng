<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/team.png"
           alt=""
           @click="jump()">
      <div>
        <div class="cha">巅峰团队</div>
        <div class="eng">Top team</div>
      </div>
    </div>
    <div class="teamBtn">
      <button class="btn active">管理团队</button>
      <button class="btn">专家团队</button>
      <button class="btn">技术团队</button>
    </div>
    <div class="people">
      <div class="info"
           v-for="(item,i) in peopleInfo"
           :key="i">
        <img :src="require(`../../../assets/bei/${item.img}.png`)"
             alt="">
        <div class="describe">
          <div class="peoTitle">
            <div class="name">{{item.name}}</div>
            <div class="position">{{item.position}}</div>
          </div>
          <div class="mes">{{item.message}}</div>
        </div>
      </div>
    </div>
    <ul class="staff">
      <li v-for="(item,i) in staffInfo"
          :key="i">
        <img :src="require(`../../../assets/bei/${item.img}.png`)"
             alt="">
        <div class="name">{{item.name}}</div>
        <div class="mes">{{item.mes}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      staffInfo: [
        {
          img: 'guihuasheji',
          name: '束盈',
          mes: '束盈'
        },
        {
          img: 'guihuasheji',
          name: '束盈',
          mes: '束盈'
        },
        {
          img: 'guihuasheji',
          name: '束盈',
          mes: '束盈'
        },
        {
          img: 'guihuasheji',
          name: '束盈',
          mes: '束盈'
        },
        {
          img: 'guihuasheji',
          name: '束盈',
          mes: '束盈'
        },
        {
          img: 'guihuasheji',
          name: '束盈',
          mes: '束盈'
        }
      ],
      peopleInfo: [
        {
          img: 'guihuasheji',
          name: '刘锋',
          position: '创始人',
          message: '中国旅游规划少壮派领军人物，60多个省市旅游发展高级顾问，多所大学客座教授，多次获得国家奖项。'
        },
        {
          img: 'guihuasheji',
          name: '束盈',
          position: '董事长',
          message: '中欧国际工商学院EMBA、北京邮电大学MBA十大杰出校友、2013年度中国城镇化建设特别贡献人物、中国旅游投资先锋人物。'
        },
        {
          img: 'guihuasheji',
          name: '邸倩',
          position: '首席运营官/COO',
          message: '清华大学-法国国立路桥大学-法国国立民航大学高级管理人员工商管理硕士学位，中国注册会计师，曾任上市公司董事职务。'
        },
      ]
    }
  },
  methods: {
    jump () {
      // console.log('let us go');
      this.$router.replace('/teamDetail_h5')
      console.log('let us go');
    }
  }
}
</script>
<style scoped lang="less">
.showImg {
  position: relative;
  .cha {
    position: absolute;
    top: 7.8rem;
    left: 15.25rem;
    width: 7.83rem;
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
    top: 9.8rem;
    left: 16.25rem;
    height: 1.25rem;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 0.98rem;
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
    color: #ffffff;
  }
}
.people {
  margin-top: 1.58rem;
  background: #f4f4f4;
  padding-left: 1.33rem;
  .info {
    width: 28.58rem;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    margin-top: 1rem;
    width: 16.83rem;
    height: 22.17rem;
    background: #ffffff;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    img {
      margin-top: 1rem;
      margin-left: 1.42rem;
      width: 14rem;
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
      line-height: 1.17rem;
      /*margin-bottom: 2rem;*/
    }
  }
}
</style>
