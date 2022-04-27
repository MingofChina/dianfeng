<template>
  <div>
    <div class="top-background">
      <div class="top-title">产业联盟</div>
      <div class="top-desc">TOP TALENT</div>
      <div class="top-divide"></div>
      <img class="icon-home"  src = "../../assets/bei/icon_home.png"/>
      <img class="icon-jiantou1" src = "../../assets/bei/icon.png"/>
      <div class="link1">走进巅峰</div>
      <img class="icon-jiantou2" src = "../../assets/bei/icon.png"/>
      <div class="link2">产业联盟</div>
    </div>

    <div class="union-background-list" v-for="(item, i) in union">
      <div class="row1">
        <div class="row1-divide">

        </div>
        <div class="row1-title">
          {{item.title}}
        </div>
        <div class="row1-link-more" v-if="item.linkurl">
        </div>
      </div>
      <div class="row2-desc">
        {{item.small_descrip}}
      </div>
      <div class="row3-img-list" >
        <div class="row3-img-item" v-for="(itemImg,j) in item.original_image">
          <img class="row3-img-item-img"
              :src="itemImg.original_image" />
        </div>
      </div>
    </div>


  </div>

</template>

<script>
export default {
  components: {},

  data() {
    return {
      "unionLength":0,
      "union": [
        {
          "id": "1",
          "title": "乡村振兴产业联合发展平台",
          "small_descrip": "新华网、巅峰智业与旅豆学堂积极响应国家乡村振兴发展战略，推动乡村振兴之产业振兴，于2021年5月27日第七届中国文旅产业巅峰大会上，共同倡议发起乡村振兴产业联合发展平台。聚合致力乡村振兴事业的全行业力量，凝聚优质资源，助力构建乡村振兴全产业链，打造具有落地性和影响力的共享、共赢的交流服务平台。乡村振兴产业联合发展平台集合行业专家，汇集政府、资本和乡村相关产业各方资源，建立信息对接平台，实现资源全面整合，并为平台成员提供一站式乡村振兴落地服务，包含顶层规划、产品产业资源导入、建设落地与运营、乡村品牌打造、乡村人才培训等。",
          "linkurl": "132",
          "original_image": [
            {
              "id": "1",
              "status": "1",
              "sort_order": "10",
              "cate_id": "1",
              "title": "乡村振兴 第一张图",
              "original_image": "/uploads/20220419/5805689e2a22e303a5920323ad2a4c21.png"
            }
          ],
          "document": [
            {
              "id": "6417",
              "title": "巅峰案例1",
              "summary": "这是测试哒",
              "addtime": "2022-04-08",
              "business_ids": "37",
              "route": "exampledetail"
            },
            {
              "id": "6418",
              "title": "再折桂冠！巅峰智业上榜2022年度杰出雇主奖 ",
              "summary": "2021年9月，前程无忧发起的2022人力资源管理杰出奖以“张弛有度 竞合共赢”为主题再度启航，在近日揭晓的榜单中，巅峰智业荣获2022“人力资源管理杰出奖”之“杰出雇主”殊荣，展现了巅峰智业在战略调整、人才吸引、发展、激励、保留、关怀等方面的杰出表现。\r\n\r\n",
              "addtime": "2022-02-18",
              "business_ids": "45",
              "route": "Storydetail"
            }
          ]
        },
        {
          "id": "2",
          "title": "文旅好IP",
          "small_descrip": "这是描述",
          "linkurl": null,
          "original_image": [
            {
              "id": "5",
              "status": "1",
              "sort_order": "0",
              "cate_id": "2",
              "title": "文旅好IP 第一张图",
              "original_image": "/uploads/20220419/b1a9d7bb16708d65f270eb4ebdd8812f.png"
            }
          ],
          "document": [
            {
              "id": "6415",
              "title": "官方推荐 | 10条冰雪精品线路、196个冰雪旅游景区等你来！",
              "summary": "随着冰雪运动的普及，越来越多的年轻人喜欢上了滑雪。从计划在冬奥会时建立“带动3亿人参加冰雪运动”的目标，到迎接即将到来的冬奥会时，“冷”冰雪已逐渐成为一种“热”时尚。",
              "addtime": "2022-01-28",
              "business_ids": "45",
              "route": "Storydetail"
            }
          ]
        },
        {
          "id": "3",
          "title": "中国文旅夜游经济联盟",
          "small_descrip": "中国文旅夜游经济联盟（以下简称“联盟”），是北京巅峰智业旅游文化创意股份有限公司发起，由北京巅峰智业文化创意股份有限公司和焦作中旅银行股份有限公司联合牵头，由国内的文旅夜游创意科技板块、灯光照明产业链、文旅金融资本机构、政府平台集团、演出剧场和空间、演艺经纪机构等文化和旅游业相关企业及个人等自愿结成的全国性、行业性的非社会团体组织，是文旅夜游经营产品一站式综合服务平台。旨在推动中国文旅夜游经济板块实现快速开发，提升运营服务水平，打造爆款经营产品，实现提质增效和产业蓬勃发展。\r\n\r\n联盟将遵循“资源共享，互惠互利，优势互补，联合发展”的宗旨，秉承“顺应中国文旅夜游经济市场的供需发展，整合领域中的权威精英与机构，构建市场体系与资源高效对接的大型专业文旅夜游经济平台，推动中国文旅夜游经济板块实现快速开发，提升运营服务水平，打造爆款经营产品，实现提质增效和产业蓬勃发展”的使命，与您们一起共同推进中国文旅夜游经济板块实现快速发展！\r\n\r\n首批29家成员还包括北京中视巅峰光影科技有限公司、北京巅峰光华科技发展有限公司、江苏创一佳照明股份有限公司、深圳市文业照明实业有限公司、汉合天辰（厦门）科技有限公司、南京夫子庙文化旅游集团有限公司、华谊启明东方暖文化发展有限责任公司、清华大学美术学院艺术设计系等。",
          "linkurl": null,
          "original_image": [
            {
              "id": "6",
              "status": "1",
              "sort_order": "0",
              "cate_id": "3",
              "title": "中国文旅夜游-第一张图",
              "original_image": "/uploads/20220419/9f51ccec0a494be0ccd8780a7bec26a7.png"
            }
          ],
          "document": []
        }
      ]
    }
  },
  methods:{

  },
  created(){
    this.unionLength = this.union.length;
  }


};

