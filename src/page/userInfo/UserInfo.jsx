import React, { PureComponent } from "react";
import { Card, List, Tabs, Button, Form, Input } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  IdcardOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import {
  queryUserByUserNoApi,
  modifySelfApi,
  resetPasswordApi,
} from "../../api/api";
import "./userInfo.css";

class UserInfo extends PureComponent {
  form = React.createRef();
  state = {
    userInfo: {},
    show_tabs: 1,
  };
  componentDidMount() {
    this.queryUserByUserNo();
    document.title = "个人中心";
  }
  close = () => {
    this.props.history.push("/home");
  };
  tabsItem = () => {
    this.items = [
      {
        key: 0,
        label: `基本资料`,
        children: (
          <Form
            style={{ marginTop: "10px" }}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 18,
            }}
            onFinish={this.onFinish1}
            ref={this.form}
            autoComplete="off"
          >
            <Form.Item label="用户名" name="name">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              label="手机号"
              name="mobilePhone"
              rules={[
                {
                  required: true,
                  message: "请输入手机号",
                },
              ]}
            >
              <Input
              // value={this.state.mobilePhone}
              // onChange={(e) => this.setState({ mobilePhone: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              label="身份证号"
              name="identifyNo"
              rules={[
                {
                  required: true,
                  message: "请输入身份证号",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 20,
              }}
            >
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button
                onClick={this.close}
                style={{ marginLeft: "8px" }}
                type="primary"
                danger
              >
                关闭
              </Button>
            </Form.Item>
          </Form>
        ),
      },
      {
        key: 1,
        label: `修改密码`,
        children: (
          <Form
            style={{ marginTop: "10px" }}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 18,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish2}
            autoComplete="off"
          >
            <Form.Item
              label="旧密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入旧密码",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "请输入新密码!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmpassword"
              rules={[
                {
                  required: true,
                  message: "请再次输入密码",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("两次密码不一致!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 20,
              }}
            >
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button
                onClick={this.close}
                style={{ marginLeft: "8px" }}
                type="primary"
                danger
              >
                关闭
              </Button>
            </Form.Item>
          </Form>
        ),
      },
    ];
  };
  modifyInformation = () => {
    console.log(this.form.current);
  };

  queryUserByUserNo = async () => {
    const res = await queryUserByUserNoApi();
    console.log(res);
    this.setState({ userInfo: res });
    this.form.current.setFieldsValue({ ...res });
  };
  onFinish1 = async (value) => {
    await modifySelfApi({ ...this.state.userInfo, ...value });
  };

  onFinish2 = async (value) => {
    await resetPasswordApi({ ...value });
    this.props.history.push("/login");
  };
  tabsChange = (value) => {
    this.setState({ show_tabs: value });
  };
  render() {
    this.tabsItem();
    const { createTime, userNo, name, mobilePhone, identifyNo } =
      this.state.userInfo;
    return (
      <div className="userInfo_main">
        <Card
          style={{
            width: "40%",
            height: "90%",
          }}
          title="个人信息"
        >
          <List
            dataSource={[
              {
                title: "用户账号",
                data: userNo,
                icon: <UserOutlined />,
              },
              {
                title: "用户名称",
                data: name,
                icon: <UserOutlined />,
              },
              {
                title: "手机号码",
                data: mobilePhone,
                icon: <TabletOutlined />,
              },
              {
                title: "身份证号",
                data: identifyNo,
                icon: <IdcardOutlined />,
              },
              {
                title: "创建日期",
                data: createTime,
                icon: <CalendarOutlined />,
              },
            ]}
            renderItem={(item) => {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={<span>{item.title}</span>}
                  />
                  <div>{item.data}</div>
                </List.Item>
              );
            }}
          />
        </Card>

        <Card
          style={{
            width: "58%",
            height: "90%",
          }}
          title="基本资料"
        >
          <Tabs items={this.items} onChange={this.tabsChange} />
        </Card>
      </div>
    );
  }
}

export default UserInfo;
