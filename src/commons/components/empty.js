import React from 'react';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const CustomEmpty = (props) => {
  const { title } = props;
  return <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        {title}
      </span>
    }
  >
    <Spin indicator={antIcon} />
  </Empty>
}