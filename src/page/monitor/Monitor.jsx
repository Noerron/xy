import React, { Component } from "react";
import { Row, Col, Input, Card, Tree, Image, Form } from "antd";
import {
  queryCameraListApi,
  getLastestCarApi,
  querySrsConfApi,
} from "../../api/api";
import Images from "../../asstes/imgs/组 399.png";
import { deBounce } from "../../util/tool";
import "./monitor.css";

class Monitor extends Component {
  form = React.createRef();
  jsWebRtc = React.createRef();
  state = {
    treeData: "",
    Vehicleinformation: {},
    setTime: "",
    monitorId: "",
  };
  componentDidMount() {
    this.queryCameraList();
    document.title = "实时监控";
  }

  componentDidUpdate(_, preStart) {
    if (preStart.setTime) {
      this.interval = setTimeout(() => {
        this.getLastestCar();
      }, 2000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  queryCameraList = async () => {
    const res = await queryCameraListApi();
    const treeData = [];
    res.forEach((item) => {
      var obj = {
        title: "",
      };
      obj.title = item.name;
      obj.id = item.id;

      treeData.push(obj);
    });

    this.setState({ treeData });
  };

  querySrsConf = async () => {
    const res = await querySrsConfApi({ monitorId: this.state.monitorId });
    var url = res.streamUrl;
    var option = {
      video: this.jsWebRtc.current,
      autoplay: true,
    };
    new window.JSWebrtc.Player(url, option);
  };
  getLastestCar = async () => {
    const res = await getLastestCarApi({ monitorId: this.state.monitorId });
    this.setState({ Vehicleinformation: res });
    setTimeout(() => {
      this.form.current.setFieldsValue({
        ...res,
      });
    }, 0);
  };

  onSelect = (selectedKeys, e) => {
    if (this.state.monitorId !== e.node.id) {
      this.setState({ setTime: true, monitorId: e.node.id }, () => {
        this.querySrsConf();

        this.getLastestCar();
      });
    } else {
      this.setState({ setTime: false, monitorId: undefined });
    }
  };

  filterText = deBounce((e) => {
    const data = this.state.treeData.filter(
      (item) => item.title === e.target.value
    );
    this.setState({ treeData: data });
    if (!e.target.value) {
      this.queryCameraList();
    }
  }, 1000);

  render() {
    return (
      <div className="monitor">
        <div className="monitor_left">
          <div className="monitor_list">
            <Row
              style={{
                marginLeft: "-10px",
                marginRight: "-10px",
                marginTop: "15px",
              }}
            >
              <Col
                span={15}
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                <Input
                  style={{ marginLeft: "15px" }}
                  placeholder="请输入监控名称"
                  onChange={this.filterText}
                />
              </Col>
            </Row>
            <Card className="is-never-shadow" title="设备列表 :">
              <div className="card_body">
                <div className="tree">
                  <div className="empty-block">
                    <Tree
                      treeData={this.state.treeData}
                      onSelect={this.onSelect}
                      // ref={this.tred}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="monitor_right">
          <div className="carDetail">
            <Card className="card" title="检测详情">
              <div className="text">
                <div className="images">
                  <Image
                    src={
                      this.state.Vehicleinformation?.frontPhotoUrl
                        ? `${this.state.Vehicleinformation?.frontPhotoUrl}`
                        : Images
                    }
                  />
                </div>

                <Form
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 17,
                  }}
                  ref={this.form}
                  className="form_list"
                >
                  <Form.Item label="车牌号" name="licensePlate">
                    <Input />
                  </Form.Item>
                  <Form.Item label="车辆轴数" name="vehicleType">
                    <Input />
                  </Form.Item>
                  <Form.Item label="监测时间" name="violateTime">
                    <Input />
                  </Form.Item>
                  <Form.Item label="测量重量" name="showLoad">
                    <Input />
                  </Form.Item>
                  <Form.Item label="平均速度" name="velocity">
                    <Input />
                  </Form.Item>
                  <Form.Item label="检测地点" name="monitorName">
                    <Input />
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </div>
          <div className="video">
            <video ref={this.jsWebRtc} controls className="video"></video>
          </div>
        </div>
      </div>
    );
  }
}

export default Monitor;
