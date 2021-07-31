import React, { useContext, useState } from "react";
import { User } from "../pkg/reducer";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Grid, Button, Drawer, Avatar } from "antd";
import "./css/header.style.css";
import { MenuFoldOutlined, LogoutOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

const breakPoint = (obj) => {
  const arr = Object.entries(obj).reverse();
  const temp = arr.filter((item) => item[1] === true);
  return temp[0] ? temp[0][0] : "xxl";
};

export const Headers = (props) => {
  const [user, dispatchUser] = useContext(User.context);
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
    history.push("/");
    dispatchUser({ type: "LOGOUT" });
  };

  return (
    <nav>
      <div className="div-header">
        <div className="div-svg" onClick={() => history.push("/")}>
          <img
            style={{ height: "50px", width: "50px" }}
            // src={Logo}
            src={
              "https://ads-cdn.fptplay.net/static/banner/2021/06/96d6f2e7e1f705ab5e59c84a6dc009b2_3013.png"
            }
            alt="logo"
          />
        </div>
        {breakP !== "xs" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {!isLogin && (
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="button-login"
              >
                login
              </NavLink>
            )}
            {!isLogin && (
              <NavLink
                exact
                to="/signup"
                className="button-login"
                activeClassName="active"
              >
                sign up{" "}
              </NavLink>
            )}
            {isLogin && (
              <NavLink exact to="/account" activeClassName="active">
                <Avatar
                  src={
                    user.img ||
                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  }
                />{" "}
                {user.name || "account"}
              </NavLink>
            )}
            {isLogin && (
              <Button
                style={{
                  backgroundColor: "#57ca8b",
                  borderRadius: 5
                }}
                icon={<LogoutOutlined />}
                className="btn-logout"
                onClick={onLogout}
              />
            )}
          </div>
        ) : (
          <Button
            // type="primary"
            // shape="round"
            icon={<MenuFoldOutlined />}
            onClick={handleClick}
            style={{
              backgroundColor: "#57ca8b",
              borderRadius: 5
            }}
          />
        )}
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          className="draw-menu"
        >
          {!isLogin && (
            <NavLink 
              exact to="/login" onClick={onClose} 
              className="btn-log-out-mobile"
            >
              Log in
            </NavLink>
          )}
          {!isLogin && (
            <NavLink
              exact
              to="/signup"
              onClick={onClose}
              className="btn-log-out-mobile"
            >
              Sign up
            </NavLink>
          )}
          {isLogin && (
            <NavLink exact to="/account" onClick={onClose}>
              <Avatar
                src={
                  user.img ||
                  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                }
              />{" "}
              {user.name || "account"}
            </NavLink>
          )}
          {isLogin && (
            <Button
              style={{
                backgroundColor: "#57ca8b",
                borderRadius: 5
              }}
              icon={<LogoutOutlined />}
              className="btn-logout btn-log-out-mobile"
              onClick={onLogout}
            />
          )}
        </Drawer>
      </div>
    </nav>
  );
};
