import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Menu } from "antd";
import "./settingleft.css";

class Settingleft extends Component {
  state = {
    openkeys: ["1"],
  };

  componentDidMount() {
    this.setState({ openkeys: [this.setOpenKeys()] });
  }
  //点击跳转
  clickPath = (item) => {
    this.props.history.push(item.key);
  };
  //每次切换都取最后值保证之展开一个父项
  open = (key) => {
    this.setState({ openkeys: [key[key.length - 1]] });
  };

  pathname = () => {
    if (this.props.history.location.pathname === "/setting") {
      return "/setting/user";
    }
    return this.props.history.location.pathname;
  };

  //开始时拿到要展开的子项
  setOpenKeys = () => {
    switch (this.props.history.location.pathname) {
      case "/setting/user" || "/setting/roles":
        return "1";
      case "/setting/address":
        return "2";
      default:
        return "3";
    }
  };
  render() {
    return (
      <div className="setting_left">
        <div className="is-never-shadow">
          <div className="card__header">
            <div>
              <span>系统设置 :</span>
            </div>
          </div>
          <div className="card__body">
            <Menu
              theme="dark"
              style={{
                width: "100%",
                marginTop: "20px",
              }}
              openKeys={this.state.openkeys}
              defaultSelectedKeys={[this.pathname()]}
              mode="inline"
              items={this.props.items}
              onOpenChange={this.open}
              onClick={this.clickPath}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Settingleft);
