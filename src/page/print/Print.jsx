import React, { Component } from "react";
import { Select, Button } from "antd";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";

import "./print.css";
var urldata = {};
const imgsbase64 = [
  "data:image/png;base64,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",
  "data:image/png;base64,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",
  "data:image/png;base64,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",
  "data:image/png;base64,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",
  "data:image/png;base64,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",
];
class Print extends Component {
  state = {
    show: 1,
    times: "",
    urlArr: [],
    urlList: [],
    isShowBtn: true,
  };
  componentDidMount() {
    this.getTime();
    // this.base64();
    this.insertImg();
  }
  onChange = (value) => {
    this.setState({ show: value });
  };

  insertImg = () => {
    const { state } = this.props.location;
    var urlList = [];
    urlList.push(
      state.frontPhotoUrl,
      state.sidePhotoUrl,
      state.rearPhotoUrl,
      state.fullviewPhotoUrl,
      state.licensePlatePhotoUrl
    );
    for (let i = 0; i < urlList.length; i++) {
      window[`image${i}`] = new Image();
      window[`image${i}`].src = urlList[i];
      window[`image${i}`].crossOrigin = "*";
      console.log(i);
      window[`image${i}`].onload = () => {
        urldata[`imagePath${i}`] = this.getBase64Image(window[`image${i}`]);
      };
    }
  };
  getBase64Image = (img) => {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let dataURL = canvas.toDataURL("image/png");
    return dataURL;
  };

  //获取时间
  getTime = () => {
    let myDate = new Date();
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let date = myDate.getDate();
    const times = year + "-" + month + "-" + date;
    this.setState({ times });
  };

