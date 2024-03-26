import React, { Component } from "react";
import { Row, Col, Button, Table, Modal } from "antd";
import {
  DownOutlined,
  RightOutlined,
  SelectOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import LedSerchForm from "../../../components/Form/LedSearchForm";
import AddressForm from "../../../components/Form/AddressForm";
import AddressItemForm from "../../../components/Form/AddressItemForm";
import Paginations from "../../../components/footer/Footer";
import {
  selectMonitorApi,
  addMonitorApi,
  updateMonitorApi,
  selectCameraApi,
  addCameraApi,
  deleMonitorApi,
  updateCameraApi,
  deleteCameraApi,
} from "../../../api/api";
import { getToken } from "../../../util/localStorage";
import "./address.css";

class Address extends Component {
  state = {
    monitorName: "",
    pageNum: 1,
    pageSize: 10,
    data: [],
    isModalOpen: false,
    updataId: "",
    pageNum2: 1,
    pageSize2: 10,
    data2: [],
    isModalOpen2: false,
    type2: false,
    updataitemid: 0,
    monitorId: "",
    expandedRows: "",
  };
  addressform = React.createRef();
  addressitemform = React.createRef();
  componentDidMount() {
    this.initColums();
    this.selectMonitor();
  }
  expandedRowRender = () => {
    const columns = [
      {
        title: "序号",
        render: (record, _, index) => index + 1,
        align: "center",
        className: "columns",
      },
      {
        title: "摄像头名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "摄像头IP",
        key: "ip",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
      },
      {
        title: "创建人",
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: "操作",
        render: (record) => (
          <div className="button_cen">
            <Button type="primary" onClick={() => this.Edit2(record)}>
              编辑
            </Button>
            <Button
              type="primary"
              style={{
                background: record.state === 1 ? "#F56C6C" : "#67C23A",
                color: "#fff",
              }}
              onClick={() => this.updateStatus2(record)}
            >
              {record.state === 1 ? "停用" : "启用"}
            </Button>
            <Button
              type="primary"
              danger
              style={{
                background: "#F56C6C",
                color: "#fff",
              }}
              onClick={() => this.delete(record)}
            >
              删除
            </Button>
          </div>
        ),
      },
    ];

    return (
      <div className="tableList2">
        <Table
          className="tablebar"
          rowClassName={(record, index) => {
            return "cols";
          }}
          columns={columns}
          dataSource={this.state.data2}
          pagination={false}
        />
        <Paginations total={this.state.total2} Pagination={this.Pagination} />
      </div>
    );
  };
  initColums = () => {
    this.columns = [
      {
        title: "序号",
        render: (record, _, index) => index + 1,
        align: "center",
        className: "columns",
      },
      {
        title: "监测点名称",
        dataIndex: "name",
        key: "name",
        align: "center",
        className: "columns",
      },
      {
        title: "经度",
        dataIndex: "longitude",
        key: "longitude",
        align: "center",
        className: "columns",
      },
      {
        title: "纬度",
        dataIndex: "latitude",
        key: "latitude",
        align: "center",
        className: "columns",
      },
      {
        title: "详细地址",
        dataIndex: "address",
        key: "address",
        align: "center",
        className: "columns",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        align: "center",
        className: "columns",
      },
      {
        title: "创建人",
        dataIndex: "userName",
        key: "userName",
        align: "center",
        className: "columns",
      },
      {
        title: "操作",
        align: "center",
        width: 400,
        className: "columns",
        render: (record) => (
          <div className="button_cen">
            <Button
              type="primary"
              size="small"
              onClick={() => this.addressItemPush(record)}
            >
              新增
            </Button>
            <Button type="primary" onClick={() => this.Edit(record)}>
              编辑
            </Button>
            <Button
              type="primary"
              style={{
                background: record.state === 1 ? "#F56C6C" : "#67C23A",
                color: "#fff",
              }}
              onClick={() => this.updateStatus(record)}
            >
              {record.state === 1 ? "停用" : "启用"}
            </Button>
            <Button
              type="primary"
              danger
              style={{
                background: "#F56C6C",
                color: "#fff",
              }}
              onClick={() => this.delete(record)}
            >
              删除
            </Button>
          </div>
        ),
      },
    ];
  };
  SearchFormoption = (value) => {
    this.setState({ monitorName: value.monitorName }, () => {
      this.selectMonitor();
    });
  };
  selectMonitor = async () => {
    const res = await selectMonitorApi({
      monitorName: this.state.monitorName || "",
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    });
    this.setState({ data: res.list });
  };
  //打开对话框
  showModal = () => {
    this.setState({ isModalOpen: true, type: true });
  };
  //关闭对话框函数
  handleCancel = () => {
    this.setState({ isModalOpen: false, isModalOpen2: false });
  };

  addMonitor = async (value) => {
    await addMonitorApi(value);
    this.selectMonitor();
  };
  updateMonitor = async (value) => {
    await updateMonitorApi({
      ...value,
      id: this.state.updataId,
    });
  };

  selectCamera = async (monitorId) => {
    const res = await selectCameraApi({
      pageNum: this.state.pageNum2,
      monitorId: monitorId || "",
      pageSize: this.state.pageSize2,
    });
    this.setState({ data2: res.list, total2: res.total });
  };

  Pagination = (page, pageSize) => {
    this.setState({ pageNum2: page, pageSize2: pageSize }, () => {
      this.selectCamera(this.state.monitorId);
    });
  };
  Edit = (record) => {
    this.setState({
      isModalOpen: true,
      updataId: record.id,
      type: false,
    });
    setTimeout(() => {
      //设置表单的值
      this.addressform.current.setFieldsValue({
        ...record,
      });
    }, 0);
  };

  Edit2 = (record) => {
    this.setState({
      isModalOpen2: true,
      updataitemid: record.id,
      type2: false,
    });
    setTimeout(() => {
      //设置表单的值
      this.addressitemform.current.setFieldsValue({
        ...record,
      });
    }, 0);
  };
  updateStatus = async (record) => {
    await deleMonitorApi({
      id: record.id,
      state: record.state === 1 ? 2 : 1,
    });
    this.selectMonitor();
  };
  updateStatus2 = async (record) => {
    await deleteCameraApi({
      id: record.id,
      state: record.state === 1 ? 2 : 1,
    });
    this.selectCamera(record.id);
  };
  addCamera = async (value) => {
    await addCameraApi({
      ...value,
      monitorId: this.state.monitorId,
    });
  };

  updateCamera = async (value) => {
    await updateCameraApi({
      ...value,
      id: this.state.updataitemid,
    });
  };
  handleOk = () => {
    this.addressform.current.validateFields().then((value) => {
      this.handleCancel();
      if (this.state.type) {
        this.addMonitor(value);
      } else {
        this.updateMonitor(value);
      }
    });
  };

  handleOk2 = () => {
    this.addressitemform.current.validateFields().then((value) => {
      if (this.state.type2) {
        this.addCamera(value);
      } else {
        this.updateCamera(value);
      }
    });
  };
  //删除的回调函数
  delete = (record) => {
    //解决Modal.confirm的this指向问题
    const Newthis = this;
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "你确定删除吗?",
      centered: true,
      onOk: async () => {
        await deleMonitorApi({
          id: record.id,
          state: 9,
        });
        Newthis.selectMonitor();
      },
      onCancel() {},
    });
  };

  //删除的回调函数
  delete2 = (record) => {
    //解决Modal.confirm的this指向问题
    const Newthis = this;
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "你确定删除吗?",
      centered: true,
      onOk: async () => {
        await deleteCameraApi({
          id: record.id,
          state: 9,
        });
        Newthis.selectMonitor();
      },
      onCancel() {},
    });
  };

  addressItemPush = (record) => {
    this.setState({ isModalOpen2: true, type2: true, monitorId: record.id });
  };

  onExpandedRowsChange = (record) => {
    console.log(record);
  };
  exportUser = () => {
    fetch(
      `/weighing/monitor/exportMonitor?monitorName=${this.state.monitorName}`,
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
        const fileName = "监测点信息.xls";
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
        <div style={{ marginBottom: "20px" }}>
          <LedSerchForm SearchFormoption={this.SearchFormoption} />
          <Row style={{ marginTop: "20px" }}>
            <Col span={24} push={21}>
              <Button
                type="primary"
                onClick={this.showModal}
                icon={<PlusOutlined />}
                style={{ marginRight: "8px" }}
              >
                新增
              </Button>
              <Button
                type="primary"
                icon={<SelectOutlined />}
                onClick={this.exportUser}
              >
                导出
              </Button>
            </Col>
          </Row>
        </div>

        <Table
          columns={this.columns}
          rowKey={"id"}
          pagination={false}
          expandedRowRender={(record) => this.expandedRowRender(record)}
          onExpandedRowsChange={(expandedRows) => {
            console.log(expandedRows);
            this.setState({
              expandedRows: [expandedRows[expandedRows.length - 1]],
            });
          }}
          expandedRowKeys={this.state.expandedRows}
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <DownOutlined
                  onClick={(e) => {
                    onExpand(record, e);
                  }}
                />
              ) : (
                <RightOutlined
                  onClick={(e) => {
                    onExpand(record, e);
                    this.setState({ monitorId: record.id });
                    this.selectCamera(record.id);
                  }}
                />
              ),
          }}
          rowClassName={(record, index) => {
            let className = "";
            className = index % 2 === 0 ? "oddRow" : "evenRow";
            return className;
          }}
          dataSource={this.state.data}
        />
        <Modal
          open={this.state.isModalOpen}
          onCancel={this.handleCancel}
          centered
          closable
          title="Led"
          destroyOnClose
          onOk={this.handleOk}
        >
          <AddressForm ref={this.addressform} />
        </Modal>

        <Modal
          open={this.state.isModalOpen2}
          onCancel={this.handleCancel}
          centered
          closable
          title="添加摄像头"
          destroyOnClose
          onOk={this.handleOk2}
        >
          <AddressItemForm ref={this.addressitemform} />
        </Modal>
      </div>
    );
  }
}

export default Address;
