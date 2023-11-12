import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Content from './Components/Content';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <div className='flex flex-col lg:flex-row '>
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Content} />
            <Route path="/accounts" component={Content} />
            <Route path="/payroll" component={Content} />
            <Route path="/reports" component={Content} />
            <Route path="/advisor" component={Content} />
            <Route path="/contacts" component={Content} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
