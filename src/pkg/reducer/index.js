import React, { useReducer, createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const contextValue = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN':
        (action.email && localStorage.setItem('email', action.email));
        (action.api_token && localStorage.setItem('api_token', action.api_token));
        const _u = action.user || {};
        console.log(_u)
        return _u;
      case 'UPDATE':
        return action.user
      case 'LOGOUT':
        localStorage.removeItem('email');
        localStorage.removeItem('api_token');
        return {};
      default: return state;
    }
  }, {});
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
export const User = {
  context: UserContext,
  provider: Component => props => <UserProvider><Component {...props} /></UserProvider>
}
