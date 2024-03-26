import React from "react";
import { Form, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
export default function SearchForm(props) {
  const onFinish = (value) => {
    props.SearchFormoption(value);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      className="form_list"
      layout="inline"
    >
      {props.user ? (
        <>
          <Form.Item label="用户名称" name="userName">
            <Input placeholder="请输入用户名称" />
          </Form.Item>
          <Form.Item label="手机号" name="mobilPhone">
            <Input placeholder="请输入手机号" />
          </Form.Item>
        </>
      ) : null}

      {props.role ? (
        <Form.Item name="roleName" label="角色名称">
          <Input placeholder="请输入角色名称" />
        </Form.Item>
      ) : null}
      <Form.Item>
        <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  );
}
