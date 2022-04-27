<template>
  <div id="componentThree" class="component-three">
    <div class="component-three-rotation">
      <div class="click-area">
        <button class="pre-button" @click="changePicture(true)"></button>
        <button class="next-button" @click="changePicture(false)"></button>
      </div>
      <div class="rotation-items">
        <div class="rotation-item"
             @mouseenter="moveOnTab('first')"
             @mouseleave="moveAwayTab()">
          <img class="component-three-picture" :src="product[currentIndex].original_image" />
          <div class="text-area">
            <div :class="{'text-area-hover': isActiveMap.first }">
              <div class="first-title" :class="{'first-title-hover': isActiveMap.first }"> {{ product[currentIndex].title }} </div>
              <div class="second-title"> {{ product[currentIndex].summary }} </div>
            </div>
            <div v-if="!isActiveMap.first" class="third-part">
              <div class="third-part-icon"></div>
              <div class="third-part-button">查看详情</div>
            </div>
          </div>
        </div>
        <div class="rotation-item"
             @mouseenter="moveOnTab('second')"
             @mouseleave="moveAwayTab()">
          <img class="component-three-picture" :src="secondRotation.original_image" />
          <div class="text-area">
            <div :class="{'text-area-hover': isActiveMap.second }">
              <div class="first-title" :class="{'first-title-hover': isActiveMap.second }"> {{ secondRotation.title }} </div>
              <div class="second-title"> {{ secondRotation.summary }} </div>
            </div>
            <div v-if="!isActiveMap.second" class="third-part">
              <div class="third-part-icon"></div>
              <div class="third-part-button">查看详情</div>
            </div>
          </div>
        </div>
        <div class="rotation-item"
             @mouseenter="moveOnTab('third')"
             @mouseleave="moveAwayTab()">
          <img class="component-three-picture" :src="thirdRotation.original_image" />
          <div class="text-area">
            <div :class="{'text-area-hover': isActiveMap.third }">
              <div class="first-title" :class="{'first-title-hover': isActiveMap.third }"> {{ thirdRotation.title }} </div>
              <div class="second-title"> {{ thirdRotation.summary }} </div>
            </div>
            <div v-if="!isActiveMap.third" class="third-part">
              <div class="third-part-icon"></div>
              <div class="third-part-button">查看详情</div>
            </div>
          </div>
        </div>
        <div class="rotation-item"
             @mouseenter="moveOnTab('forth')"
             @mouseleave="moveAwayTab()">
          <img class="component-three-picture" :src="forthRotation.original_image" />
          <div class="text-area">
            <div :class="{'text-area-hover': isActiveMap.forth }">
              <div class="first-title" :class="{'first-title-hover': isActiveMap.forth }"> {{ forthRotation.title }} </div>
              <div class="second-title"> {{ forthRotation.summary }} </div>
            </div>
            <div v-if="!isActiveMap.forth" class="third-part">
              <div class="third-part-icon"></div>
              <div class="third-part-button">查看详情</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-area">
      <div class="four-more-link">
        MORE<img class="four-more-link-img"/>
      </div>
    </div>
    <div class="three-background">
      <div class="three-background-title">
        <div class="three-project">PROJECTS</div>
        <div class="three-sample">巅峰案例</div>
      </div>
      <div>
        <div class="three-product-cates">
          <div
            class="three-product-cate-item"
            v-for="(item ,i) in productCate"
            :key="item.id"
          >{{item.name}}</div>
        </div>
        <div class="component-three-split"></div>
      </div>
    </div>
    <div class="three-background2">
      
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      productCate: [
        {
          id: "37",
          name: "规划设计"
        },
        {
          id: "38",
          name: "运营招商"
        },
        {
          id: "39",
          name: "EPC建设"
        },
        {
          id: "40",
          name: "光影夜游"
        },
        {
          id: "41",
          name: "文创设计"
        },
        {
          id: "42",
          name: "品牌营销"
        },
        {
          id: "43",
          name: "文旅教育"
        }
      ],
      product: [
        {
          id: "9991",
          title: "巅峰测试1",
          business_ids: "37",
          original_image:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          summary: "麻姑山景区位于江西省抚州市南城县，距离南城县城4km，约10分钟车程，距离抚州市70km，距离抚州市70km，距离抚州市70km，距离抚州市70km"
        },
        {
          id: "9992",
          title: "巅峰测试2",
          business_ids: "37",
          original_image: require("../../assets/img/guangyingyeyou.png"),
          summary: "这是测试2"
        },
        {
          id: "9993",
          title: "巅峰测试3",
          business_ids: "37",
          original_image: require("../../assets/img/guihuasheji.png"),
          summary: "这是测试3"
        },
        {
          id: "6417",
          title: "巅峰案例4",
          business_ids: "37",
          original_image: require("../../assets/img/banner.png"),
          summary: "这是测试4"
        }
      ],
      currentIndex: 0,
      isActiveMap: {
        first: true,
        second: true,
        third: true,
        forth: true,
      }
    };
  },
  created() {},
  computed: {
    firstRotation() {
      return this.product[this.currentIndex];
    },
    secondRotation() {
      return this.product[this.tranferIndex(1)];
    },
    thirdRotation() {
      return this.product[this.tranferIndex(2)];
    },
    forthRotation() {
      return this.product[this.tranferIndex(3)];
    }
  },
  methods: {
    changePicture(action) {
      if (action) {
        this.currentIndex =
          this.currentIndex + 1 === this.product.length
            ? 0
            : this.currentIndex + 1;
      } else {
        this.currentIndex =
          this.currentIndex - 1 === -1
            ? this.product.length - 1
            : this.currentIndex - 1;
      }
    },

    // 偏移量转换
    tranferIndex(num) {
      let index =
        this.currentIndex + num >= this.product.length
          ? this.currentIndex + num - this.product.length
          : this.currentIndex + num;
      return index;
    },
    moveOnTab(name) {
      this.isActiveMap[name] = false;
      this.lastStayIndex = name;
    },
    moveAwayTab() {
      this.isActiveMap[this.lastStayIndex] = true;
    }
  }
};
</script>
<style scoped="scoped">
html,
body {
  width: 100%;
  height: 100%;
}
.component-three {
  position: relative;
  width: 1920px;
  height: 1080px;
}
.three-background {
  /* position: relative; */
  background-image: url("../../assets/bei/beijingtu.png");
  background-size: 100% 100%;
  width: 1920px;
  height: 622px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  display: flex;
  /*background: linear-gradient(225deg, #FFFFFF 0%, rgba(255, 255, 255, 0.01) 100%);*/
}
.three-background-title {
  margin-top: 100px;
  margin-left: 236px;
}
.three-project {
  /* position: relative; */
  width: 225px;
  height: 66px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 52px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.three-sample {
  /* position: relative; */
  width: 80px;
  height: 30px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 23px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.three-product-cates {
  /* position: relative; */
  margin-top: 159px;
  margin-left: 328px;
  width: 890px;
  height: 27px;
  display: flex;
  flex-direction: row;
}
.three-product-cate-item {
  margin-right: 48px;
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #c8000a;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.component-three-split {
  margin-top: 17px;
  margin-left: 328px;
  width: 790px;
  height: 1px;
  background: rgba(35, 25, 20, 0.2);
  opacity: 1;
}
.three-product-carousel {

}
.three-product-images {
  /* position: relative; */
  left: 529px;
  top: 292px;
}
.three-product-image {
  width: 400px;
  height: 330px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
* {
  margin: 0;
  padding: 0;
}
.three-background2 {
  background-size: 100% 100%;
  width: 1920px;
  height: 458px;
  background: #f0f0f0;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.component-three-rotation {
  margin-top: 292px;
  position: absolute;
  display: flex;
}
.click-area {
  margin-top: 189px;
  margin-left: 305px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 231px;
  height: 100%;
}
.pre-button {
  background-image: url("../../assets/img/icon_zuo.png");
  background-size: 100% 100%;
  background-color: transparent;
  width: 42px;
  height: 42px;
  border: 0px;
}
.next-button {
  margin-left: 49px;
  background-image: url("../../assets/img/icon_you.png");
  background-size: 100% 100%;
  background-color: transparent;
  width: 42px;
  height: 42px;
  border: 0px;
}
.rotation-items {
  display: flex;
  width: 1700px;
}
.rotation-item {
  margin-right: 25px;
  width: 400px;
  height: 572px;
  background-color: #ffffff;
}
.component-three-picture {
  width: 400px;
  height: 330px;
  border-color: transparent;
}
.text-area {
  margin-top: 30px;
  margin-left: 20px;
}
.text-area-hover {
  transform: translateY(30px);
}
.first-title {
  margin-bottom: 30px;
  width: 352px;
  height: 29px;
  font-size: 22px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #C8000A;
  line-height: 26px;
}
.first-title-hover {
  color: #231914;
}
.second-title {
  margin-bottom: 30px;
  width: 352px;
  height: 40px;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
}
.third-part {
  height: 27px;
  display: flex;
  align-items: center;
}
.third-part-icon {
  margin-right: 7px;
  background-image: url("../../assets/bei/icon_more(1).png");
  background-size: 100% 100%;
  width: 8px;
  height: 14px;
}
.third-part-button {
  margin-top: 4px;
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #C8000A;
}
.bottom-area {
  position: absolute;
  top: 900px;
  width: 100%;
  height: 200px;
}
.four-more-link{
  margin-left: 535px;
  margin-top: 30px;
  background: #C8000A;
  width: 138px;
  height: 52px;
  border-radius: 0px 12px 0px 12px;
  opacity: 1;
  border: 1px solid #C8000A;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  font-weight: 400;
  line-height: 52px;
  text-align: center;

  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/

}
.four-more-link-img{
  margin-left: 8px;
  background: url("../../assets/img/icon_more(3).png");
  width: 8px;
  height: 14px;
  background-size: 100% 100%;
}
</style>