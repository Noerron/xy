import React, { Component } from "react";
import { Row, Col, Button, Modal } from "antd";
import LedSearchForm from "../../../components/Form/LedSearchForm";
import TableList from "../../../components/tableList/tableList";
import Footer from "../../../components/footer/Footer";
import LedForm from "../../../components/Form/LedForm";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  selectLedToListApi,
  getOptionsApi,
  insertLedApi,
  updateLedApi,
  updateStatusApi,
  deleteLedApi,
} from "../../../api/api";
class Led extends Component {
  state = {
    dataSource: [],
    pageNum: 1,
    pageSize: 10,
    monitorName: "",
    name: "",
    total: 0,
    isModalOpen: false,
    optionList: [],
    type: false,
    updataId: "",
  };
  ledform = React.createRef();
  componentDidMount() {
    this.selectLedToList();
    this.initColums();
    this.getOptions();
  }
  selectLedToList = async () => {
    const res = await selectLedToListApi({
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      monitorName: this.state.monitorName || "",
      name: this.state.name || "",
    });
    this.setState({
      dataSource: res.list,
      total: res.total,
    });
  };
  initColums = () => {
    this.columns = [
      {
        title: "序号",
        className: "columns",
        render: (record, _, index) => index + 1,
        align: "center",
      },
      {
        title: "LED屏名称",
        dataIndex: "name",
        key: "name",
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
        title: "IP地址",
        dataIndex: "ip",
        align: "center",
        key: "ip",
        className: "columns",
      },
      {
        title: "时间",
        dataIndex: "createTime",
        align: "center",
        key: "createTime",
        className: "columns",
      },
      {
        title: "内容",
        dataIndex: "content",
        key: "content",
        align: "center",
        className: "columns",
      },
      {
        title: "操作",
        align: "center",
        className: "columns",
        render: (record) => (
          <div className="button_cen">
            <Button type="primary" onClick={() => this.Edit(record)}>
              编辑
            </Button>
            <Button
              type="primary"
              style={{
                background: record.status === 0 ? "#F56C6C" : "#67C23A",
                color: "#fff",
              }}
              onClick={() => this.updateStatus(record)}
            >
              {record.status ? "启用" : "停用"}
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
    this.setState({ name: value.name, monitorName: value.monitorName }, () => {
      this.selectLedToList();
    });
  };

  getOptions = async () => {
    const res = await getOptionsApi({
      codenames: "deal_state,vehicle_type",
    });
    this.setState({ optionList: res });
  };

  updateLed = async (value) => {
    await updateLedApi({
      ...value,
      id: this.state.updataId,
    });
    this.selectLedToList();
  };
  //打开对话框
  showModal = () => {
    this.setState({ isModalOpen: true, type: true });
  };
  //关闭对话框函数
  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };
  insertLed = async (value) => {
    await insertLedApi(value);
    this.selectLedToList();
  };
  handleOk = () => {
    this.ledform.current.validateFields().then((value) => {
      this.handleCancel();
      if (this.state.type) {
        this.insertLed(value);
      } else {
        this.updateLed(value);
      }
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
      this.ledform.current.setFieldsValue({
        ...record,
        monitorId: record.monitorId + "",
      });
    }, 0);
  };
  updateStatus = async (record) => {
    await updateStatusApi({
      id: record.id,
      status: record.status ? 0 : 1,
    });
    this.selectLedToList();
  };

  deleteLed = async (id) => {
    await deleteLedApi(id);
    this.selectLedToList();
  };
  //删除的回调函数
  delete = (record) => {
    //解决Modal.confirm的this指向问题
    const Newthis = this;
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "你确定删除吗?",
      centered: true,
      onOk() {
        Newthis.deleteLed(record.id);
      },
      onCancel() {},
    });
  };
  render() {
    return (
      <div className="bottom_box">
        <LedSearchForm led={true} SearchFormoption={this.SearchFormoption} />
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
          </Col>
        </Row>
        <div style={{ marginTop: "20px" }}>
          <TableList
            columns={this.columns}
            dataSource={this.state.dataSource}
          />
          <Footer total={this.state.total} Pagination={this.Pagination} />
        </div>
        <Modal
          open={this.state.isModalOpen}
          onCancel={this.handleCancel}
          centered
          closable
          title="Led"
          destroyOnClose
          onOk={this.handleOk}
        >
          <LedForm ref={this.ledform} optionList={this.state.optionList} />
        </Modal>
      </div>
    );
  }
}

export default Led;
