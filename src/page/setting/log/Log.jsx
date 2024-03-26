import React, { Component } from "react";
import TableList from "../../../components/tableList/tableList";
import Footer from "../../../components/footer/Footer";
import { Button, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { selectSystemlogApi } from "../../../api/api";
import { getToken } from "../../../util/localStorage";
import "./log.css";
const columns = [
  {
    title: "序号",

    align: "center",
    className: "columns",
    render: (text, _, index) => index + 1,
  },
  {
    title: "用户名称",
    dataIndex: "operUserName",
    key: "operUserName",

    align: "center",
    className: "columns",
  },

  {
    title: "日志类型",
    dataIndex: "menuType",
    key: "menuType",

    align: "center",
    className: "columns",
  },
  {
    title: "日志内容",
    dataIndex: "content",
    key: "content",

    align: "center",
    className: "columns",
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
    align: "center",
    className: "columns",
    render: (state) => (state === 2 ? "失败" : "成功"),
  },
  {
    title: "记录时间",
    dataIndex: "operTime",
    key: "operTime",

    align: "center",
    className: "columns",
  },
];
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
const { RangePicker } = DatePicker;
class Log extends Component {
  state = {
    dataSource: [],
    userName: "",
    content: "",
    pageNum: 1,
    pageSize: 10,
    startTime: "",
    endTime: "",
    total: "",
  };
  componentDidMount() {
    this.selectSystemlog();
  }
  selectSystemlog = async () => {
    const res = await selectSystemlogApi({
      userName: this.state.userName || "",
      content: this.state.content || "",
      menuType: "",
      startTime: this.state.startTime || "",
      endTime: this.state.endTime || "",
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    });
    this.setState({ dataSource: res.list, total: res.total });
  };
  onFinish = (value) => {
    this.setState({ userName: value.userName, content: value.content }, () => {
      this.selectSystemlog();
    });
  };

  //更改日期函数
  ChangeRangePicker = (dates, dateStrings) => {
    this.setState(
      { startTime: dateStrings[0], endTime: dateStrings[1] },
      () => {
        this.selectSystemlog();
      }
    );
  };

  Pagination = (page, pageSize) => {
    this.setState({ pageNum: page, pageSize }, () => {
      this.selectSystemlog();
    });
  };

  exportExcel = () => {
    // /weighing/user/exportUser?userName=${userName}&mobilPhone=${mobilPhone}
    fetch(
      `/weighing/systemlog/exportSystemlog?userName=${this.state.userName}&content=${this.state.content}&endTime=${this.state.endTime}&startTime=${this.state.startTime}`,
      {
        method: "get",
        headers: {
          token: getToken(),
        },
      }
    )
      .then((req) => req.blob())
      .then((res) => {
        const blob = new Blob([res]);
        const fileName = "系统日志.xls";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
  };
  render() {
    return (
      <div className="bottom_box">
        <div className="head">
          <Form
            name="horizontal_login"
            layout="inline"
            className="from"
            onFinish={this.onFinish}
          >
            <Form.Item label="用户名称" name="userName">
              <Input
                placeholder="请输入用户名称"
                onChange={(e) => this.setState({ userName: e.target.value })}
                onPressEnter={() => this.querysystemlogApi()}
              />
            </Form.Item>
            <Form.Item label="日志内容关键字:" name="content">
              <Input
                placeholder="请输入关键字"
                onChange={(e) => this.setState({ content: e.target.value })}
                onPressEnter={() => this.querysystemlogApi()}
              />
            </Form.Item>

            <div className="logfromitem">
              <Form.Item name="creatTime" label="记录时间:">
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

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ marginRight: "8px" }}
                >
                  搜索
                </Button>
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={this.exportExcel}
                >
                  导出
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>

        <TableList columns={columns} dataSource={this.state.dataSource} />
        <Footer total={this.state.total} Pagination={this.Pagination} />
      </div>
    );
  }
}

export default Log;
