
import { Login } from './login';
import { Signup } from './signup';
import { Account } from './account';
import { Detail } from './detail';

export const routerPages = [
  { path: '/login', component: Login, permissions: 'login', isLogin: false },
  { path: '/signup', component: Signup, permissions: 'signup', isLogin: false },
  { path: '/account', component: Account, permissions: 'account', isLogin: true },
  { path: '/detail', component: Detail, permissions: 'detail', isLogin: true },
];
