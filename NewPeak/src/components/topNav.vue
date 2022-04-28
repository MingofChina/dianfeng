<template>
  <div id="Header">
    <el-row :gutter="20">
      <el-col :span="6" style="text-align:center">
        <img src="../assets/img/logo.png"  alt=""  @click="homeFn()"  class="logo-img" />
      </el-col>
      <el-col :span="14">
        <el-row style="line-height:4.125rem;
        font-size: 18px;font-weight:400"> 
          <el-col :span="4" v-for="(item,index) in navList" class="divhover" :key="index" style="textAlign:center;position:relative">
            <div @mouseenter="ulNavFn(item,index,false)"  :style="{color:index == isActive?'red':''}" @click="ulNavFn(item,index,true)">{{item.name}}</div>
            <div v-if="index == isActive" style="width:5.1rem;border-top:2px solid red;position:absolute;top:4.6rem;height:2px;left:3.2rem"></div>
          </el-col>
        </el-row>
        <el-row v-if="subscript|| subscript==0"  class="navLIST" :style="{width:(subscript1||subscript1==0)?'44.625rem':'33.25rem',marginTop:'1rem',zIndex:9999,marginLeft:marginLeft+'rem',background:'#FFFFFF'}"> 
          <div style="width:100%;height:100%" @mouseleave="levalFn()">
             <el-col :span="(subscript == 1)?7:12 ">
                <img  v-show="navList[subscript].original_image" :src="baseUrl+navList[subscript].original_image" style="width:11rem;height:8.25rem;margin:4.625rem 2.025rem 2.875rem 1.75rem"/>
              </el-col>
              <el-col :span="(subscript==0||subscript==2)?12:4" >
                <div >
                  <el-col :span="(subscript==0||subscript==2)?12:24" class="divhover" :class="{navList: isnavList == index}"  v-for="(item,index) in navList[subscript].child_column" :key="item.id"><div class="navli1"   style="text-align: center;line-height: .3rem;"  @click="linkFn(item,index)" @mouseenter="linkFn2(item,index)">
                  <p class="phover1" style="height:1rem;display:none"></p>{{item.name}}</div></el-col>
                </div>
                
              </el-col>
              <el-col :span="13"  v-if="(subscript1 || subscript1 == 0) &&navList[subscript].child_column[subscript1].childcontent" style="background:#F2F2F2;height:26.5rem;padding-left:1rem">
                <div>
                  <el-col  :span="12" class="navli1 divhover" v-for="(item,index) in navList[subscript].child_column[subscript1].childcontent" :key="item.id"><div @click="linkFn1(item)">{{item.title}}</div></el-col>
                </div>
              </el-col>
          </div>
         
        </el-row>
      </el-col>
      <el-col :span="3" style="line-height:4.125rem">
        <div class="grid-content ">
          <div class="bg-purple"></div>
          <div class="grid-div">
            <div class="grid-img"><img src='../assets/bei/路径 80@2x.png' @click="serachFn()" style="width:100%;background:#ffffff"/></div>
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input2">
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { column, formsjie, search } from "@/api/api";
export default {
  data() {
    return {
      navList:[],
      subscript:null,
      subscript1:null,
      marginLeft:9.625,
      isActive:null,
      isActive1:null,
      isnavList:null,
      input2:null,
      baseUrl:'http://ceshi.davost.com'
    };
  },
  watch:{
     $route: {
        handler() {
           let that =this;
           that.colorFn()
        },
        deep: true,
    }
  },
  mounted() {
    this.columnfn(); //头部搜岁页面的接口
    if(this.$route.path.indexOf('queryResults')>-1){
      if(!this.input2){
        this.$router.push("/index") ;
        return
      }
    }
    document.getElementsByClassName('el-input__prefix')[0].click(()=>{
    })
     document.addEventListener("click",e=>{
      let that = this
      if (!this.$el.contains(e.target)) {
        this.subscript = null;
      } else {
      }
    });
    // this.formsjiefn(); //头部搜岁页面的接口
    // this.searchfn() //搜索的接口
  },
  methods: {
    levalFn(){
      this.subscript = null
    },
    colorFn(){
      let that =this
      that.navList.forEach((item,index)=>{
             if(item.url){
              if(that.$route.path.indexOf(`${item.url}`)>-1){
                that.isActive = index
              }
             }else{
                if(item.child_column && item.child_column.length != 0){
                  item.child_column.forEach((item1,index1)=>{
                    if(item1.url){
                      if(that.$route.path.indexOf(`${item1.url}`)>-1){
                          that.isActive = index
                          if(index == 0){
                            if(item1.id == that.$route.params.id){
                              that.isActive1 = index1
                            }
                          }
                      }
                    }
                  })
                }
              }
           })
    },
    homeFn(){
      this.$router.push("/index") ;
    },
    async columnfn() {
      let that = this;
      // let { data } = await column({ id: 14 });
      column({id:14}).then((res)=>{
        if(res.data.code == 0){
          that.navList = res.data.data
          this.colorFn()
        }
      });
    },
    serachFn(){
      if(!this.input2){
        return
      }
      this.$router.push(`/queryResults/${this.input2}`) ;
    },
    ulNavFn(data,index,boolen){
      let that = this;
      that.marginLeft = index*9.625-9.625
      that.isnavList = null
      if(index == 4){
        if(boolen){
          location.href = data.url
          that.subscript=null
        }else{
           that.subscript=null
        }
        
        return
      }else if(index == 1){
        that.subscript1 = 0
        that.isnavList = 0
      }else if(index == 5){
         if(boolen){
          this.$router.push(`/${data.url}/${data.id}`) ;
          that.subscript1 = null
          that.subscript=null
        }else{
           that.subscript1=null
           that.subscript=null
        }
        return
      }else{
        that.subscript1 = null
      }
      if(index == 2 && that.isActive==2) {
        if(that.$route.path.indexOf('peakCases')>-1){
          that.navList[index].child_column.forEach((item,index1)=>{
            if(item.id == sessionStorage.getItem('peakCasesId')){
              that.isActive1 = index1
            }
          })
          
        }
        
      }
      that.subscript = index;
    },
    linkFn1(data){
      this.$router.push(`/peakBusiness/${data.id}`) ;
      this.subscript = null
    },
    linkFn2(data,index){
      
      if(this.subscript != 1){
        return
      }
      this.isnavList = index
      this.subscript1 = index
      
    },
    linkFn(data,index){
      if(this.subscript != 1){
        if(data.name == '加入巅峰'){
        location.href = data.url
        }else if(this.subscript == 2){
          sessionStorage.setItem('peakCasesId',data.id)
          this.$router.push(`/peakCases/${data.id}`) ;
        }else{

          this.$router.push(`/${data.url}/${data.id}`) ;
        }
         this.subscript = null
      }else{
        this.subscript1 = index
       
      }
    }
  },
};
</script>

<style scoped lang="less">
.navList{
  background: #F2F2F2;
  color: red;
}
.divhover:hover{
  color: red;
}
.divhover1:hover{
  background: #CACACA;
}
.bg-purple{
  height: 1.25rem;
  border: 1px solid #CACACA;
  position: absolute;
  top: 1.45rem;
  background: #CACACA;
}
.grid-img{
  position: absolute;
  width: 1.5rem;
  z-index: 99;
  // background: #ffffff;
  top: .7rem;
  left: 1.3rem;
}
.grid-input{
  width: 6.13rem;
  height: 1.25rem;
  font-size: 0.88rem;;
  font-weight: 400;
  color: #B1B1B1;
  border: none;
  line-height: 1.25rem;
}
.grid-div{
  margin-left: 1rem;
  display: flex;
  height: 3.5rem;
  margin-top: .3rem;
  width: 100%;
}
#Header{
  padding: 1.5rem 0 1.5625rem 0;
}
.logo-img {
  height: 3.875rem;
}
.navli1 {
  height: 1.6875rem;
  font-size: 18px;
  margin-top: 32px;
  font-weight: 500;
}
.grid-content{
  display: flex;
  position: relative;
}
.navLIST{
  position: absolute;
  top: 3.75rem;
}
</style>