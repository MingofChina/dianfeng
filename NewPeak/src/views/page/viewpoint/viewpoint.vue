<template>
  <div id="app">
    <div class="head">
      <div class="viewTitle">{{booksDetail.title}}</div>
      <div class="con">
        <div>{{booksDetail.branch}}</div>
        <div>{{booksDetail.addtime}}</div>
      </div>
      <div class="article"
           v-html="booksDetail.description">
      </div>
    </div>
    <div class="viewMain">
      <div class="viTitle">
        <div class="stork">|</div>
        <div class="title">著作推荐</div>
      </div>
      <div class="info"
           v-for="(item,i) in bookInfo"
           :key="i">
        <div class="infoCon">
          <div class="title"
               @click="booksInfo(item.id)">{{item.title}}</div>
          <div class="mes">{{item.summary}}</div>
          <span v-show="item.summary.length<40?false:true">...</span>
        </div>
        <img :src=getImgUrl(item.original_image)
             alt="">
      </div>
    </div>
    <div class="viewFoot">
      <div class="viTitle">
        <div class="stork">|</div>
        <div class="title">相关文章推荐</div>
      </div>
      <div class="info"
           v-for="(item,i) in recommend"
           :key="i">
        <img :src=getImgUrl(item.original_image)
             alt="">
        <div class="infoCon">
          <div class="title">{{item.title}}</div>
          <div class="mes">{{item.summary}}</div>
          <span v-show="item.summary.length<40?false:true">...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { bookDetail_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      bookInfo: '',
      booksDetail: '',
      baseUrl: 'http://ceshi.davost.com',
      headTitle: '掘金夜间经济：夜景“醉”游人，遇见“夜” 来香',
      recommend: [
        {
          title: '掘金夜间经济：夜景“醉”游...',
          mes: '华灯初上，流光溢彩，从视觉盛宴到感觉体验，夜景使城市摆脱了黑夜的束缚，长...',
          img: 'guangyingyeyou'
        },
        {
          title: '掘金夜间经济：夜景“醉”游...',
          mes: '华灯初上，流光溢彩，从视觉盛宴到感觉体验，夜景使城市摆脱了黑夜的束缚，长...',
          img: 'guangyingyeyou'
        },
        {
          title: '掘金夜间经济：夜景“醉”游...',
          mes: '华灯初上，流光溢彩，从视觉盛宴到感觉体验，夜景使城市摆脱了黑夜的束缚，长...',
          img: 'guangyingyeyou'
        }
      ],
      articleArr: [
        { name: '华灯初上，流光溢彩，从视觉盛宴到感觉体验，夜景使城市摆脱了黑夜的束缚，长时间多维度地满足了游客需求。夜景也是夜游经济发展的基础，是不可或缺的组成部分，在地化场景的夜景该如何打造，是夜景项目最核心的问题。' },
        { name: '夜景塑造即利用灯光将城市或某区域内的构筑物、景观等加以重塑，并将其有机地组合成一个和谐优美、富有特色的夜景图画，以此来表现一个城市或地区的夜间形象，从而满足旅游者对文化氛围和艺术展现的视觉追求。在灯光照明技术的发展和应用推动下，景观照明工程开启了我国夜景塑造的发展历程，随着社会经济发展和人们生活方式的转变，夜景塑造在景观照明基础上衍生出以美化为特色的夜景亮化和以灯光秀为代表的夜景光影新阶段。' },
        { name: '华灯初上，流光溢彩，从视觉盛宴到感觉体验，夜景使城市摆脱了黑夜的束缚，长时间多维度地满足了游客需求。夜景也是夜游经济发展的基础，是不可或缺的组成部分，在地化场景的夜景该如何打造，是夜景项目最核心的问题。' },
      ],
      booksId: '',
      articleLast: '夜景塑造即利用灯光将城市或某区域内的构筑物、景观等加以重塑，并将其有机地组合成一个和谐优美、富有特色的夜景图画，以此来表现一个城市或地区的夜间形象，从而满足旅游者对文化氛围和艺术展现的视觉追求。在灯光照明技术的发展和应用推动下，景观照明工程开启了我国夜景塑造的发展历程，随着社会经济发展和人们生活方式的转变，夜景塑造在景观照明基础上衍生出以美化为特色的夜景亮化和以灯光秀为代表的夜景光影新阶段。'
    }
  },
  created () {
    console.log(this.$route.query.id, 'yy');
    if (!this.booksId) {
      this.booksId = this.$route.query.id
    }
    this.getList()
  },
  methods: {
    getList () {
      const data = {
        id: this.booksId
      }
      bookDetail_h5(data).then((res) => {
        this.booksDetail = res.data.data.books_detail
        this.bookInfo = res.data.data.peak_books_hots
        this.recommend = res.data.data.peak_books_relevant
        console.log(res, '著作详情');
      })
    },
    getImgUrl (imgUrl) {
      return this.baseUrl + imgUrl;
    },
    booksInfo (info) {
      console.log(info, 'bbb');
      this.booksId = info;
      this.getList()

    },
  }
}
</script>

<style lang="less" scoped>
.head {
  background: #f4f4f4;
  padding: 2rem 1.33rem 0 1.33rem;
  text-align: center;
  .viewTitle {
    height: 5rem;
    // margin: 0 auto;
    font-size: 1.33rem;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #231914;
    line-height: 1.56rem;
  }
  .con {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .article {
    margin-bottom: 0.67rem;
    text-align: left;
    font-size: 1rem;
    font-family: Source Han Sans CN-Light, Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    line-height: 1.67rem;
  }
}
.viewMain {
  margin: 1.67rem 1.33rem 0 1.33rem;
  .viTitle {
    display: flex;
    margin-bottom: 1rem;
    .stork {
      margin-top: -0.1rem;
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    .infoCon {
      width: 70%;
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
      width: 20%;
      height: 7.75rem;
      margin-bottom: 1rem;
    }
  }
}
.viewFoot {
  background: #f4f4f4;
  padding: 1.67rem 1.33rem 0 1.33rem;
  .viTitle {
    display: flex;
    padding-bottom: 1rem;
    .stork {
      margin-top: -0.1rem;
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    .infoCon {
      width: 70%;
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
      width: 20%;
      height: 7.75rem;
      margin-bottom: 1rem;
    }
  }
}
</style>