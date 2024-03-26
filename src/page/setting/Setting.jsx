import React, { Component } from "react";
import Settingleft from "../../components/setting/Settingleft";
import { Switch, Route } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";
import { getpermission } from "../../util/localStorage";
import User from "./system/User";
import Roles from "./system/Roles";
import Stuck from "./stuck/Stuck";
import Led from "./checkpoint/Led";
import Address from "./checkpoint/Address";
import Log from "./log/Log";
import "./settingleft.css";
class Setting extends Component {
  state = {
    permission: getpermission(),
    items: [],
    path: "/setting/user",
  };
  componentDidMount() {
    this.menuitem();

    document.title = "系统设置";
  }
  menuitem = () => {
    let arr = [];
    console.log(this.state.permission);
    this.state.permission.map((item) => {
      if (item.description === "系统设置权限") {
        item.children.map((data, index) => {
          let children = data.children.map((data) => {
            return {
              label: data.authName,
              key: "/setting/" + data.path,
              icon: <AppstoreOutlined />,
            };
          });
          arr.push({
            label: data.authName,
            key: "/setting/" + index,
            icon: <AppstoreOutlined />,
            children,
          });
        });
      }
    });

    this.setState({ items: arr });

    this.props.history.push(arr[0].children[0].key);
  };
  render() {
    return (
      <div className="setting">
        {/* 左侧导航栏 */}
        <Settingleft items={this.state.items} />
        <div className="setting_right">
          <div className="camera_main">
            <Switch>
              <Route path={"/setting/address"} component={Address} />
              <Route path={"/setting/user"} component={User} />
              <Route path={"/setting/roles"} component={Roles} />
              <Route path={"/setting/log"} component={Log} />
              <Route path={"/setting/led"} component={Led} />
              <Route path={"/setting/stuck"} component={Stuck} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Setting;
