import React, { Component } from "react";
import { DatePicker, Row, Col } from "antd";
import {
  getViolateCountByMonthApi,
  getViolateCountByYearApi,
} from "../../api/api";
import dayjs from "dayjs";
import "./report.css";
import BarChart from "./echarscomponents/BarChart";
import PieChart from "./echarscomponents/PieChart";
import LineChart from "./echarscomponents/LineChart";
const monthFormat = "YYYY";
let myDate = new Date();
let year = myDate.getFullYear() + "";

class Report extends Component {
  state = {
    year: myDate.getFullYear() + "",
    barChartdata: [],
    pieChartdata: [],
  };
  componentDidMount() {
    this.getViolateCountByMonth();
    this.getViolateCountByYear();
    document.title = "可视化报表";
  }
  getViolateCountByMonth = async () => {
    const res = await getViolateCountByMonthApi({ year: this.state.year });
    this.setState({ barChartdata: res });
  };

  getViolateCountByYear = async () => {
    const res = await getViolateCountByYearApi({ year: this.state.year });
    this.setState({ pieChartdata: res });
  };
  onChange = (date, dateString) => {
    this.setState({ year: dateString }, () => {
      this.getViolateCountByMonth();
      this.getViolateCountByYear();
    });
  };

  render() {
    return (
      <div className="report-main">
        <DatePicker
          defaultValue={dayjs(year, monthFormat)}
          picker="year"
          onChange={this.onChange}
        />
        <Row>
          <Col span={16}>
            <div className="echars_div">
              <BarChart barChartdata={this.state.barChartdata} />
            </div>
          </Col>
          <Col span={8} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
            <div className="echars_div">
              <PieChart pieChartdata={this.state.pieChartdata} />
            </div>
          </Col>
        </Row>
        <Row style={{ padding: "20px 0" }}>
          <Col span={24} style={{ paddingRight: "10px" }}>
            <div className="echars_div">
              <LineChart barChartdata={this.state.barChartdata} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Report;