  clickWord = () => {
    const { state } = this.props.location;
    var ImageModule = require("docxtemplater-image-module-free");
    let _this = this;
    // 读取并获得模板文件的二进制内容
    JSZipUtils.getBinaryContent("test.docx", function (error, content) {
      if (error) {
        console.error(error);
        return;
      }
      // 图片处理
      let opts = {};
      opts.centered = true; // 图片居中，在word模板中定义方式为{%%image}
      opts.fileType = "docx";
      opts.getImage = function (chartId) {
        console.log(chartId);
        return _this.base64DataURLToArrayBuffer(chartId);
      };
      opts.getSize = function () {
        return [260, 240];
      };
      let imageModule = new ImageModule(opts);

      const zip = new PizZip(content);
      const doc = new Docxtemplater()
        .attachModule(imageModule)
        .loadZip(zip)
        .compile();
      doc.setData({
        ...state,
        approvedLoad: state.approvedLoad / 1000,
        showLoad: state.showLoad / 1000,
        overLoad: state.overLoad / 1000,
        updateTime: _this.state.times,
        ...urldata,
      });
      try {
        // 用模板变量的值替换所有模板变量
        doc.render();
      } catch (error) {
        // 抛出异常
        let e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        };
        console.log(JSON.stringify({ error: e }));
        throw error;
      }

      // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
      let out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      // 将目标文件对象保存为目标类型的文件，并命名
      saveAs(out, state.licensePlate + "_" + ".docx");
    });
  };

  printContent = () => {
    var root = document.querySelector("#root");

    console.log(root);
    root.style.minWidth = 0;
    root.style.minHeight = 0;

    this.setState({ isShowBtn: false });
    setTimeout(() => {
      window.print();
      root.style.minWidth = 1200 + "px";
      this.setState({ isShowBtn: true }); // 显示元素
    }, 50);
  };

  base64DataURLToArrayBuffer = (dataURL) => {
    console.log(dataURL);
    const base64Regex = /^data:image\/(png|jpg|svg|jpeg|svg\+xml);base64,/;
    if (!base64Regex.test(dataURL)) {
      return false;
    }
    const stringBase64 = dataURL.replace(base64Regex, "");
    let binaryString;
    if (typeof window !== "undefined") {
      binaryString = window.atob(stringBase64);
    } else {
      binaryString = new Buffer(stringBase64, "base64").toString("binary");
    }
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes.buffer;
  };
  go = () => {
    this.props.history.goBack();
  };
  render() {
    const { state } = this.props.location;

    return (
      <>
        {this.state.show === 1 ? (
          <div className="print_box">
            <div className="editor-content">
              <p className="content_p1">
                <span>超限超载违法行为处理告知书</span>
              </p>
              <p className="content_p2">
                <span>通知日期：</span>
                <span>{this.state.times}</span>
              </p>
              <div style={{ lineHeight: "20pt", margin: "0pt 0pt 0pt 24pt" }}>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}>
                  尊敬的
                </span>
                <div className="big2">
                  <input type="text" className="el-input__inner" />
                </div>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}>:</span>
              </div>
              <div className="cotent_herder">
                <span
                  style={{
                    fontFamily: "等线",
                    fontSize: "12pt",
                    display: "inline-block",
                    textIndent: "2em",
                  }}
                >
                  经调查，你（单位）的
                </span>
                <div className="big2" style={{ width: "100px" }}>
                  <input
                    type="text"
                    className="el-input__inner"
                    defaultValue={state.licensePlate}
                    style={{ width: "90%" }}
                  />
                </div>
                <span style={{ fontFamily: "等线", fontSize: "12pt" }}>
                  车辆在
                </span>
                <div className="big2">
                  <input
                    type="text"
                    defaultValue={state.monitorName}
                    className="he-input__inner"
                  />
                </div>
                <span style={{ fontFamily: "等线", fontSize: "12pt" }}>
                  普通公路通行时，经过动态称重检测，车货总重超过法定规定，存在以下违法事实：
                </span>
                <tr style={{ height: "25.5pt", fontSize: "11pt" }}>
                  <td
                    width="60pt"
                    nowrap="nowrap"
                    style={{
                      width: "60pt",
                      borderWidth: "1pt",
                      borderStyle: "solid",
                      borderTopColor: "windowtext",
                      borderBottomColor: "windowtext",
                      borderRightColor: "black",
                      padding: "0.6pt 0.6pt 0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span style={{ fontFamily: "宋体", color: "black" }}>
                        车牌号
                      </span>
                    </p>
                  </td>
                  <td
                    width="100pt"
                    nowrap="nowrap"
                    style={{
                      width: "100pt",
                      height: "25.5pt",
                      borderTop: "1pt solid black",
                      borderRight: "1pt solid black",
                      borderBottom: "1pt solid black",
                      borderLeft: "none",
                      borderImage: "initial",
                      padding: " 0.6pt 0.6pt 0cm; height: 25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span style={{ fontFamily: "宋体", color: "black" }}>
                        违法地点
                      </span>
                    </p>
                  </td>
                  <td
                    width="90pt"
                    nowrap="nowrap"
                    style={{
                      width: "90pt",
                      borderTop: "1pt solid black",
                      borderRight: "1pt solid black",
                      borderBottom: "1pt solid black",
                      borderLeft: "none",
                      borderImage: "initial",
                      padding: " 0.6pt 0.6pt 0cm;",
                      height: "25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span style={{ fontFamily: "宋体", color: "black" }}>
                        违章时间
                      </span>
                    </p>
                  </td>
                  <td
                    width="40pt"
                    style={{
                      width: "40pt",
                      border: "1pt solid black",
                      padding: "0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span style={{ fontFamily: "宋体", color: "black" }}>
                        轴数
                      </span>
                    </p>
                  </td>
                  <td
                    width="80pt"
                    style={{
                      width: "80pt",
                      border: "1pt solid black",
                      padding: "0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span
                        lang="EN-US"
                        style={{ fontFamily: "宋体", color: "black" }}
                      >
                        车货总重(t)
                      </span>
                    </p>
                  </td>
                  <td
                    width="70pt"
                    style={{
                      width: "70pt",
                      border: "1pt solid black",
                      padding: "0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p
                      data-v-649de1bd=""
                      align="center"
                      className="MsoNormal"
                      style={{ marginbottom: "0.0001pt", textAlign: "center" }}
                    >
                      <span
                        data-v-649de1bd=""
                        lang="EN-US"
                        style={{ color: "black" }}
                      >
                        超载量(t)
                      </span>
                    </p>
                  </td>
                </tr>
                <tr style={{ height: "25.5pt", fontSize: "11pt" }}>
                  <td
                    width="60pt"
                    nowrap="nowrap"
                    style={{
                      width: "60pt",
                      borderTop: "none",
                      borderLeft: "1pt solid black",
                      borderBottom: "1pt solid windowtext",
                      borderRight: "1pt solid black",
                      padding: "0.6pt 0.6pt 0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span style={{ fontFamily: "宋体", color: "black" }}>
                        {state.licensePlate}
                      </span>
                    </p>
                  </td>
                  <td
                    width="150pt"
                    nowrap="nowrap"
                    style={{
                      width: "150pt",
                      height: "25.5pt",
                      borderTop: "none",
                      borderLeft: "none",
                      borderBottom: "1pt solid black",
                      borderRight: "1pt solid black",

                      padding: "0cm",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span style={{ fontFamily: "宋体", color: "black" }}>
                        {state.monitorName}
                      </span>
                    </p>
                  </td>
                  <td
                    width="90pt"
                    nowrap="nowrap"
                    style={{
                      width: "90pt",
                      borderTop: "none",
                      borderRight: "1pt solid black",
                      borderBottom: "1pt solid windowtext",
                      borderLeft: "none",
                      padding: "0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span style={{ fontFamily: "宋体", color: "black" }}>
                        {state.violateTime}
                      </span>
                    </p>
                  </td>
                  <td
                    width="40pt"
                    style={{
                      width: "40pt",
                      borderTop: "none",
                      borderRight: "1pt solid black",
                      borderBottom: "1pt solid windowtext",
                      borderLeft: "none",
                      padding: "0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span style={{ fontFamily: "宋体", color: "black" }}>
                        {state.vehicleType}
                      </span>
                    </p>
                  </td>
                  <td
                    width="80pt"
                    style={{
                      width: "80pt",
                      borderTop: "none",
                      borderRight: "1pt solid black",
                      borderBottom: "1pt solid windowtext",
                      borderLeft: "none",
                      padding: "0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p align="center" className="MsoNormal">
                      <span
                        lang="EN-US"
                        style={{ fontFamily: "宋体", color: "black" }}
                      >
                        {state.showLoad / 1000}
                      </span>
                    </p>
                  </td>
                  <td
                    width="70pt"
                    style={{
                      width: "70pt",
                      borderTop: "none",
                      borderRight: "1pt solid black",
                      borderBottom: "1pt solid windowtext",
                      borderLeft: "none",
                      padding: "0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p
                      align="center"
                      className="MsoNormal"
                      style={{ marginbottom: "0.0001pt", textAlign: "center" }}
                    >
                      <span lang="EN-US" style={{ color: "black" }}>
                        {state.overLoad / 1000}
                      </span>
                    </p>
                  </td>
                </tr>
                <span
                  style={{
                    fontFamily: "等线",
                    fontSize: "12pt",
                    display: "inline-block",
                    textIndent: "2em",
                  }}
                >
                  共计
                </span>
                <div className="big2" style={{ width: "100px" }}>
                  <input
                    type="text"
                    className="el-input__inner"
                    defaultValue={1}
                    style={{ width: "90%", textAlign: "center" }}
                  />
                </div>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}>
                  违法行为现已被记录，我们予以书面通知，请当事人接到本告知书30日内，主动到
                </span>
                <span
                  style={{
                    fontFamily: "黑体",
                    fontSize: "12pt",
                    fontWeight: "bold",
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  夏邑县交通运输综合行政执法大队
                </span>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}>
                  接受处理。
                </span>
              </div>
              <div style={{ lineHeight: "25pt", margin: "0pt 0pt 0pt 24pt" }}>
                <span
                  style={{
                    fontFamily: "黑体",
                    fontSize: "12pt",
                    display: "inline-block",
                    fontWeight: "bold",
                    color: "rgb(0, 0, 0)",
                    textIndent: "2em",
                  }}
                >
                  对已作出行政处罚决定，当事人逾期不缴纳罚款的，将采取以下措施:
                </span>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}></span>
              </div>
              <div style={{ lineHeight: "25pt", margin: "0pt 0pt 0pt 24pt" }}>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    display: "inline-block",

                    textIndent: "2em",
                  }}
                >
                  一、
                </span>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}>
                  每日按罚款数额3%加处罚款。
                </span>
              </div>
              <div style={{ lineHeight: "25pt", margin: "0pt 0pt 0pt 24pt" }}>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    display: "inline-block",
                    textIndent: "2em",
                  }}
                >
                  二、
                </span>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}>
                  当事人在60日内不申请复议货车在6个月内不提起行政诉讼，经催告仍不履行的，已发申请人民法院强制执行。
                </span>
              </div>
              <div style={{ lineHeight: "24pt", margin: "0pt 0pt 0pt 25pt" }}>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    display: "inline-block",
                    textIndent: "2em",
                  }}
                >
                  三、
                </span>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}>
                  依法将违法超限运输货运车辆信息抄告给车籍所在地道路运输管理机构，由其对一年内违法超限运输达到法定条件的货运车辆、驾驶人、道路运输企业采取吊销车辆营运证、责令停止从事营业性运输、责令停业整顿和吊销道路运输经营许可证等后续处理。
                </span>
              </div>
              <div style={{ lineHeight: "24pt", margin: "0pt 0pt 0pt 25pt" }}>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    display: "inline-block",
                    textIndent: "2em",
                  }}
                >
                  四、
                </span>
                <span style={{ fontFamily: "宋体", fontSize: "12pt" }}>
                  依法将一年内违法超限运输超过3次的货运车辆和驾驶人、1年内违法超限运输的货运车辆超过本单位货运车辆总数10%并被道路运输管理机构停业整顿的道路运输企业列入严重违法超限超载运输失信当事人名单，对其在出行、投资、置业、消费等领域实施联合信用惩戒。
                </span>
              </div>
              <div style={{ lineHeight: "24pt", margin: "0pt 0pt 0pt 25pt" }}>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    display: "inline-block",
                    textIndent: "2em",
                  }}
                >
                  希望在以后的道路运输活动中，能自觉遵守国家法规，做文明交通参与者。
                </span>
              </div>
              <div style={{ lineHeight: "24pt", margin: "0pt 0pt 0pt 25pt" }}>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    display: "inline-block",
                    textIndent: "2em",
                  }}
                >
                  联系电话:
                </span>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    fontWeight: "bold",
                    color: "rgb(0,0,0)",
                    letterSpacing: "1pt",
                    marginLeft: "1em",
                  }}
                >
                  0370-6115789
                </span>
              </div>{" "}
              <div style={{ lineHeight: "24pt", margin: "0pt 0pt 0pt 25pt" }}>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    display: "inline-block",
                    textIndent: "2em",
                  }}
                >
                  处理地址:
                </span>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    color: "rgb(0,0,0)",
                    letterSpacing: "1pt",
                    marginLeft: "1em",
                  }}
                >
                  河南省商丘市夏邑县交通运输综合行政执法大队冉庄超限检测点
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.show === 2 ? (
          <div className="print_main">
            <div className="WordSection1">
              <p className="MsoNormal">
                <span
                  style={{
                    fontFamily: "黑体",
                    fontSize: "18pt",
                  }}
                >
                  超限超载车辆信息检测单
                </span>
              </p>
              <p
                style={{
                  margin: "0pt",
                  textAlign: "right",
                  paddingBottom: "20px",
                  paddingRight: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                  }}
                >
                  检测单号：
                </span>
                <span
                  style={{
                    fontFamily: "宋体",
                    fontSize: "12pt",
                    fontWeight: "bold",
                  }}
                >
                  {state.checkNo}
                </span>
              </p>
              <table
                border="0"
                cellspacing="0"
                cellpadding="0"
                width="100%"
                className="MsoNormalTable"
              >
                <tr style={{ height: "25.5pt" }}>
                  <td
                    width="50%"
                    nowrap="nowrap"
                    style={{
                      width: "50%",
                      borderWidth: "1pt",
                      borderStyle: "solid",
                      borderTopColor: "windowtext",
                      borderButtomColor: "windowtext",
                      borderRightColor: "black",
                      padding: "0.6pt 0.6pt 0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p
                      class="MsoNormal"
                      style={{ marginBottom: "0.0001pt", marginLeft: "5pt" }}
                    >
                      <span
                        style={{
                          fontFamily: "宋体",
                          color: "black",
                        }}
                      >
                        地点：
                      </span>
                      <span
                        style={{
                          fontFamily: "宋体",
                          color: "black",
                        }}
                      >
                        {state.monitorName}
                      </span>
                    </p>
                  </td>
                  <td
                    width="50%"
                    nowrap="nowrap"
                    style={{
                      width: "50%",
                      borderWidth: "1pt",
                      borderStyle: "solid",
                      borderTopColor: "windowtext",
                      borderButtomColor: "windowtext",
                      borderRightColor: "black",
                      padding: "0.6pt 0.6pt 0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p
                      class="MsoNormal"
                      style={{ marginBottom: "0.0001pt", marginLeft: "5pt" }}
                    >
                      <span
                        style={{
                          fontFamily: "宋体",

                          color: "black",
                        }}
                      >
                        时间：
                      </span>
                      <span
                        style={{
                          fontFamily: "宋体",

                          color: "black",
                        }}
                      >
                        {state.violateTime}
                      </span>
                    </p>
                  </td>
                </tr>
              </table>
              <table
                border="0"
                cellspacing="0"
                cellpadding="0"
                width="100%"
                className="MsoNormalTable"
              >
                <tr style={{ height: "25.5pt" }}>
                  <td
                    width="100%"
                    nowrap="nowrap"
                    style={{
                      width: "100%",
                      borderWidth: "1pt",
                      borderStyle: "solid",
                      borderTopColor: "windowtext",
                      borderButtomColor: "windowtext",
                      borderRightColor: "black",
                      padding: "0.6pt 0.6pt 0cm",
                      height: "25.5pt",
                    }}
                  >
                    <p
                      align="center"
                      class="MsoNormal"
                      style={{
                        marginBottom: "0.0001pt",
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "宋体",

                          color: "black",
                        }}
                      >
                        检测现场照片
                      </span>
                    </p>
                  </td>
                </tr>
              </table>
              <table
                border="1"
                cellspacing="0"
                cellpadding="0"
                align="left"
                width="100%"
                className="MsoNormalTable"
                style={{
                  width: "100.8%",
                  height: "280px",
                  border: "1px",
                  marginLeft: "0pt",
                  marginRight: "6.75pt",
                }}
              >
                <tr>
                  <td
                    style={{
                      width: "50%",
                      borderWidth: "1pt",
                      borderStyle: "solod",
                      borderColor: "black black windowtext",
                      borderImage: "initial",
                      height: "100%",
                      padding: "0",
                    }}
                  >
                    <div
                      style={{
                        width: "98%",
                        height: "98%",
                        padding: "0px2px 2px",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={
                          state.frontPhotoUrl
                            ? `${state.frontPhotoUrl}`
                            : imgsbase64[0]
                        }
                        alt=""
                      />
                    </div>
                  </td>
                  <td
                    style={{
                      width: "50%",
                      borderWidth: "1pt",
                      borderStyle: "solod",
                      borderColor: "black black windowtext",
                      borderImage: "initial",
                      height: "100%",
                      padding: "0",
                    }}
                  >
                    <div
                      style={{
                        width: "98%",
                        height: "98%",
                        padding: "0px2px 2px",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={
                          state.rearPhotoUrl
                            ? `${state.rearPhotoUrl}`
                            : imgsbase64[0]
                        }
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
              </table>
              <div align="center">
                <table
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  width="100%"
                  className="MsoNormalTable"
                >
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width="100%"
                      nowrap="nowrap"
                      style={{
                        width: "100%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="center"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          检测现场数据
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
                <table
                  cellSpacing={"0"}
                  cellpadding="0"
                  width={"100%"}
                  className="MsoNormalTable"
                >
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车牌号
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.licensePlate}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车道
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.devChnnum}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          轴数
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.vehicleType}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车货总重(t)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.showLoad / 1000}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          限重(t)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.approvedLoad / 1000}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          超限重量(t)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.overLoad / 1000}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          超限率(%)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.overRate}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车速(km/h)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.velocity}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          经营许可证
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        ></span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车辆类型
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        ></span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          道路运输证
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        ></span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          业户名
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        ></span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          联系方式
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        ></span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          联系地址
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        ></span>
                      </p>
                    </td>
                  </tr>
                </table>
                <table
                  cellSpacing={"0"}
                  border={"0"}
                  cellpadding="0"
                  width="100%"
                  style={{ width: "100.82%", borderCollapse: "collapse" }}
                >
                  <tr style={{ height: "120pt" }}>
                    <td
                      width={"50%"}
                      nowrap="nowrap"
                      style={{
                        width: "50%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",

                        height: "120pt",
                      }}
                    >
                      <p
                        style={{
                          marginLeft: "5pt",
                          height: "100%",
                          marginTop: "50px",
                        }}
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",
                            color: "black",
                          }}
                        >
                          本人确认以上数据无误
                        </span>
                        <br />
                        <br />

                        <span
                          style={{
                            fontFamily: "宋体",
                            color: "black",
                          }}
                        >
                          驾驶员签字：
                        </span>
                        <br />
                        <br />

                        <span
                          style={{
                            fontFamily: "宋体",
                            color: "black",
                          }}
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日期：
                        </span>
                      </p>
                    </td>
                    <td
                      width={"50%"}
                      nowrap="nowrap"
                      style={{
                        width: "50%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",

                        height: "120pt",
                      }}
                    >
                      <p
                        class="MsoNormal"
                        style={{
                          marginLeft: "5pt",
                          height: "100%",
                          marginTop: "50px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "宋体",
                            color: "black",
                          }}
                        >
                          检测单位：夏邑县交通运输综合行政执法大队
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.show === 3 ? (
          <div className="print_main">
            <div className="WordSection1">
              <p className="MsoNormal">
                <span
                  style={{
                    fontFamily: "黑体",
                    fontSize: "18pt",
                  }}
                >
                  车辆信息检测详情
                </span>
              </p>

              <table
                border="1"
                cellspacing="0"
                align="left"
                cellpadding="0"
                width="100%"
                className="MsoNormalTable"
                style={{
                  height: "280px",
                  marginLeft: "0pt",
                  marginRight: "6.75pt",
                }}
              >
                <tr>
                  <td
                    width="50%"
                    nowrap="nowrap"
                    style={{
                      width: "50%",
                      borderWidth: "1pt",
                      borderStyle: "solid",
                      borderTopColor: "windowtext",
                      borderButtomColor: "windowtext",
                      borderRightColor: "black",
                      padding: "0.6pt 0.6pt 0cm",
                      height: "25.5pt",
                    }}
                  >
                    <div
                      style={{
                        width: "98%",
                        height: "98%",
                        padding: "0px2px 2px",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={
                          state.frontPhotoUrl
                            ? `${state.frontPhotoUrl}`
                            : imgsbase64[0]
                        }
                        alt=""
                      />
                    </div>
                  </td>
                  <td
                    width="50%"
                    nowrap="nowrap"
                    style={{
                      width: "50%",
                      borderWidth: "1pt",
                      borderStyle: "solid",
                      borderTopColor: "windowtext",
                      borderButtomColor: "windowtext",
                      borderRightColor: "black",
                      padding: "0.6pt 0.6pt 0cm",
                      height: "25.5pt",
                    }}
                  >
                    <div
                      style={{
                        width: "98%",
                        height: "98%",
                        padding: "0px2px 2px",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={
                          state.sidePhotoUrl
                            ? `${state.sidePhotoUrl}`
                            : imgsbase64[0]
                        }
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
              </table>

              <table
                border="1"
                cellspacing="0"
                cellpadding="0"
                align="left"
                width="100%"
                className="MsoNormalTable"
                style={{
                  width: "100.8%",
                  height: "280px",
                  border: "1px",
                  marginLeft: "0pt",
                  marginRight: "6.75pt",
                }}
              >
                <tr>
                  <td
                    style={{
                      width: "50%",
                      borderWidth: "1pt",
                      borderStyle: "solod",
                      borderColor: "black black windowtext",
                      borderImage: "initial",
                      height: "100%",
                      padding: "0",
                    }}
                  >
                    <div
                      style={{
                        width: "98%",
                        height: "98%",
                        padding: "0px2px 2px",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={
                          state.rearPhotoUrl
                            ? `${state.rearPhotoUrl}`
                            : imgsbase64[0]
                        }
                        alt=""
                      />
                    </div>
                  </td>
                  <td
                    style={{
                      width: "50%",
                      borderWidth: "1pt",
                      borderStyle: "solod",
                      borderColor: "black black windowtext",
                      borderImage: "initial",
                      height: "100%",
                      padding: "0",
                    }}
                  >
                    <div
                      style={{
                        width: "98%",
                        height: "98%",
                        padding: "0px2px 2px",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={
                          state.licensePlatePhotoUrl
                            ? `${state.licensePlatePhotoUrl}`
                            : imgsbase64[1]
                        }
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
              </table>
              <div align="center">
                <table
                  border="0"
                  cellspacing="0"
                  cellpadding="0"
                  width="100%"
                  className="MsoNormalTable"
                >
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width="100%"
                      nowrap="nowrap"
                      style={{
                        width: "100%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="center"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          检测数据结果
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
                <table
                  cellSpacing={"0"}
                  cellpadding="0"
                  width={"100%"}
                  className="MsoNormalTable"
                >
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          检测单号
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.checkNo}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车牌号
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.licensePlate}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          轴数
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.vehicleType}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车货总重(t)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.showLoad / 1000}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          限重(t)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.approvedLoad / 1000}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          超限重量(t)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.overLoad / 1000}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          超限率(%)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.overRate}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          是否超限
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.isViolate ? "是" : "否"}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          检测时间
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.violateTime}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车道
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",

                        borderTop: "1pt solid black",
                        borderButtom: "1pt solid black",
                        borderRight: "1pt solid black",
                        borderLeft: "none",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.devChnnum}
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr style={{ height: "25.5pt" }}>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          站点名称
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",
                        border: "1px solid black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.monitorName}
                        </span>
                      </p>
                    </td>
                    <td
                      width={"14%"}
                      nowrap="nowrap"
                      style={{
                        width: "14.04%",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderTopColor: "windowtext",
                        borderButtomColor: "windowtext",
                        borderRightColor: "black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "0.0001pt",
                          textAlign: "center",
                          verticalAlign: "middle",
                        }}
                        align="center"
                        class="MsoNormal"
                      >
                        <span
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          车速(km/h)
                        </span>
                      </p>
                    </td>
                    <td
                      width="26%"
                      nowrap="nowrap"
                      style={{
                        width: "26%",
                        borderImage: "initial",
                        border: "1px solid black",
                        padding: "0.6pt 0.6pt 0cm",
                        height: "25.5pt",
                      }}
                    >
                      <p
                        align="left"
                        class="MsoNormal"
                        style={{
                          marginBottom: "0.0001pt",
                          marginLeft: "5px",
                          verticalAlign: "middle",
                        }}
                      >
                        <span
                          lang="EN-US"
                          style={{
                            fontFamily: "宋体",

                            color: "black",
                          }}
                        >
                          {state.velocity}
                        </span>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.isShowBtn ? (
          <div className="print_btn">
            <div className="muban">
              <Select
                defaultValue={1}
                style={{
                  width: 180,
                }}
                onChange={this.onChange}
                options={[
                  {
                    value: 1,
                    label: "超限超载违法行为处理告知书",
                  },
                  {
                    value: 2,
                    label: "超限超载车辆信息检测单",
                  },
                  {
                    value: 3,
                    label: "车辆信息检测详情",
                  },
                ]}
              />
            </div>
            <Button type="primary" onClick={this.printContent}>
              打印
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: "8px" }}
              onClick={this.go}
            >
              返回上级
            </Button>
            <Button
              type="primary"
              style={{ marginLeft: "8px" }}
              onClick={this.clickWord}
            >
              导出word
            </Button>
          </div>
        ) : null}
      </>
    );
  }
}

export default Print;
