<template>
  <div id="app">
    <div class="showImg">
      <img src="../../../assets/imgs/us.png"
           alt="" />
      <div>
        <div class="cha">联系我们</div>
        <div class="eng">Contact work</div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="content">
      <div id="container"
           style="width:100%;height: 18.42rem;"></div>
    </div>
    <div class="mark"
         v-for="(item, i) in addressInfo"
         :key="i">
      <div class="address">
        <img src="../../../assets/imgs/local.png"
             alt="" />
        <div class="addressInfo">{{ item.company_name }}</div>
      </div>
      <div class="detail">{{ item.company_address }}</div>
      <div class="phone">
        <img src="../../../assets/imgs/phone.png"
             alt="" />
        <div class="name">
          咨询电话:
          <span>{{ item.company_phone }}</span>
        </div>
      </div>
      <div class="mail">
        <img src="../../../assets/imgs/e-mail.png"
             alt="" />
        <div class="name">
          业务邮箱:
          <span>{{ item.company_email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { contant_h5 } from '../../../api/api.js';
export default {
  data () {
    return {
      addressInfo: '',
      lnglats: null
    };
  },
  created () {
    // this.carGPSIP()
  },
  mounted () {
    this.getList();
  },
  methods: {
    getList () {
      contant_h5().then(res => {
        console.log(res, '地图');
        this.addressInfo = res.data.data.branch_office;
        this.lnglats = res.data.data.branch_office.map(item => {
          return [item.longitude || 0, item.latitude || 0];
        });
        console.log(this.lnglats[4], 'gggg');
        this.carGPSIP();
      });
    },
    carGPSIP () {
      var map = new AMap.Map('container', {
        resizeEnable: true,
      }); // 初始化地图
      var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
      // 遍历生成多个标记点
      console.log(this.lnglats, '好多');
      for (var i = 0, marker; i < this.lnglats.length; i++) {
        // console.log(this.lnglats[i], 'eeee');
        var marker = new AMap.Marker({
          icon: new AMap.Icon({
            image:require('../../../assets/imgs/local.png'),
            size: new AMap.Size(20, 20),  //图标大小
            imageSize: new AMap.Size(20,20),
          }),
          position: this.lnglats[i], // 不同标记点的经纬度
          map: map
        });
        console.log(this.addressInfo[i].company_address, 'info');
        marker.content = this.addressInfo[i].company_address
        marker.on('click', markerClick);
        marker.emit('click', { target: marker }); // 默认初始化不出现信息窗体,打开初始化就出现信息窗体
      }
      function markerClick (e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
      }
      map.setFitView();
    }
  }
};
</script>

<style lang="less" scoped>
.showImg {
  position: relative;
  img {
    width: 100%;
  }
  .cha {
    width: 100%;
    position: absolute;
    top: 40%;
    text-align: center;

    height: 2.5rem;
    font-size: 1.67rem;
    font-weight: bold;
    color: #ffffff;
    line-height: 1.95rem;
    letter-spacing: 4px;
    z-index: 2;
  }
  .eng {
    width: 100%;
    margin-top: 0.33rem;
    position: absolute;
    text-align: center;
    top: 51%;
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
    img {
      // margin-top: 2.17rem;
      // margin-left: 2rem;
      width: 2rem;
      height: 2rem;
    }
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
    img {
      // margin-top: 2.17rem;
      // margin-left: 2rem;
      width: 2rem;
      height: 2rem;
    }
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
