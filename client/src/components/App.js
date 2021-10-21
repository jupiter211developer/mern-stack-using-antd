import React, { Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../_actions/user_actions';
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import Feedbacks from "./views/FeedbackPage/Feedbacks.js";
import FeedbackCreate from "./views/FeedbackPage/FeedbackCreate.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  const isAuthenticated = useSelector(state => state.user.userData && state.user.userData.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [dispatch])

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <PrivateRoute exact path="/" component={LandingPage}/>
          <PrivateRoute exact path="/feedbacks" component={Feedbacks}/>
          <PrivateRoute exact path="/feedbacks/new" component={FeedbackCreate}/>
{/*          <Route exact path="/feedbacks" component={Auth(Feedbacks, null)} />
          <Route exact path="/feedbacks/create" component={Auth(FeedbackCreate, null)} />*/}
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/register" component={RegisterPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={
          props =>
            isAuthenticated ? (
              React.createElement(component, props)
            ) : (
              <Redirect
                to="/login"
              />
            )
        }>
      </Route>
    )
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        exact
        {...rest}
        render={
          props => 
            isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              React.createElement(component, props)
            )
        }
      />
    )
  }
}

export default App;
