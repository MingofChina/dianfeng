<template>
  <div id="app">
    <div class="six-background">
      <div class="six-top">
        <div class="six-top-nav">

          <div class="six-top-nav-item"
               :class="[index===0 && flagOnce === true ? 'first-hl': '']"
               :id="'wrapper'+item.id"
            v-for="(item, index) in branch_office"
            :key="index"
            @mouseenter="changeTab(item.id)">
            <div class="six-nav-item-name">
              <div :id="'icon'+item.id"
                   class="six-icon-left"
                   :class="[index===0 && flagOnce === true ? 'first-icon-hl': '']"
              >

              </div>
              <div :id="'text'+item.id"
                   class="six-little-wrapper"
                   :class="[index===0 && flagOnce === true ? 'first-title-hl': '']"
              >
                {{item.company_name}}
              </div>
              <div class="six-nsv-depart"></div>
            </div>
          </div>


        </div>



        <div class="six-item-info">
          <div class="six-item-info-title"> {{ showData ? showData.company_address : '--' }} </div>
          <div class="six-item-info-phone">
            <div class="phone-icon"></div>
            <div class="phone-tag">咨询电话：</div>
            <div class="phone-number"> {{ showData ? showData.company_phone : '--' }} </div>
          </div>
          <div class="six-item-info-email">
            <div class="email-icon"></div>
            <div class="email-tag">业务邮箱：</div>
            <div class="email-number"> {{ showData ? showData.company_email : '--' }} </div>
          </div>
<!--          <img class="info-image" :src=getImgUrl(showData.original_image) />-->
          <img class="info-image" :src=getImgUrl(showData.original_image)>


          <div class="zixun">
            <div class="zixun-link" @click="toZixun()">业务咨询</div>
          </div>
          <div class="join-us">
            <div class="join-us-link" @click="toJoinUs()">加入我们</div>
          </div>
        </div>
        <div class="send-message-title">在线留言</div>
        <div class="form-info">
          <form @submit.prevent="submit($event)" class="form-iteam">
            <div class="company-iteam-wrapper">
             <div class="company-iteam"></div>
             <input class="form-company" placeholder="请输入您的企业名称" v-model="formData.company" />
            </div>
            <div class="person-iteam-wrapper">
             <div class="person-iteam"></div>
             <input class="form-user" placeholder="请输入您的姓名" v-model="formData.name" />
            </div>
            <div class="cellphone-iteam-wrapper">
             <div class="cellphone-iteam"></div>
             <input class="form-phone" placeholder="请输入您的电话" v-model="formData.phone" />
            </div>
            <input class="form-submit"
                   type="submit"
                   value="确认提交"
                   @click="sendMessage()"
            />
          </form>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
