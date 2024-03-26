import React, { Component } from "react";
import { Pagination } from "antd";
import "./footer.css";
class Footer extends Component {
  changepageSize = (page, pageSize) => {
    this.props.Pagination(page, pageSize);
  };
  render() {
    return (
      <div className="footer">
        <Pagination
          onChange={(page, pageSize) => this.changepageSize(page, pageSize)}
          className="pagin"
          style={{ color: "#fff" }}
          total={this.props.total}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `一共 ${total} 条`}
        />
      </div>
    );
  }
}

export default Footer;
