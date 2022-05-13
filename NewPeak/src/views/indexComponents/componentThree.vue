<template>
  <div id="componentThree" class="component-three">
    <div class="component-three-rotation">
      <div class="click-area">
        <button class="pre-button" @click="changePicture(true)"></button>
        <button class="next-button" @click="changePicture(false)"></button>
      </div>

      <div v-if="firstRotation"
           class="rotation-items">
        <div class="rotation-item"
             @mouseenter="moveOnTab('first')"
             @mouseleave="moveAwayTab()">
          <img class="component-three-picture"
               @click="toPeakCasesDetail(firstRotation.id)"
               :src="firstRotation.original_image | transformImageUrl" />
          <div class="text-area">
            <div :class="{'text-area-hover': isActiveMap.first }">
              <div class="first-title"
                   @click="toPeakCasesDetail(firstRotation.id)"
                   :class="{'first-title-hover': isActiveMap.first }"> {{ firstRotation.title }} </div>
              <div class="second-title"
              > {{ firstRotation.summary }} </div>
            </div>
            <div v-if="!isActiveMap.first" class="third-part">
              <div class="third-part-icon"></div>
              <div class="third-part-button"
                   @click="toPeakCasesDetail(firstRotation.id)"
              >查看详情</div>
            </div>
          </div>
        </div>


        <div v-if="secondRotation"
             class="rotation-item"
             @mouseenter="moveOnTab('second')"
             @mouseleave="moveAwayTab()">
          <img class="component-three-picture"
               @click="toPeakCasesDetail(secondRotation.id)"
               :src="secondRotation.original_image | transformImageUrl" />
          <div class="text-area">
            <div :class="{'text-area-hover': isActiveMap.second }">
              <div class="first-title"
                   @click="toPeakCasesDetail(secondRotation.id)"
                   :class="{'first-title-hover': isActiveMap.second }"> {{ secondRotation.title }} </div>
              <div class="second-title"> {{ secondRotation.summary }} </div>
            </div>
            <div v-if="!isActiveMap.second" class="third-part">
              <div class="third-part-icon"></div>
              <div class="third-part-button"
                   @click="toPeakCasesDetail(secondRotation.id)"
              >查看详情</div>
            </div>
          </div>
        </div>


        <div v-if="thirdRotation"
             class="rotation-item"
             @mouseenter="moveOnTab('third')"
             @mouseleave="moveAwayTab()">
          <img class="component-three-picture"
               @click="toPeakCasesDetail(thirdRotation.id)"
               :src="thirdRotation.original_image | transformImageUrl" />
          <div class="text-area">
            <div :class="{'text-area-hover': isActiveMap.third }">
              <div class="first-title"
                   @click="toPeakCasesDetail(thirdRotation.id)"
                   :class="{'first-title-hover': isActiveMap.third }"> {{ thirdRotation.title }} </div>
              <div class="second-title"> {{ thirdRotation.summary }} </div>
            </div>
            <div v-if="!isActiveMap.third" class="third-part">
              <div class="third-part-icon"></div>
              <div class="third-part-button"
                   @click="toPeakCasesDetail(thirdRotation.id)"
              >查看详情</div>
            </div>
          </div>
        </div>


        <div v-if="forthRotation"
             class="rotation-item"
             @mouseenter="moveOnTab('forth')"
             @mouseleave="moveAwayTab()">
          <img class="component-three-picture"
               @click="toPeakCasesDetail(forthRotation.id)"
               :src="forthRotation.original_image | transformImageUrl" />
          <div class="text-area">
            <div :class="{'text-area-hover': isActiveMap.forth }">
              <div class="first-title"
                   @click="toPeakCasesDetail(forthRotation.id)"
                   :class="{'first-title-hover': isActiveMap.forth }"> {{ forthRotation.title }} </div>
              <div class="second-title"> {{ forthRotation.summary }} </div>
            </div>
            <div v-if="!isActiveMap.forth" class="third-part">
              <div class="third-part-icon"></div>
              <div class="third-part-button"
                   @click="toPeakCasesDetail(forthRotation.id)"
              >查看详情</div>
            </div>
          </div>
        </div>
      </div>




      <div v-else class="rotation-items"></div>



    </div>

    <div class="bottom-area">
      <div class="four-more-link" @click="toPeakCases(activeTableId)">
        <div src="../../assets/img/Group 391.png"
             class="four-more-link-img"></div>
      </div>
    </div>


    <div class="three-background">
      <div class="three-background-title">
        <div class="three-project">PROJECTS</div>
        <div class="three-sample">巅峰案例</div>
      </div>
      <div>
        <div class="cates-wrapper">
          <div class="three-product-cates">
          <div
              class="three-product-cate-item"
              :class="[activeTableId === item.id ? 'active-tab' : '']"
              v-for="(item ,i) in product_cate"
              :key="item.id"
              @click="changeTitle(item.id)"
          >{{item.name}}</div>
        </div>
          <div class="component-three-split"></div>
        </div>
      </div>
    </div>






    <div class="three-background2">

    </div>
    <router-view />
  </div>
