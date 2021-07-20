import React from 'react';
import { Row, Col } from 'antd';
import { VoucherItem } from '../../components/voucher-item';
export const Voucher = (props) => {
  const { voucher } = props;
  return<>
    { voucher.length !== 0 && <Row gutter={[16, 16]}>
      {voucher.map((item, index) => {
        return (
          <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
            <VoucherItem
              voucher={item}
              view={true}
            />
          </Col>
        );
      })}
    </Row>}
  </>
}