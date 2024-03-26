import React, { Component } from "react";
import { monitorPointAPi } from "../../../api/api";
class BaiduMap extends Component {
  state = {
    mapInfo: {},
  };
  componentDidMount() {
    this.monitorPoint();
  }

  monitorPoint = async () => {
    const res = await monitorPointAPi();
    this.setState({ mapInfo: res[0] }, () => {
      this.map();
    });
  };
  //百度地图
  map = () => {
    const { mapInfo } = this.state;
    const { BMap, BMAP_ANCHOR_BOTTOM_RIGHT } = window;
    var opts = {
      width: 10, // 信息窗口宽度
      height: 20, // 信息窗口高度
    };
    // var infoWindow = new BMap.InfoWindow(mapInfo.name, opts); // 创建信息窗口对象
    console.log(mapInfo);
    var map = new BMap.Map("allmap"); // 创建Map实例
    var point = new BMap.Point(mapInfo.longitude, mapInfo.latitude);
    map.centerAndZoom(point, 10); // 初始化地图,设置中心点坐标和地图级别

    var marker = new BMap.Marker(point); // 创建标注
    map.addControl(
      new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //右下角
      })
    );
    map.addOverlay(marker);
    // map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
  };

  render() {
    return (
      <div
        id="allmap"
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
    );
  }
}

export default BaiduMap;
