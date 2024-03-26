import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../page/login/Login";
import NotFound from "../page/404/Index";
import ViolationDetail from "../page/detail/ViolationDetail";
import PassingDetail from "../page/detail/PassingDetail";
import { getToken } from "../util/localStorage";
import Print from "../page/print/Print";
import App from "../App";
class IndexRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path={"/login"} component={Login} />
        <Route path={"/404"} component={NotFound} />
        <Route
          path={"/violationdetail/:id/:monitorId"}
          component={ViolationDetail}
        />
        <Route path={"/print"} component={Print} />
        <Route path={"/404"} component={NotFound} />
        <Route
          path={"/passingdetail/:oldId/:isviolate"}
          component={PassingDetail}
        />
        <Route
          path={"/"}
          render={() => (getToken() ? <App /> : <Redirect to={"/login"} />)}
        />
      </Switch>
    );
  }
}

export default IndexRouter;
