var vm=new Vue(
    {
          el:'#mapproject',
          mounted:function(){
            this.BaiduMap();
          },
          methods:
          {
            BaiduMap:function(){
              var map = new BMap.Map("map");
               // 创建地图实例
               var point = new BMap.Point(113.34, 22.14);
              // 创建点坐标
              map.centerAndZoom(point, 12);
            }
          }
    }
  )
  
  