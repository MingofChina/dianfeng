<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <div class="lega-header-foot">
            <img src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div>搜索接口</div>
            <img src="../../assets/search-img/icon@2x.png">
            <div>{{text}}</div>
            
        </div>
        <div class="lega-header-foot1">
            <img src="../../assets/story-detail/Group 397@2x.png"/>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <div style="display:flex">
                <div class="tabDiv">案例<span>（11）</span></div>
                <div class="tabDiv">案例<span>（11）</span></div>
                <div class="tabDiv">案例<span>（11）</span></div>
            </div>
        </div>
        <div class="lega-content-div2" v-if="false">
            <div class="lega-content-div21">
                <div class="leag-div21"><img src/></div>
                <div class="leag-div22">111</div>
                <div class="leag-div23">111</div>
            </div>
        </div>
        <el-row class="lega-const" v-for="(item,index) in dataList" :key="index+item.id">
                   <el-col :span="9" style="margin-right:1rem">
                       <img :src="baseUrl+item.original_image" style="width:31.88rem;height:20rem"/>
                   </el-col>
                   <el-col :span="12">
                       <div class="textime">{{item.addtime}}</div>
                       <div class="textelte">{{item.title}}</div>
                       <div class="textcontent">{{item.summary}}</div>
                       <div class="textlook" @click="detailFn(item)"><img src="../../assets/bei/icon_more.png" style="width:.5rem;height:.88rem;margin-right:.3rem" /> 查看详情</div>
                   </el-col>
        </el-row>
        
    </div>
  </div>
</template>
<script>
import { formsjie ,viewpoints} from "@/api/api";
export default {
  data() {
    return {
      mesage:'',
      textHeml:'',
      text:'',
      dataList:[]
    };
  },
  computed: {
  },
  mounted() {
      this.formsjiefn() //调用联系我们接口
  },
  watch:{
     $route: {
          handler() {
              this.viewpointsfn(1);
        },
        deep: true,
    }
  },
  methods: {
    async formsjiefn() {
      let that = this;
    //   console.log(that.$route.params.id)

      let { data } = await formsjie();
    //   this.description=data.data.message
    //   this.descriptionson=data.data.message.description
    //   console.log(data.data);
    },
    async viewpointsfn(val) {
      let { data } = await viewpoints({pages:val,pagesize:10});
      this.dataList = data.data.idea
      this.total = data.data.idea_pages_number
      console.log(data.data);
    },
  },
  
};
</script>

<style scoped>
.lega-const{
    padding-bottom: 2rem;
    border-bottom: 1px solid #C4C4C4;
}
.textime{
    font-size: 1.13rem;
    font-weight: 400;
    color: #6E6E6E;
    height: 2.5rem;
}
.textelte{
    margin-top: 1.25rem;
    margin-bottom: 1.2rem;
    font-size: 2.25rem;
    width: 100%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
}
.textlook{
    color: #6E6E6E;
    font-size: 1.13rem;
}
.textcontent{    
    font-size: 1.13rem;
    color: #6E6E6E;
    margin-bottom: 2.75rem;
    min-height: 7.38rem;
    width: 100%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 5; 
    -webkit-box-orient: vertical;
}
#legalDeclaration{
    width: 100%;
    height: 100%;
    background: #F4F4F4;
}
.lega-content-div21{
    width: 25rem;
    height: 31.13rem;
    background: #ffffff;
}
.lega-content-div2{
    display: flex;
}
.leag-div22{
    margin-top: 3.13rem;
    font-size: 1.38rem;
    font-weight: 400;
    margin-bottom: 1.18rem;
    margin-left: 1.25rem;
}
.leag-div23{
    color: #6E6E6E;
    font-size: 1rem;
    margin-bottom:4rem ;
    width: 100%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    margin-left: 1.25rem;
}
.leag-div21{
    width: 100%;
    height: 20.3rem;
    border: 1px solid red;
}
.tabDiv{
    height: 1.93rem;
    padding: .94rem 1.25rem ;
    border:1px solid #CACACA;
    line-height: 1.93rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    /* color: #FFFFFF;
    background: red; */
    margin-right: 3.13rem;
    margin-bottom: 3.13rem;
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
    color: #A0A0A0;
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
    width: 86rem;
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
