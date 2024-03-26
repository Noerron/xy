import React, { Component } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
  Tooltip,
} from "antd";
import dayjs from "dayjs";

import {
  UpOutlined,
  DownOutlined,
  SearchOutlined,
  UndoOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import TableList from "../../components/tableList/tableList";
import { getOptionsApi, getVehicleListApi } from "../../api/api";
import "./passing.css";
const { Option } = Select;
const { RangePicker } = DatePicker;
const rangePresets = [
  {
    label: "一周",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "14天",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "一个月",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "90天",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];
const columnsadd = [
  {
    title: "车牌号",
    dataIndex: "licensePlate",
    key: "licensePlate",

    align: "center",
    className: "columns",
  },
  {
    title: "车辆轴数",
    dataIndex: "vehicleType",
    key: "vehicleType",
    className: "columns",
    align: "center",
  },

  {
    title: "监测时间",
    dataIndex: "violateTime",
    key: "violateTime",
    align: "center",
    width: 300,
    className: "columns",
  },
  {
    title: "监测地点",
    dataIndex: "monitorName",
    key: "monitorName",
    align: "center",
    width: 300,
  },

  {
    title: "测试重量（吨）",
    dataIndex: "showLoad",
    key: "showLoad",
  },
  {
    title: "是否违章",
    dataIndex: "isViolate",
    key: "isViolate",
    align: "center",
    render: (isViolate) =>
      isViolate ? <span style={{ color: "red" }}>超重</span> : "正常",
  },
];
class Passing extends Component {
  state = {
    expand: true,
    optionList: [],
    licensePlate: "",
    monitorId: "",
    startTime: "",
    endTime: "",
    licenseColor: "",
    pageNum: 1,
    pageSize: 10,
    vehicleType: "",
    carType: "",
    total: "",
    exlsData: [],
    dataSource: [],
    columns: [
      {
        title: "序号",
        render: (_, e, index) => index + 1,
        align: "center",
        className: "columns",
      },
      {
        title: "车牌号",
        dataIndex: "licensePlate",
        key: "licensePlate",

        align: "center",
        className: "columns",
      },
      {
        title: "车辆轴数",
        dataIndex: "vehicleType",
        key: "vehicleType",
        className: "columns",
        align: "center",
      },
      {
        title: "车辆缩略图",
        dataIndex: "thumbnail",
        key: "thumbnail",
        className: "columns",
        align: "center",
        render: (_, item, index) => (
          <Tooltip
            placement="right"
            overlayStyle={{ minWidth: 420 }}
            title={
              <img
                src={`${item.frontPhotoUrl}`}
                style={{ width: "400px", height: "240px" }}
                alt=""
              />
            }
          >
            <img
              src={`${item.frontPhotoUrl}`}
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
          </Tooltip>
        ),
      },
      {
        title: "速度（km/h）",
        dataIndex: "velocity",
        key: "velocity",
        className: "columns",
        align: "center",
      },
      {
        title: "监测时间",
        dataIndex: "violateTime",
        key: "violateTime",
        align: "center",
        className: "columns",
      },
      {
        title: "监测地点",
        dataIndex: "monitorName",
        key: "monitorName",
        align: "center",
        className: "columns",
      },
      {
        title: "测试重量（吨）",

        align: "center",
        className: "columns",
        render: (_, item) => item.showLoad / 1000,
      },

      {
        title: "是否违章",
        dataIndex: "isViolate",
        key: "isViolate",
        align: "center",
        className: "columns",
        render: (isViolate) =>
          isViolate ? <span style={{ color: "red" }}>超重</span> : "正常",
      },

      {
        title: "操作",
        align: "center",
        className: "columns",
        //  rel="opener"将token带给新页面
        render: (_, item) => {
          console.log(item);
          return (
            <Link
              target="_blank"
              to={
                item.isViolate === 1
                  ? `violationdetail/${item.oldId}/${item.monitorId}`
                  : `/passingdetail/${item.id}/${item.isViolate}`
              }
              rel="opener"
            >
              详情
            </Link>
          );
        },
      },
    ],
  };
  componentDidMount() {
    this.getOptions();
    this.getVehicleList();
    document.title = "过车查询";
  }
  getOptions = async () => {
    const res = await getOptionsApi({
      codenames: "deal_state,vehicle_type",
    });
    this.setState({ optionList: res });
  };
  getVehicleList = async () => {
    const {
      licensePlate,
      monitorId,
      startTime,
      endTime,
      licenseColor,
      pageNum,
      pageSize,
      carType,
      vehicleType,
    } = this.state;
    const res = await getVehicleListApi({
      licensePlate,
      monitorId: monitorId || "",
      startTime,
      endTime,
      licenseColor,
      pageNum,
      carType: carType || "",
      pageSize,
      vehicleType: vehicleType || "",
    });
    const exlsData = res.list.map((item) => {
      return {
        licensePlate: item.licensePlate,
        vehicleType: item.vehicleType,
        showLoad: item.showLoad / 1000,
        isViolate: item.isViolate ? "违章" : "正常",
        violateTime: item.violateTime,
        monitorName: item.monitorName,
      };
    });

    this.setState({ dataSource: res.list, total: res.total, exlsData });
  };
  Pagination = (page, pageSize) => {
    this.setState({ pageNum: page, pageSize }, () => {
      this.getVehicleList();
    });
  };

  getexport = () => {
    var ExcelJSWorkbook = new ExcelJS.Workbook();
    var worksheet = ExcelJSWorkbook.addWorksheet("ExcelJS sheet");
    var columnsData = columnsadd.map((column) => {
      const width = column.width;
      return {
        header: column.title,
        key: column.dataIndex,
        width: isNaN(width) ? 20 : width / 10,
      };
    });

    worksheet.columns = columnsData;
    worksheet.addRows(this.state.exlsData);

    ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `超重.xlsx`
      );
    });
  };
  //更改日期函数
  ChangeRangePicker = (dates, dateStrings) => {
    this.setState(
      { startTime: dateStrings[0], endTime: dateStrings[1] },
      () => {
        this.getVehicleList();
      }
    );
  };
  render() {
    const { expand, optionList, total, columns, dataSource } = this.state;
    return (
      <div className="passing">
        <div className="violation_main">
          <div className="box">
            <div className="updown-main">
              <div>
                {expand ? (
                  <Form
                    autoComplete="off"
                    className="form"
                    labelCol={{
                      span: 6,
                    }}
                  >
                    <Row>
                      <Col span={4}>
                        <Form.Item label="车牌号码" name="licensePlate">
                          <Input
                            placeholder="请输入车牌"
                            onChange={(e) =>
                              this.setState(
                                { licensePlate: e.target.value },
                                () => {
                                  this.getVehicleList();
                                }
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item label="车辆轴数" name="vehicleType">
                          <Select
                            allowClear
                            placeholder="请选择"
                            style={{ minWidth: "90px", width: "156px" }}
                            onChange={(value) =>
                              this.setState({ vehicleType: value }, () => {
                                this.getVehicleList();
                              })
                            }
                          >
                            {optionList?.vehicle_type?.map((item) => {
                              return (
                                <Option
                                  value={item.codevalue}
                                  key={item.codevalue}
                                >
                                  {item.tranvalue}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={4}>
                        <Form.Item name="creatTime" label="监测时间:">
                          <RangePicker
                            allowClear
                            presets={rangePresets}
                            showTime
                            onChange={(dates, dateStrings) =>
                              this.ChangeRangePicker(dates, dateStrings)
                            }
                            defaultValue={dayjs("2015-01-01", "YYYY-MM-DD")}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={4}>
                        <Form.Item name="monitorId" label="监测地点:">
                          <Select
                            allowClear
                            placeholder="请选择"
                            style={{ minWidth: "90px", width: "156px" }}
                            onChange={(value) =>
                              this.setState({ monitorId: value }, () => {
                                this.getVehicleList();
                              })
                            }
                          >
                            {optionList?.monitor_info?.map((item) => {
                              return (
                                <Option
                                  value={item.codevalue}
                                  key={item.codevalue}
                                >
                                  {item.tranvalue}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item label="车牌颜色" name="licenseColor">
                          <Select
                            allowClear
                            placeholder="请选择"
                            style={{ minWidth: "90px", width: "156px" }}
                            onChange={(value) =>
                              this.setState({ licenseColor: value }, () => {
                                this.getVehicleList();
                              })
                            }
                          >
                            <Option value="蓝">蓝牌</Option>
                            <Option value="黄">黄牌</Option>
                            <Option value="白">白牌</Option>
                            <Option value="绿">绿牌</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item label="车辆大小" name="platesize">
                          <Select
                            allowClear
                            placeholder="请选择"
                            style={{ minWidth: "90px", width: "156px" }}
                            onChange={(value) => {
                              this.setState({ carType: value }, () => {
                                this.getVehicleList();
                              });
                            }}
                          >
                            <Option value="小型车">小型车</Option>
                            <Option value="大型车">大型车</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                ) : null}
                <Button
                  type="primary"
                  icon={expand ? <DownOutlined /> : <UpOutlined />}
                  onClick={() => this.setState({ expand: !expand })}
                >
                  {expand ? "收起筛选" : "展开筛选"}
                </Button>
                <div className="num_all">
                  <Button
                    type="primary"
                    icon={<UndoOutlined />}
                    onClick={this.getVehicleList}
                  >
                    刷新
                  </Button>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={this.getVehicleList}
                  >
                    查询
                  </Button>
                  <Button
                    type="primary"
                    icon={<SelectOutlined />}
                    onClick={this.getexport}
                  >
                    导出
                  </Button>
                  &nbsp; 违章总数为{" "}
                  <span style={{ color: "red" }}>{total}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="table">
            <TableList columns={columns} dataSource={dataSource} />
            <Footer total={total} Pagination={this.Pagination} />
          </div>
        </div>
      </div>
    );
  }
}

export default Passing;
