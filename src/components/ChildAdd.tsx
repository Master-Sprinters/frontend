import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  message,
} from 'antd';
import React, { useState } from 'react';
import { FC } from 'react';
import { ethers } from "ethers";
import 'antd/dist/antd.min.css';
import "../styles.css"

type Props = {
  contract: ethers.Contract | undefined;
}

const ChildAdd: FC<Props> = ({contract}) => {

  const [childName, setChildName] = useState("")
  const [childFirstName, setChildFirstName] = useState("")
  const [childLastName, setChildLastName] = useState("")
  const [childAccount, setChildAccount] = useState("")
  const [deliverDate, setDeliverDate] = useState<Date>()
  const [deliverAmount, setDeliverAmount] = useState(0)

  const handleChildAdd = async () => {
    //splitting given input to get the name and surname
    let userNameSplitted = childName.split(" ", 2);
    let childFirstName = userNameSplitted[0]
    let childLastName = userNameSplitted[1]
    
    if(typeof childName === 'undefined'){
      message.error('Lütfen geçerli bir isim-soyisim giriniz...')
      return
    }
    console.log()
    if(typeof contract !== 'undefined'){
      const res = await contract.addChild(childAccount, childFirstName, childLastName, deliverDate?.getTime(), { value: ethers.utils.parseEther(deliverAmount.toString()) })
      const res2 = await res.wait()
      console.log(res2)
      console.log(deliverDate?.getTime())
    }
  }

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
            onFinish={handleChildAdd}
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
