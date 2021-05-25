import React, { useContext, useState } from 'react'
import { User } from '../pkg/reducer';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Grid, Button, Drawer, Avatar } from 'antd';
import './css/header.style.css';
import { MenuFoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
const { useBreakpoint } = Grid;

const breakPoint = (obj) => {
  const arr = Object.entries(obj).reverse();
  const temp = arr.filter(item=> item[1] === true)
  return temp[0] ? temp[0][0] : 'xxl';
}


export const Headers = (props) => {
  const [ user, dispatchUser ] = useContext(User.context);
  const { isLogin } = props;
  const history = useHistory();
  const screens = useBreakpoint();
  const breakP = breakPoint(screens);
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onLogout = () => {
    history.push('/')
    dispatchUser({type: 'LOGOUT'})
  }
  return (
    <nav>
      <div className='div-header'>
        <div className='div-svg' onClick={() => history.push('/')}>
            Home
        </div>
        { breakP !== 'xs' ? (<div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            {!isLogin && (<NavLink exact to='/login' activeClassName='active'>Login</NavLink>)}
            {!isLogin && (<NavLink exact to='/signup' activeClassName='active'>Sign up</NavLink>)}
            {isLogin && (<NavLink exact to='/account' activeClassName='active'>
              <Avatar src={user.img || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} /> {user.name || 'account'}
            </NavLink>)}
            {isLogin && (<Button type="primary" shape="round" icon={<LogoutOutlined />} className='btn-logout' onClick={onLogout}/>)}
        </div>) :  <Button type="primary" shape="round" icon={<MenuFoldOutlined />} onClick={handleClick}/>
        }
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          className="draw-menu"
        >
          {!isLogin && (<NavLink exact to='/login' onClick={onClose}>Log in</NavLink>)}
          {!isLogin && (<NavLink exact to='/signup' onClick={onClose} className="btn-log-out-mobile">Sign up</NavLink>)}
          {isLogin && (<NavLink exact to='/account' onClick={onClose}>
            <Avatar src={user.img || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} /> {user.name || 'account'}
          </NavLink>)}
          {isLogin && (<Button type="primary" shape="round" icon={<LogoutOutlined />} className='btn-logout btn-log-out-mobile' onClick={onLogout}/>)}
        </Drawer>
      </div>
    </nav>
  )
}