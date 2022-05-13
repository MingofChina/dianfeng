<template>
  <div id="app">
    <div class="main">
      <div class="head">
        <img src="../../../assets/img/tou.png"
             alt="">
        <div class="name">刘峰</div>
        <div class="mes">创始人</div>
      </div>
      <div class="personal">个人简介</div>
      <div class="article"
           v-for="(item,i) in personal"
           :key="i">{{item.name}}</div>
      <div class="experience">获奖经历</div>
      <ul class="listInfo">
        <li class="list"
            v-for="(item,i) in experienceInfo"
            :key="i">
          <img :src="require(`../../../assets/imgs/${item.img}.png`)"
               alt="">
          <div class="listName">{{item.name}}</div>
        </li>
      </ul>
      <div class="experience">项目经验</div>
      <div class="part">参与项目</div>
      <div class="text"
           v-for="(item,i) in textInfo"
           :key="i">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      textInfo: [
        {
          name: '中国旅游业“十二五”发展规划研究'
        },
        {
          name: '丝绸之路和21世纪海上丝绸之路旅游合作发展战略规划'
        },
        {
          name: '贵州省山地全域旅游发展规划'
        },
        {
          name: '贵州省生态文化旅游发展规划'
        },
        {
          name: '海南全域旅游标准与指南、福建省旅游总体规划'
        },
        {
          name: '广东省旅游发展规划'
        },
        {
          name: '江西省旅游发展总体规划'
        },
        {
          name: '中原历史文化旅游区总体规划'
        },
        {
          name: '大连市旅游发展总体规划'
        },
        {
          name: '广州市旅游业发展“十三五”规划'
        },
        {
          name: '三亚市乡村旅游规划'
        },
        {
          name: '遵义市旅游发展规划(修编)'
        },
        {
          name: '邵阳市旅游产业发展总规修编与邵阳市西部生态文化旅游图专项规划'
        },
        {
          name: '浙赣皖旅游区域合作模式研究报告'
        },
        {
          name: '杭州千岛湖自驾车旅游发展专项规划'
        },
        {
          name: '贵州省雷山县文化旅游产业创新区暨旅游目的地建设系列规划'
        },
        {
          name: '凤凰县旅游总体规划'
        },
        {
          name: '长春莲花山国家旅游度假区总体规划'
        },
        {
          name: '梦廊坊文化产业园总体策划'
        },
        {
          name: '延边州和龙市平岗绿洲现代农业发展总体规划'
        },
      ],
      experienceInfo: [
        {
          img: 'exp',
          name: '荣获中国发展奖特等奖'
        },
        {
          img: 'exp',
          name: '2017年中国文旅十大商业领袖'
        },
        {
          img: 'exp',
          name: '2019中国文旅产业领袖人物'
        },
        {
          img: 'exp',
          name: '2018年中国文旅十大领袖'
        },
        {
          img: 'exp',
          name: '2020年品牌中国贡献人物'
        },
        {
          img: 'exp',
          name: '国家文旅部旅游规划优秀成果奖'
        },
        {
          img: 'exp',
          name: '世界遗产龙虎山“荣誉山民”称号'
        },
        {
          img: 'exp',
          name: '参编著作获得孙冶方经济科学奖等'
        },
        {
          img: 'exp',
          name: '荣获中国发展奖特等奖'
        },
        {
          img: 'exp',
          name: '荣获中国发展2017年中国文旅十大商业领袖奖特等奖'
        }
      ],
      personal: [
        {
          name: '北京巅峰智业旅游文化创意股份有限公司创始人，华侨城旅游投资管理集团有限公司董事长。'
        },
        {
          name: '曾任国务院发展研究中心东方文化与城市发展研究所所长、研究员，清华大学博士后。兼任中国全联旅游业商会副会长、中国文旅夜游经济联盟会长、中国旅游协会旅游地学分会副会长、中国旅游景区协会教育专业委员会主任。'
        },
        {
          name: '中国旅游规划领军人物，2018、2019、2020中国文旅十大商业领袖。'
        },
        {
          name: '《中国旅游业“十二五”规划》专家组组长，《中华人民共和国旅游法》特邀起草专家，连续三届国家5A级景区景观质量评定组组长。'
        },
        {
          name: '担任60多个省地市政府旅游发展高级顾问，主持了百余项省地市旅游发展规划。'
        },
        {
          name: '发表各类论文200余篇，专著9部，编著20余部。多次获得国家奖项。'
        },

      ]
    }
  },
}
</script>

<style lang="less" scoped>
.main {
  margin: 0 1.33rem;
  .head {
    display: flex;
    margin-bottom: 1.33rem;
    img {
      width: 10rem;
      height: 11.83rem;
    }
    .name {
      margin-left: 1rem;
      font-size: 1.33rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
    .mes {
      margin-left: 1rem;
      font-size: 1.33rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
  }
  .personal {
    margin-bottom: 1rem;
    font-size: 1.17rem;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 1.37rem;
  }
  .article {
    margin-bottom: 00.67rem;
    font-size: 1rem;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #3c3c3c;
    line-height: 2rem;
  }
  .experience {
    font-size: 1.17rem;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 1.37rem;
  }
  .listInfo {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list {
      display: flex;
      // flex-wrap: wrap;
      justify-content: space-between;
      // width: 1.25rem;
      height: 3.5rem;
      img {
        margin-top: 0.4rem;
        width: 0.67rem;
        height: 0.67rem;
      }
      .listName {
        width: 16.25rem;
        height: 1.5rem;
        line-height: 1.5rem;
      }
    }
  }
  .part {
    margin-top: 0.67rem;
    margin-bottom: 1.5rem;
    font-size: 0.8rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #3c3c3c;
    line-height: 1.17rem;
  }
  .text {
    margin-bottom: 0.67rem;
    font-size: 1rem;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #3c3c3c;
    line-height: 1.5rem;
  }
}
</style>