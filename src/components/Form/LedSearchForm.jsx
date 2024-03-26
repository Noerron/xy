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
      {props.led ? (
        <>
          <Form.Item label="LED屏幕名称 " name="name">
            <Input placeholder="请输入LED名称" />
          </Form.Item>
        </>
      ) : null}

      <Form.Item name="monitorName" label="监测地点">
        <Input placeholder="请输入监测地点名称" />
      </Form.Item>

      <Form.Item>
        <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  );
}
