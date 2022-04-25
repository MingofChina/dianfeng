<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <div class="lega-header-foot">
            <img src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div>巅峰观点</div>
            <img src="../../assets/search-img/icon@2x.png">
            <div>详情</div>
            
        </div>
        <div class="lega-header-foot1">
            <img src="../../assets/story-detail/Group 397@2x.png"/>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <el-row >
                <el-col :span="18">
                    <div class="content-title">1</div>
                    <div>
                        <el-col :span="20">1</el-col>
                        <el-col :span="4">3</el-col>
                    </div>
                </el-col>
                <el-col :span="6">333</el-col>
            </el-row>
        </div>
        
    </div>
  </div>
</template>
<script>
import { viewpointdetail } from "@/api/api";
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
      this.viewpointdetailfn() //调用联系我们接口
  },
  methods: {
    async viewpointdetailfn() {
        console.log(this.$router.params)
        console.log(this.$router.query)
      let { data } = await viewpointdetail({id:this.$route.params.id});
    //   this.mesage = data.data.message.title
    //   this.textHeml = data.data.message.description
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
.content-title{
    font-size: 2.13rem;
    font-weight: bold;
    color: #231914;
    margin-bottom: 1.75rem;
}
.lega-header-foot1{
    position: absolute;
    right: 16.5rem;
    bottom: 1rem;
}
.lega-header-foot1 img {
    width: 4rem;

}
.lega-header {
    width: 100%;
    position: relative;
}
.lega-header-foot img {
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
    /* color: #FFFFFF; */
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
    /* color: #FFFFFF; */
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
    /* background: #FFFFFF; */
    padding-bottom: 6.25rem;
}
.lega-content-div1{
    width: 100%;
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
