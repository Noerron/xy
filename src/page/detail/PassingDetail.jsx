import React, { PureComponent } from "react";
import { Button, Col, Row, Tag, Image, Collapse } from "antd";

import {
  vehicleDetailApi,
  getViolatehistoryListApi,
  monitorPointAPi,
} from "../../api/api";
import TableList from "../../components/tableList/tableList";
import Footer from "../../components/footer/Footer";
import "./PassingDetail.css";
const { Panel } = Collapse;
const imgsbase64 = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAb0AAACoCAYAAAB0QjDYAAAO80lEQVR4nO3dCZAU1R3H8bdR4wEE480REQgIohwKQSFocWguCGqgEKKJomLFEymjHEJKEINHKSpqAWpIgspGoxJiNAISRVAUBTYKCApiQBTFgoBX1CL1a/YNvbMzu93TB7Pzvp+qrR1gt0+qf/1ev/fvsrJ2A3cZAAAc8C1OMgDAFYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBmEHgDAGYQeAMAZhB4AwBn7cqqB5LU+ppE5s9cPzOnd2pvjWjY1hx7cwFvn1m07zMp3Npq5iyvMk8+9Yta8u5mzASSorKzdwF0cYCAZp3U+zoy/YpDpcVLbQMtf+NoqM+7ucvP80pWcESABhB6QgAP238/ccd35ZtjAPqasrCzUCnbt2mWmPTrPXH3zDPPFl19xeoAYEXpAzA5pWN/MuXekOaVD60gLfmnFGtPv0knmk+07OUVATBjIAsTooAP2N0/dNypy4ImWoWVpmQDiQegBMZo86nzTtX2r2BaoZWmZAOJB6AEx0aCVC8/uFfvh1DK1bADREXpATCZceU7oQStBaJlaNoDoCD0gBh2ObWZ+eGKbxA6llq11AIiG0ANicFafrokfxjTWAZQ6Qg+IQdDJ51Gc2jn5dQCljtADYtCmeePED+OxxyS/DqDUEXpADGwtzSSlsQ6g1FGRBQgpV/Hob++XTu32/331NUWqgQgIPSCgsMWj00KRaiA4Qg+oRZTi0WmhSDUQDKEH1CCu4tFpoUg1UDMGsgB5xFk8Oi0UqQZqRugBecRdPDotFKkG8iP0gBySKh6dFopUA7kRekAOSRWPTgtFqoHcCD0gS9LFo9NCkWqgOkIPyFJKhZ0pUg1URegBWYpt8nkUFKkGqiL0gCxpFI9OC0WqgaoIPSBLKRV2pkg1UBWhBwBwBqEHZNFbDEpFKe0LEAdCD8iyev37JXNI3nq3dPYFiAOhB2TRq3pKxcLXVnN6AR9CD8jyxLwlJXNIHp/7chFsBVA8CD0gy4q3NpgXX6/7LSTtg/YFwB6EHpDD2LtmeS9mrau07XqbOoCqCD0gh+eXrjTTH5tfZw+Ntv1fr75ZBFsCFBdCD8hjxM1/NEsq1ta5w6Nt1rYDqI7QA/L47IsvTd9LJ9Wp4NO2apu17QCqI/SAGmhyd68LbjBT/zK3qJ/xadu0jb2HjmdCOlCDsrJ2A+vu03ogRXoT+cThg023jscW1WFfvPwtc/2ds3iGBwRA6AEhtWnexPTv1dmc0b2jaduiiVfUeb9990nlMH719TdeS27Vuk3m2UXLzeznlprV6zdxCoGACD0AgDN4pgcAcAahBwBwBqEHAHAGoQcAcAahBwBwBqEHAHAGoQcAcAahBwBwBqEHAHAGoQcAcAahBwBwBqEHAHAGoQcAcAahBwBwBqEHAHAGoQcAcAahBwBwBqEHAHAGoQcAcAahB/h88+9y72vaqHMTOSw9j2+WWYc+A0gXoYeS5A+XWy8/q6RP8j/uutrbT30HULN9OT6Imy7ASdvy8SemUc/fcO4KoBuCwf165PzFhg0OMgP69fY+f/rZ56Zz/+FmzQfbvD/r9+Y9cktB67xizGRz799eSm0fgXwIPaCERbkBqXfQgeaaC/qaYb+fGfkA3T1xuPcVxj4nDOK/JmJH6CExNd3d65lZ21bNzJQZs035C28E3gR1VY645BxOWkweeHhOZkE6H926tDcVK9eaToOur7aCBW9syASRDdN859j+e5/B13q/l0brHwiC0EPqBp16vLlwSD9vtavWbggVesVIAW73J4wwXYUKpygtLn84+bsp/cvUDYVCLwkKy9qCUi79+Slei1Dd10ASCD2k7sZrh3qrXPxqRSxdZ66xwZDtRz1PzgRLMT7z1DYdcdgh5rsN6+f9mY7tWnrfP9iyNcUtg0sIPaRq4YNjTItmTbxVqlURpNur2AetKLiDhre/lWW7/lyhIFPoNWt6ZN49btrocO/7mnfec+a4IF2EHlKjbsCkus9coq5Bf/egpiqolffPBS+bn155R6pHIswAlc0fbjXtj2vljRDNp1WL73n/8t77HyW52XAYoYdUZD/3qm0Iu//n5zy7KNImauBL2MEvWndNz+lunzrL/HbKE5G2q1jVr5c/lKLYuHl3kDU+6vC8S7G9AEsr1pbkscXeR+ghceU3DcvM/VJr5IddO3itAz2/ye4WbH3UweaBmy7LtAijDuBAePXrHRj4d2obvem3YeOH3p++37xpzmVpgJOpnB9Y1wc3oXgRekiUWmw28GyA6eI2+YbLvJaUhsmPu32m92xLowcvOa+/Nz/MxNiaKuVWWZzWv/dBost/dO6rZvy1F3nP9XRzYye9W727d/Q+rXiTVh6SQ+ghUbf94e+mZ/cTzYzyp83EP8/1VqW7+GWDR2VadNlD9zVwZcIdf6KCx16iUEqCQm7dhk1eF+bA07tk/j9YugEyldNYgKQQekiULnSt+o6otgpd9HRxyx7YUpfKi0Upy2VCztOzahvxqdZynx4nmZ2ffm56DJ0Yatmr1r2f+ZyrJRaH1ytWe6HXvm3zKkvT+jq0a+V9nr9oeezrBSxCD6kYc97p3lB1W/XDz1YFUYtQF0T7PMhfLYTnevk1OvJQ7980glNfpvLZaVibPt6e+Y0mhzUMFHphy4tVrFpvBvQz5sT2bar8vW6C1K2tmx6e5yFJhB4S0/zoo8x/l8zIPKOzNFBh1pPzzPI338nqwpyZKYasAPSPntRnlceat/C1ojlh/rJcQeSq3DLulvurdfMFXVb2DYQ9ro/MWVjQ/D9/yLVt0TiROYT2uZ5ubvRs1wZc9y67B7G88NKy2NcJ+BF6SIwGRugifM6ZfbzvprLFpovdw/eMNY/Nme+N4PSHny60uy+2u1t29r12CovpDz3lBWkQRxzSIPNThUxZkHw1KAuhKiraBwWTvQnQ5+su/6VZvGxNqIDJDk/7nOzFJSsit4ht1ZSgxznM6E1TGayqxKOwPvvH3bzQU9emRvTK488sjrT9QG14nx4SpYvwd7qeX6VqiR2lp1Gdunire0wXyc0L7vMu6P4XuNrfU4sqzMCWQw9uEOCn0qGQnzTmEi/kbp7yUGad+qwAnDbpKu/CH5SG/is41ErUcVm77j+1/ubWbTsCLd2W/zq6cf65dFE9s+AVbwk/6d3N22+9yUHHQeFN1yaSRksPqVOIqQvOvtNNLUFd9NTCsC0Y/Z3CslD+lkrYcl/Lym/0KofEQYE3/dZrvP1TSKlVZ+mznltqn8vvvCZwq1LdoUG6RP1vZt/ySbDQU/kv7XvrlkfHsv+5aNsvH3q2d74VeP3O6O791JPPLExsnYBF6GGv2NONuWeQih3s0qVjm8i1Fxs2qOd9V+tqb9W39BeG1lxBXez9QWQq9131JjUARWE76KrbYhs1qedyVtBjsH3HZ973lsfknkAel5l/fdbrcrY3OepWZS4l0kDoIRX2OZ7JGpVpfKFXyICOfOycrw8/2juvqPE/d6ttcrzqZdrW5VP3jzPDRt4ZS1DbNxaEeU2Ppgtou9Uy1U1I2HNiuyut2Q/ckHmG6a+uo+Nx7i/OyMwJVAgCaSD0kAoNWrCyRzD6/6yh9rZGY/XRncH453xpXlja9CYJO6oyaDUYdW3a4FNQjJw4NfLkfFvY+e31GwP/jp6pTa8cbOONqMwRegpDq2+fk83Yq3+Vd0K7f+Tu9h2fZj6rFez/nW3bdwbeRiAKQg+pGDR6mjGjp3kXO9sCMb65eZadZ2bpghp2svrFA3pmLrZpjgbUvvkDoLai2tkUfDYw1S2qQIny1oRTT+nkfQ9b4eTp+Yu9QUY6F/5J6v4aqlb2+bI3LfZGJtfzVDuwx/hGixYyihUoBKGHVHkhkDU3z7Jz9ExlK0UX2ELesKBuM1N5QU1rNKB9vY9d7/Df3VPQulVFxXaNanka0TrlwcdDdzMqWGz4hq1wohsFG26TR1+QCV77uh+NHLVBqtZbrpZsvjdU+Af2aLTmzy4anylH9/DdI81pg0clUgkGsAg9FA3/4BaPWochKTDSfE6UXSRbgRC2/Fc2PfdS165tNWoy94C+p3nzFGtqOe7Yuaf78NcDdndBFjINQD8/cuVar6tVwWsnkSvcogw2UUtYLTxbeUXPLhVwF46+x3uWqRZ/nM80gVwIPSQmbImqqHRxTnM0oALPTnq3c/DiGoxjXxRrW5AKIB1LTcXw75e6Hzud0Nr7bEdeqsVsW50LFr1e0PpHTJieqQ2qN2JsuWJSpCDyD+zRuRniW56CT0Gnlp6CT98LbSkDtWFyOkqCLv66OFt6S0PSFD4akajWXef+w2MdfWqpa3HIZRO86jBal9apgSSazK+vVXOnZlq2ah3K+BG7J/criPWWi0IokOwoW7XM/NMfwujWqbU3QMcGnlqeQ3IEqP6sv7fP+DTSVzcVQNxo6SExYQdyBOFvXfmpYLG9+Ku8WVqvJUqjELZaPOUv7Jm4/vaGzdV+RqNEtc9q5dmXtKr0W5TnY9o3Tf2YMmN2wa0udcvaif61df3a4FNLT+dS51mjOpO4mYC7ysraDdzF+Ucp0DOjwWf2ivxMzU4diLP2puV/HVHYSjFh1qHWXtTjEIWtval9vH3sxV6h8KDdzWq1q0JNbc8wgUIQegAAZ/BMDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AxCDwDgDEIPAOAMQg8A4AZjzP8BxiWwqO8hLYkAAAAASUVORK5CYII=",
  "data:image/png;base64,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",
];
class PassingDetail extends PureComponent {
  state = {
    vehicledetail: [],
    dataSource: [],
    columns: [
      {
        title: "序号",
        render: (_, e, index) => index + 1,
        align: "center",
        className: "columns",
      },
      {
        title: "车牌号",
        dataIndex: "licensePlate",
        key: "licensePlate",

        align: "center",
        className: "columns",
      },
      {
        title: "监测点",
        dataIndex: "monitorName",
        key: "monitorName",

        align: "center",
        className: "columns",
      },
      {
        title: "监测时间",
        dataIndex: "violateTime",
        key: "violateTime",

        align: "center",
        className: "columns",
      },
      {
        title: "状态",
        align: "center",
        className: "columns",
        render: (_, item) => (item.dealState === 1 ? "待审核" : "已审核"),
      },
    ],
    total: 0,
    pageNum: 1,
    pageSize: 10,
    mapInfo: {},
  };
  componentDidMount() {
    this.vehicleDetail();
    this.monitorPoint();
    document.title = "所有车辆详情";
  }
  vehicleDetail = async () => {
    const { params } = this.props.match;
    console.log(params);
    const res = await vehicleDetailApi({
      violateId: params.oldId,
      isViolate: params.isviolate,
    });
    this.setState({ vehicledetail: res }, () => {
      this.getViolatehistoryList();
    });
    // if (res.code == 1000) {
    //   this.setState({ vehicledetail: res.data }, () => {
    //     this.getViolateListApi();
    //     this.getmonitorpointApi();
    //   });
    // }
  };
  monitorPoint = async () => {
    const res = await monitorPointAPi();
    console.log(res);
    this.setState({ mapInfo: res[0] }, () => {
      this.map();
    });
  };
  getViolatehistoryList = async () => {
    const res = await getViolatehistoryListApi({
      licensePlate: this.state.vehicledetail.licensePlate,
      isViolate: 1,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    });
    this.setState({ dataSource: res.list, total: res.total });
  };

