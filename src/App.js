import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from './page/home/Home';
import Violation from './page/violation/Violation';
import Passing from './page/passing/Passing';
import Report from './page/report/Report';
import Monitor from './page/monitor/Monitor';
import Setting from './page/setting/Setting';
import UserInfo from './page/userInfo/UserInfo'
import Header from './components/header/Header';
class App extends Component {
  render() {
    return (
      <div style={{width:'100%',height:'100%'}}>
        <Header/>
          <Switch>
        <Route path={'/'} exact component={Home}/>
        <Route path={'/home'}  component={Home}/>
        <Route path={'/userInfo'}  component={UserInfo}/>
        <Route path={'/monitor'} component={Monitor}/>
        <Route path={'/passing'} component={Passing}/>
        <Route path={'/setting'}  component={Setting} />
        <Route path={'/violation'} component={Violation}/>
        <Route path={'/report'} component={Report}/>
        <Redirect from='*' to={'/404'} />
      </Switch>
      </div>
    );
  }
}

export default App;