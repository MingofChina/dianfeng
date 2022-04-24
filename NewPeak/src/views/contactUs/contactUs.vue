<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <img src="../../assets/mines/Group 388@2x.png"/>
        <div class="lega-header-cont">
            <div>联系我们</div>
            <div>Contact us</div>
            <div></div>
        </div>
        <div class="lega-header-foot">
            <img src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div>联系我们</div>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <div class="lega-content-map"></div>
            <el-row :gutter="20">
                <el-col :span='8'  v-for="(item,index) in branchOffice" :key="index">
                    <div class="lega-content-div111">
                        <el-col :span='3'><img class="lega-img" src='../../assets/bei/icong_weizhi@2x.png'/></el-col>
                        <el-col :span='21' class="lega-div2">
                            <div>{{item.company_name}}</div>
                            <div>{{item.company_address}}</div>
                            <div>
                                <span style="margin-right:1rem"><img src='../../assets/bei/icom_dianhua@2x.png' style="width:1rem"/></span>
                                <span style="margin-right:.5rem">咨询电话：</span>
                                <span style="margin-right:.5rem">{{item.company_phone}}</span>
                            </div>
                            <div>
                                <span style="margin-right:1rem"><img src='../../assets/bei/icom_youxiang@2x.png' style="width:1rem"/></span>
                                <span style="margin-right:.5rem">业务邮箱：</span>
                                <span style="margin-right:.5rem">{{item.company_email}}</span>
                            </div>
                        </el-col>
                    </div>
                    
                </el-col>
                </el-row>
            <el-row :gutter="20" >
                
            </el-row>
        </div>
        
    </div>
  </div>
</template>
<script>
import { relation } from "@/api/api";
export default {
  data() {
    return {
      branchOffice:[],
      textHeml:'',
      baseUrl:'http://ceshi.davost.com'
    };
  },
  computed: {
  },
  mounted() {
      this.legislationfn() //调用联系我们接口
  },
  methods: {
    async legislationfn() {
      let { data } = await relation();
      data.data.branch_office.forEach((item1,index1)=>{

      })
      this.branchOffice=data.data.branch_office
    //   this.descriptionson=data.data.message.description
      console.log(data.data);
    },
  },
};
</script>

<style scoped>
#legalDeclaration{
    width: 100%;
    height: 100%;
    background: #F4F4F4;
}
.lega-content-map{
    width: 100%;
    height: 42.5rem;
    border: 1px solid red;
}
.lega-header {
    width: 100%;
    position: relative;
}
.lega-header img {
    width: 100%;
}
.lega-content-div11{
    width: 100%;
    margin-top: 2.5rem;

}
.lega-img{
    /* width: 2rem; */
    height: 2rem;
}
.lega-content-div111{
    margin-top: 2.5rem;
    height: 16.88rem;
    background: #FFFFFF;
    padding:2.81rem 0 2.5rem 2.5rem;
}
.lega-div2 div:nth-child(1){
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
    margin-right: 1.25rem;
    height: 1rem;
}
.lega-content{
    width: 94.5rem;
    margin:6.25rem auto 0;
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
