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
  Tabs,
  Space,
} from "antd";
import dayjs from "dayjs";

import {
  UpOutlined,
  DownOutlined,
  SearchOutlined,
  UndoOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import TableList from "../../components/tableList/tableList";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import {
  getOptionsApi,
  getViolateListApi,
  getexportApi,
  getviolateVerifyApi,
  getclearRecordApi,
} from "../../api/api";
import "./violation.css";
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
    title: "平均速度（km/h）",
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
    width: 500,
    className: "columns",
  },
  {
    title: "监测地点",
    dataIndex: "monitorName",
    key: "monitorName",
    align: "center",
    width: 500,
    className: "columns",
  },
  {
    title: "测试重量（吨）",
    dataIndex: "showLoadF",
  },
  {
    title: "超限重量（吨）",
    dataIndex: "overLoadF",
  },
  {
    title: "超载率（%）",
    dataIndex: "overRate",
    key: "overRate",
    align: "center",
    className: "columns",
  },
  {
    title: "状态",
    dataIndex: "dealState",
    key: "dealState",
    align: "center",
  },
];
class Violation extends Component {
  state = {
    optionList: {},
    expand: true,
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
            color="#fff"
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
        title: "超限重量（吨）",

        align: "center",
        className: "columns",
        render: (_, item) => item.overLoad / 1000,
      },
      {
        title: "超载率（%）",
        dataIndex: "overRate",
        key: "overRate",
        align: "center",
        className: "columns",
      },
      {
        title: "状态",
        dataIndex: "dealState",
        key: "dealState",
        align: "center",
        className: "columns",
        render: (dealState) => {
          if (dealState === 1) {
            return "待处理";
          }
          if (dealState === 3) {
            return "已审核";
          }
          if (dealState === 4) {
            return <span style={{ color: "red" }}>已上传省厅</span>;
          }
          if (dealState === 2) {
            return "无效";
          }
        },
      },

