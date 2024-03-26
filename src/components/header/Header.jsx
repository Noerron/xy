import React, { Component } from "react";
import {
  UserOutlined,
  ImportOutlined,
  ExclamationCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import { Tooltip, Modal } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import screenfull from "screenfull";
import { logoutApi, getHomeTitleApi } from "../../api/api";
import { getpermission } from "../../util/localStorage";
import "./header.css";

const { confirm } = Modal;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: "0000/0/00 上午0:00:00",
      isModalOpen: false,
      permission: getpermission(),
      fullScreen: false, //全屏
      routingControl: [],
      menuLeft: [],
      menuRingth: [],
      title: "",
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.getTime();
    this.getHomeTitle();
    this.permissionMap();
  }

  //全屏显示函数
  fullScreen = () => {
    this.setState({ fullScreen: !this.state.fullScreen });
    screenfull.toggle();
  };

  userInfo = () => {
    this.props.history.push("/userInfo");
  };

  login = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: "你确定要退出",
      centered: true,
      onOk: async () => {
        await logoutApi({
          username: sessionStorage.getItem("username"),
        });
        sessionStorage.clear();
        this.props.history.push("/login");
      },
    });
  };

  getHomeTitle = async () => {
    const res = await getHomeTitleApi();
    this.setState({ title: res });
  };

  handleCancel = () => {
    this.setState({ isModalOpen: false });
  };

  //获取时间
  getTime = () => {
    setInterval(() => {
      let myDate = new Date();
      let year = myDate.getFullYear();
      let month = myDate.getMonth() + 1;
      let date = myDate.getDate();
      let hours = myDate.getHours();
      let minutes = myDate.getMinutes();
      let seconds = myDate.getSeconds();
      var week = "星期" + "日一二三四五六".charAt(myDate.getDay());
      hours = this.check(hours);
      minutes = this.check(minutes);
      seconds = this.check(seconds);
      const times =
        year +
        "-" +
        month +
        "-" +
        date +
        "\xa0 " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        "\xa0\xa0\xa0" +
        week;
      this.setState({ times });
    }, 1000);
  };

  check = (i) => {
    let num;
    i < 10 ? (num = "0" + i) : (num = i);
    return num;
  };

  permissionMap = () => {
    const { permission } = this.state;
    let menuLeft = [];
    let menuRingth = [];

    if (menuLeft.length === 0) {
      permission.map((item) => {
        if (item.id < 10) {
          menuLeft.push(item);
        } else {
          menuRingth.push(item);
        }
      });
    }
    this.setState({ menuLeft, menuRingth });
  };
  render() {
    const { fullScreen, menuLeft, menuRingth, title } = this.state;

    return (
      <div id="header">
        <div className="topBar">
          <div className="topBar-content">
            <div className="topBar-left">
              {menuLeft.map((item) => {
                return (
                  <NavLink to={item.path} key={item.id} className="router-link">
                    {item.authName}
                  </NavLink>
                );
              })}
            </div>
            <div className="topBar-center">
              <p className="title">
                <span>{title}</span>
              </p>
              <div className="time_weather">
                <span>{this.state.times}</span>
                <span>
                  <iframe
                    allowtransparency="true"
                    frameBorder="0"
                    width="180"
                    height="25"
                    scrolling="no"
                    src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=&f=ffffff&ltf=ffffff&htf=ffffff&q=1&e=1&a=1&c=60982&w=180&h=25&align=right"
                  ></iframe>
                </span>
              </div>
            </div>
            <div className="topBar-right">
              {menuRingth.map((item) => {
                return (
                  <NavLink to={item.path} key={item.id} className="router-link">
                    {item.authName}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div className="menu">
            <Tooltip placement="bottom" title={"全屏"}>
              <div ref={this.formRef}>
                {fullScreen === true ? (
                  <FullscreenExitOutlined onClick={this.fullScreen} />
                ) : (
                  <FullscreenOutlined onClick={this.fullScreen} />
                )}
              </div>
            </Tooltip>

            <Tooltip
              placement="bottom"
              title={"个人中心"}
              onClick={this.userInfo}
            >
              <UserOutlined />
            </Tooltip>

            <Tooltip placement="bottom" title={"退出"}>
              <ImportOutlined onClick={this.login} />
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
