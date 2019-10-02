import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/Pages/Search";
import Saved from "./components/Pages/Saved";
import Inputdata from "./components/Pages/Inputdata";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Search} />
        
          <Route exact path="/home" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route exact path="/inputdata" component={Inputdata} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
       

            {/*all routes will be redirection to the map... */}
          <Route  path="/:id" render={() => {window.location.href="map.html"}} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
