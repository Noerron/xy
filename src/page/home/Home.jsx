import React, { Component } from "react";
import "./home.css";
import Homeleft from "./homecomponents/Homeleft";
import Homecenter from "./homecomponents/Homecenter";
import Homeright from "./homecomponents/Homeright";
import {
  getCountApi,
  getHomeViolateListApi,
  getMonitorExceptionApi,
  violateByCarApi,
  violateByAreaApi,
  violateByHourApi,
} from "../../api/api";

class Home extends Component {
  state = {
    violateObj: {},
    numArr: [],
    numArr1: [],
    dataSource: [],
    monitorException: [],
    pie_data: [],
    xData: [],
    yData: [],
    mapInfo: [],
    curve_ydata: [],

    curve_name: [],
  };
  componentDidMount() {
    this.getCount();
    this.getHomeViolateList();
    this.violateByCar();
    this.getMonitorException();
    this.violateByArea();
    this.violateByHour();
    this.iTimer();
    document.title = "首页";
  }

  iTimer = () => {
    this.timer = setInterval(async () => {
      this.getCount();
      this.getHomeViolateList();
      this.violateByCar();
      this.getMonitorException();
      this.violateByArea();
    }, 10000);
  };
  getCount = async () => {
    const res = await getCountApi();
    this.toOrderNum(res.violateCount);
    this.toOrderNum1(res.days);
    this.setState({ violateObj: res });
  };
  toOrderNum = (num) => {
    num = num.toString();
    if (num.length < 8) {
      num = num.padStart(8, "0");
      let numArr = num.split("");
      this.setState({ numArr });
    }
  };
  toOrderNum1 = (num) => {
    num = num.toString();
    if (num.length < 8) {
      num = num.padStart(8, "0");
      let numArr1 = num.split("");
      this.setState({ numArr1 });
    }
  };
  getHomeViolateList = async () => {
    const res = await getHomeViolateListApi({
      pageNum: 1,
      pageSize: 10,
      isViolate: 1,
    });
    this.setState({ dataSource: res.list });
  };
  getMonitorException = async () => {
    const res = await getMonitorExceptionApi();
    this.setState({ monitorException: res });
  };

  violateByCar = async () => {
    const res = await violateByCarApi();
    const pie = res.map((item) => {
      return { value: item.violateCount, name: item.typeName };
    });
    this.setState({ pie_data: pie });
  };
  violateByArea = async () => {
    const res = await violateByAreaApi();
    let xData = [];
    let yData = [];
    res.map((item) => {
      xData.push(item.areaName);
      yData.push(item.violateCount);
    });
    this.setState({ xData, yData });
  };
  violateByHour = async () => {
    const res = await violateByHourApi();
    console.log(res);
    let curve_ydata = [];
    let curve_name = [];
    for (let i in res) {
      curve_name.push(i);
      curve_ydata.push(res[i]);
    }
    const data = curve_ydata.map((item) => {
      let arr = item.map((data) => {
        return data.hourcount;
      });
      return arr;
    });
    this.setState({ curve_name, curve_ydata: data });
  };
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div className="home_main">
          <Homeleft
            violateObj={this.state.violateObj}
            dataSource={this.state.dataSource}
            numArr={this.state.numArr}
          />
          <Homecenter
            dataSource={this.state.dataSource}
            pie_data={this.state.pie_data}
          />
          <Homeright
            numArr1={this.state.numArr1}
            monitorException={this.state.monitorException}
            xData={this.state.xData}
            yData={this.state.yData}
            curve_name={this.state.curve_name}
            curve_ydata={this.state.curve_ydata}
          />
        </div>
      </div>
    );
  }
}

export default Home;
