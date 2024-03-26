import React, { Component } from "react";
import SearchForm from "../../../components/Form/SearchForm";
import { Row, Col, Button, Modal, Form, Input, Card, Tree } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  getRolesApi,
  getPermissionAllApi,
  addRoleApi,
  deleteRoleApi,
  getPermissionListApi,
  updateRoleApi,
} from "../../../api/api";
import TableList from "../../../components/tableList/tableList";
import Footer from "../../../components/footer/Footer";
import "./roles.css";
class Roles extends Component {
  state = {
    isModalOpen: false,
    dataSource: [],
    roleName: "",
    pageNum: 1,
    pageSize: 10,
    total: 0,
    type: false,
    treeData: [],
    menuIds: [],
    roleId: "",
    rolerel: [],
  };
  rolesform = React.createRef();
  componentDidMount() {
    this.getRoles();
    this.initColumns();
    this.getPermissionAll();
  }
  initColumns = () => {
    this.columns = [
      {
        title: "序号",
        align: "center",
        className: "columns",
        render: (_, res, index) => index + 1,
      },

      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",

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
                disabled={record.id === 1 ? true : false}
                style={{
                  background: record.id === 1 ? "#A0CFFF" : "#1677FF",
                  color: "#fff",
                }}
                onClick={() => this.Edit(record)}
              >
                编辑
              </Button>

              <Button
                type="primary"
                danger
                disabled={record.id === 1 ? true : false}
                style={{
                  background: "#F56C6C",
                  color: "#fff",
                }}
                onClick={() => this.delete(record)}
              >
                删除
              </Button>
            </div>
          );
        },
      },
    ];
  };
  getRoles = async () => {
    const res = await getRolesApi({
      roleName: this.state.roleName || "",
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    });
    this.setState({ dataSource: res.list, total: res.total });
  };

  getPermissionAll = async () => {
    const res = await getPermissionAllApi();
    const treeData = this.changeId2(res, "authName", "title", "id", "key");
    console.log(treeData);
    this.setState({ treeData });
  };

  addRole = async (value) => {
    await addRoleApi({
      menuIds: this.state.menuIds,
      ...value,
    });
    this.getRoles();
  };

  //将树形结构处理成自己想要的key
  changeId2 = (objAry, key, newkey, a, b) => {
    if (objAry != null) {
      objAry.forEach((item) => {
        Object.assign(item, {
          [newkey]: item[key],
          [b]: item[a],
        });
        delete item[key];
        this.changeId2(item.children, key, newkey, a, b);
      });
    }
    return objAry;
  };
  SearchFormoption = (value) => {
    this.setState({ roleName: value.roleName }, () => {
      this.getRoles();
    });
  };
  //打开对话框
  showModal = () => {
    this.setState({ isModalOpen: true, type: true });
  };
  //关闭对话框函数
  handleCancel = () => {
    this.setState({ isModalOpen: false, rolerel: [] });
  };

  handleOk = () => {
    this.rolesform.current.validateFields().then((value) => {
      this.handleCancel();
      if (this.state.type) {
        this.addRole(value);
      } else {
        this.updateRole(value);
      }
    });
  };

  getPermissionList = async (roleId) => {
    const res = await getPermissionListApi({ roleId });
    const arr = [];
    res.map((item) => {
      if (item.isChecked === 1) {
        arr.push(item.id);
      }
      item.children.map((data) => {
        if (data.isChecked) {
          arr.push(data.id);
        }
        if (data.children) {
          data.children.map((value) => {
            if (value.isChecked) {
              arr.push(value.id);
            }
          });
        }
      });
    });
    console.log(arr);
    this.setState({ rolerel: arr });
  };
  deleteRole = async (id) => {
    await deleteRoleApi(id);
    this.getRoles();
  };
  updateRole = async (value) => {
    await updateRoleApi({
      ...value,
      menuIds: this.state.menuIds,
      roleId: this.state.roleId,
    });
  };

  Edit = (record) => {
    this.setState({ isModalOpen: true, type: false, roleId: record.id }, () => {
      this.getPermissionList(record.id);
    });
    setTimeout(() => {
      //设置表单的值
      this.rolesform.current.setFieldsValue({ ...record });
    }, 0);
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
        Newthis.deleteRole(record.id);
      },
      onCancel() {},
    });
  };
  render() {
    return (
      <div>
        <div className="bottom_box">
          <SearchForm SearchFormoption={this.SearchFormoption} role={true} />
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
            title="角色"
            destroyOnClose
            onOk={this.handleOk}
          >
            <Form
              name="basic"
              ref={this.rolesform}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 16,
              }}
              autoComplete="off"
            >
              <Form.Item
                label="角色名称"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
            <Card
              title="选择角色对应的权限:"
              className="rolescard"
              bordered={false}
            >
              <Tree
                checkable
                treeData={this.state.treeData}
                checkedKeys={this.state.rolerel}
                onCheck={(checkedKeys, { halfCheckedKeys }) => {
                  this.setState({
                    rolerel: checkedKeys,
                    menuIds: [...checkedKeys, ...halfCheckedKeys],
                  });
                }}
              />
            </Card>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Roles;
