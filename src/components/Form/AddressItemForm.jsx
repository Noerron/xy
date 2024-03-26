import React, { forwardRef } from "react";
import { Form, Input, Select, Button } from "antd";

const AddressItemForm = forwardRef((props, myRef) => {
  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      ref={myRef}
      wrapperCol={{
        span: 18,
      }}
      autoComplete="off"
    >
      <Form.Item label="查询经纬度">
        <Button type="primary">
          <a
            href="http://api.map.baidu.com/lbsapi/getpoint/index.html"
            target="_blank"
          >
            点击查询经纬度
          </a>
        </Button>
      </Form.Item>
      <Form.Item
        label="录像机IP"
        name="vcrIp"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="摄像头名称"
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
      <Form.Item
        label="摄像头IP"
        name="ip"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="监控通道"
        name="aisleNo"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="监控类型"
        name="type"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Select>
          <Select.Option value={0}>球机</Select.Option>
          <Select.Option value={1}>前拍</Select.Option>
          <Select.Option value={2}>逆行</Select.Option>
          <Select.Option value={3}>违章</Select.Option>
          <Select.Option value={4}>其他</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
});
export default AddressItemForm;
