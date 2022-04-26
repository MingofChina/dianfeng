<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <img src="../../assets/mines/Group 389@2x.png"/>
        <div class="lega-header-cont">
            <div>法律声明</div>
            <div>Legal notices</div>
            <div></div>
        </div>
        <div class="lega-header-foot">
            <img @click='homeFn()' src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div>法律声明</div>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <div class="lega-content-title">{{mesage}}</div>
            <div v-html="textHeml"></div>
            <!-- <div class="lineHeight">本网站内容、《旅游智业》杂志及我公司其他出版物除非书面授权或特别声明，均指由“北京巅峰智业旅游文化创意股份有限公司”独家所有，本网站内容、《旅游智业》杂志及我公司其他出版物，均与“北京巅峰智业旅游文化创意股份有限公司”属于同一主体。</div>
            <div class="content-div1">
                <div class="lineHeight content-div1-title">所有权及相关权包括</div>
                <div class="lineHeight">该网站包括：www.davost.com 、 www.aftrip.com以及《旅游智业》和其他域名的所有权、知识产权(包括但不仅限于著作权、专利权、商标权、署名权、商业秘密以及“北京巅峰智业旅游文化创意股份有限公司”所有智力成果的法人作品权)。除上述权利之外，任何与本网站和《旅游智业》信息和内容相关联的发布、及其它载体和表现形式的使用、署名、利用、传播、复制、发行、编辑、修改、处分等的权利。</div>
            </div> -->
        </div>
        
    </div>
  </div>
</template>
<script>
import { legislation } from "@/api/api";
export default {
  data() {
    return {
      mesage:'',
      textHeml:''
    };
  },
  computed: {
  },
  mounted() {
      this.legislationfn() //调用联系我们接口
  },
  methods: {
    homeFn(){
      this.$router.push("/index") ;
    },
    async legislationfn() {
      let { data } = await legislation();
      this.mesage = data.data.message.title
      this.textHeml = data.data.message.description
    //   this.description=data.data.message
    //   this.descriptionson=data.data.message.description
      console.log(data.data);
    },
  },
};
</script>

<style scoped>
#legalDeclaration{
    width: 100%;
    height: 100%;
    background: #F4F4F4;
}
.lega-header {
    width: 100%;
    position: relative;
}
.lega-header img {
    width: 100%;
}
.lega-header-foot div{
    margin-right: 1rem;
    line-height: 15px;
}
.lega-header-cont{
    position: absolute;
    top: 17.9375rem;
    left: 50.8125rem;
    z-index: 999;
    color: #FFFFFF;
    text-align: center;
}
.lega-header-cont div:nth-child(1){
    font-size: 3.75rem;
}
.lega-header-cont div:nth-child(2){
    font-size: 1.25rem;
    margin: .75rem 0 .625rem 0;
}
.lega-header-cont div:nth-child(3){
    width: 5rem;
    border-top: 3px solid #FFFFFF;
    margin-left: 5.1rem;
}
.lega-header-foot{
    position: absolute;
    bottom: 2.0625rem;
    left: 16.4375rem;
    color: #FFFFFF;
    display: flex;
}
.lega-header-foot img{
    width: 1rem;
    margin-right: 1.25rem;
    height: 1rem;
}
.lega-content{
    width: 90.5rem;
    margin:6.25rem auto 0;
    background: #FFFFFF;
    padding-bottom: 6.25rem;
}
.lega-content-div1{
    width: 80.5rem;
    margin: 0 auto;
}
.lega-content-title{
    width: 100%;
    text-align: center;
    padding-top: 3.75rem;
    font-weight: bold;
    font-size: 2.125rem;
    margin-bottom: 1.5rem;
}
.lineHeight{
    line-height: 1.8125rem;
}
.content-div1{
    margin-top: 2rem;
}
.content-div1-title{
    font-size: 1.5rem;
    font-weight: 500;
    border-left: 4px solid red;
    padding-left: .625rem;
    margin-bottom: 1rem;
}
</style>
