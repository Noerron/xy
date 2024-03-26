import React, { Component } from "react";
import { Table } from "antd";
import "./homeleft.css";
import img1 from "../../../asstes/imgs/下载.png";
import img2 from "../../../asstes/imgs/下载 (1).png";

const columns = [
  {
    title: "车牌号",
    dataIndex: "licensePlate",
    key: "licensePlate",

    align: "center",
    className: "columns",
  },
  {
    title: "车轴",
    dataIndex: "vehicleType",
    key: "vehicleType",
    className: "columns",
    align: "center",
  },
  {
    title: "车重（吨）",
    dataIndex: "showLoad",
    key: "showLoad",
    className: "columns",
    align: "center",
    render: (showLoad) => showLoad / 1000,
  },
  {
    title: "日期",
    dataIndex: "violateTime",
    key: "violateTime",
    className: "columns",
    align: "center",
  },
  {
    title: "地点",
    dataIndex: "monitorName",
    key: "monitorName",
    className: "columns",
    align: "center",
  },
];
class Homeleft extends Component {
  componentDidUpdate() {
    if (this.props.numArr.length === 8) {
      this.liRefanimation();
    }
  }
  ulinfo = () => {
    let a = [1, 2, 3, 4, 5, 6, 7, 8];
    let b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return a.map((item) => {
      return (
        <li key={item} className="left_li">
          {b.map((data) => (
            <span>{data}</span>
          ))}
        </li>
      );
    });
  };

  liRefanimation = () => {
    const left_li = document.querySelectorAll(".left_li");
    left_li.forEach((item, index) => {
      let ty = this.props.numArr[index];
      item.style.transform = `translate(0%, -${ty * 100}%)`;
    });
  };
  render() {
    return (
      <div className="home_left column">
        <div className="all_data column_item">
          <div className="title">
            <img src={img1} alt="" /> 系统运行状态
          </div>
          <div className="every_data">
            <div className="totalMileage">
              <p className="mileage_title">总违章(次数)</p>
              <ul className="mileage_info">{this.ulinfo()}</ul>
            </div>
            <div className="numberBox">
              <div className="addressNumber">
                <p>今日违章</p>
                <p className="dataNum">
                  <label
                    style={{ color: " rgb(246, 160, 78)", fontSize: "25px" }}
                  >
                    {this.props?.violateObj?.todayCount}
                  </label>
                  次
                </p>
              </div>
              <div className="addressNumber">
                <p>昨日违章</p>
                <p className="dataNum">
                  <label style={{ color: " red", fontSize: "25px" }}>
                    {this.props?.violateObj?.yestodayCount}
                  </label>
                  次
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="new_violate column_item">
          <div className="title">
            <img src={img2} alt="" /> 最新超重违章车辆列表
          </div>
          <div className="table">
            <Table
              rowClassName={(record, index) => {
                let className = "";
                className = index % 2 === 0 ? "oddRow" : "evenRow";
                return className;
              }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    window.open(
                      `/violationdetail/${record.id}/${record.monitorId}`,
                      "_blank"
                    );
                  }, // 点击行
                };
              }}
              size={"middle"}
              bordered={false}
              rowKey={"id"}
              dataSource={this.props.dataSource}
              columns={columns}
              pagination={false}
            />
            {/* <TableList
              columns={columns}
              dataSource={this.props.dataSource}
              over={true}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Homeleft;
