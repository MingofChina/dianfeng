<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/us.png"
           alt="">
      <div>
        <div class="cha">联系我们</div>
        <div class="eng">Contact work</div>
      </div>
    </div>
    <div class="content">
      <div id="container"
           style="width:width: 34.8rem;height: 18.42rem;"></div>
    </div>
    <div class="mark"
         v-for="(item,i) in addressInfo"
         :key="i">
      <div class="address">
        <img src="../../../assets/bei/icong_weizhi.png"
             alt="">
        <div class="addressInfo">{{item.company_name}}</div>
      </div>
      <div class="detail">{{item.company_address}}</div>
      <div class="phone">
        <img src="../../../assets/bei/icom_dianhua.png"
             alt="">
        <div class="name">咨询电话: <span>{{item.company_phone}}</span></div>
      </div>
      <div class="mail">
        <img src="../../../assets/bei/icom_youxiang.png"
             alt="">
        <div class="name">业务邮箱: <span>{{item.company_email}}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import { contant_h5 } from "../../../api/api.js";
export default {
  data () {
    return {
      addressInfo: '',
      lnglats: null,
    }
  },
  created () {
    // this.carGPSIP()
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      contant_h5().then((res) => {
        console.log(res, '地图');
        this.addressInfo = res.data.data.branch_office
        this.lnglats = res.data.data.branch_office.map(item => {
          return [item.longitude || 0, item.latitude || 0]
        })
        console.log(this.lnglats[4], 'gggg');
        this.carGPSIP()
      })
    },
    carGPSIP () {
      var map = new AMap.Map('container', {
        resizeEnable: true,
        center: [104.075809, 30.651239],
        zoom: 8
        // mapStyle: 'amap://styles/437f6c5da257741def39ad202cc9bdb1'
      })// 初始化地图
      // 信息窗口实例
      const icon = {
        size: new AMap.Size(28, 34),
        image: require('../../../assets/workdetail/icon(1).png'),
        imageSize: new AMap.Size(28, 34),
        anchor: 'center'
      }
      var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) })
      // 遍历生成多个标记点
      console.log(this.lnglats.length, '好多');
      for (var i = 0, marker; i < this.lnglats.length; i++) {
        console.log(this.lnglats[i], 'eeee');
        var marker = new AMap.Marker({
          icon: icon,
          position: this.lnglats[i], // 不同标记点的经纬度
          map: map
        })
        // marker.content = this.messageInfo
        marker.on('click', markerClick)
        marker.emit('click', { target: marker }) // 默认初始化不出现信息窗体,打开初始化就出现信息窗体
      }
      function markerClick (e) {
        infoWindow.setContent(e.target.content)
        infoWindow.open(map, e.target.getPosition())
      }
      map.setFitView()
    },
  }
}
</script>

<style lang="less" scoped>
.showImg {
  position: relative;
  .cha {
    position: absolute;
    top: 7.8rem;
    left: 15.25rem;
    width: 7.83rem;
    height: 2.5rem;
    font-size: 1.67rem;
    font-weight: bold;
    color: #ffffff;
    line-height: 1.95rem;
    letter-spacing: 4px;
    z-index: 2;
  }
  .eng {
    margin-top: 0.33rem;
    position: absolute;
    top: 9.8rem;
    left: 14.15rem;
    height: 1.25rem;
    font-size: 0.83rem;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    text-transform: uppercase;
    line-height: 0.98rem;
  }
}
.content {
  // margin-top: 1.67rem;
  // margin-left: 1.33rem;
  // margin-right: 1.33rem;
  margin: 1.67rem 1.33rem 2rem;
  .container {
    width: 34.8rem;
    height: 18.42rem;
  }
}
.mark {
  background: #f4f4f4;
  margin: 0 1.33rem 1.5rem 1.33rem;
  .address {
    display: flex;
    img {
      margin-top: 2.17rem;
      margin-left: 2rem;
      width: 2rem;
      height: 2rem;
    }
    .addressInfo {
      margin-left: 0.67rem;
      margin-top: 2.3rem;
      font-size: 1.33rem;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #231914;
      line-height: 1.56rem;
    }
  }
  .detail {
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    font-size: 1.17rem;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #3c3c3c;
    line-height: 1.37rem;
  }
  .phone {
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    display: flex;
    .name {
      font-size: 1.17rem;
      color: #3c3c3c;
      margin-left: 0.36rem;
      span {
        font-size: 1.17rem;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #231914;
        line-height: 1.37rem;
      }
    }
  }
  .mail {
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
    padding-bottom: 1.83rem;
    display: flex;
    .name {
      font-size: 1.17rem;
      color: #3c3c3c;
      margin-left: 0.36rem;
      span {
        font-size: 1.17rem;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #231914;
        line-height: 1.37rem;
      }
    }
  }
}
</style>