<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <img :src="imgUrl"/>
        <div class="lega-header-cont">
            <div>专<span style="marginRight:.8rem"></span>业<span style="marginRight:.8rem"></span>著<span style="marginRight:.8rem"></span>作</div>
            <div>Professional work</div>
            <div></div>
        </div>
        <div class="lega-header-foot">
            <img @click='homeFn()' src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <!-- <div>巅峰观点</div>
            <img src="../../assets/search-img/icon@2x.png"> -->
            <div>专业著作</div>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <el-row :gutter="20">
                
                    <el-col :span="12" v-for="(item,index) in dataList"  :key="item.id+index">
                        <div @mouseenter="linkFn2(item,index)">
                            <div class="lega-cont-div" @click="detailFn(item,index)">
                                <div class="lega-cont-img">
                                    <img :src='baseUrl+item.original_image'/>
                                </div>
                                <div class="lega-cont-div2">
                                    <div class="lega-cont-div3"  :class="{active: index === isActive}">{{item.title}}</div>
                                    <div class="lega-cont-div4">{{item.summary}}</div>
                                </div>
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
  </div>
</template>
<script>
import { specialty ,banner } from "@/api/api";
export default {
  data() {
    return {
      mesage:'',
      pageNumber:1,
      textHeml:'',
      dataList:[],
      total:0,
      isActive:null,
      imgUrl:'',
      baseUrl:'http://ceshi.davost.com/',
    };
  },
  computed: {
  },
  mounted() {
    //   this.specialtyfn(1) //调用联系我们接口
  },
   created(){
       let that = this
        if(sessionStorage.getItem('professionalWorksPage')){
            that.specialtyfn(sessionStorage.getItem('professionalWorksPage'))
            that.pageNumber =Number(sessionStorage.getItem('professionalWorksPage'))
            sessionStorage.removeItem('professionalWorksPage')
        }else{
            that.specialtyfn(1)
        }
  },
  methods: {
    async specialtyfn(val) {
      let { data } = await specialty({pages:this.pageNumber,pagesize:10});
      document.title = data.data.seo_message.meta_title
     this.dataList = data.data.books
     this.total = data.data.books_pages_number * 10
    banner({id:this.$route.params.id}).then((res)=>{
            this.imgUrl = this.baseUrl+res.data.data[0].original_image
        });
    },
    linkFn2(data,index){
        this.isActive = index
    }, 
     handleCurrentChange(val) {
         this.pageNumber= val
       this.specialtyfn(val)
    },
    
    homeFn(){
      let routeUrl = this.$router.resolve({
            path: `/index`
          });
        window.open(routeUrl.href, '_blank');
    },
    detailFn(data){
        // this.$router.push(`/professWorksDetail/${data.id}`);
         sessionStorage.setItem('professionalWorksPage',this.pageNumber)
        let routeUrl = this.$router.resolve({
            path: `/professWorksDetail/${data.id}`
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
    color: #C8000A !important;
}
.lega-cont-div{
    display: flex;
    padding: 1.5rem;
    background: #FFFFFF;
    margin-top: 1.5rem;
}
.lega-cont-div2{
    width: 26.88rem;
}
.lega-cont-img{
     width: 11.73rem;
    height: 14.75rem;
    margin-right: 1.25rem;
}
.lega-cont-img img {
    width: 100%;
    height: 100%;
}
.lega-cont-div3{
    font-size: 1.38rem;
    margin-top: .3rem;
    margin-bottom: 1.25rem;
    font-weight: 400;
     width: 100%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    color: #6E6E6E;
}
.lega-cont-div4{
    font-size: 1rem;
    /* font-weight: 400; */
    color: #6E6E6E;
     width: 100%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 8; 
    -webkit-box-orient: vertical;
    color: #6E6E6E;
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
    width: 87.5rem;
    margin:3.25rem auto 0;
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
    border-left: 4px solid #C8000A;
    padding-left: .625rem;
    margin-bottom: 1rem;
}
</style>
