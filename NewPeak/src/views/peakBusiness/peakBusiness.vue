<template>
  <div id="legalDeclaration"  v-title :data-title="title3">
    <div class="lega-header">
        <div class="lega-header-foot">
            <img  @click='homeFn()' src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div style="color:#231914" @click="routerFn">巅峰业务</div>
            <img src="../../assets/search-img/icon@2x.png">
            <div style="color:#231914">详情</div>
            
        </div>
        <!-- <div class="lega-header-foot1">
            <img src="../../assets/story-detail/Group 397@2x.png"/>
        </div> -->
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
            <el-row>
                <el-col  class="content-div1" :span="5" >
                    <div  style="position:fixed;zIndex:0;" :style="{top:top+'rem'}">
                        <div class="tab1" :class="{ 'active': isActive == index }" v-for="(item,index) in list1" :key="index" @click="navFn(item,index)">{{item.title}}</div>
                    </div>
                        
                    </el-col>
                    <el-col :span="20" :offset="4">
                        <div>
                            <div >
                                <div class="contCont1" v-for="(item,index) in list1" :key="index">
                                    <div class="contLine"></div>
                                    <div class="cont-right1-title">{{item.title}}</div>
                                    <div v-html="item.description" class="cont-right1-title1" ref="cont1"></div>
                                    <el-row>
                                        
                                            <el-col :span='8'  class="lega-content-div21" v-for="(item2,index2) in item.case" :key="index2+item2.id">
                                                <div @mouseover="linkFn2(item2,index2)" @mouseleave="linkFn2Leave()" @click="detailFn(1,item2)">
                                                    <div class="leag-div21"><img :src='baseUrl+item2.original_image'/></div>
                                                    <div class="leag-div22" :style="{color:index2 == isActiy?'red':''}">{{item2.title}}</div>
                                                    <div class="leag-div23">{{item2.summary}}</div>
                                                 </div>  
                                            </el-col>
                                       
                                    </el-row>
                                    <el-row class="lega-const" v-for="(item1,index1) in item.news" :key="index1+item1.id">
                                        <div @mouseover="linkFn1(item1,index1)"  @mouseleave="linkFn2Leave()" @click="detailFn(2,item1)">
                                            <el-col :span="9" style="margin-right:1rem">
                                                <img :src="baseUrl+item1.original_image" style="width:27.88rem;height:20rem"/>
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="textime">{{item1.addtime}}</div>
                                                <div class="textelte" :style="{color:index1 == isActiy1?'red':''}">{{item1.title}}</div>
                                                <div class="textcontent">{{item1.summary}}</div>
                                                <div class="textlook" :style="{color:index1 == isActiy1?'red':''}">
                                                    <img src="../../assets/bei/icon_more@2x(1).png" v-if='index1 == isActiy1' style="width:.5rem;height:.88rem;margin-right:.3rem" />
                                                    <img src="../../assets/bei/icon_more@2x(2).png" v-else style="width:.5rem;height:.88rem;margin-right:.3rem" /> 查看详情</div>
                                            </el-col>
                                        </div>
                                        
                                    </el-row>
                                    <el-row :gutter="20">
                                        <el-col :span='item3.span'  v-for="(item3,index3) in item.branch_office" :key="index3">
                                            <el-row class="lega-content-div111">
                                                <el-col :span='24' class="lega-div2">
                                                    <div style="display:flex;margin-bottom:.88rem">
                                                         <img class="lega-img" src='../../assets/bei/icong_weizhi@2x.png'/>
                                                         <div style="font-size: 1.5rem;font-weight: 500;margin-left:.75rem;padding-top:.2rem">{{item3.company_name}}</div>
                                                    </div>
                                                    
                                                    <div style="font-size: 1.13rem;font-weight: 400;color: #3C3C3C;minHeight:3.56rem">{{item3.company_address}}</div>
                                                    <div style="margin-bottom:.75rem">
                                                        <span style="margin-right:1rem"><img src='../../assets/bei/icom_dianhua@2x.png' style="width:1rem"/></span>
                                                        <span style="margin-right:.5rem;color: #3C3C3C;">咨询电话：</span>
                                                        <span style="margin-right:.5rem">{{item3.company_phone}}</span>
                                                    </div>
                                                    <div style="margin-bottom:.75rem">
                                                        <span style="margin-right:1rem"><img src='../../assets/bei/icom_youxiang@2x.png' style="width:1rem"/></span>
                                                        <span style="margin-right:.5rem;color: #3C3C3C;">业务邮箱：</span>
                                                        <span style="margin-right:.5rem">{{item3.company_email}}</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </el-col>
            </el-row>
        </div>
        
    </div>
  </div>
