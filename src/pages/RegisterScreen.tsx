import React, { useEffect, useState } from "react";
import MasterPicture from "../images/Master.jpeg"
import RegisterBackground from "../images/RegisterBackground.png"
import { Button, Input, Form, message } from 'antd';
import { FC } from "react";
import { Col, Row } from 'antd';
import "../styles.css"
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

type Props = {
  name: string;
  setName: (name: string) => void;
  surname: string;
  setSurname: (surname: string) => void;
  userRole: number;
  connectProvider: () => void;
  contract: ethers.Contract | undefined;
  address: string;
  setUserRole: (role: number) => void;

}

const RegisterScreen: FC<Props> = ({ surname, setSurname, name, setName, userRole, connectProvider, contract, address, setUserRole }) => {

  const navigate = useNavigate()

  useEffect(() => {
    //Runs when the given parameter is updated
    //direct the user to login page if adress changes

   //@ts-ignore
    const metaMaskProvider = window.ethereum
    if (metaMaskProvider) {
      metaMaskProvider.on("accountsChanged", () => {
        connectProvider()
        window.location.reload();

      });
    }
  });

  const handleRegister = async () => {
    //splitting given input to get the name and surname

    if((typeof name === 'undefined') || (typeof surname === 'undefined')){
      message.error('Lütfen geçerli bir isim-soyisim giriniz...')
      return
    }
    console.log(name, surname)
    if(typeof contract !== 'undefined'){
      const res = await contract.addParent(address, name, surname)
      const res2 = await res.wait()
      console.log(res2)
      const role = await contract.getRole(address)
      setUserRole(role)
      console.log(userRole)
      if(role === 1){
        navigate("/parent-screen")
      }
    }
  }

  return (
    <Row justify="center" align="middle" >
      <Col span={12} className="register-left">
      <Form
        name="basic"
        labelCol={{ offset:6, span: 12 }}
        wrapperCol={{ offset:6, span: 12 }}
        layout="vertical"
        initialValues={{ remember: false }}
        onFinish={handleRegister}
        //onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <h5 className="register-header" >Kayıt Ol</h5>
        <p className="register-description">Ether Miras’a hoş geldin, isim ve soyadını gir ve siteyi kullanmaya başla</p>
        <Form.Item
          label={ 
            <p className="register-name-label">İsim</p>
            }
          name="name"
          rules={[{ required: true, message: 'Lütfen isminizi giriniz.' }]}
        >
          <Input size="large" style={{ borderRadius:"10px"}} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="surname"
          label={ 
            <p className="register-name-label">Soyad</p>
            }
          rules={[{ required: true, message: 'Lütfen soyadınızı giriniz.' }]}
        >
          <Input size="large" style={{ borderRadius:"10px"}} onChange={(e) => setSurname(e.target.value)} />
        </Form.Item>
        <Form.Item style={{ textAlign: "center", paddingTop: "5%" }}>
          <Button id="register-btn" type="primary" htmlType="submit">
            KAYIT OL
          </Button>
        </Form.Item>
      </Form>
      </Col>
      <Col className="register-right" span={12} >
        <h5 className="register-welcome">Ether Miras'a Hoş Geldiniz</h5>
        <p className="register-welcome-description"> Kişiselleştirilmiş, kullanımı kolay ve güvenli.</p>
        <p className="register-welcome-description"> Çocuklarının geleceğine yatırım yapmak için ve platformun tüm  fonksiyonlarına 
erişmek için şimdi kaydol.</p>
        <h5 className="register-welcome-bottom">Çocuklarının Geleceğine Yatırım Yap.</h5>
      </Col>
    </Row>
  );
}

export default RegisterScreen;