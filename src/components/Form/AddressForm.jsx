import React, { forwardRef } from "react";
import { Form, Input, Button, Select, Tooltip } from "antd";

const AddressForm = forwardRef((props, myRef) => {
  return (
    <>
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
          name="name"
          label="监测点名称"
          rules={[
            {
              required: true,
              message: "监测点名称称必须填写",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="speedLimit" label="超时限定(km/h)">
          <Input />
        </Form.Item>
        <Tooltip title={"请输入字母"}>
          <Form.Item
            name="filePath"
            label="文件路径"
            rules={[
              {
                required: true,
                message: "文件路径必须填写",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Tooltip>
        <Form.Item
          name="ip"
          label="监测点IP"
          rules={[
            {
              required: true,
              message: "监测点IP必须填写",
            },
            {
              pattern:
                /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
              message: "请输入正确ip地址",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="address" label="详细地址">
          <Input />
        </Form.Item>
        <Form.Item
          name="longitude"
          label="经度"
          rules={[
            {
              pattern:
                /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/,
              message: "请输入正确经度坐标",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="latitude"
          label="纬度"
          rules={[
            {
              pattern:
                /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/,
              message: "请输入正确纬度坐标",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
});

export default AddressForm;
