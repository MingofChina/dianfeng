<template>
  <div id="legalDeclaration">
    <div class="lega-header">
        <img :src="imgUrl"/>
        <div class="lega-header-cont">
            <div>联<span style="marginRight:.8rem"></span>系<span style="marginRight:.8rem"></span>我<span style="marginRight:.8rem"></span>们</div>
            <div>Contact us</div>
            <div></div>
        </div>
        <div class="lega-header-foot">
            <img @click='homeFn()' src="../../assets/search-img/icon_home@2x.png">
            <img src="../../assets/search-img/icon@2x.png">
            <div>联系我们</div>
        </div>
    </div>
    <div class="lega-content">
        <div class="lega-content-div1">
            <div class="lega-content-map" id="container"></div>
            <el-row :gutter="20">
                <el-col :span='item.span'  v-for="(item,index) in branchOffice" :key="index">
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
        </div>
        
    </div>
  </div>
</template>
<script>
import { relation,banner } from "@/api/api";
export default {
  data() {
    return {
      branchOffice:[],
      textHeml:'',
      imgUrl:'',
      baseUrl:'http://ceshi.davost.com'
    };
  },
  computed: {
  },
  mounted() {
      this.legislationfn() //调用联系我们接口
  },
  methods: {
    homeFn(){
      this.$router.push("/index") ;
    },
    async legislationfn() {
        let { data } = await relation();
        banner({id:this.$route.params.id}).then((res)=>{
             console.log(res)
            this.imgUrl = this.baseUrl+res.data.data[0].original_image
        });
       
        let lenth1 = data.data.branch_office.length
        let yushu = lenth1%3
        let shang1 = parseInt(lenth1/3)
        this.branchOffice=data.data.branch_office
        data.data.branch_office.forEach((item1,index1)=>{
            if(index1 < shang1*3){
                this.branchOffice[index1].span=8
            }else{
                this.branchOffice[index1].span = 24/yushu
            }
        })
        var map = new BMapGL.Map('container');    
        // 创建函数接收四个参数（提示信息的标题，详细地址，经度，纬度），并向map实例中添加一系列对象
        function addMessage(title, detailedAddress, longitude, latitude) {
        // 这里的let关键词是必须的，let声明是局部变量，且无变量提升，用完就会回收
        let point = new BMapGL.Point(longitude, latitude);
        // 初始化地图,设置中心点坐标和地图级别
        map.centerAndZoom(point, 3);
        // 开启鼠标滚轮缩放
        // var img_url = 'http://map.baidu.com/image/us_mk_icon.png';
        map.enableScrollWheelZoom(true);
        var myIcon = new BMapGL.Icon(require("./icong_weizhi@2x.png"), new BMapGL.Size(20, 25), {
				anchor: new BMapGL.Size(10, 25),
		});
        // 创建点标记
        let marker = new BMapGL.Marker(point,{icon:myIcon});
        var setText = '<div style="font-size: 1.5rem;margin-top:.5rem;font-weight: 500;margin-left:1.5rem;width:30rem"><img src="'+require("./icong_weizhi@2x.png")+'" style="width:1.25rem;height:1.5rem"/>'+title
        +'</div><div style="font-size: 10px;margin-left:3.2rem">'+detailedAddress+'</div>'
        // 在地图上添加点标记
        map.addOverlay(marker);
        // 创建窗口提升信息对象
        let opts = {
        height: 80,
        // title: title
        };
        let infoWindow = new BMapGL.InfoWindow(setText,opts);
        // 点标记添加点击事件
        marker.addEventListener('click', function () {
        map.openInfoWindow(infoWindow, point); // 开启信息窗口
        });
    }
    // 循环调用函数，给map实例添加对象
    for (let index = 0; index < data.data.branch_office.length; index++) {
        let objindex = data.data.branch_office[index];
        addMessage(objindex.company_name, objindex.company_address, objindex.longitude, objindex.latitude);
    }
    },
  },
};
</script>

<style scoped>
/deep/ .BMap_bubble_top{
    position: absolute;
    top: .3rem;
}
/deep/ .BMap_bubble_center{
    height: 3rem;
}
#legalDeclaration{
    width: 100%;
    height: 100%;
    background: #F4F4F4;
}
.lega-content-map{
    width: 100%;
    height: 42.5rem;
    /* border: 1px solid red; */
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
    margin-left: 6.1rem;
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
