<template>
  <div class="box">
    <div class="left-box">
      <div class="grid1" :style="setBackgroundImage(backgroundImg.grid1)">
        <div class="shadow message info1">
          <div class="info-title1">
            <li />
            <div class="title-text">{{column_introduce[0].name}}</div>
          </div>
          <div>
            <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[0]"
              :key="index"
            >
              <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                <li />
                <div class="list-info">{{ item }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="centre-box">
      <div class="grid2" :style="setBackgroundImage(backgroundImg.grid2)">
        <div class="shadow message info2">


          <li />
          <div class="title-text">{{column_introduce[1].name}}</div>
        </div>



        <div>
          <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[1]"
              :key="index"
          >
            <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
              <li />
              <div class="list-info">{{ item }}</div>
            </div>
          </div>
        </div>






      </div>
      <div class="grid-group">
        <div
          class="grid3 right-margin"
          :style="setBackgroundImage(backgroundImg.grid3[0])"
        >
          <div class="shadow message info3">
            <li />
            <div class="title-text">{{column_introduce[2].name}}</div>
          </div>


          <div>
            <div
                class="message-list"
                v-for="(item, index) in childcontentTitle[2]"
                :key="index"
            >
              <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                <li />
                <div class="list-info">{{ item }}</div>
              </div>
            </div>
          </div>






        </div>
        <div
          class="grid3 left-margin"
          :style="setBackgroundImage(backgroundImg.grid3[1])"
        >
          <div class="shadow message info3">
            <li />
            <div class="title-text">{{column_introduce[3].name}}</div>
          </div>


          <div>
            <div
                class="message-list"
                v-for="(item, index) in childcontentTitle[3]"
                :key="index"
            >
              <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                <li />
                <div class="list-info">{{ item }}</div>
              </div>
            </div>
          </div>





        </div>
      </div>
    </div>
    <div class="right-box">
      <div
        class="grid4 bottom-margin"
        :style="setBackgroundImage(backgroundImg.grid4[0])"
      >
        <div class="shadow message info4">
          <li />
          <div class="title-text">{{column_introduce[4].name}}</div>
        </div>


        <div>
          <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[4]"
              :key="index"
          >
            <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
              <li />
              <div class="list-info">{{ item }}</div>
            </div>
          </div>
        </div>



      </div>
      <div
        class="grid4 bottom-margin top-margin"
        :style="setBackgroundImage(backgroundImg.grid4[1])"
      >
        <div class="shadow message info4">
          <li />
          <div class="title-text">{{column_introduce[5].name}}</div>
        </div>



        <div>
          <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[5]"
              :key="index"
          >
            <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
              <li />
              <div class="list-info">{{ item }}</div>
            </div>
          </div>
        </div>


      </div>
      <div
        class="grid4 top-margin"
        :style="setBackgroundImage(backgroundImg.grid4[2])"
      >
        <div class="shadow message info4">
          <li />
          <div class="title-text">{{column_introduce[6].name}}</div>
        </div>



        <div>
          <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[6]"
              :key="index"
          >
            <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
              <li />
              <div class="list-info">{{ item }}</div>
            </div>
          </div>
        </div>





      </div>
    </div>
  </div>
</template>

<script>
import { commonMixin } from "../../components/mixin/all.mixin";
import { firstone } from "@/api/api";
export default {
  mixins: [commonMixin],
  data() {
    return {
      column_introduce:[],
      childcontentTitle:[],

      backgroundImg: {
        grid1: require("../../assets/img/guihuasheji.png"),
        grid2: require("../../assets/img/pingpaiyingxiao.png"),
        grid3: [
          require("../../assets/img/wenchuangshej.png"),
          require("../../assets/img/wenlvjiaoyu.png"),
        ],
        grid4: [
          require("../../assets/img/yunyimgzhaoshang.png"),
          require("../../assets/img/epcjianshe.png"),
          require("../../assets/img/guangyingyeyou.png"),
        ],
      },
      baseUrl:'http://ceshi.davost.com',
    };
  },
  watch:{
    $route: {
      handler() {
        this.firstone();
      },
      deep: true,
    }
  },
  methods: {
    getImgUrl(imgUrl) {
      return this.baseUrl + imgUrl;
    },
    async getIndexData2() {
      let {data} = await firstone();
      this.column_introduce = data.data.column_introduce;
      this.initData();
    },
    initData(){
      let temp = [];
      for(let i =0;i<7;++i){
        temp = [];
        for(let j =0;j<this.column_introduce[i].childcontent.length;++j) {
          temp.push(this.column_introduce[i].childcontent[j].title);
        }
        this.childcontentTitle.push(temp);
      }
    }
  },
  mounted() {
    this.getIndexData2();
  }
};
</script>

<style scoped>
.top-margin {
  margin-top: 4px;
}
.left-margin {
  margin-left: 4px;
}
.bottom-margin {
  margin-bottom: 4px;
}
.right-margin {
  margin-right: 4px;
}
.shadow {
  background: rgba(0, 0, 0, 0.5);
  opacity: 1;
}
.message {
  align-self: flex-end;
  width: 100%;
}
.box {
  display: flex;
  flex-direction: row;
}
.left-box {
  display: flex;
  flex-direction: column;
}

.left-box .grid1 {
  display: flex;
  width: 500px;
  height: 806px;
}
.centre-box {
  display: flex;
  flex-direction: column;
  margin: 0 8px 0 8px;
}

.centre-box .grid2 {
  background: blue;
  display: flex;
  width: 904px;
  height: 398px;
}
.centre-box .grid-group {
  display: flex;
  flex-direction: row;
}
.centre-box .grid-group .grid3 {
  background: yellow;
  display: flex;
  width: 448px;
  height: 400px;
  margin-top: 8px;
}
.right-box {
  display: flex;
  flex-direction: column;
}
.right-box .grid4 {
  background: green;
  display: flex;
  width: 500px;
  height: 263px;
}
.grid1 .info1 {
  display: flex;
  flex-direction: column;
  height: 276px;
  padding-left: 50px;
}
.info1 .info-title1 {
  display: flex;
  margin-top: 32px;
  margin-bottom: 12px;
  flex-direction: row;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  line-height: 38px;
}
.grid2 .info2 {
  display: flex;
  align-items: center;
  height: 112px;
  padding-left: 50px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  line-height: 38px;
}
.grid3 .info3 {
  display: flex;
  align-items: center;
  height: 112px;
  padding-left: 50px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  line-height: 38px;
}
.grid4 .info4 {
  display: flex;
  align-items: center;
  height: 112px;
  padding-left: 50px;
  font-size: 32px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  line-height: 38px;
}
.message li::marker {
  font-size: 24px;
  content: "⯁";
}
.info1 .info-title1 li::marker {
  color: red;
}
.title-text {
  margin-left: 16px;
}
.message-list {
  margin-left: 34px;
}
.message-list li::marker {
  font-size: 24px;
  content: "-";
}
.message-list .list-info {
  margin-left: 8px;
  margin-bottom: 8px;
}
.message-list .list1 {
  clear: both;
  float: left;
  width: 164px;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 19px;
}
.message-list .list2 {
  float: left;
  display: flex;
  text-align: left;
  flex-direction: row;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 19px;
}
</style>