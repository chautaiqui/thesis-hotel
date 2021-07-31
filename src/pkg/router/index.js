import React, { useContext, useEffect, useState } from "react";
import { User } from "../reducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "../../commons/layout";
import { routerPages } from "../../pages";
import { Home } from "../../pages/home";
import { Hotel } from "../../pages/hotel";
import { DetailHotel } from "../../pages/detailhotel";
import { Blog } from "../../pages/blog";
import { BlogItem } from "../../pages/detailblog";
import { postRequest } from "../api";
import { Term } from "../../pages/term";
import { Privacy } from "../../pages/privacy";
import { Voucher } from "../../pages/voucher";

const RouterContainer = (props) => {
  const [_user, dispatchUser] = useContext(User.context);
  const [check, setCheck] = useState(false);
  const isLogin = props.guest ? false : true;
  // console.log("is login: ", isLogin);
  console.log("user", _user);

  useEffect(() => {
    const { email, api_token } = localStorage;
    const checkUser = async () => {
      // console.log("check");
      try {
        const res = await postRequest("customer/login", {
          email: email,
          password: api_token,
        });
        if (!res.success) {
          localStorage.removeItem("email");
          localStorage.removeItem("api_token");
          setCheck(true);
        } else {
          dispatchUser({
            type: "LOGIN",
            user: res.result.customer,
            email: email,
            api_token: api_token,
          });
        }
      } catch (e) {
        delete localStorage.api_token;
        setCheck(true);
      }
    };
    // console.log("local storage", check, email, api_token);
    if (!check) {
      if (email && api_token) {
        // console.log("call check");
        return checkUser();
      } else setCheck(true);
    }
    // eslint-disable-next-line
  }, [check]);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/hotel">
            <Hotel />
          </Route>
          <Route exact path="/hotel/:id">
            <DetailHotel />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route exact path="/blog/:id">
            <BlogItem />
          </Route>
          <Route exact path="/voucher">
            <Voucher />
          </Route>
          <Route exact path="/terms">
            <Term />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
          {routerPages
            .filter((p) => p.isLogin === isLogin)
            .map((p) => (
              <Route path={p.path} key={p.path}>
                <p.component />
              </Route>
            ))}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default RouterContainer;

function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
    </div>
  );
}
