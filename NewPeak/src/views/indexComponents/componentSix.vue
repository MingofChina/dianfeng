<template>
  <div id="app">
    <div class="six-background">
      <div class="six-top">
        <div class="six-top-nav">
          <div class="six-top-nav-item" :id="'wrapper'+item.id"
            v-for="(item, index) in branch_office"
            :key="index"
            @mouseenter="changeTab(item.id)">
            <div class="six-nav-item-name">
              <div :id="'icon'+item.id" class="six-icon-left"></div>
              <div :id="'text'+item.id" class="six-little-wrapper">{{item.company_name}}</div>
              <div class="six-nsv-depart"></div>
            </div>
          </div>
        </div>
        <div class="six-item-info">
          <div class="six-item-info-title"> {{ showData ? showData.company_address : '--' }} </div>
          <div class="six-item-info-phone">
            <div class="phone-tag">咨询电话：</div>
            <div class="phone-number"> {{ showData ? showData.company_phone : '--' }} </div>
          </div>
          <div class="six-item-info-email">
            <div class="email-tag">业务邮箱：</div>
            <div class="email-number"> {{ showData ? showData.company_email : '--' }} </div>
          </div>
          <img class="info-image" :src="showData ? showData.original_image : '' ">
          <div class="zixun">
            <div class="zixun-link">业务咨询</div>
          </div>
          <div class="join-us">
            <div class="join-us-link">加入我们</div>
          </div>
        </div>
        <div class="send-message-title">在线留言</div>
        <div class="form-info">
          <form @submit.prevent="submit($event)">
            <input class="form-company" placeholder="请输入您的企业名称" v-model="formData.company" />
            />
            <input class="form-user" placeholder="请输入您的姓名" v-model="formData.name" />
            />
            <input class="form-phone" placeholder="请输入您电话" v-model="formData.phone" />
            />
            <input class="form-submit" type="submit" value="确认提交" />
          </form>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        company: "",
        name: "",
        phone: ""
      },
      branch_office: [
        {
          id: "1",
          company_name: "北京",
          company_address: "北京市 - 朝阳区三元桥左家庄1号国门大厦B座6F",
          company_phone: "400-8130-588",
          company_email: "contact@davost.com",
          original_image:
            require("../../assets/bei/epcjianshe.png")
        },
        {
          id: "2",
          company_name: "上海",
          company_address: "上海市－闵行区申虹路666弄正荣中心6号楼602",
          company_phone: "400 8130 588",
          company_email: "contact@davost.com",
          original_image:
            require("../../assets/img/guihuasheji.png")
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
      originTextColor: '#FFFFFF'
    };
  },
  mounted() {
    this.lastTabId = this.branch_office[0].id;
    this.changeStyle(this.lastTabId);
  },
  computed: {
    showData() {
      return this.branch_office.find(item => item.id === this.lastTabId);
    }
  },
  methods:{
    submit(){
      axios.get('http://mockjs.xiaoyaoji.cn/mock/1nTCRdWBuu9/api/Index/Form_Action',
          this.formData).then(res => {
        // success callback
        console.log(res);
      }).catch(err => {
        // error callback
        console.log(err);
      });
    },
    changeTab(id) {
      if (this.lastTabId === id) return;
      this.changeStyle(id);
      this.reverseStyle(this.lastTabId);
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
* {
  margin: 0;
  padding: 0;
}
.six-background {
  position: relative;
  width: 1920px;
  height: 734px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background: #ffffff;
}
.six-top {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1920px;
  height: 76px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.six-top-nav {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  text-align: center;
  line-height: 76px;
}
.six-icon-left {
  float: left;
  width: 23px;
  height: 28.8px;
  background: url("./../../assets/img/icong_weizhi(1).png");
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
  position: absolute;
  left: 241px;
  width: 1438px;
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
  display: flex;
  justify-content: center;
}
.form-company {
  width: 340px;
  height: 54px;
  background: #f0f0f0;
  opacity: 1;
  color: #a0a0a0;
}
.form-user {
  margin-left: 26px;
  width: 340px;
  height: 54px;
  background: #f0f0f0;
  opacity: 1;
  color: #a0a0a0;
}
.form-phone {
  margin-left: 26px;
  width: 340px;
  height: 54px;
  background: #f0f0f0;
  opacity: 1;
  color: #a0a0a0;
}
.form-submit {
  margin-left: 26px;
  width: 340px;
  height: 54px;
  background: #c8000a;
  opacity: 1;
  text-align: center;
  line-height: 54px;
  color: #ffffff;
}
</style>