import React, { useState } from "react";
import MasterPicture from "./Master.jpeg"
import { Button, Input, Form } from 'antd';
import { FC } from "react";
import { Col, Row } from 'antd';
import "../styles.css"
import { ethers } from "ethers";

type Props = {
  username: string;
  setUserName: (username: string) => void;
}

const RegisterScreen: FC<Props> = ({username, setUserName}) => {

  const [showLoginBtn, setShowLoginBtn] = useState(true)
  
  const handleRegister = async () => {
    console.log(username)
    //@ts-ignore
    if (typeof window.ethereum !== 'undefined') { //check if metamask is installed
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      console.log(address)
    }
  }

  const handleLogin = () => {
    console.log("User Logged In")
    //if user is registered before, navigate to home page according to the user role
    //else
    setShowLoginBtn(false)
  }

  const displayLogin = () => {
    if(showLoginBtn){
      return(
        <Button id="register-btn" type="primary" htmlType="submit" onClick={handleLogin}>
          Giriş Yap
        </Button>
      )
    }
    return(
    <Form
      name="basic"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      layout="vertical"
      initialValues={{ remember: false }}
      onFinish={handleRegister}
      //onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="İsim - Soy İsim"
        name="username"
        rules={[{ required: true, message: 'İsminizi ve Soy İsminizi giriniz...' }]}
      >
        <Input onChange={(e) => setUserName(e.target.value)} />
      </Form.Item>
      <Form.Item style={{ textAlign: "center", paddingTop: "10%" }}>
        <Button id="register-btn" type="primary" htmlType="submit">
          Kayıt Ol
        </Button>
      </Form.Item>
    </Form>
    )
  }

  return (
    <Row justify="center" align="middle">
      <Col span={12} style={{ textAlign: "center" }}>
        <img className="master-img" src={MasterPicture} alt="Master"></img>
      </Col>
      <Col span={12} style={{ paddingLeft: "100px" }}>
        {displayLogin()}
      </Col>
    </Row>
  );
}

export default RegisterScreen;