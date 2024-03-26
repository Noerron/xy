import React, { Component } from "react";
import SearchForm from "../../../components/Form/SearchForm";
import { Row, Col, Button, Modal } from "antd";
import {
  PlusOutlined,
  SelectOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import TableList from "../../../components/tableList/tableList";
import Footer from "../../../components/footer/Footer";
import { getToken } from "../../../util/localStorage";
import CollectionCreateForm from "../../../components/Form/CollectionCreateForm";
import {
  queryUsersApi,
  getRoleListApl,
  addUserApi,
  modifyUserApi,
  deleteUserApi,
  updatePasswordApi,
} from "../../../api/api";
import "./user.css";

class User extends Component {
  state = {
    userName: "",
    mobilPhone: "",
    pageNum: 1,
    pageSize: 10,
    dataSource: [],
    isModalOpen: false,
    type: false,
    rolesData: [],
    updataUserId: "",
  };
  addForm = React.createRef();

  componentDidMount() {
    this.queryUsers();
    this.initColumns();
    this.getRoleList();
  }
  queryUsers = async () => {
    const res = await queryUsersApi({
      userName: this.state.userName || "",
      mobilPhone: this.state.mobilPhone || "",
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    });
    this.setState({ dataSource: res.list, total: res.total });
  };

  getRoleList = async () => {
    const res = await getRoleListApl();
    this.setState({ rolesData: res });
  };

  addUser = async (value) => {
    await addUserApi({
      roleId: value.roleId,
      userInfo: {
        ...value,
        password: value.userNo,
      },
    });
    this.queryUsers();
  };

  modifyUser = async (value) => {
    await modifyUserApi({
      id: this.state.updataUserId,
      ...value,
    });
    this.queryUsers();
  };
  initColumns = () => {
    this.columns = [
      {
        title: "序号",
        align: "center",
        className: "columns",
        render: (_, res, index) => index + 1,
      },
      {
        title: "用户账户",
        dataIndex: "userNo",
        key: "userNo",
        align: "center",
        className: "columns",
      },
      {
        title: "用户名称",
        dataIndex: "name",
        key: "name",

        align: "center",
        className: "columns",
      },
      {
        title: "所属角色",
        dataIndex: "roleName",
        key: "roleName",

        align: "center",
        className: "columns",
      },
      {
        title: "身份证号",
        dataIndex: "identifyNo",
        key: "identifyNo",

        align: "center",
        className: "columns",
        render: (identifyNo) => {
          if (identifyNo) {
            let str = identifyNo.substring(0, 6);
            let strend = identifyNo.substring(
              identifyNo.length - 4,
              identifyNo.length + 1
            );
            return str + "*******" + strend;
          }
        },
      },
      {
        title: "手机号",
        dataIndex: "mobilePhone",
        key: "mobilePhone",
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
        dataIndex: "createUserName",
        key: "createUserName",

        align: "center",
        className: "columns",
      },
      {
        title: "操作",
        align: "center",
        className: "columns",
        render: (_, record) => {
          return (
            <div className="button_cen">
              <Button
                type="primary"
                style={{
                  background: record.roleId === 1 ? "#A0CFFF" : "#1677FF",
                  color: "#fff",
                }}
                disabled={record.roleId === 1 ? true : false}
                onClick={() => this.Edit(record)}
              >
                编辑
              </Button>
              <Button
                type="primary"
                style={{
                  background: record.state === 1 ? "#F56C6C" : "#67C23A",
                  color: "#fff",
                }}
                disabled={record.roleId === 1 ? true : false}
                onClick={() => this.EnableUser(record)}
              >
                {record.state === 1 ? "停用" : "启用"}
              </Button>
              <Button
                type="primary"
                disabled={record.roleId === 1 ? true : false}
                danger
                style={{
                  background: "#F56C6C",
                  color: "#fff",
                }}
                onClick={() => this.delete(record)}
              >
                删除
              </Button>
              <Button
                type="primary"
                style={{ background: "#E6A23C", color: "#fff" }}
                disabled={record.roleId === 1 ? true : false}
                onClick={() => this.resetpassword(record)}
              >
                密码重置
              </Button>
            </div>
          );
        },
      },
    ];
  };
  SearchFormoption = (value) => {
    this.setState(
      { userName: value.userName, mobilPhone: value.mobilPhone },
      () => {
        this.queryUsers();
      }
    );
  };

  //打开对话框
  showModal = () => {
    this.setState({ isModalOpen: true, type: true });
  };

  //关闭对话框函数
  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };

  handleOk = () => {
    this.addForm.current.validateFields().then((value) => {
      this.handleCancel();
      if (this.state.type) {
        this.addUser(value);
      } else {
        this.modifyUser(value);
      }
    });
  };

  Pagination = (page, pageSize) => {
    this.setState({ pageNum: page, pageSize }, () => {
      this.queryUsers();
    });
  };

  Edit = (record) => {
    this.setState({
      isModalOpen: true,
      updataUserId: record.id,
      type: false,
    });
    setTimeout(() => {
      //设置表单的值
      this.addForm.current.setFieldsValue({ ...record });
    }, 0);
  };
  EnableUser = (record) => {
    this.deleteUser(record);
  };
  deleteUser = async (record) => {
    await deleteUserApi({ id: record.id, state: record.state === 1 ? 2 : 1 });
    this.queryUsers();
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
        await deleteUserApi({ id: record.id, state: 9 });
        Newthis.queryUsers();
      },
      onCancel() {},
    });
  };

  resetpassword = (record) => {
    updatePasswordApi({
      userId: record.id,
      userNo: record.userNo,
    });
  };

  // 点击导出下载excel文件
  exportUser = async () => {
    const { userName, mobilPhone } = this.state;
    fetch(
      `
   /weighing/user/exportUser?userName=${userName}&mobilPhone=${mobilPhone}
   `,
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
        const fileName = "用户表格.xls";
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
      <>
        <div className="bottom_box">
          <SearchForm SearchFormoption={this.SearchFormoption} user={true} />
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
            destroyOnClose
            onOk={this.handleOk}
          >
            <CollectionCreateForm
              ref={this.addForm}
              rolesData={this.state.rolesData}
            />
          </Modal>
        </div>
      </>
    );
  }
}

export default User;
