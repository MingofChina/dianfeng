<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <img src="../../assets/mines/Group 389@2x.png"/>
        <div class="lega-header-cont">
            <div>网站地图</div>
            <div>Site map</div>
            <div></div>
        </div>
        <div class="lega-header-foot">
            <img src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div>网站地图</div>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <div class="lega-content-divtext" v-for="(item,index) in navList" :key="item.id+index">
                <el-row><div class="divtext1" @click="homeFn(item)">{{item.name}}</div></el-row>
                <el-row>
                    <div class="divtext2" v-if="item.child_column && item.child_column.length!=0">
                        <el-col style="margin-top:1rem" :span="(item1.childcontent&&item1.childcontent.length !=0)?24:3" v-for='(item1,index1) in item.child_column' :key="item1.id+index1">
                            <el-col :span="24" ><div @click="navFn(item1,index1)">{{item1.name}}</div></el-col>
                            <el-col style="margin-top:.63rem" :span="24" v-if='item1.childcontent&&item1.childcontent.length !=0'>
                                <span @click="navFn1(item1,index1)" class="divtext3" v-for="(item2,index2) in item1.childcontent" :key="item2+index2">{{item2.title}}</span>
                            </el-col>
                        </el-col>
                    </div>
                </el-row>
                
            </div>
            
        </div>
        
    </div>
  </div>
</template>
<script>
import { column } from "@/api/api";
export default {
  data() {
    return {
      mesage:'',
      textHeml:'',
      navList:[]
    };
  },
  computed: {
  },
  mounted() {
      this.columnfn() //调用联系我们接口
  },
  methods: {
    async columnfn() {
      let that= this;
      // let { data } = await column({ id: 14 });
      that.navList.push({id:'2',name:"首页"})
      column({id:14}).then((res)=>{
        if(res.data.code == 0){
          
        res.data.data.forEach((item,index) => {
            that.navList.push(item)
        });
        }
      })
      
    },
    homeFn(data){
        console.log(data)
        if(data.name =='巅峰公开课'){
             location.href = data.url
        }else if(data.name =='联系我们'){  
             this.$router.push(`/${data.url}`) ;
        }else{
            this.$router.push("/index") ;
        }
        
        
    },
    navFn(item,index){
        if(item.childcontent&&item.childcontent.length !=0){
            return
        }else{
            if(item.name !='加入巅峰'){
                this.$router.push(`/${item.url}/${item.id}`) ;
            }else{
                location.href = item.url
            }
            
        }
    },
    navFn1(data,index){
        this.$router.push(`/peakBusiness/${data.id}`) ;
    }
  },
};
</script>

<style scoped>
.divtext1{
    width: 100%;
    font-weight: 500;
    font-size: 2.13rem;
    /* margin-bottom: 1.25rem; */
}
.divtext3{
    font-weight: 300;
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
    margin-top:  0.63rem;
    margin-right: 3.65rem;
     white-space:nowrap; 
}
.divtext2{
    font-weight: 400;
    font-size: 1.75rem;
    margin-top:  0.63rem;
    min-height: 3rem;
    margin-bottom: 0.63rem;
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
.lega-header-foot img{
    width: 1rem;
    margin-right: 1.25rem;
    height: 1rem;
}
.lega-header-foot div{
    margin-right: 1rem;
    line-height: 15px;
}
.lega-content{
    width: 90.5rem;
    margin:6.25rem auto 0;
    background: #FFFFFF;
    padding-bottom: 6.25rem;
}
.lega-content-div1{
    width: 80.5rem;
    margin: 0 auto;
}
.lega-content-divtext{
    width: 100%;
    margin-bottom: 1.88rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid #CACACA;
}
.lega-content-divtext:nth-child(1){
    padding-top: 3.75rem;
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
