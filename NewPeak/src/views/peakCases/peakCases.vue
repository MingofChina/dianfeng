<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <img :src="imgUrl"/>
        <div class="lega-header-cont">
            <div>巅<span style="marginRight:.8rem"></span>峰<span style="marginRight:.8rem"></span>案<span style="marginRight:.8rem"></span>例</div>
            <div>Top case</div>
            <div></div>
        </div>
        <div class="lega-header-foot">
            <img @click='homeFn()' src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div>巅峰案例</div>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <div style="display:flex">
                <div class="tabDiv" :class="{active: isActive === index}" @click="navFn(item,index)" v-for="(item,index) in columnsList" :key="item.id+index">{{item.name}}</div>
            </div>
        </div>
        <el-row class="lega-content-div2" >
            <el-col  class="lega-content-div21"  v-for="(item,index) in dataList" :key="index+item.id">
                <div @mouseenter="colorFn1(item,index)" @mouseleave="leave" @click="detailFn(item)">
                    <div class="leag-div21"><img :src='baseUrl+item.original_image'/></div>
                <div class="leag-div22" :style="{color:isActive1 == index?'#C8000A':''}" @click="detailFn(item)">{{item.title}}</div>
                <div class="leag-div23">{{item.summary}}</div>
                <div class="leag-div24" v-if="isActive1 == index">
                    <img src="../../assets/bei/icon_more@2x(1).png" style="width:.5rem;height:.88rem;margin-right:.3rem" />
                     查看详情
                </div>
                </div>
                
            </el-col>
        </el-row>
        <div class="pagination">
            <el-pagination
            background
            :current-page.sync='pageNumber'
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="prev, pager, next"
            :total="total">
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
import { sexample,banner } from "@/api/api";
export default {
  data() {
    return {
      mesage:'',
      textHeml:'',
      text:'',
      dataList:[],
      columnsList:[],
      isActive:0,
      isActive1:null,
      total:0,
      id:null,
      imgUrl:'',
      pageNumber:1,
      baseUrl:'http://ceshi.davost.com/',
    };
  },
  computed: {
  },
  watch:{
     $route: {
        handler() {
           let that =this;
           this.sexamplefn(1)
           that.colorFn()
           that.id = null
           this.sexamplefn(1)
        },
        deep: true,
    }
  },
  mounted() {
      this.sexamplefn(1) //调用联系我们接口
    //   this.colorFn()
  },
  methods: {
    colorFn1(data,index){
        let that = this
        that.isActive1 = index
    },
    leave(){
        let that =this
        that.isActive1=null
    },
    async sexamplefn(val) {
      let that = this;
     let params = {
         pages:this.pageNumber,
         pagesize:8,
         id:that.id?that.id:this.$route.params.id
     }
      let { data } = await sexample(params);
      banner({id:this.$route.params.id}).then((res)=>{
            this.imgUrl = this.baseUrl+res.data.data[0].original_image
        });
      document.title = data.data.seo_message.meta_title
      that.columnsList = data.data.column
      that.dataList = data.data.case
      that.total = data.data.case_pages_number * 10
    //   that.colorFn()
       if(!that.isActive){
           that.colorFn()
       }
    },
    colorFn(){
        let that =this;
        that.columnsList.forEach((item,index) => {
            if(item.id == sessionStorage.getItem('peakCasesId')){
                that.isActive = index
            }
      });
    },
    homeFn(){
    //   this.$router.push("/index") ;
      let routeUrl = this.$router.resolve({
        path: `/index`
      });
      window.open(routeUrl.href, '_blank');
    },
    navFn(item,index){
        let that =this
        that.isActive = index
        sessionStorage.setItem('peakCasesId',item.id)
        that.id = item.id
        this.pageNumber = 1
        that.sexamplefn(1)
    },
    handleCurrentChange(val) {
         this.pageNumber = val
       this.sexamplefn(val)
    },
    detailFn(data){
        // this.$router.push(`/peakCasesDetail/${data.id}`);
        let routeUrl = this.$router.resolve({
            path: `/peakCasesDetail/${data.id}`
          });
          window.open(routeUrl.href, '_blank');
    }
  },
};
</script>

<style scoped>
.pagination{
    margin-top: 3.13rem;
    text-align: center;
}
.active{
background: #C8000A;
color: #FFFFFF;
}
.leag-div24{
    color:#C8000A;
    margin-left: 1.25rem;
}
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
    margin-left: 6.1rem;
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
    width: 106rem;
    margin:5rem auto 0;
    /* background: #FFFFFF; */
    padding-bottom: 4.38rem;
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
    border-left: 4px solid #C8000A;
    padding-left: .625rem;
    margin-bottom: 1rem;
}
.lega-const{
    padding-bottom: 2rem;
    padding-top: 1rem;
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
    height: 34.13rem;
    background: #ffffff;
    margin-right: 1.25rem;
    margin-bottom: 1.75rem;
}
.lega-content-div2{
    /* display: flex; */
}
.leag-div22{
    margin-top: 3.13rem;
    font-size: 1.38rem;
    font-weight: 400;
    margin-bottom: 1.18rem;
    margin-left: 1.25rem;
    width: 94%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    margin-left: 1.25rem;
}
.leag-div23{
    color: #6E6E6E;
    font-size: 1rem;
    margin-bottom:2rem ;
    width: 94%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    margin-left: 1.25rem;
}
.leag-div21{
    width: 100%;
    height: 20.3rem;
}
.leag-div21 img{
    width: 100%;
    height: 100%;
}
.tabDiv{
    height: 1.93rem;
    padding: .5rem 1.75rem ;
    border:1px solid #CACACA;
    line-height: 1.93rem;
    text-align: center;
    font-size: 1.5rem;
    /* font-weight: bold; */
    /* color: #FFFFFF;
    background: #C8000A; */
    margin-right: 3.13rem;
    margin-bottom: 3.13rem;
}
.content-title{
    font-size: 2.13rem;
    font-weight: bold;
    color: #231914;
    margin-bottom: 1.75rem;
}
</style>
