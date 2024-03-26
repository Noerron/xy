import React, { Component } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./homeright.css";
import img1 from "../../../asstes/imgs/下载 (2).png";
import img2 from "../../../asstes/imgs/xian.png";
import img3 from "../../../asstes/imgs/tongji.png";
import Graph from "../echarscomponents/Graph";
import Columnar from "../echarscomponents/Columnar";
class Homeright extends Component {
  componentDidUpdate() {
    if (this.props.numArr1.length === 8) {
      this.liRefanimation();
    }
  }
  ulinfo = () => {
    let a = [1, 2, 3, 4, 5, 6, 7, 8];
    let b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return a.map((item) => {
      return (
        <li key={item} className="right_li">
          {b.map((data) => (
            <span>{data}</span>
          ))}
        </li>
      );
    });
  };
  liRefanimation = () => {
    const right_li = document.querySelectorAll(".right_li");
    right_li.forEach((item, index) => {
      let ty = this.props.numArr1[index];
      item.style.transform = `translate(0%, -${ty * 100}%)`;
    });
  };
  render() {
    return (
      <div className="home_right column">
        <div className="summary column_item">
          <div className="title">
            <img src={img1} alt="" /> 监测点故障提醒
          </div>
          <div className="every_data">
            <div className="totalMileage">
              <p className="mileage_title">系统运行天数</p>
              <ul className="mileage_info">{this.ulinfo()}</ul>
            </div>
            <div className="communication">
              <p>
                {this.props.monitorException.length !== 0 ? (
                  this.props.monitorException?.map((item) => {
                    return (
                      <>
                        {item}{" "}
                        <CloseCircleOutlined
                          key={item}
                          style={{ color: "red" }}
                        />
                      </>
                    );
                  })
                ) : (
                  <>
                    所有监测点通讯正常
                    <CheckCircleOutlined style={{ color: "green" }} />
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="echats_graph">
          <div className="curve_box column_item">
            <div className="title">
              <img src={img2} alt="" /> 今日违章曲线数据
            </div>
            <Graph
              curve_name={this.props.curve_name}
              curve_ydata={this.props.curve_ydata}
            />
          </div>
          <div className="columnar_box column_item">
            <div className="title">
              <img src={img3} alt="" /> 今日站点违章统计
            </div>
            <Columnar xData={this.props.xData} yData={this.props.yData} />
          </div>
        </div>
      </div>
    );
  }
}

export default Homeright;
