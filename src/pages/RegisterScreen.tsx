import React, { useEffect, useState } from "react";
import MasterPicture from "../components/Master.jpeg"
import { Button, Input, Form, message } from 'antd';
import { FC } from "react";
import { Col, Row } from 'antd';
import "../styles.css"
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

type Props = {
  username: string;
  setUserName: (username: string) => void;
  userRole: number;
  connectProvider: () => void;
  contract: ethers.Contract | undefined;
  address: string;
  setUserRole: (role: number) => void;

}

const RegisterScreen: FC<Props> = ({ username, setUserName, userRole, connectProvider, contract, address, setUserRole }) => {

  const [showLoginBtn, setShowLoginBtn] = useState(true)
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
    let userNameSplitted = username.split(" ", 2);
    let uName = userNameSplitted[0]
    let uSurName = userNameSplitted[1]

    if(typeof uSurName === 'undefined'){
      message.error('Lütfen geçerli bir isim-soyisim giriniz...')
      return
    }
    console.log(uName, uSurName)
    if(typeof contract !== 'undefined'){
      const res = await contract.addParent(address, uName, uSurName)
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

  const handleLogin = async () => {
    
    switch (userRole) {
      case 0: { //admin
        navigate("/admin-screen")
        break;
      }
      case 1: { //parent
        navigate("/parent-screen")
        break;
      }
      case 2: { //child
        navigate("/child-screen")
        break;
      }
      default: {//unregistered
        setShowLoginBtn(false)
        break;
      }
    }
  }

  const displayLogin = () => {
    if (showLoginBtn) {
      return (
        <Button id="register-btn" type="primary" htmlType="submit" onClick={handleLogin}>
          Giriş Yap
        </Button>
      )
    }
    return (
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