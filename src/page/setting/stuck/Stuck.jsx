import React, { Component } from "react";

import { Button, Modal, Form, InputNumber } from "antd";
import { getlistApi, configApi } from "../../../api/api";
import TableList from "../../../components/tableList/tableList";
class Stuck extends Component {
  state = {
    dataSource: [],
    isModalOpen: false,
    approvedLoad: 0,
    vehicleType: 0,
  };
  form = React.createRef();
  componentDidMount() {
    this.initColums();
    this.getlist();
  }

  initColums = () => {
    this.columns = [
      {
        title: "序号",
        className: "columns",
        render: (record, _, index) => index + 1,
        align: "center",
      },
      {
        title: "轴数",
        dataIndex: "vehicleType",
        key: "vehicleType",
        align: "center",
        className: "columns",
        render: (vehicleType) => vehicleType + "轴",
      },
      {
        title: "核载标准（千克）",
        dataIndex: "approvedLoad",
        align: "center",
        key: "approvedLoad",
        className: "columns",
      },
      {
        title: "超载标准（千克）",
        dataIndex: "approvedLoadLimit",
        key: "approvedLoadLimit",
        align: "center",
        editable: true,
        className: "columns",
      },
      {
        title: "超载率（%）",
        render: (record) => {
          const a =
            ((record.approvedLoadLimit - record.approvedLoad) /
              record.approvedLoad) *
            100;
          return a.toFixed(2);
        },
        editable: true,
        align: "center",
        className: "columns",
      },
      {
        title: "操作",
        align: "center",
        className: "columns",
        render: (record) => (
          <Button type="primary" onClick={() => this.edit(record)}>
            编辑
          </Button>
        ),
      },
    ];
  };

  getlist = async () => {
    const res = await getlistApi();
    this.setState({ dataSource: res.monitorConfigInfo });
  };
  edit = (record) => {
    this.setState({
      isModalOpen: true,
      approvedLoad: record.approvedLoad,
      vehicleType: record.vehicleType,
    });
    const a =
      ((record.approvedLoadLimit - record.approvedLoad) / record.approvedLoad) *
      100;

    setTimeout(() => {
      console.log(this.form);
      //设置表单的值
      this.form.current.setFieldsValue({
        ...record,
        overloadrate: a.toFixed(2),
      });
    }, 0);
  };

  //关闭对话框函数
  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };
  handleapprovedLoadLimit = (value) => {
    const approvedLoadLimit =
      value * this.state.approvedLoad * 0.01 + Number(this.state.approvedLoad);
    console.log(approvedLoadLimit);
    setTimeout(() => {
      this.form.current.setFieldsValue({
        approvedLoadLimit,
      });
    }, 0);
  };
  config = async (value) => {
    await configApi({
      ...value,
      approvedLoad: this.state.approvedLoad,
      vehicleType: this.state.vehicleType,
    });
    this.getlist();
  };

  handleOk = () => {
    this.form.current.validateFields().then((value) => {
      this.handleCancel();
      this.config(value);
    });
  };

  handleChange = (value) => {
    const overload =
      ((value - this.state.approvedLoad) / this.state.approvedLoad) * 100;

    setTimeout(() => {
      this.form.current.setFieldsValue({ overloadrate: overload.toFixed(2) });
    }, 0);
  };
  render() {
    return (
      <div className="bottom_box">
        <div style={{ marginTop: "100px" }}>
          <TableList
            dataSource={this.state.dataSource}
            columns={this.columns}
          />
        </div>
        <Modal
          open={this.state.isModalOpen}
          onCancel={this.handleCancel}
          centered
          closable
          title="编辑"
          destroyOnClose
          onOk={this.handleOk}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            ref={this.form}
            wrapperCol={{
              span: 16,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="超载标准"
              name="approvedLoadLimit"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <InputNumber onChange={this.handleChange} />
            </Form.Item>
            <Form.Item
              label="超载率"
              name="overloadrate"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <InputNumber
                onChange={this.handleapprovedLoadLimit}
                step="0.00"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Stuck;
