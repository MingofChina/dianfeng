<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <img src="../../assets/mines/Group 389@2x.png"/>
        <div class="lega-header-cont">
            <div>行业观点</div>
            <div>Top view</div>
            <div></div>
        </div>
        <div class="lega-header-foot">
            <img src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div>巅峰观点</div>
            <img src="../../assets/search-img/icon@2x.png">
            <div>行业观点</div>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
           <div>
               <el-row class="lega-const" v-for="(item,index) in dataList" :key="index+item.id">
                   <el-col :span="9" style="margin-right:1rem">
                       <img :src="baseUrl+item.original_image" style="width:31.88rem;height:20rem"/>
                   </el-col>
                   <el-col :span="12">
                       <div class="textime" >{{item.addtime}}</div>
                       <div class="textelte" :style="{color:index == 0?'red':''}">{{item.title}}</div>
                       <div class="textcontent">{{item.summary}}</div>
                       <div class="textlook" :style="{color:index == 0?'red':''}" @click="detailFn(item)">
                           <img src="../../assets/bei/icon_more@2x(1).png" v-if='index == 0' style="width:.5rem;height:.88rem;margin-right:.3rem" />
                           <img src="../../assets/bei/icon_more.png" v-else style="width:.5rem;height:.88rem;margin-right:.3rem" /> 查看详情</div>
                   </el-col>
               </el-row>
           </div>
           <div class="pagination">
               <el-pagination
                background
                @current-change="handleCurrentChange"
                :page-size="10"
                layout="prev, pager, next"
                :total="dataList.length">
                </el-pagination>
           </div>
        </div>
        
    </div>
  </div>
</template>
<script>
import { viewpoints } from "@/api/api";
export default {
  data() {
    return {
      mesage:'',
      textHeml:'',
      dataList:[],
      baseUrl:'http://ceshi.davost.com/',
      total:0
    };
  },
  computed: {
  },
  mounted() {
      this.viewpointsfn(1) //调用联系我们接口
  },
  methods: {
    async viewpointsfn(val) {
      let { data } = await viewpoints({pages:val,pagesize:10});
      this.dataList = data.data.idea
      this.total = data.data.idea_pages_number
      console.log(data.data);
    },
    handleCurrentChange(val) {
       this.viewpointsfn(val)
    },
    detailFn(data){
        this.$router.push(`/peakViewDetail/${data.id}`);
    }
  },
};
</script>

<style scoped>
.pagination{
    margin-top: 3.13rem;
    text-align: center;
}
#legalDeclaration{
    width: 100%;
    height: 100%;
     background: #FFFFFF;
}
.lega-const{
    padding-bottom: 2rem;
    border-bottom: 1px solid #C4C4C4;
    padding-top: 2.5rem;
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
.lega-header {
    width: 100%;
    position: relative;
}
.lega-header img {
    width: 100%;
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
.lega-header-foot div{
    margin-right: 1rem;
    line-height: 15px;
}
.lega-header-foot img{
    width: 1rem;
    height: 1rem;
    margin-right: 1.25rem;
}
.lega-content{
    width: 86.5rem;
    margin:0 auto ;
    /* background: #FFFFFF; */
    padding-bottom: 6.25rem;
}
.lega-content-div1{
    width: 100%;
    margin: 0 auto;
    background: #FFFFFF;
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