</template>
<script>
import { Business,BottomMessage } from "@/api/api";
export default {
  data() {
    return {
      mesage:{},
      free_phone: "",
      company_phone: "",
      public_number_url:"",
      textHeml:'',
      list1:[],
      title3:'',
      branchOffice:[],
      flag: true,
      list2:[
          {
              title:'经典案例'
          },
          {
              title:'延伸阅读'
          },
          {
              title:'联系方式'
          }

      ],
      baseUrl:'http://ceshi.davost.com/',
      top:13,
      isActive:0,
      isActiy:null,
      isActiy1:null
    };
  },
  computed: {
  },
  watch:{
     $route: {
          handler() {
              this.Businessfn();
        },
        deep: true,
    }
  },
  mounted() {
      this.getTanChuang();
    //   this.Businessfn() //调用联系我们接口
      window.addEventListener("scroll", this.windowScroll, true);
    
  },
  created(){
      this.Businessfn()
  },
  destroyed(){
      window.removeEventListener("scroll", this.windowScroll, true);
  },
  methods: {
    getImgUrl(imgUrl){
      return this.baseUrl+imgUrl;
    },
    closeBk(){
      this.flag = false;
    },
    async getTanChuang() {
      let { data } = await BottomMessage();
      this.public_number_url = data.data.public_number_url;
      this.free_phone = data.data.free_phone;
      this.company_phone = data.data.company_phone;
    },
    detailFn(number,data){
        if(number == 1){
            // this.$router.push(`/peakCasesDetail/${data.id}`)
            let routeUrl = this.$router.resolve({
                path: `/peakCasesDetail/${data.id}`
            });
            window.open(routeUrl.href, '_blank');
        }else{
            // this.$router.push(`/topNews/${data.id}/newsDetail/${data.id}`)
            let routeUrl = this.$router.resolve({
                path: `/topNews/${data.id}/newsDetail/${data.id}`
            });
            window.open(routeUrl.href, '_blank');
        }
    },
    linkFn2(data,index){
        this.isActiy = index
    }, 
    linkFn1(data,index){
        this.isActiy1 = index
    }, 
    linkFn2Leave(){
        this.isActiy = null
        this.isActiy1 = null
    },
    homeFn(){
    //   this.$router.push("/index") ;
      let routeUrl = this.$router.resolve({
        path: `/index`
      });
      window.open(routeUrl.href, '_blank');
    },
    async Businessfn() {
      let { data } = await Business({id:this.$route.params.id});
      if(data.data.length == 0 ){
          return
      }
      document.title = data.data.seo_message.meta_title
      this.list1 = data.data.business_detail
      if(data.data.case.length != 0){
        this.list2[0] = {...this.list2[0],case:data.data.case}
      }else{
          this.list2[0] = {...this.list2[0],case:[]}
      }
      if(data.data.news.length != 0){
        this.list2[1] = {...this.list2[1],news:data.data.news}
      }else{
          this.list2[1] = {...this.list2[1],news:[]}
      }
      if(data.data.branch_office.length != 0){
          let lenth1 = data.data.branch_office.length
          let yushu = lenth1%3
          
        let shang1 = parseInt(lenth1/3)
          this.list2[2] = {...this.list2[2],branch_office:data.data.branch_office}
          data.data.branch_office.forEach((item1,index1)=>{
            if(index1 < shang1*3){
                this.list2[2].branch_office[index1].span=8
            }else{
                this.list2[2].branch_office[index1].span = 24/yushu
            }
            
        })
      }else{
          this.list2[2] = {...this.list2[1],branch_office:[]}
      }
      if(data.data.business_detail.length == 0){
          this.list1 = this.list2
      }else{
          
          if(data.data.business_detail[data.data.business_detail.length-1].title  == '自定义模块'){
              this.list2.forEach((item,index)=>{
                   this.list1.splice(data.data.business_detail.length-1,0,item)
              })
          }else{
              this.list2.forEach((item,index)=>{
                   this.list1.push(item)
              })
          }
      }
    },
    navFn(data,index){
        var height = 116.87
        this.isActive = index
        window.removeEventListener("scroll", this.windowScroll, true);
        clearTimeout(setTimeoutFn)
        var setTimeoutFn = setTimeout(() => {
            window.addEventListener("scroll", this.windowScroll, true);
        }, 1000);
        if(index>0){
            document.documentElement.scrollTop = document.getElementsByClassName('contCont1')[index].offsetTop + height
            this.top=1
        }else{
            document.documentElement.scrollTop = 0
            this.top=13
        }

    },
    //节流函数
    throttle (fn, gapTime) {
        let _this = this
        return function () {
            let _nowTime = +new Date()
            if (_nowTime - _this._lastTime > gapTime || !_this._lastTime) {
            fn(...arguments)// 函数可以带参数
            _this._lastTime = _nowTime
            }
        }
    },
    routerFn(){
        let routeUrl = this.$router.resolve({
            path: `/peakBusiness/4`
        });
        window.open(routeUrl.href, '_blank');
    },
    pageUpOrDown (e) {
        // this.isActive = null
            let scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop<200){
                this.top=13
            }else{
                this.top=1
            }
            for(var i=0;i<this.list1.length;i++){
               if(i< this.list1.length-1){
                   if(document.getElementsByClassName('contCont1')[i]){
                            let height = document.getElementsByClassName('contCont1')[i].offsetTop - 200
                            let height1 = document.getElementsByClassName('contCont1')[i+1].offsetTop -200
                            if(scrollTop>=height &&scrollTop<= height1){
                                this.isActive = i
                                 return
                            }
                        }
               }else{
                 this.isActive =   this.list1.length-1
                }
            }
    },
    windowScroll(e) {
      
       e.stopPropagation()
       this.pageUpOrDown(e)
    //    this.isActive=null
       
    },
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
/* .lega-div2 div:nth-child(1){
    font-size: 1.75rem;
    font-weight: 500;
    color: #231914;
    line-height: 2.05rem;
}
.lega-div2 div:nth-child(2){
    font-size: 1.13rem;
    color: #231914;
    margin-top: 1.69rem;
}
.lega-div2 div:nth-child(3){
    font-size: 1.13rem;
    color: #231914;
    margin-top: 1.5rem;
}
.lega-div2 div:nth-child(3){
    font-size: 1.13rem;
    color: #231914;
    margin-top: 1rem;
}
.lega-div2 div:nth-child(4){
    font-size: 1.13rem;
    color: #231914;
    margin-top: 1rem;
} */
.lega-const{
    padding-bottom: 2rem;
    /* border-bottom: 1px solid #C4C4C4; */
    padding-top: 2.5rem;
}
.textime{
    font-size: 1.13rem;
    font-weight: 400;
    color: #6E6E6E;
    height: 2.5rem;
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
.lega-content-div21{
    width: 25rem;
    height: 34.13rem;
    background: #ffffff;
    margin-right: 1.25rem;
    margin-bottom: 1.75rem;
}
.leag-div21{
    width: 100%;
    height: 20.3rem;
}
.leag-div21 img{
    width: 100%;
    height: 100%;
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
    width: 94%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    margin-left: 1.25rem;
}
.content-div1{
    /* overflow: hidden; */
    /* position: relative; */
}
.cont-right1-title1{
    width: 100%;
    /* overflow-x: scroll; */
}
.cont-right1-title1 p img {
    width: 100% !important;
}
.tab1{
    width: 12.63rem;
    height: 5rem;
    background: #F4F4F4;
    text-align: center;
    line-height: 5rem;
    font-size: 1.5rem;
    border-bottom:1px solid #ece4e4;
}
.contLine{
    width: 0.25rem;
    height: 1.5rem;
    background: #C8000A;
    border-radius: 0rem 0rem 0rem 0rem;
    opacity: 1;
    float: left;
    margin-top: .5rem;
    margin-right: 1rem;
}
.cont-right-cont{
    padding: 1rem 0;
}
.cont-right-img1{
    width: 8rem;
    height: 6rem;
    
}
.cont-right1-title{
font-size: 2rem;
    font-weight:500;
    margin-bottom: 2rem;
}

.cont-right-cont1{
    font-size: 1.13rem;
    font-weight: 400;
    margin-bottom: 1rem;
    width: 100%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    color: #3C3C3C;
}
.lega-img{
    /* width: 2rem; */
    height: 2rem;
    float: left;
}
.cont-right-cont2{
    font-size: 1rem;
    font-weight: 300;
    margin-bottom: 1rem;
    width: 100%;
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    color: #6E6E6E;
}
.cont-right1{
    
    padding:2.5rem 2rem;
    background: #ffffff;
}
.cont-right2{
    padding:2.5rem 2rem;
    background: #ffffff;
    margin-top: 2rem;
}
#legalDeclaration{
    width: 100%;
    height: 100%;
    background: #ffffff;
}
.content-title{
    font-size: 2.13rem;
    font-weight: bold;
    color: #231914;
    margin-bottom: 1.75rem;
}
.content-cont1{
    padding-bottom: 2.5rem;
}
.lega-header-foot1{
    position: absolute;
    right: 12rem;
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
    margin-left: 6.1rem;
}
.lega-header-foot{
    padding-top: 2rem;
    margin-bottom: 2.0625rem;
    margin-left: 11.8rem;
    /* color: #FFFFFF; */
    display: flex;
}
.lega-header-foot img{
    width: 1rem;
    margin-right: 1.25rem;
    height: 1rem;
}
.lega-content{
    width: 96rem;
    margin:3.13rem auto 0;
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
    margin-top: 1rem;
}
.content-div1-title{
    font-size: 1.5rem;
    font-weight: 500;
    border-left: 4px solid red;
    padding-left: .625rem;
    margin-bottom: 1rem;
}
</style>
