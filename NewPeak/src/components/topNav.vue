<template>
  <div id="Header">
    <el-row :gutter="20">
      <el-col :span="5" style="text-align:center">
        <img src="../assets/img/logo.png"  alt=""  class="logo-img" />
      </el-col>
      <el-col :span="14">
        <el-row style="line-height:4.125rem;
        font-size: 18px;font-weight:400"> 
          <el-col :span="4" v-for="(item,index) in navList" :key="index" >
            <div @click="ulNavFn(item,index)">{{item.name}}</div>
          </el-col>
        </el-row>
        <el-row v-if="subscript|| subscript==0" class="navLIST" :style="{width:(subscript1||subscript1==0)?'44.625rem':'33.25rem',zIndex:99,marginLeft:marginLeft+'rem',background:'#FFFFFF'}"> 
          <el-col :span="(subscript == 1)?8:12 ">
            <img  v-show="navList[subscript].original_image" :src="baseUrl+navList[subscript].original_image" style="width:11rem;height:8.25rem;margin:4.625rem 2.025rem 2.875rem 1.75rem"/>
          </el-col>
          <el-col :span="(subscript==0||subscript==2)?12:4" >
            <el-col :span="(subscript==0||subscript==2)?12:24"  v-for="(item,index) in navList[subscript].child_column" :key="item.id"><div class="navli1" @click="linkFn(item,index)">{{item.name}}</div></el-col>
          </el-col>
          <el-col :span="12"  v-if="(subscript1 || subscript1 == 0) &&navList[subscript].child_column[subscript1].childcontent" style="background:#F2F2F2;height:26.5rem">
            <el-col :span="12" class="navli1" v-for="(item,index) in navList[subscript].child_column[subscript1].childcontent" :key="item.id"><div @click="linkFn1(item)">{{item.title}}</div></el-col>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5" style="line-height:4.125rem"><div class="grid-content bg-purple">1</div></el-col>
    </el-row>
  </div>
</template>

<script>
import { column, formsjie ,search} from "@/api/api";
export default {
  data() {
    return {
      navList:[],
      subscript:null,
      subscript1:null,
      marginLeft:9.625,
      baseUrl:'http://ceshi.davost.com'
    };
  },

  mounted() {
    this.columnfn(); //头部搜岁页面的接口
     document.addEventListener("click",e=>{
      let that = this
      if (!this.$el.contains(e.target)) {
        this.subscript = null
      } else {
       
      }
     })
    // this.formsjiefn(); //头部搜岁页面的接口
    // this.searchfn() //搜索的接口
  },
  methods: {
    async columnfn() {
      let that= this;
      // let { data } = await column({ id: 14 });
      column({id:14}).then((res)=>{
        console.log(res)
        if(res.data.code == 0){
          that.navList = res.data.data
        }
      })
      
    },
    ulNavFn(data,index){
      let that = this;
      that.marginLeft = index*9.625-9.625
      if(index == 4){
        location.href = data.url
        that.subscript=null
        return
      }else if(index == 1){
        that.subscript1 = 0
      }else if(index == 5){
         this.$router.push(`/${data.url}`) ;
        that.subscript1 = null
        return
      }else{
        that.subscript1 = null
      }
      that.subscript=index

    },
    linkFn1(data){
      this.$router.push(`/peakBusiness/${data.id}`) ;
      this.subscript = null
    },
    linkFn(data,index){
      if(this.subscript != 1){
        if(data.name == '加入巅峰'){
        location.href = data.url
        }else{
          this.$router.push(`/${data.url}/${data.id}`) ;
        }
      }else{
        this.subscript1 = index
      }
      this.subscript = null
      
    }
    // async formsjiefn() {
    //   let { data } = await formsjie({ company: 1, name: 11, phone: 1111 });
    //   // console.log(data);
    // },
    //  async searchfn() {
    //   let { data } = await search({ id: 45, search_keywords: "巅峰", pages: 1,pagesize:8 });
    //   console.log(data);
    // },
  },
};
</script>

<style scoped lang="less">
#Header{
  padding: 1.5rem 0 1.5625rem 0;
}
.logo-img{
  height: 3.875rem;
}
.navli1{
  height: 1.6875rem;
  font-size: 18px;
  margin-top: 32px;
  font-weight: 500;
}
.navLIST{
  position: absolute;
  top:3.75rem;
}
</style>