</script>

<style scoped>
html,body{
  width: 100%;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
.top-background{
  background-image: url("../../assets/bei/Group 507.png");
  width: 1920px;
  height: 700px;
  /*background-size: 100% 100%;*/

}
.top-title{
  position: absolute;
  top: 287px;
  left: 813px;
  width: 500px;
  height: 62px;
  font-size: 60px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 32px;
  letter-spacing: 14px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.top-desc{
  position: absolute;
  top: 361px;
  left: 885px;
  width: 300px;
  height: 32px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 32px;
  letter-spacing: 4px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.top-divide{
  position: absolute;
  top: 409px;
  left: 920px;
  width: 80px;
  height: 4px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.icon-home{
  position: absolute;
  top: 649px;
  left: 236px;
  width: 24px;
  height: 24px;
  opacity: 1;
  box-sizing: border-box;
}
.icon-jiantou1{
  position: absolute;
  top: 651px;
  left: 272px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.icon-jiantou2{
  position: absolute;
  top: 651px;
  left: 376px;
  width: 16px;
  height: 16px;
  opacity: 1;
}
.link1{
  position: absolute;
  top: 646px;
  left: 300px;
  width: 64px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  /*  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
}
.link2{
  position: absolute;
  top: 646px;
  left: 404px;
  width: 64px;
  height: 24px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 24px;
  /* -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;*/
}
.union-background-list:nth-child(2n){
  position: relative;
  width: 1919px;
  height: 1034px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.union-background-list:nth-child(2n+1){
  position: relative;
  width: 1920px;
  height: 1034px;
  background: #F4F4F4;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.row1{
  display: flex;
  flex-direction: row;
}
.row1-divide{
  position: absolute;
  top: 91px;
  left: 235px;
  width: 4px;
  height: 24px;
  background: #C8000A;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.row1-title{
  position: absolute;
  top: 77px;
  left: 247px;
  width: 408px;
  height: 51px;
  font-size: 34px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 40px;
  background-color: yellow;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.row1-link-more{
  position: absolute;
  top: 85px;
  right: 280px;
  background-image: url("../../assets/bei/Group 374.png");
  width: 140px;
  height: 36px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #6E6E6E;
  line-height: 28px;
  background-size: 100% 100%;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.row2-desc{
  position: absolute;
  top: 160px;
  left: 235px;
  width: 1448px;
  height: 132px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.row3-img-list{
  display: flex;
}
.row3-img-item{
  background-color: #808080;

}
.row3-img-item-img{
  
}
</style>