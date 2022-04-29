<template>
  <div id="componentOne">
    <div id="topPart" class="top-part">
      <div class="title">
        <div class="title-content">
          <span class="title-item-one">巅峰智业</span>
          <span class="title-item-two">中国文旅产业&乡村振兴领先的全过程服务商</span>
        </div>
      </div>
      <div class="rotation">
        <div class="click-area">
          <button class="pre-picture" @click="changePicture(false)"></button>
          <div class="pageinfo">
            <span class="current-page">{{ currentPage }}&nbsp;/</span>
            <span class="total-page">{{ totalPage }}</span>
          </div>
          <button class="next-picture" @click="changePicture(true)"></button>
        </div>
        <img class="display-area" :src="currentDisplay" />
      </div>
    </div>
    <div class="bottom-part">
      <div class="first-part">中国文旅产业和乡村振兴领先的全程服务商</div>
      <div class="second-part">
        <div class="second-part-item">
          <span class="high-light">{{ company_information.wenlv_years_num || '' }}</span>
          <span>文旅行业不辍耕耘</span>
        </div>
        <div class="second-part-item">
          <span>中国</span>
          <span class="high-light">{{ company_information.wenlv_head_enterprise || '' }}</span>
        </div>
        <div class="second-part-item">
          <span class="high-light">{{ company_information.wenlv_industries_num || '' }}</span>
          <span>美丽中国价值经典</span>
        </div>
      </div>
      <div class="third-part"></div>
      <div class="second-part">
        <div class="second-part-item">
          <span class="high-light">{{ company_information.wenlv_scenic_spot || '' }}</span>
          <span>专业运营旅游景区</span>
        </div>
        <div class="second-part-item">
          <span>文旅产业</span>
          <span class="high-light">{{ company_information.wenlv_title || '' }}</span>
        </div>
        <div class="second-part-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from "./service/index.service";
export default {
  name: "",
  props: ['company_information'],
  data() {
    return {
      currentDisplay: '',
      currentIndex: 0,
      displayPictureList: [
        {
          url: require("../../assets/img/banner.png"),
          staticUrl: "url("+require("../../assets/img/banner.png")+")"
        },
        {
          url: require("../../assets/img/guangyingyeyou.png"),
          staticUrl: "url("+require("../../assets/img/guangyingyeyou.png")+")"
        },
        {
          url: require("../../assets/img/guihuasheji.png"),
          staticUrl: "url("+require("../../assets/img/guihuasheji.png")+")"
        },
        {
          url: require("../../assets/img/wenchuangshej.png"),
          staticUrl: "url("+require("../../assets/img/wenchuangshej.png")+")"
        }
      ]
    };
  },
  computed: {
    currentPage() {
      let currentPageTmp = this.currentIndex + 1;
      if (currentPageTmp < 10) {
        currentPageTmp = "0" + currentPageTmp;
      }
      return currentPageTmp;
    },
    totalPage() {
      let totalPageTmp = this.displayPictureList.length;
      if (totalPageTmp < 10) {
        totalPageTmp = "0" + totalPageTmp;
      }
      return totalPageTmp;
    }
  },
  created() {
    this.initBanner;
  },
  mounted() {
    document.getElementById("topPart").style.backgroundImage = this.displayPictureList[0].staticUrl;
    this.currentDisplay = require("../../assets/img/banner.png");
  },
  methods: {
    initBanner() {
      getBanner()
        .then(result => {
          // this.displayPictureList=result
        })
        .catch();
    },
    // 翻页动作 action为true往后翻，否则往前翻
    changePicture(action) {
      if (action) {
        this.currentIndex =
          this.currentIndex + 1 === this.displayPictureList.length
            ? 0
            : this.currentIndex + 1;
      } else {
        this.currentIndex =
          this.currentIndex - 1 === -1
            ? this.displayPictureList.length - 1
            : this.currentIndex - 1;
        
      }
      this.currentDisplay = this.displayPictureList[this.currentIndex].url;
      document.getElementById("topPart").style.backgroundImage = this.displayPictureList[this.currentIndex].staticUrl;
    }
  }
};
</script>

<style scoped>
.top-part {
  background-image: url("../../assets/img/banner.png");
  background-size: 100% 100%;
  width: 100%;
  height: 969px;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  position: relative;
}
.title {
  width: 894px;
  height: 300px;
  background: rgba(10, 10, 10, 0.1);
}
.title-content {
  /* margin-top: 38px; */
  height: 225px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.title-item-one {
  height: 90px;
  font-size: 60px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  line-height: 70px;
  letter-spacing: 13px;
}
.title-item-two {
  height: 45px;
  font-size: 30px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 35px;
  letter-spacing: 9px;
}
.rotation {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 405px;
  height: 100px;
  background: #ffffff;
  bottom: 0px;
  left: 236px;
}
.click-area {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 231px;
  height: 100%;
}
.pre-picture {
  background-image: url("../../assets/img/icon_left.png");
  background-size: 100% 100%;
  background-color: #ffffff;
  width: 24px;
  height: 24px;
  border: 0px;
}
.next-picture {
  background-image: url("../../assets/img/icon_right.png");
  background-size: 100% 100%;
  background-color: #ffffff;
  width: 24px;
  height: 24px;
  border: 0px;
}
.pageinfo {
}
.current-page {
  font-size: 24px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
}
.total-page {
  font-size: 14px;
  color: #231914;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
}
.display-area {
  width: 174px;
  height: 100px;
  opacity: 1;
  box-sizing: border-box;
  border: 4px solid #ffffff;
}
.bottom-part {
  width: 100%;
  height: 274px;
  display: flex;
  align-items: center;
}
.high-light {
  color: #c8000a;
  font-weight: bold;
}
.first-part {
  margin-left: 236px;
  padding-top: 13px;
  width: 484px;
  height: 132px;
  font-size: 44px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #231914;
  line-height: 66px;
  text-align: center;
  vertical-align: middle;
}
.second-part {
  margin-left: 78px;
  width: 396px;
  height: 172px;
  font-size: 24px;
  line-height: 28px;
  color: #231914;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.second-part-item {
  height: 36px;
  line-height: 36px;
}
.third-part {
  width: 1px;
  height: 172px;
  background: #cacaca;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
</style>