  //关闭
  colos = () => {
    window.open("about:blank", "_self").close();
  };

  //百度地图
  map = () => {
    const { mapInfo } = this.state;
    console.log(mapInfo);
    const { BMap, BMAP_ANCHOR_BOTTOM_RIGHT } = window;
    var opts = {
      width: 10, // 信息窗口宽度
      height: 20, // 信息窗口高度
    };
    var infoWindow = new BMap.InfoWindow(mapInfo.name, opts); // 创建信息窗口对象

    var map = new BMap.Map("allmap"); // 创建Map实例
    var point = new BMap.Point(mapInfo.longitude, mapInfo.latitude);
    map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别

    var marker = new BMap.Marker(point); // 创建标注
    map.addControl(
      new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT, //右下角
      })
    );
    map.addOverlay(marker);
    map.openInfoWindow(infoWindow, map.getCenter()); // 打开信息窗口
  };

  licenseColor = () => {
    switch (this.state.vehicledetail.licenseColor) {
      case "黄":
        return "yellow";
      case "蓝":
        return "blue";
      case "绿":
        return "green";
      case "白":
        return "green";
      default:
        return "red";
    }
  };
  render() {
    const { vehicledetail, columns, dataSource, total } = this.state;

    return (
      <div
        style={{ height: "100%", width: "100%" }}
        className="violationdetail"
      >
        <div className="btn">
          <Row>
            <Col span={2}>
              <Tag className="col-tag">详情页 {">>"}</Tag>
            </Col>
            <Col
              span={22}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button type="primary" danger onClick={this.colos}>
                关闭
              </Button>
            </Col>
          </Row>
        </div>
        <div className="box">
          <div className="news">
            <div className="one">
              <div className="car_information">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    className={`car_num ${
                      (vehicledetail.licenseColor === "蓝" ? "blue" : "yellow",
                      this.licenseColor())
                    }
                  `}
                  >
                    {vehicledetail.licensePlate}
                  </span>
                </div>
                <div className="monitor_news">
                  <div>
                    详细地址:&nbsp;&nbsp;
                    <span> {vehicledetail.monitorName}</span>
                  </div>
                  <div>
                    监测时间:&nbsp;&nbsp;
                    <span>{vehicledetail.violateTime}</span>
                  </div>
                  <div>
                    行驶车道:&nbsp;&nbsp;
                    <span>{vehicledetail.devChnnum}车道</span>
                  </div>
                  <div>
                    行驶方向:&nbsp;&nbsp;
                    <span>
                      {vehicledetail.driveDirection === null
                        ? "逆行"
                        : vehicledetail.driveDirection}
                    </span>
                  </div>
                </div>
              </div>
              <div className="monitor_information">
                <div className="axle_load">
                  <div>
                    测量重量: &nbsp;&nbsp;
                    <span>{vehicledetail.showLoad / 1000}吨</span>
                  </div>

                  <div>
                    平均速度: &nbsp;&nbsp;
                    <span>{vehicledetail.velocity}km/h</span>
                  </div>
                </div>
                <div className="axle_weight">
                  <Collapse ghost expandIconPosition={"end"}>
                    <Panel header="各轴称重信息">
                      {vehicledetail.alexs?.map((item) => {
                        return (
                          <p key={item.num}>
                            {item.weight}轴 {item.wheelbase}千克
                          </p>
                        );
                      })}
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
            <div className="two">
              <Image.PreviewGroup>
                <div className="car_img">
                  <Image
                    style={{ height: "100%", width: "100%" }}
                    src={
                      vehicledetail.frontPhotoUrl
                        ? vehicledetail.frontPhotoUrl
                        : imgsbase64[0]
                    }
                  />
                </div>
                <div className="car_img">
                  <Image
                    style={{ height: "100%", width: "100%" }}
                    src={
                      vehicledetail.sidePhotoUrl
                        ? vehicledetail.sidePhotoUrl
                        : imgsbase64[0]
                    }
                  />
                </div>
                <div className="car_img">
                  <Image
                    style={{ height: "100%", width: "100%" }}
                    src={
                      vehicledetail.rearPhotoUrl
                        ? vehicledetail.rearPhotoUrl
                        : imgsbase64[0]
                    }
                  />
                </div>

                <div className="car_img">
                  <Image
                    style={{ height: "100%", width: "100%" }}
                    src={
                      vehicledetail.fullviewPhotoUrl
                        ? vehicledetail.fullviewPhotoUrl
                        : imgsbase64[1]
                    }
                  />
                </div>
              </Image.PreviewGroup>
            </div>
          </div>
          <div className="news">
            <div className="three">
              <div className="threeTitle">
                <span>违章历史记录</span>
                <span>共{total}条</span>
              </div>
              <div className="table">
                <div className="tablelist">
                  <TableList dataSource={dataSource} columns={columns} />
                </div>

                <div className="footer-pos">
                  <Footer total={total} Pagination={this.Pagination} />
                </div>
              </div>
            </div>
            <div className="four">
              <div className="map">
                <div
                  id="allmap"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PassingDetail;
