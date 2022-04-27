<template>
  <!-- 巅峰团队尝试版区块 -->
  <div class="team-detail-background">
    <img class="detail-img" src="team_detail.original_image" />
    <div class="detail-name">{{team_detail.name}}</div>
    <div class="detail-title">{{team_detail.title}}</div>
    <img class="detail-back" src="../../assets/story-detail/Group 397@2x.png"/>
    <img class="detail-divider" src="../../assets/mien/Rectangle 381@2x.png">
    <div class="detail-brief-title">个人简介</div>
    <div class="detail-summary" v-html="team_detail.summary"></div>
    <div class="detail-awards-title">获奖经历</div>
    <div class="detail-awards-list" v-html="team_detail.awards"></div>
    <div class="detail-projects-title">项目经验</div>
    <div class="detail-projects-title-little">参与项目</div>
    <div class="detail-projects-list" v-html="team_detail.projects"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        "team_detail": {
          "id": "34",
          "name": "刘锋",
          "title": "创始人",
          "summary": "<P>北京巅峰智业旅游文化创意股份有限公司创始人，华侨城旅游投资管理集团有限公司董事长。\r\n曾任国务院发展研究中心东方文化与城市发展研究所所长、研究员，清华大学博士后。兼任中国全联旅游业商会副会长、中国文旅夜游经济联盟会长、中国旅游协会旅游地学分会副会长、中国旅游景区协会教育专业委员会主任。\r\n中国旅游规划领军人物，2018、2019、2020中国文旅十大商业领袖。\r\n《中国旅游业“十二五”规划》专家组组长，《中华人民共和国旅游法》特邀起草专家，连续三届国家5A级景区景观质量评定组组长。\r\n担任60多个省地市政府旅游发展高级顾问，主持了百余项省地市旅游发展规划。\r\n发表各类论文200余篇，专著9部，编著20余部。多次获得国家奖项。\r\n</P>",
          "awards": "<UL>\r\n<LI>荣获中国发展奖特等奖</LI>\r\n<LI>2017年中国文旅十大商业领袖</LI>\r\n<LI>2018年中国文旅十大领袖</LI>\r\n<LI>2019中国文旅产业领袖人物</LI>\r\n<LI>2020年品牌中国贡献人物</LI>\r\n<LI>国家文旅部旅游规划优秀成果奖</LI>\r\n<LI>世界遗产龙虎山“荣誉山民”称号</LI>\r\n<LI>参编著作获得孙冶方经济科学奖等</LI></UL>",
          "projects": "<P>　　<STRONG><FONT size=3>参与项目</FONT></STRONG></P>\r\n<P>　　中国旅游业“十二五”发展规划研究</P>\r\n<P>　　丝绸之路和21世纪海上丝绸之路旅游合作发展战略规划</P>\r\n<P>　　贵州省山地全域旅游发展规划</P>\r\n<P>　　贵州省生态文化旅游发展规划</P>\r\n<P>　　海南全域旅游标准与指南</P>\r\n<P>　　福建省旅游总体规划</P>\r\n<P>　　广东省旅游发展规划</P>\r\n<P>　　江西省旅游发展总体规划</P>\r\n<P>　　中原历史文化旅游区总体规划</P>\r\n<P>　　大连市旅游发展总体规划</P>\r\n<P>　　广州市旅游业发展“十三五”规划</P>\r\n<P>　　三亚市乡村旅游规划</P>\r\n<P>　　遵义市旅游发展规划(修编)</P>\r\n<P>　　邵阳市旅游产业发展总规修编与邵阳市西部生态文化旅游图专项规划</P>\r\n<P>　　浙赣皖旅游区域合作模式研究报告</P>\r\n<P>　　杭州千岛湖自驾车旅游发展专项规划</P>\r\n<P>　　贵州省雷山县文化旅游产业创新区暨旅游目的地建设系列规划</P>\r\n<P>　　凤凰县旅游总体规划</P>\r\n<P>　　长春莲花山国家旅游度假区总体规划</P>\r\n<P>　　梦廊坊文化产业园总体策划</P>\r\n<P>　　延边州和龙市平岗绿洲现代农业发展总体规划</P>\r\n<P>　　福建省国际旅游目的地品牌建设</P>\r\n<P>　　……</P>\r\n<P>　　<STRONG><FONT size=3>参管景区</FONT></STRONG></P>\r\n<P>　　山西平遥古城</P>\r\n<P>　　云南昆明世界园艺博览</P>\r\n<P>　　河北秦皇岛山海关</P>\r\n<P>　　青海互助土族故土园景区</P>\r\n<P>　　河北邯郸广府古城</P>\r\n<P>　　天津盘山</P>\r\n<P>　　江苏句容茅山</P>\r\n<P>　　江西瑞金共和国摇篮景区</P>\r\n<P>　　云南大理大理古城</P>\r\n<P>　　甘肃天水麦积山</P>\r\n<P>　　四川广元剑门关</P>\r\n<P>　　湖南郴州东江湖</P>\r\n<P>　　福建清源山</P>\r\n<P>　　天津杨柳青古镇</P>\r\n<P>　　贵州龙宫景区</P>\r\n<P>　　重庆万盛黑山谷景区</P>\r\n<P>　　……</P>",
          "original_image": "/attachs/team/2017/0105/3falltnpa3kiii9.jpg"
        },
        "seo_message": {
          "meta_title": "旅游规划_旅游发展规划_巅峰智业_刘锋",
          "meta_keywords": "刘锋,旅游规划,旅游发展规划,景区规划,旅游规划专家",
          "meta_description": "公司汇聚了旅游经济、城市规划、建筑设计、市场营销、文化历史、资源环境等多个领域的专业人才，具备优秀的旅游规划设计能力、文化创意能力和景区运营管理能力。600余名旅游行业精英，一同为中国旅游投智。",
          "meta_author": "巅峰智业,davost.com",
          "meta_copyright": "巅峰智业 Copyright (C), All Rights Reserved."
        }
      }

  }
};