      {
        title: "操作",
        align: "center",
        className: "columns",
        //  rel="opener"将token带给新页面
        render: (_, item) => {
          if (item.dealState === 1) {
            return (
              <Space>
                <Button
                  type="link"
                  onClick={() => this.getviolateVerify(item.id, 2)}
                >
                  标记无效
                </Button>
                <Button
                  type="link"
                  onClick={() => this.getviolateVerify(item.id, 3)}
                >
                  审核通过
                </Button>
                <Link
                  target="_blank"
                  to={`violationdetail/${item.id}/${item.isViolate}`}
                  rel="opener"
                >
                  详情
                </Link>
              </Space>
            );
          }
          if (item.dealState === 3) {
            return (
              <Link
                target="_blank"
                to={`violationdetail/${item.id}/${item.isViolate}`}
                rel="opener"
              >
                详情
              </Link>
            );
          }
          if (item.dealState === 4) {
            return (
              <Link
                target="_blank"
                to={`violationdetail/${item.id}/${item.isViolate}`}
                rel="opener"
              >
                详情
              </Link>
            );
          }
          if (item.dealState === 2) {
            return (
              <Space>
                <Link
                  target="_blank"
                  to={`violationdetail/${item.id}/${item.isViolate}`}
                  rel="opener"
                >
                  详情
                </Link>
                <Button
                  type="link"
                  danger
                  onClick={() => this.getclearRecord(item.id)}
                >
                  删除
                </Button>
              </Space>
            );
          }
        },
      },
    ],
    monitorType: "",
    dealState: "1",
    licensePlate: "",
    monitorId: "",
    startTime: "",
    endTime: "",
    licenseColor: "",
    carType: "",
    overLoadFlag: "",
    overLoad: "",
    overRateFlag: "",
    overRate: "",
    isViolate: 1,
    pageNum: 1,
    pageSize: 10,
    vehicleType: "",
    total: "",
  };
  componentDidMount() {
    this.getOptions();
    this.TabsItem();
    this.getViolateList();
    document.title = "违章查询";
  }

  TabsItem = (list, total) => {
    this.tabs = [
      {
        key: "1",
        label: `待审核`,
        children: (
          <div className="tabslist">
            <TableList columns={this.state.columns} dataSource={list} />
            <Footer total={total} Pagination={this.Pagination} />
          </div>
        ),
      },
      {
        key: "3",
        label: `历史数据`,
        children: (
          <div className="tabslist">
            <TableList columns={this.state.columns} dataSource={list} />
            <Footer total={total} Pagination={this.Pagination} />
          </div>
        ),
      },
      {
        key: "2",
        label: `无效数据`,
        children: (
          <div className="tabslist">
            <TableList columns={this.state.columns} dataSource={list} />
            <Footer total={total} Pagination={this.Pagination} />
          </div>
        ),
      },
    ];
  };
  getOptions = async () => {
    const res = await getOptionsApi({
      codenames: "deal_state,vehicle_type",
    });
    this.setState({ optionList: res });
  };
  getviolateVerify = async (violateId, status) => {
    await getviolateVerifyApi({
      violateId,
      status,
    });
    this.getViolateList();
  };

  getViolateList = async () => {
    const {
      monitorType,
      dealState,
      licensePlate,
      monitorId,
      startTime,
      endTime,
      licenseColor,
      carType,
      overLoadFlag,
      overLoad,
      overRateFlag,
      overRate,
      isViolate,
      pageNum,
      pageSize,
      vehicleType,
    } = this.state;
    const res = await getViolateListApi({
      monitorType,
      dealState: dealState || "",
      licensePlate,
      monitorId: monitorId || "",
      startTime,
      endTime,
      licenseColor: licenseColor || "",
      carType: carType || "",
      overLoadFlag: overLoadFlag || "",
      overLoad,
      overRateFlag,
      overRate,
      isViolate,
      vehicleType: vehicleType || "",
      pageNum,
      pageSize,
    });
    this.TabsItem(res.list, res.total);
    this.setState({ total: res.total });
  };

  getclearRecord = async (id) => {
    await getclearRecordApi({ violateId: id });
    this.getViolateList();
  };
  //更改日期函数
  ChangeRangePicker = (dates, dateStrings) => {
    this.setState(
      { startTime: dateStrings[0], endTime: dateStrings[1] },
      () => {
        this.getViolateList();
      }
    );
  };
  onChangeTabs = (key) => {
    this.setState({ dealState: key }, () => {
      this.getViolateList();
    });
  };

  // 点击导出下载excel文件
  getexport = async () => {
    const {
      monitorType,
      dealState,
      licensePlate,
      monitorId,
      startTime,
      endTime,
      licenseColor,
      carType,
      overLoadFlag,
      overLoad,
      overRateFlag,
      overRate,
      isViolate,
      vehicleType,
    } = this.state;
    const res = await getexportApi({
      monitorType,
      dealState,
      licensePlate,
      monitorId: monitorId || "",
      startTime,
      endTime,
      licenseColor: licenseColor || "",
      carType: carType || "",
      overLoadFlag: overLoadFlag || "",
      overLoad,
      overRateFlag,
      overRate,
      isViolate,
      vehicleType,
    });

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
    worksheet.addRows(res);

    ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `超重.xlsx`
      );
    });
  };
  Pagination = (page, pageSize) => {
    this.setState({ pageNum: page, pageSize }, () => {
      this.getViolateList();
    });
  };
  render() {
    const { optionList, expand, dealState, total } = this.state;
    return (
      <div className="violation">
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
                                  this.getViolateList();
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
                            style={{ minWidth: "90px", width: "156px" }}
                            placeholder="请选择"
                            onChange={(value) =>
                              this.setState({ vehicleType: value }, () => {
                                this.getViolateList();
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
                        <Form.Item label="车牌颜色" name="licenseColor">
                          <Select
                            allowClear
                            style={{ minWidth: "90px", width: "156px" }}
                            placeholder="请选择"
                            onChange={(value) =>
                              this.setState({ licenseColor: value }, () => {
                                this.getViolateList();
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
                                this.getViolateList();
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
                        <Form.Item label="状态" name="dealState">
                          <Select
                            allowClear
                            placeholder="请选择"
                            style={{ minWidth: "90px", width: "156px" }}
                            onChange={(value) => {
                              if (value == 4) {
                                this.onChangeTabs("3");
                              }
                              if (!value) {
                                this.onChangeTabs("1");
                              } else {
                                this.onChangeTabs(value);
                              }
                            }}
                          >
                            {optionList?.deal_state?.map((item) => {
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
                        <Form.Item label="车辆大小" name="platesize">
                          <Select
                            allowClear
                            placeholder="请选择"
                            style={{ minWidth: "90px", width: "156px" }}
                            onChange={(value) => {
                              this.setState({ carType: value }, () => {
                                this.getViolateList();
                              });
                            }}
                          >
                            <Option value="小型车">小型车</Option>
                            <Option value="大型车">大型车</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item label="超载量:">
                          <Input.Group compact>
                            <Form.Item
                              name={["overloadcapacity", "overLoadFlag"]}
                              noStyle
                            >
                              <Select
                                placeholder="请选择"
                                onChange={(value) => {
                                  this.setState({ overLoadFlag: value });
                                }}
                                allowClear
                              >
                                <Option value="0">{">="}</Option>
                                <Option value="1">{"<="}</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name={["overloadcapacity", "overLoad"]}
                              noStyle
                            >
                              <Input
                                allowClear
                                onChange={(e) =>
                                  this.setState({ overLoad: e.target.value })
                                }
                                onPressEnter={() => this.getViolateList()}
                                style={{
                                  width: "50%",

                                  marginLeft: "10px",
                                }}
                                placeholder="输入重量"
                              />
                            </Form.Item>
                          </Input.Group>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item label="超载率:">
                          <Input.Group compact>
                            <Form.Item
                              name={["overloadrate", "overRateFlag"]}
                              noStyle
                            >
                              <Select
                                allowClear
                                placeholder="请选择"
                                onChange={(value) => {
                                  this.setState({ overRateFlag: value });
                                }}
                              >
                                <Option value="0">{">="}</Option>
                                <Option value="1">{"<="}</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name={["overloadrate", "overRate"]}
                              noStyle
                            >
                              <Input
                                allowClear
                                style={{
                                  width: "50%",

                                  marginLeft: "10px",
                                }}
                                onChange={(e) =>
                                  this.setState({ overRate: e.target.value })
                                }
                                onPressEnter={() => this.getViolateList()}
                                placeholder="输入百分比"
                              />
                            </Form.Item>
                          </Input.Group>
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
                    onClick={this.getViolateList}
                  >
                    刷新
                  </Button>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={this.getViolateList}
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
          <Tabs
            activeKey={dealState}
            items={this.tabs}
            onChange={this.onChangeTabs}
          />
        </div>
      </div>
    );
  }
}

export default Violation;
