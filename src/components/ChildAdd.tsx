import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
} from 'antd';
import React, { useState } from 'react';
import { FC } from 'react';
import 'antd/dist/antd.min.css';
import "../styles.css"

const ChildAdd: React.FC = () => {

  const [childName, setChildName] = useState("")
  const [childAccount, setChildAccount] = useState("")
  const [deliverDate, setDeliverDate] = useState<Date>()
  const [deliverAmount, setDeliverAmount] = useState(0)


  return (
    <>
      <h5 id="parent-table-title"> Çocuk Ekle ve Para Yatır</h5>
      <Row justify="center" align="middle">
        <Col span={20}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size="large"
          >
            <Form.Item label="Ad Ve Soyad Giriz">
              <Input onChange={(e) => setChildName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Hesap Bilgisi">
              <Input onChange={(e) => setChildAccount(e.target.value)} />
            </Form.Item>

            <Form.Item label="Devredilicek Tarih">
              <DatePicker onChange={(e) => setDeliverDate(e?.toDate())} />
            </Form.Item>
            <Form.Item label="Devredilicek Miktar">
              <InputNumber onChange={(e) => setDeliverAmount(+e.valueOf())} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center", paddingTop: "5%" }}>
              <Button type="primary" htmlType="submit" >Kaydet</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChildAdd;