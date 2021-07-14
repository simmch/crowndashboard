import store from './store';
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/auth/auth"; 
import { Provider } from 'react-redux';
import Login from './components/auth/login';
import Landing from './components/landing/landing';
import Navbar from './components/navigation/navbar';
import Sidebar from './components/navigation/sidebar';
import NewCard from './components/cards/newcard';
import UpdateCard from './components/cards/updatecard';
import UpdateArm from './components/arms/updatearm';
import NewArm from './components/arms/newarm';
import NewUniverse from './components/universe/newuniverse';
import UpdateUniverse from './components/universe/updateuniverse';
import UpdateTitle from './components/titles/updatetitle';
import NewTitle from './components/titles/newtitle';
import logo from './logo.svg';
import './App.scss';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>

        <Fragment>
          <section className="container-scroller">

            <Route component={Sidebar} />
            <div className="container-fluid page-body-wrapper">
              <Route component={Navbar} />

              <div className="main-panel">
                <div className="content-wrapper">
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/newcard" component={NewCard} />
                    <Route exact path="/updatecards" component={UpdateCard} />
                    <Route exact path="/newarm" component={NewArm} />
                    <Route exact path="/updatearms" component={UpdateArm} />
                    <Route exact path="/newuniverse" component={NewUniverse} />
                    <Route exact path="/updateuniverse" component={UpdateUniverse} />
                    <Route exact path="/newtitle" component={NewTitle} />
                    <Route exact path="/updatetitles" component={UpdateTitle} />
                  </Switch>
                </div>
              </div>
            </div>
          </section>

        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
