<template>
  <div class="box">
    <div class="left-box">
      <div class="grid1" :style="setBackgroundImage(backgroundImg[0])">
        <div class="shadow message info1">
          <div class="info-title">
            <li />
            <div class="title-text">{{ column_introduce[0].name }}</div>
          </div>
          <div>
            <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[0]"
              :key="index"
            >
              <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                <li />
                <div class="list-info" @click="routerPage(routerTo, item)">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="centre-box">
      <div class="grid2" :style="setBackgroundImage(backgroundImg[1])">
        <div class="shadow message info2">
          <div class="info-title">
            <li />
            <div class="title-text">{{ column_introduce[1].name }}</div>
          </div>
          <div>
            <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[1]"
              :key="index"
            >
              <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                <li />
                <div class="list-info" @click="routerPage(routerTo, item)">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-group">
        <div
          class="grid3 right-margin"
          :style="setBackgroundImage(backgroundImg[2])"
        >
          <div class="shadow message info3">
            <div class="info-title">
              <li />
              <div class="title-text">{{ column_introduce[2].name }}</div>
            </div>
            <div>
              <div
                class="message-list"
                v-for="(item, index) in childcontentTitle[2]"
                :key="index"
              >
                <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                  <li />
                  <div class="list-info" @click="routerPage(routerTo, item)">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="grid3 left-margin"
          :style="setBackgroundImage(backgroundImg[3])"
        >
          <div class="shadow message info3">
            <div class="info-title">
              <li />
              <div class="title-text">{{ column_introduce[3].name }}</div>
            </div>
            <div>
              <div
                class="message-list"
                v-for="(item, index) in childcontentTitle[3]"
                :key="index"
              >
                <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                  <li />
                  <div class="list-info" @click="routerPage(routerTo, item)">
                    {{ item.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div
        class="grid4 bottom-margin"
        :style="setBackgroundImage(backgroundImg[4])"
      >
        <div class="shadow message info4">
          <div class="info-title">
            <li />
            <div class="title-text">{{ column_introduce[4].name }}</div>
          </div>
          <div>
            <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[4]"
              :key="index"
            >
              <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                <li />
                <div class="list-info" @click="routerPage(routerTo, item)">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid4 bottom-margin top-margin"
        :style="setBackgroundImage(backgroundImg[5])"
      >
        <div class="shadow message info4">
          <div class="info-title">
            <li />
            <div class="title-text">{{ column_introduce[5].name }}</div>
          </div>
          <div>
            <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[5]"
              :key="index"
            >
              <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                <li />
                <div class="list-info" @click="routerPage(routerTo, item)">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid4 top-margin"
        :style="setBackgroundImage(backgroundImg[6])"
      >
        <div class="shadow message info4">
          <div class="info-title">
            <li />
            <div class="title-text">{{ column_introduce[6].name }}</div>
          </div>
          <div>
            <div
              class="message-list"
              v-for="(item, index) in childcontentTitle[6]"
              :key="index"
            >
              <div :class="[index % 2 === 0 ? 'list1' : 'list2']">
                <li />
                <div class="list-info" @click="routerPage(routerTo, item)">
                  {{ item.title }}
                </div>
              </div>
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
      column_introduce: [],
      childcontentTitle: [],
      routerTo: "peakBusiness",
      backgroundImg: [],
      baseUrl:'http://ceshi.davost.com/',

    };
  },
  watch: {
    $route: {
      handler() {
        this.firstone();
      },
      deep: true,
    },
  },
  mounted() {
    this.getIndexData2();
  },
  methods: {
    async getIndexData2() {
      let { data } = await firstone();
      this.column_introduce = data.data.column_introduce;
      this.backgroundImg = _.map(this.column_introduce, "original_image");
      this.initData();
    },
    initData() {
      let temp = [];
      for (let i = 0; i < 7; ++i) {
        temp = [];
        for (let j = 0; j < this.column_introduce[i].childcontent.length; ++j) {
          /*temp.push(this.column_introduce[i].childcontent[j].title);*/
          temp.push(this.column_introduce[i].childcontent[j]);
        }
        this.childcontentTitle.push(temp);
      }
    },
    routerPage(path, item) {
      console.log("path是"+path+"id是"+item);
      let id = item.id;
      this.$router.push(`/${path}/${id}`);
    },
  },
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
  width: 26.4%;
  display: flex;
  flex-direction: column;
}

.left-box .grid1 {
  display: flex;
  height: 806px;
}
.centre-box {
  display: flex;
  flex-direction: column;
  margin: 0 8px 0 8px;
}

.centre-box .grid2 {
  display: flex;
  width: 904px;
  height: 398px;
}
.centre-box .grid-group {
  display: flex;
  flex-direction: row;
}
.centre-box .grid-group .grid3 {
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
  display: flex;
  width: 500px;
  height: 263px;
}
.grid1 .info1 {
  display: flex;
  flex-direction: column;
  height: 112px;
  padding-left: 50px;
}
.message .info-title {
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
  flex-direction: column;
  height: 112px;
  padding-left: 50px;
  /* font-size: 32px; */
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  /* line-height: 38px; */
}
.grid3 .info3 {
  display: flex;
  flex-direction: column;
  height: 112px;
  padding-left: 50px;
  /* font-size: 32px; */
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  /* line-height: 38px; */
}
.grid4 .info4 {
  display: flex;
  flex-direction: column;
  height: 112px;
  padding-left: 50px;
  /* font-size: 32px; */
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  /* line-height: 38px; */
}
.message li::marker {
  font-size: 24px;
  content: "⯁";
}
.title-text {
  margin-left: 16px;
}
.message-list {
  display: none;
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
.list-info:hover{
  color: red;
}
.message-list .list1 {
  clear: both;
  float: left;
  width: 164px;
  display: flex;
  flex-direction: row;
  font-size: 16px !important;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 19px !important;
}
.message-list .list2 {
  float: left;
  display: flex;
  text-align: left;
  flex-direction: row;
  font-size: 16px !important;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 19px !important;
}
.grid1:hover .info1 {
  /* transition: all 0.2s linear; */
  height: 276px;
}
.grid1:hover .message-list {
  display: inline;
}
.grid1:hover .info1 .info-title li::marker {
  color: red;
}

.grid2:hover .info2 {
  /* transition: all 0.1s linear; */
  height: auto;
  padding-bottom: 32px;
}
.grid2:hover .message-list {
  display: inline;
}
.grid2:hover .info2 .info-title li::marker {
  color: red;
}

.grid3:hover .info3 {
  /* transition: all 0.1s linear; */
  height: auto;
  padding-bottom: 32px;
}
.grid3:hover .message-list {
  display: inline;
}
.grid3:hover .info3 .info-title li::marker {
  color: red;
}

.grid4:hover .info4 {
  /* transition: all 0.1s linear; */
  height: auto;
  padding-bottom: 32px;
}
.grid4:hover .message-list {
  display: inline;
}
.grid4:hover .info4 .info-title li::marker {
  color: red;
}
</style>