</script>

<style scoped>
/* 设置巅峰团队的样式 */
html,body{
  width: 100%;
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
.team-detail-background{
  width: 1920px;
  height: 2397px;
  background: #FFFFFF;
  border-radius: 0px 0px 0px 0px;
}
.detail-img{
  position: absolute;
  top: 211px;
  left: 237px;
  width: 398px;
  height: 488px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  background-color: #808080;
}
.detail-name{
  position: absolute;
  top: 211px;
  left: 741px;
  width: 84px;
  height: 37px;
  font-size: 42px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-title{
  position: absolute;
  top: 264px;
  left: 741px;
  width: 60px;
  height: 24px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 24px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-back{
  position: absolute;
  top: 211px;
  left: 1657px;
  width: 64px;
  height: 37px;
  font-size: 20px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 37px;
/*  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/

}
.detail-divider{
  position: absolute;
  top: 312px;
  left: 741px;
  width: 980px;
  height: 1px;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
}
.detail-brief-title{
  position: absolute;
  top: 345px;
  left: 741px;
  width: 80px;
  height: 37px;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-summary{
  position: absolute;
  top: 394px;
  left: 741px;
  width: 940px;

  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-awards-title{
  position: absolute;
  top: 699px;
  left: 741px;
  width: 80px;
  height: 37px;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-awards-list{
  position: absolute;
  top: 758px;
  left: 741px;
  height: 32px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  float: left;
  display: block;
}
.detail-awards-list li{
  height: 32px;
  font-size: 18px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
  display:inline-block

}
.detail-projects-title{
  position: absolute;
  top: 896px;
  left: 741px;
  width: 80px;
  height: 37px;
  font-size: 20px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-projects-title-little{
  position: absolute;
  top: 953px;
  left: 741px;
  width: 72px;
  height: 24px;
  font-size: 18px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #3C3C3C;
  line-height: 24px;
 /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
.detail-projects-list{
  position: absolute;
  top: 989px;
  left: 744px;

  height: 28px;
  font-size: 16px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 32px;
  /*-webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
</style>