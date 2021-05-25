import React, { useContext } from 'react';
import { User } from '../pkg/reducer';

const CurrentUser = props => {
  const { children } = props;
  const [ _user ] = useContext(User.context);

  // return _user.email ? children : <Login onLogin={onLogin} />;
  return Object.values(_user).length !== 0 ? children : (
    React.Children.map(children, child => (
        React.cloneElement(child, {
          guest: true
        })
    ))
  )
}

export default User.provider(CurrentUser);
