<template>
  <div id="app"
       style="width: 100vw;
    overflow-x: hidden;">
    <div class="main">
      <div class="head">
        <img :src=getImgUrl(picture)
             alt="">
        <div class="con">
          <div class="name">{{name}}</div>
          <div class="mes">{{title}}</div>
        </div>

      </div>
      <div class="personal">个人简介</div>
      <div v-html="jianjie">

      </div>
      <div class="experience title"
           style="margin-top: 20px;"
           v-show="experienceInfo?true:false">获奖经历</div>
      <div class="listInfo"
           v-html="experienceInfo">
      </div>
      <div class="experience"
           v-html="experice"></div>
    </div>

  </div>
</template>
<script>

import { teaminfoh5 } from "@/api/api";


export default {
  data () {
    return {
      name: "",
      title: "",
      experice: "",
      experienceInfo: "",
      jianjie: "",
      picture: '',
      baseUrl: 'http://ceshi.davost.com',
    }
  },
  mounted () {

    this.getinfo(this.$route.query.name.id)
  },
  methods: {
    async getinfo (e) {
      let data = {
        id: e
      }
      const res = await teaminfoh5(data)
      console.log(res, 6666)
      if (res.data.code === 0) {
        this.picture = res.data.data.team_detail.original_image
        this.name = res.data.data.team_detail.name
        this.title = res.data.data.team_detail.title
        this.jianjie = res.data.data.team_detail.summary
        this.experienceInfo = res.data.data.team_detail.awards
        this.experice = res.data.data.team_detail.projects
      }
    },
    getImgUrl (imgUrl) {
      console.log(imgUrl, 'yyy');
      return this.baseUrl + imgUrl;
    },
  }















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
    .con {
      .name {
        margin-left: 1rem;
        font-size: 1.33rem;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 800;
        color: #231914;
        line-height: 1.56rem;
      }
      .mes {
        margin-top: 1rem;
        margin-left: 1rem;
        font-size: 1rem;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #231914;
        line-height: 1.56rem;
      }
    }
  }
  .personal {
    margin-bottom: 1rem;
    font-size: 1.17rem;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 800;
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
    margin-bottom: 1rem;
    font-size: 1.17rem;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 1.37rem;
  }
  .title {
    font-weight: 800;
  }
  .listInfo {
    margin-bottom: 1rem;
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
