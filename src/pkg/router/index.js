import React, { useContext, useEffect, useState } from 'react';
import { User } from '../reducer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Layout from '../../commons/layout';
import { routerPages } from '../../pages';
import { Home } from '../../pages/home';
import { Hotel } from '../../pages/hotel';
import { DetailHotel } from '../../pages/hotel/detail';
import { Blog } from '../../pages/blog';
import { postRequest } from '../api';

const RouterContainer = (props) => {
  const [ _user, dispatchUser ] = useContext(User.context);
  const [ check, setCheck ] = useState(false);
  const isLogin = props.guest ? false : true;
  console.log('is login: ', isLogin)
  console.log("user", _user);
  
  useEffect(()=>{
    const { email, api_token } = localStorage;
    const checkUser = async () => {
      try {
        const res = await postRequest('customer/login',{email:email, password:api_token});
        if (!res.success) {
          localStorage.removeItem('email');
          localStorage.removeItem('api_token');
          setCheck(true);
        }
        else {
          dispatchUser({type: 'LOGIN', user: res.result.customer, email: email, api_token: api_token});
        }
      } catch (e) {
        delete localStorage.api_token;
        setCheck(true);
      }
    }
    if (!check) {
      if (email && api_token) {
        return () => {
          checkUser();
        }
      }
      else setCheck(true);
    }
  }, [check])

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/hotel'>
            <Hotel />
          </Route>
          <Route exact path='/hotel/detail'>
            <DetailHotel />
          </Route>
          <Route exact path='/blog'>
            <Blog />
          </Route>
            {/* {routerPages.filter(p =>_user.permissions.indexOf(p.permissions) > -1).map(p => ( */}
              {routerPages.filter(p => p.isLogin === isLogin).map(p => (
              // <Route path={`${p.path}/:param`} key={`${p.path}/:param`}>
                <Route path={p.path} key={p.path}>
                  <p.component />
                </Route>
              ))}
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default RouterContainer;


function NotFound() {
  return (
    <div>
      <h2>Loading</h2>
    </div>
  );
}
