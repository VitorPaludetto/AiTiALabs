import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Profile from "./components/Profile";
// import Footer from "./components/Footer";

function Routes() {
  return (
    <>
      <Header />
      <Switch>
        {/* {localStorage.getItem("Token") ? (
          <Redirect to="/profile" />
        ) : ( */}
        <>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile} />
        </>
        {/* )} */}
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default Routes;
