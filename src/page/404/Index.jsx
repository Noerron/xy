import React, { PureComponent } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
class Index extends PureComponent {
  componentDidMount() {
    document.title = "404";
  }
  render() {
    return (
      <div style={{ background: "#fff", width: "100%", height: "100%" }}>
        <Result
          status="404"
          title="404"
          subTitle="你没有权限去该页面
          如有不满请联系你领导
          或者你可以去"
          extra={
            <>
              <Button type="primary">
                <Link to={"/home"}>回到首页</Link>
              </Button>
              <Button type="primary">
                <a href="https://www.baidu.com/">随便看看</a>
              </Button>
            </>
          }
        />
      </div>
    );
  }
}

export default Index;
