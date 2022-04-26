<template>
  <!-- 巅峰团队尝试版区块 -->
  <div class="total-wrapper">
    <div class="top-wrapper">
      <div class="top-wrapper-title">
        <div class="top-title">巅峰团队</div>
        <div class="title-translate">TOP TEAM</div>
        <div class="top-title-item"></div>
      </div>
      <ul class="current-place">
        <li class="current-first-item"></li>
        <li class="current-second-item"></li>
        <li>走进巅峰</li>
        <li class="current-third-item"></li>
        <li class="current-place-child">巅峰团队</li>
      </ul>
    </div>
    <div class="main-info-wrapper">
      <ul class="main-info-nav">
        <li>管理团队</li>
        <li class="nav-middle-item">专家团队</li>
        <li>技术团队</li>
      </ul>
      <div class="team-introduction-part">
        <div class="intr-partone">
          <div class="partone-first-child">图片</div>
           <div class="partone-inner">
            <div class="inner-information">
            <span>刘峰</span>
            <span class="inner-information-item">创始人</span>
            </div>
           <div class="inner-introduce">中国旅游规划少壮派领军人物，60多个省市旅游发展高级顾问，多所大学客座教授，多次获得国家奖项。</div>
          </div>
          </div>
        <div class="intr-parttwo">
          <div>束盈</div>
          <div>邸倩</div>
        </div>
        <div class="intr-partthree">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {};

</script>

<style scoped>
/* 设置巅峰团队的样式 */
.total-wrapper {
  width: 1920px;
  height: 3378px;
}
.top-wrapper {
  widows: 1920px;
  height: 700px;
  background-image: url("../../assets/img/Group 508.png");
  background-size: 100% 100%;
  width: 100%;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.top-wrapper-title {
  height: 126px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.top-title {
  width: 295px;
  height: 62px;
  font-size: 60px;
  font-family: Source Han Sans CN-Bold, Source Han Sans CN;
  font-weight: bold;
  color: #ffffff;
  line-height: 100%;
  letter-spacing: 13px;
}
.title-translate {
  width: 124px;
  height: 32px;
  font-size: 20px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 300;
  color: #ffffff;
  line-height: 32px;
  letter-spacing: 2px;
  margin-bottom: 2px;
}
.top-title-item {
  width: 80px;
  height: 4px;
  background: #ffffff;
}
/* 左下角底部的显示 */
.current-place {
  width: 232px;
  height: 25px;
  list-style: none;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 236px;
  bottom: 30px;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  /* line-height: 19px; */
}
.current-first-item{
  height: 30px;
  width: 30px;
  background-image: url("../../assets/img/路径84.png");
  background-size: 90% 93%;
  background-color: transparent;
}
.current-second-item, .current-third-item{
  height: 20px;
  background-image: url("../../assets/img/路径83.png");
  background-position: 0px 1px;
  background-size: 100% 100%;
  background-color: transparent;
  width: 16px;
  height: 16px;
  border: 0px;
  line-height:25px;
}
.current-place-child{
  color: #ffffff
}

.main-info-wrapper{
  width: 1920px;
height: 3999px;
background: #F4F4F4;
}
/* 团队人员介绍块 */
.main-info-nav{
  list-style: none;
  height: 154px;
  width: 1920px;
  display: flex;
  flex-direction: row;
  align-items:center;
  align-content: space-between;
  padding-left: 236px;
  padding-right: 1094px;
}
.main-info-nav li{
  width: 170px;
  height: 54px;
  border: 1px solid #CACACA;
  text-align: center;
  line-height: 54px;
  font-size: 24px;
  font-family: Source Han Sans CN-Normal, Source Han Sans CN;
  font-weight: 400;
  color: #231914;
}
.nav-middle-item{
  margin: 0px 40px;
}

.intr-partone{
  width: 1368px;
  height: 446px;
  margin: 0px auto;
  padding: 40px 40px;
  display: flex;
  background-color: #ffffff;
}
.partone-first-child{
  width: 364px;
  height: 446px;
  background-color: yellow;
}
.partone-inner{
  width: 870px;
  height:190px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
  padding-top: 68px;
  padding-left: 60px;
}
.inner-information{
  width: 180px;
  height: 38px;
  font-size: 42px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #231914;
  line-height: 37px;
}
.inner-information-item{
  display: inline-block;
  margin-left: 20px;
  width: 72px;
  height: 37px;
  font-size: 24px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #3C3C3C;
  line-height: 37px;
}
.inner-introduce{
  width: 868px;
 height: 103px;
 font-size: 24px;
 font-family: Source Han Sans CN-Normal, Source Han Sans CN;
 font-weight: 400;
 color: #6E6E6E;
 line-height: 44px;
 display: flex;
 flex-direction: row;
 align-content: space-between;
}

.intr-parttwo{
  width: 1448px;
  height: 366px;
  margin-top: 20px;
  background-color: #ffffff;
  margin: 20px auto;


}

</style>