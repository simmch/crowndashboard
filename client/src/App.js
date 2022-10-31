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
import UpdateRank from './components/rank/updaterank';
import NewRank from './components/rank/newrank';
import NewWorld from './components/world/newworld';
import UpdateWorld from './components/world/updateworld';
import NewScenario from './components/scenario/newscenario';
import UpdateScenario from './components/scenario/updatescenario';
import UpdateZone from './components/zones/updatezones';
import NewZone from './components/zones/newzones';
import NewAbyss from './components/abyss/newabyss';
import UpdateAbyss from './components/abyss/updateabyss';
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
                    <Route exact path="/newrank" component={NewRank} />
                    <Route exact path="/updateranks" component={UpdateRank} />
                    <Route exact path="/newabyss" component={NewAbyss} />
                    <Route exact path="/updateabyss" component={UpdateAbyss} />
                    <Route exact path="/newworld" component={NewWorld} />
                    <Route exact path="/updateworld" component={UpdateWorld} />
                    <Route exact path="/newscenario" component={NewScenario} />
                    <Route exact path="/updatescenario" component={UpdateScenario} />
                    <Route exact path="/newzone" component={NewZone} />
                    <Route exact path="/updatezones" component={UpdateZone} />
                    {/* <Route exact path="/newpet" component={NewPet} />
                    <Route exact path="/updatepets" component={UpdatePet} /> */}
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
