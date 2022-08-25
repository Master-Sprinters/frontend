import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Popconfirm,
  notification,
} from 'antd';
import React, { useState } from 'react';
import { FC } from 'react';
import { ethers } from "ethers";
import 'antd/dist/antd.min.css';
import "../styles.css"
import type { NotificationPlacement } from 'antd/es/notification';

type Props = {
  contract: ethers.Contract | undefined;
}

const ChildAdd: FC<Props> = ({ contract }) => {

  const [childName, setChildName] = useState("")
  const [childAccount, setChildAccount] = useState("")
  const [deliverDate, setDeliverDate] = useState<Date>()
  const [deliverAmount, setDeliverAmount] = useState(0)

  const text = "İşlemi onaylıyor musunuz?"

  const displaySuccesNotification = (placement: NotificationPlacement) => {
    notification.success({
      message: `Çocuk ekleme başarılı`,
      placement,
    });
  };

  const handleChildAdd = async () => {
    //splitting given input to get the name and surname
    let userNameSplitted = childName.split(" ", 2);
    let childFirstName = userNameSplitted[0]
    let childLastName = userNameSplitted[1]

    if (typeof childName === 'undefined') {
      return
    }
    if (typeof contract !== 'undefined') {
      const res = await contract.addChild(childAccount, childFirstName, childLastName, deliverDate?.getTime(), { value: ethers.utils.parseEther(deliverAmount.toString()) })
      const res2 = await res.wait()
      console.log(res2)
      console.log(deliverDate?.getTime())
      if(res2 !== 'undefined'){
        displaySuccesNotification('bottomRight')
      }
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
          >
            <Form.Item label="Ad Ve Soyad Giriz"
              rules={[{ required: true, message: 'Çocuğunuzun adını ve soyadını giriniz...' }]}
            >
              <Input onChange={(e) => setChildName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Hesap Bilgisi"
              rules={[{ required: true, message: 'Lütfen bilgisi giriniz...' }]}
            >
              <Input onChange={(e) => setChildAccount(e.target.value)} />
            </Form.Item>

            <Form.Item label="Devredilicek Tarih"
              rules={[{ required: true, message: 'Geçerli bir devir tarihi giriniz' }]}
            >
              <DatePicker onChange={(e) => setDeliverDate(e?.toDate())} />
            </Form.Item >
            <Form.Item label="Devredilicek Miktar"
            rules={[{ required: true, message: 'Devredilecek miktarı giriniz' }]}
>
              <InputNumber onChange={(e) => setDeliverAmount(+e.valueOf())} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center", paddingTop: "5%" }}>
              <Popconfirm placement="bottom" title={text} onConfirm={handleChildAdd} okText="Evet" cancelText="Hayır">
                <Button type="primary" htmlType="submit" >Kaydet</Button>
              </Popconfirm>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChildAdd;
