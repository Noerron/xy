import React, { PureComponent } from "react";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { loginApi } from "../../api/api";
import { setToken } from "../../util/localStorage";
import "./login.css";

class Login extends PureComponent {
  componentDidMount() {
    document.title = "登录";
  }
  onFinish = async (values) => {
    const res = await loginApi(values);
    setToken("token", res.token);
    setToken("username", values.username);
    setToken("permission", JSON.stringify(res.permission));
    this.props.history.push(res.permission[0].path);
  };

  render() {
    return (
      <div className="login">
        <div className="login_box">
          <div className="logo"></div>
          <div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "账号不能为空",
                  },
                ]}
              >
                <Input
                  className="inputs"
                  allowClear
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入账号"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "密码不能为空",
                  },
                ]}
              >
                <Input.Password
                  className="inputs"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  allowClear
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  placeholder="请输入密码"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
