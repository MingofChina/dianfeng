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
     <div>
        <img class="code-bk" v-if="flag"/>
        <img class="shut-down" v-if="flag"
            src="../../assets/img/icon_shut down@2x.png"
            v-on:click="closeBk()"
        />
        <div class="index-info-wrapper">
        <div class="phone-wrapper">
            <img class="index-phone"
            src="../../assets/bei/icon_the phone@2x.png"
            v-if="flag"/>
            <div class="phone-text" v-if="flag">联系电话</div>
        </div>
        <div class="phone-number1" v-if="flag">{{free_phone}}</div>
        <div class="phone-number2" v-if="flag">{{company_phone}}</div>
        <img class="code-url" v-if="flag" :src=getImgUrl(this.public_number_url) />
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
import { sexample,banner,BottomMessage } from "@/api/api";
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
      free_phone: "",
      company_phone: "",
      public_number_url:"",
      flag: true,
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
           that.colorFn()
           that.id = null
           this.sexamplefn(1)
        },
        deep: true,
        
    }
  },
  created(){
       let that = this
      if(sessionStorage.getItem('peakCasesPage')){
          that.sexamplefn(sessionStorage.getItem('peakCasesPage'))
          this.pageNumber =Number(sessionStorage.getItem('peakCasesPage'))
          sessionStorage.removeItem('peakCasesPage')
      }else{
          that.sexamplefn(1)
      }
  },
  mounted() {
      let that = this
      if(sessionStorage.getItem('peakCasesPage')){
          that.sexamplefn(sessionStorage.getItem('peakCasesPage'))
          
          sessionStorage.removeItem('peakCasesPage')
      }else{
          that.sexamplefn(1)
      }
       //调用联系我们接口
    //   this.colorFn()
    this.getTanChuang();
  },
  methods: {
    colorFn1(data,index){
        let that = this
        that.isActive1 = index
    },
    async getTanChuang() {
      let { data } = await BottomMessage();
      this.public_number_url = data.data.public_number_url;
      this.free_phone = data.data.free_phone;
      this.company_phone = data.data.company_phone;
    },
    leave(){
        let that =this
        that.isActive1=null
    },
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    closeBk(){
      this.flag = false;
    },
    async sexamplefn(val) {
      let that = this;
      
     let params = {
         pages:that.pageNumber,
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
        // this.$router.push(`/peakCasesDetail/${data.idumber}`);
        sessionStorage.setItem('peakCasesPage',this.pageNumber)
        let routeUrl = this.$router.resolve({
            path: `/peakCasesDetail/${data.id}`
          });
          window.open(routeUrl.href, '_blank');
    }
  },
};
</script>

<style scoped>
@media screen and (min-width: 1921px) {
  .code-bk {
    position: fixed;
    top: 400px;
    right: 0px;
    background-image: url("../../assets/bei/fixed.png");
    width: 340px;
    height: 530px;
    background-size: 100% 100%;
    z-index: 9000;
  }
  .code-url{
    position: fixed;
    top: 740px;
    right: 100px;
    width: 142px;
    height: 142px;
    background-size: 100% 100%;
    z-index: 10000;
  }
  .shut-down{
    position: fixed;
    top: 436px;
    right: 31px;
    background-image: url("../../assets/img/icon_shut down@2x.png");
    width: 32px;
    height: 32px;
    background-size: 100% 100%;
    z-index: 10000;
  }
  .index-info-wrapper{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 530px;
    right: 120px;
    z-index: 10000;
  }
  .phone-wrapper{
    display: flex;
    flex-direction: row;
    margin-top: 7px;
  }
  .index-phone{
    /*position: fixed;
    top: 530px;
    right: 270px;*/
    background-image: url("../../assets/bei/icon_the phone@2x.png");
    width: 24px;
    height: 24px;
    background-size: 100% 100%;
  }
  .phone-text{
    /*position: fixed;
    top: 530px;
    right: 155px;*/
    height: 28px;
    font-size: 26px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #6E6E6E;
    line-height: 28px;
    margin-left: 27px;
    /*  -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;*/
  }
  .phone-number1{
    /*position: fixed;
    top: 600px;
    right: 114px;*/
    /*width: 103px;*/
    height: 28px;
    font-size: 26px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 28px;
    margin-top: 25px;
    /*-webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
  }
  .phone-number2{
    /*position: fixed;
    top: 650px;
    right: 119px;*/
    /*width: 111px;*/
    height: 28px;
    font-size: 26px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 28px;
    margin-top: 25px;
    /*-webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
  }
}
.index-info-wrapper{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 465px;
    right: 36px;
    z-index: 10000;
  }
  .phone-wrapper{
    display: flex;
    flex-direction: row;
    margin-top: 3px;
  }
.active{
    background: red !important;
    color: #ffffff;
}
.lega-content-div111{
    width: 100%;
    height: 100%;
    background:#f0eeee;
    padding: 1rem;
    margin-bottom: 1rem;
}
.index-phone{
    /*position: fixed;
    top: 530px;
    right: 270px;*/
    background-image: url("../../assets/bei/icon_the phone@2x.png");
    width: 12px;
    height: 12px;
    background-size: 100% 100%;
  }
  .phone-text{
    /*position: fixed;
    top: 530px;
    right: 155px;*/
    height: 14px;
    font-size: 13px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #6E6E6E;
    line-height: 14px;
    margin-left: 15px;
    /*  -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;*/
  }
  .phone-number1{
    /*position: fixed;
    top: 600px;
    right: 114px;*/
    /*width: 103px;*/
    height: 14px;
    font-size: 13px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 14px;
    margin-top: 15px;
    /*-webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
  }
  .phone-number2{
    /*position: fixed;
    top: 650px;
    right: 119px;*/
    /*width: 111px;*/
    height: 14px;
    font-size: 13px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #231914;
    line-height: 14px;
    margin-top: 15px;
    /*-webkit-background-clip: text;
    -webkit-text-fill-color: transparent;*/
  }
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
