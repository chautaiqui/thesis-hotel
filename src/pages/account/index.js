import React, { useContext, useEffect, useState } from "react";
import {
  Row, Col, Grid, Avatar, Tabs, Form, Input, DatePicker, Button, message, Card, Menu, Drawer
} from "antd";
import { AccountContent } from "./account";
import axios from "axios";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import moment from "moment";

import "./account.style.css";
import { User } from "../../pkg/reducer";
import { getRequest, postMethod, putMethod } from "../../pkg/api";
import { CustomUpload } from "../../commons";
import { VoucherItem } from "../../components/voucher-item";
import { MenuOutlined } from '@ant-design/icons';


const { useBreakpoint } = Grid;
const breakPoint = (obj) => {
  const arr = Object.entries(obj).reverse();
  const temp = arr.filter((item) => item[1] === true);
  return temp[0] ? temp[0][0] : "xxl";
};
export const Account = () => {
  const [ user, dispatchUser] = useContext(User.context);
  const [ keyItem, setKeyItem ] = useState(1);
  const [ collapsed, setCollapsed ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const screens = useBreakpoint();
  const breakP = breakPoint(screens);
  
  useEffect(()=>{
    switch (breakP) {
      case 'xs':
        setCollapsed(true);
        return;
      case 'sm':
        setCollapsed(true);
        return;
      case 'md':
        setCollapsed(false);
        return;
      case 'lg':
        setCollapsed(false);
        return;
      case 'xl':
        setCollapsed(false);
        return;
      case 'xxl':
        setCollapsed(false);
        return;
      default:
        return;
    }
  },[breakP])

  const menuClick = (e) => {
    if(collapsed) {
      setKeyItem(Number(e.key));
      setVisible(false);
      return;
    }
    setKeyItem(Number(e.key));
  }
  const toggleMenu = () => {
    setVisible(true)
  }
  return (
    <Row gutter={[16,16]} >
      <Col xs={2} sm={2} md={6}>
        { collapsed ? <Button icon={<MenuOutlined />} onClick={toggleMenu}/>: <Menu
          onClick={menuClick}
          style={{ width: "100%" }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <Menu.Item key="1">Infomation</Menu.Item>
          <Menu.Item key="2">Change password</Menu.Item>
          <Menu.Item key="3">History booking</Menu.Item>
          <Menu.Item key="4">Voucher</Menu.Item>
        </Menu>}
      </Col> 

      <Col xs={24} sm={24} md={18}>
        <AccountContent keyItem={keyItem} user={user}/>
      </Col>
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={()=>{setVisible(false)}}
        visible={visible}
      >
        <Menu
          onClick={menuClick}
          style={{ width: "100%" }}
          defaultSelectedKeys={[keyItem.toString()]}
          mode="inline"
        >
          <Menu.Item key="1">Infomation</Menu.Item>
          <Menu.Item key="2">Change password</Menu.Item>
          <Menu.Item key="3">History booking</Menu.Item>
          <Menu.Item key="4">Voucher</Menu.Item>
        </Menu>
      </Drawer>
    </Row>
  )
};
