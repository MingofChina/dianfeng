<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <div class="lega-header-foot">
            <img @click='homeFn()' src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div style="color:#231914">巅峰观点</div>
            <img src="../../assets/search-img/icon@2x.png">
            <div style="color:#231914">专业著作</div>
            <img src="../../assets/search-img/icon@2x.png">
            <div style="color:#231914">详情</div>
            
        </div>
        <div class="lega-header-foot1">
            <img src="../../assets/story-detail/Group 397@2x.png"/>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <el-row :gutter="30">
                <el-col :span="17" >
                    <div class="content-title">{{mesage.title}}</div>
                    <el-row class="content-cont1">
                        <el-col :span="20">来源：{{mesage.branch}}</el-col>
                        <el-col :span="4">发布时间：{{mesage.addtime}}</el-col>
                    </el-row>
                    <div v-html="textHeml"></div>
                </el-col>
                <el-col :span="7">
                    <div class="cont-right1" >
                        <div class="contLine"></div>
                        <div class="cont-right1-title">著作推荐</div>
                        <el-row :gutter="30" class="cont-right-cont" v-for="(item,index) in list1" :key="item.id+index">
                            <div @click="professWorksDetail(item)">
                                <el-col :span="15">
                                    <div class="cont-right-cont1">{{item.title}}</div>
                                    <div class="cont-right-cont2">{{item.summary}}</div>
                                </el-col>
                                <el-col :span="8">
                                    <img class="cont-right-img1" :src='baseUrl+item.original_image'/>
                                </el-col>
                            </div>
                            
                        </el-row>
                    </div>
                    <div class="cont-right2" >
                        <div class="contLine"></div>
                        <div class="cont-right1-title">相关文章推荐</div>
                        <el-row :gutter="30" class="cont-right-cont" v-for="(item,index) in list2" :key="item.id+index">
                            <div @click="professWorksDetail(item)">
                                <el-col :span="15">
                                    <div class="cont-right-cont1">{{item.title}}</div>
                                    <div class="cont-right-cont2">{{item.summary}}</div>
                                </el-col>
                                <el-col :span="8">
                                    <img class="cont-right-img1" :src='baseUrl+item.original_image'/>
                                </el-col>
                            </div>
                            
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        
    </div>
  </div>
</template>
<script>
import { specialtyde } from "@/api/api";
export default {
  data() {
    return {
      mesage:{},
      textHeml:'',
      list1:[],
      list2:[],
      baseUrl:'http://ceshi.davost.com/',
    };
  },
  computed: {
  },
  watch:{
     $route: {
          handler() {
              this.specialtydefn();
        },
        deep: true,
    }
  },
  mounted() {
      this.specialtydefn() //调用联系我们接口
  },
  methods: {
    homeFn(){
      this.$router.push("/index") ;
    },
    professWorksDetail(data){
        this.$router.push( `/professWorksDetail/${data.id}`) ;
    },
    async specialtydefn() {
      let { data } = await specialtyde({id:this.$route.params.id});
      this.mesage = data.data.books_detail
      this.textHeml = data.data.books_detail.description
      this.list1 = data.data.peak_books_hots
      this.list2 = data.data.peak_books_relevant
    //   this.textHeml = data.data.message.description
    //   this.description=data.data.message
    //   this.descriptionson=data.data.message.description
      console.log(data.data);
    },
  },
};
</script>

<style scoped>
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
    margin-bottom: 2.25rem;
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
    background: #F4F4F4;
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
    bottom: -1rem;
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
    /* position: absolute; */
    padding-top: 2.0625rem;
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
