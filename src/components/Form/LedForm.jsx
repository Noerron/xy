import React, { forwardRef } from "react";
import { Form, Input, Select } from "antd";
const { TextArea } = Input;
const LedForm = forwardRef((props, myRef) => {
  console.log(props);
  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      ref={myRef}
      wrapperCol={{
        span: 16,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="LED屏名称"
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
        label="IP地址"
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
        label="监测地点"
        name="monitorId"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Select
          style={{
            width: 200,
          }}
        >
          {props.optionList?.monitor_info?.map((item) => {
            return (
              <Select.Option key={item.codevalue} value={item.codevalue}>
                {item.tranvalue}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="内容设置"
        name="content"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <TextArea rows={4} placeholder="请输入LED大屏内容" />
      </Form.Item>
    </Form>
  );
});
export default LedForm;
