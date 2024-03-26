import React, { forwardRef } from "react";
import { Form, Input, Select } from "antd";

const CollectionCreateForm = forwardRef((props, myRef) => {

  return (
    <Form
      name="form_in_modal"
      ref={myRef}
      style={{ marginTop: "30px" }}
      labelCol={{
        span: 7,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <Form.Item
        name="name"
        label="用户名称"
        rules={[
          {
            required: true,
            message: "用户名称必须填写",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="userNo"
        label="用户账号"
        rules={[
          {
            required: true,
            message: "用户账号必须填写",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="roleId"
        label="所属角色"
        rules={[
          {
            required: true,
            message: "所属角色必须填写",
          },
        ]}
      >
        <Select
          style={{
            width: 150,
          }}
        >
          {props.rolesData.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name="identifyNo" label="身份证号">
        <Input />
      </Form.Item>
      <Form.Item name="mobilePhone" label="手机号">
        <Input />
      </Form.Item>
     
    </Form>
  );
});

export default CollectionCreateForm;