import { firstone } from "@/api/api";
import { formsjie } from "@/api/api";
export default {
  data() {
    return {
      formData: {
        company: "",
        name: "",
        phone: ""
      },
      flagOnce:true,
      "currentData":{},
      /*branch_office: [],*/
      "branch_office": [
        {
          id: "1",
          company_name: "北京",
          company_address: "北京市 - 朝阳区三元桥左家庄1号国门大厦B座6F",
          company_phone: "400-8130-588",
          company_email: "contact@davost.com",
          original_image:
              "/uploads/20220419/7e09ad68fad1a89be9e1444441612ec4.png"
        },
        {
          id: "2",
          company_name: "上海",
          company_address: "上海市－闵行区申虹路666弄正荣中心6号楼602",
          company_phone: "400 8130 588",
          company_email: "contact@davost.com",
          original_image:
              "/uploads/20220419/f27776028141841e72f9c936ede13b32.png"
        },
        {
          id: "5",
          company_name: "深圳",
          company_address: "深圳市-福田区侨香路3085号 岭南大厦 9C-1",
          company_phone: "400 8130 588",
          company_email: "contact@davost.com",
          original_image:
              "/uploads/20220419/5b63fa43d322714ba8173157eafe755b.png"
        },
        {
          id: "3",
          company_name: "成都",
          company_address:
              "成都市 - 高新区府城大道505号仁和春天国际广场A座1610",
          company_phone: "400 8130 588",
          company_email: "contact@davost.com",
          original_image:
              "/uploads/20220419/466ef7022799d346ee67ae89b54ba699.png"
        },
        {
          id: "4",
          company_name: "西安",
          company_address:
              "陕西省西安市经济技术开发区凤城七路旭辉中心1幢1单元7层10704号",
          company_phone: "400 8130 588",
          company_email: "contact@davost.com",
          original_image:
              "/uploads/20220419/95e92812bdb565953b20bc34d50ab419.png"
        }
      ],
      lastTabId: '',
      redIcon:  "url("+require("./../../assets/img/icong_weizhi@2x.png")+")",
      whiteIcon: "url("+require("./../../assets/img/icong_weizhi(1).png")+")",
      activeBackgroundColor: '#f4f4f4',
      originBackgroundColor: 'NONE',
      activeTextColor: '#C8000A',
      originTextColor: '#FFFFFF',
      zixunUrl:"http://wt.zoosnet.net/LR/Chatpre.aspx?id=LRW27398692&lng=cn",
      joinUsUrl:"https://www.liepin.com/company/7884213",
      baseUrl:'http://ceshi.davost.com'
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
  mounted() {
    //this.getIndexSix();
    this.lastTabId = this.branch_office[0].id;
    console.log("mounted："+this.lastTabId);
    this.changeTab(this.lastTabId);

  },
  created() {
  },
  computed: {
    showData() {
      return this.branch_office.find(item => item.id === this.lastTabId);
    }
  },
  methods:{
    changeTab(id) {

      if (this.lastTabId === id) return;
      this.flagOnce = false;
      this.changeStyle(id);
      if(id !== this.lastTabId) {
        this.reverseStyle(this.lastTabId);
      }
      this.lastTabId = id;
    },
    changeStyle(id) {
      document.getElementById('wrapper'+id).style.background = this.activeBackgroundColor;
      document.getElementById('icon'+id).style.backgroundImage = this.redIcon;
      document.getElementById('text'+id).style.color = this.activeTextColor;
    },
    reverseStyle(id) {
      document.getElementById('wrapper'+id).style.background = this.originBackgroundColor;
      document.getElementById('icon'+id).style.backgroundImage = this.whiteIcon;
      document.getElementById('text'+id).style.color = this.originTextColor ;
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    async getIndexSix() {
      let {data} = await firstone();
      this.branch_office = data.data.branch_office;

      this.changeTab(this.lastTabId);
      /*this.changeStyle(this.lastTabId);
      this.reverseStyle(this.lastTabId)*/
    },

    async sendMessage() {
      if(this.formData.company === ''){
        alert("请输入企业名称");
        return ;
      }
      if(this.formData.name === ''){
        alert("请输入您的姓名");
        return ;
      }
      if(this.formData.phone === ''){
        alert("请输入您的电话");
        return ;
      }
      let { data } = await formsjie({company:this.formData.company,
        name:this.formData.name,
        phone:this.formData.phone});
      this.formData = {};
    },
    toZixun(){
      window.location.href = this.zixunUrl;
    },
    toJoinUs(){
      window.location.href = this.joinUsUrl;
    },

  },

};
</script>
<style scoped="scoped">
html,
body {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
.six-background {
  position: relative;
  width: 100%;
  height: 734px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background: #ffffff;
}
.six-top {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 76px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.six-top-nav {
  position: relative;
  /*left: 79px;*/
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  text-align: center;
  line-height: 76px;
}
.first-hl{
  background: #f4f4f4;
 /* background-image: url("../../assets/img/icong_weizhi@2x.png");
*/
}
.first-icon-hl{
  float: left;
  width: 23px;
  height: 28.8px;
  background: url("./../../assets/img/icong_weizhi@2x.png");
  background-blend-mode: lighten;
  background-size: contain;
  margin-left: 100px;
  margin-top: 24px;
}
.first-title-hl{
  color: #C8000A;
}
.six-icon-left {
  float: left;
  width: 23px;
  height: 28.8px;
  /*background: url("./../../assets/img/icong_weizhi(1).png");*/
  background-blend-mode: lighten;
  background-size: contain;
  margin-left: 100px;
  margin-top: 24px;
}
.six-little-wrapper {
  float: left;
  margin-left: 10px;
}
.six-nsv-depart {
  float: right;
  display: inline-block;
  width: 1px;
  height: 32px;
  background-color: #ffffff;
  margin-top: 22px;
}
.six-top-nav-item {
  overflow: hidden;
  width: 287px;
  height: 76px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  font-size: 28px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  /* background: rgba(0, 0, 0, 0.2); */
}
.six-top-nav-item:nth-child(-n + 4) {
  /* border-right: 1px solid #FFFFFF; */
}

.six-item-info {
  position: relative;
  left: 241px;
  width: 1435px;
  height: 400px;
  background: #f4f4f4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.six-item-info-title {
  position: absolute;
  top: 84px;
  left: 100px;
  width: 513px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #3c3c3c;
  line-height: 28px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.phone-tag {
  position: absolute;
  top: 148px;
  left: 124px;
  width: 90px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3c3c3c;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.phone-number {
  position: absolute;
  top: 148px;
  left: 222px;
  width: 150px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #3c3c3c;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.phone-icon{
  position: absolute;
  top: 152px;
  left: 105px;
  background-image: url("../../assets/img/icom_dianhua.png");
  width: 16px;
  height: 16px;
  background-size: 100% 100%;
}
.email-icon{
  position: absolute;
  top: 194px;
  left: 105px;
  background-image: url("../../assets/img/icom_youxiang.png");
  width: 16px;
  height: 16px;
  background-size: 100% 100%;
}
.email-tag {
  position: absolute;
  top: 191px;
  left: 124px;
  width: 90px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3c3c3c;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.email-number {
  position: absolute;
  top: 191px;
  left: 222px;
  width: 183px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #3c3c3c;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.zixun {
  position: absolute;
  top: 270px;
  left: 100px;
  width: 150px;
  height: 46px;
  background: #c8000a;
  opacity: 1;
}
.zixun-link {
  position: absolute;
  top: 10px;
  left: 39px;
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.join-us {
  position: absolute;
  top: 270px;
  left: 282px;
  width: 150px;
  height: 46px;
  opacity: 1;
  border: 1px solid #c8000a;
}
.join-us-link {
  position: absolute;
  top: 10px;
  left: 39px;
  width: 72px;
  height: 27px;
  font-size: 18px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #c8000a;
  line-height: 21px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.info-image {
  position: absolute;
  top: 40px;
  left: 798px;
  width: 616px;
  height: 320px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.send-message-title {
  position: absolute;
  top: 526px;
  left: 241px;
  width: 136px;
  height: 51px;
  font-size: 34px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 40px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.form-info {
  position: absolute;
  top: 600px;
  left: 241px;
  /* display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center; */
}
.form-iteam{
  width: 1438px;
  height: 54px;
  position: flex;
  flex-direction: row;
}
.form-iteam > div{
  width: 340px;
  height: 54px;
  display: inline-block;
  background-color: #f0f0f0;
  margin-right: 26px;
}
.form-company {
  width: 278px;
  height: 48px;
  background: #f0f0f0;
  opacity: 1;
  color: #a0a0a0;
  border: none;
  outline: none;
  position: relative;
  bottom:4px;
}
.company-iteam{
  width: 18px;
  height: 19px;
  background: url("./../../assets/bei/icon_qiye.png");
  background-size: 100% 100%;
  margin: 17px 16px 0px 16px;
  display: inline-block;
}
.form-user {
  /* margin-left: 26px; */
  width: 278px;
  height: 54px;
  background: #f0f0f0;
  opacity: 1;
  color: #a0a0a0;
  border: none;
  outline: none;
  position: relative;
  bottom:4px;
}
.person-iteam{
  width: 18px;
  height: 19px;
  background: url("./../../assets/bei/icon_xingming.png");
  background-size: 100% 100%;
  margin: 17px 16px 0px 16px;
  display: inline-block;
}
.form-phone {
  /* margin-left: 26px; */
  width: 278px;
  height: 54px;
  background: #f0f0f0;
  opacity: 1;
  color: #a0a0a0;
  border: none;
  outline: none;
  position: relative;
  bottom:4px;
}
.cellphone-iteam{
  width: 18px;
  height: 19px;
  background: url("./../../assets/bei/icon_dianhua.png");
  background-size: 100% 100%;
  margin: 17px 16px 0px 16px;
  display: inline-block;
}
.form-submit {
  /* margin-left: 26px; */
  width: 294px;
  height: 54px;
  background: #c8000a;
  opacity: 1;
  text-align: center;
  line-height: 54px;
  color: #ffffff;
  border: none;
  position: relative;
  bottom:4px;
}

</style>