</template>
<script>
import { firstone } from "@/api/api";
import commonMixin from "@/components/mixin/common.mixin";
export default {
  props: {
    product_cate: {
      default: [],
      type: Array
    },
    product: {
      default: [],
      type: Array
    }
  },
  mixins: [commonMixin],
  data() {
    return {
      currentIndex: 0,
      activeTableId: 0,
      isActiveMap: {
        first: true,
        second: true,
        third: true,
        forth: true,
      },
      baseUrl:'http://ceshi.davost.com',
    };
  },
  watch:{
    $route: {
      handler() {
        this.Mien();
      },
      deep: true,
    },
    product_cate: {
      handler(newVal) {
        this.activeTableId = newVal?.[0]?.id || '';
      },
      immediate: true
    }
  },
  created() {},

  computed: {
    eachProduct() {
      return this.product?.filter(item => item.business_ids === this.activeTableId) || [];
    },
    firstRotation() {
      return this.eachProduct?.[this.currentIndex] || {};
    },
    secondRotation() {
      return this.eachProduct?.[this.tranferIndex(1)] || {};
    },
    thirdRotation() {
      return this.eachProduct?.[this.tranferIndex(2)] || {};
    },
    forthRotation() {
      return this.eachProduct?.[this.tranferIndex(3)] || {};
    }
  },
  mounted() {},
  methods: {
    changeTitle(id){
      this.activeTableId = id;
      this.currentIndex = 0;
      this.getData();
      this.eachProduct  = this.product?.filter(item => item.business_ids === this.activeTableId) || [];
      //alert(JSON.stringify(this.eachProduct));
      this.firstRotation = this.eachProduct?.[this.currentIndex] || {};
      //alert(JSON.stringify(this.firstRotation));
      this.secondRotation = this.eachProduct?.[this.tranferIndex(1)] || {};;
      this.thirdRotation = this.eachProduct?.[this.tranferIndex(2)] || {};;
      this.forthRotation = this.eachProduct?.[this.tranferIndex(3)] || {};
    },
    async getData() {
      const { data } = await firstone();
      const queryData = data?.data;
      this.product = queryData?.product || [];
    },
    toPeakCases(id){
      console.log(id)
      // this.$router.push(`/peakCases/${id}`);
    },
    toPeakCasesDetail(id){
      this.$router.push(`/peakCasesDetail/${id}`);
    },


    changePicture(action) {
      if (action) {
        this.currentIndex =
            this.currentIndex + 1 === this.eachProduct.length
                ? 0
                : this.currentIndex + 1;
      } else {
        this.currentIndex =
            this.currentIndex - 1 === -1
                ? this.eachProduct.length - 1
                : this.currentIndex - 1;
      }
    },

    // 偏移量转换
    tranferIndex(num) {
      let index =
          this.currentIndex + num >= this.eachProduct.length
              ? this.currentIndex + num - this.eachProduct.length
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
  width: 100%;
  height: 1080px;
  overflow: hidden;
}
.three-background {
  /* position: relative; */
  background-image: url("../../assets/bei/beijingtu.png");
  background-size: 100% 100%;
  width: 100%;
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
  margin-left: 200px;
  /*width: 1000px;*/
  height: 27px;
  display: flex;
  flex-direction: row;
}

.three-product-cate-item {
  margin-right: 48px;
  /*width: 120px;*/
  height: 21px;
  font-size: 18px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #6C6662;
  line-height: 21px;

  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.three-product-cate-item:nth-child(n+2){
  border-left: 1px solid rgba(35, 25, 20, 0.2);
  padding-left: 39px;
}
.three-product-cate-item:hover{
  cursor: pointer;
  color: #c8000a;
}
.active-tab {
  color: #c8000a;
}
.active-tab::after{
  position: relative;
  left: 9px;
  content: "";
  width:80%;
  height: 22.5px;
  display: block;
  border-bottom: 1px solid red;
}

.component-three-split {
  margin-top: 17px;
  margin-left: 200px;
  width: 1195px;
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
  width: 100%;
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
  background-image: url("../../assets/img/icon_left_default3.png");
  background-size: 100% 100%;
  background-color: transparent;
  width: 42px;
  height: 42px;
  border: 0px;
}
.next-button {
  margin-left: 49px;
  background-image: url("../../assets/img/icon_right_default3.png");
  background-size: 100% 100%;
  background-color: transparent;
  width: 42px;
  height: 42px;
  border: 0px;
}
.pre-button:hover {
  background-image: url("../../assets/img/icon_zuo.png");
  background-size: 100% 100%;
  background-color: transparent;
  width: 42px;
  height: 42px;
  border: 0px;
}
.next-button:hover {
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
  margin-top: 10px;
  margin-left: 20px;
}
.text-area-hover {
  transform: translateY(30px);
}
.first-title {
  margin-bottom: 58px;
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

  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/

}
.four-more-link-img{
  /*margin-left: 8px;*/
  background: url("../../assets/img/Group 391.png");
  width: 138px;
  height: 52px;
  background-size: 100% 100%;
}
.four-more-link-img:hover{
  /*margin-left: 8px;*/
  background: url("../../assets/img/Group 392.png");
  width: 138px;
  height: 52px;
  background-size: 100% 100%;
}
@media screen and (max-width: 1366px){
  .three-project {
    /*position: relative;
    left: -50px;*/
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
    /*position: relative;
    left: px;*/
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

  .cates-wrapper{
    width: 1300px;
    margin-left: 70px;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    /*border-bottom: 1px solid rgba(35, 25, 20, 0.2);*/
  }
  .three-product-cate-item {
    margin-right: 30px;
    /*width: 120px;*/
    height: 21px;
    font-size: 16px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #6C6662;
    line-height: 21px;

    /*-webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
  }
  .three-product-cate-item:nth-child(n+2){
    border-left: 1px solid rgba(35, 25, 20, 0.2);
    padding-left: 30px;
  }
  .component-three-split {
    margin-top: 17px;
    width: 1015px;
    height: 1px;
    background: rgba(35, 25, 20, 0.2);
    opacity: 1;
    overflow-x: hidden;
  }
  .active-tab {
    color: #c8000a;
  }
  .active-tab::after{
    position: relative;
    left: 9px;
    content: "";
    width:80%;
    height: 22.5px;
    display: block;
    border-bottom: 1px solid red;
  }
}
</style>