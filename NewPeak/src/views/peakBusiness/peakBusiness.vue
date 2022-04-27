<template>
  <div id="legalDeclaration" >
    <div class="lega-header">
        <div class="lega-header-foot">
            <img  @click='homeFn()' src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div style="color:#231914">巅峰业务</div>
            <img src="../../assets/search-img/icon@2x.png">
            <div style="color:#231914">详情</div>
            
        </div>
        <!-- <div class="lega-header-foot1">
            <img src="../../assets/story-detail/Group 397@2x.png"/>
        </div> -->
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <el-row>
                <el-col  class="content-div1" :span="5" >
                    <div  style="position:fixed;zIndex:0;" :style="{top:top+'rem'}">
                        <div class="tab1" v-for="(item,index) in list1" :key="index" @click="navFn(item,index)">{{item.title}}</div>
                    </div>
                        
                    </el-col>
                    <el-col :span="19" :offset="5">
                        <div>
                            <div >
                                <div class="contCont1" v-for="(item,index) in list1" :key="index">
                                    <div class="contLine"></div>
                                    <div class="cont-right1-title">{{item.title}}</div>
                                    <div v-html="item.description" class="cont-right1-title1" ref="cont1"></div>
                                    <el-row>
                                        <el-col  class="lega-content-div21" v-for="(item2,index2) in item.case" :key="index2+item2.id">
                                            <div class="leag-div21"><img :src='baseUrl+item2.original_image'/></div>
                                            <div class="leag-div22" @click="detailFn(item)">{{item2.title}}</div>
                                            <div class="leag-div23">{{item2.summary}}</div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="lega-const" v-for="(item1,index1) in item.news" :key="index1+item1.id">
                                        <el-col :span="9" style="margin-right:1rem">
                                            <img :src="baseUrl+item1.original_image" style="width:27.88rem;height:20rem"/>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="textime">{{item1.addtime}}</div>
                                            <div class="textelte">{{item1.title}}</div>
                                            <div class="textcontent">{{item1.summary}}</div>
                                            <div class="textlook" @click="detailFn(item1)"><img src="../../assets/bei/icon_more.png" style="width:.5rem;height:.88rem;margin-right:.3rem" /> 查看详情</div>
                                        </el-col>
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
import { Business } from "@/api/api";
export default {
  data() {
    return {
      mesage:{},
      textHeml:'',
      list1:[],
      branchOffice:[],
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
      top:13
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
      
      this.Businessfn() //调用联系我们接口
      window.addEventListener("scroll", this.windowScroll, true);
  },
  methods: {
    homeFn(){
      this.$router.push("/index") ;
    },
    async Businessfn() {
      let { data } = await Business({id:this.$route.params.id});
      this.list1 = data.data.business_detail
      if(data.data.case.length != 0){
        this.list2[0] = {...this.list2[0],case:data.data.case}
      }
      if(data.data.news.length != 0){
        this.list2[1] = {...this.list2[1],news:data.data.news}
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
        var height = document.body.clientHeight * 0.045
        if(index>0){
            document.documentElement.scrollTop = document.getElementsByClassName('contCont1')[index].offsetTop + height
            console.log(document.getElementsByClassName('contCont1')[index].offsetTop)
            console.log(height)
            this.top=1
        }else{
            document.documentElement.scrollTop = 0
            this.top=13
        }
        

        
        
    },
    windowScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
       if(scrollTop<200){
           this.top=13
       }
    },
  },
};
</script>

<style scoped>
.lega-content-div111{
    width: 100%;
    height: 100%;
    background:#f0eeee;
    padding: 1rem;
    margin-bottom: 1rem;
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
    border-bottom: 1px solid #C4C4C4;
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
    margin-left: 5.1rem;
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
