import React, { useState } from "react";
import MasterPicture from "./Master.jpeg"
import { Button, Input, Checkbox, Form } from 'antd';
import { FC } from "react";
import { Col, Row } from 'antd';


const LoginScreen: FC = () => {

  const[username, setUserName] = useState<string>("")
  const[userPass, setUserPass] = useState<string>("")
  const[remember, setRemember] = useState<boolean>(false)

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    console.log(username)
    console.log(userPass)
    console.log(remember)
  }

  return (
    <div className="loginScreen">
      <Row justify="center" align="middle">
      <Col span={12}>
        <img style= {{ borderRadius: "50%"}} src={MasterPicture} alt="Master" height="100%" width="100%"></img>
      </Col>
      <Col span={12} style={{paddingLeft: "100px"}}> 
      <Form
      name="basic"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      layout="vertical"
      initialValues={{ remember: false }}
      onFinish={handleSubmit}
      //onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Kullanıcı Adı Veya E-Posta Adresi"
        name="username"
        rules={[{ required: true, message: 'Lütfen kullanıcı adı veya e-posta giriniz!' }]}
      >
        <Input onChange={(e) => setUserName(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Parola"
        name="password"
        rules={[{ required: true, message: 'Lütfen şifre giriniz!' }]}
      >
        <Input.Password onChange={(e) => setUserPass(e.target.value)}/>
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" >
        <Checkbox style={{ alignSelf: "auto"}} onChange={(e) => setRemember(e.target.checked)}> Beni Hatırla </Checkbox>
      </Form.Item>

      <Form.Item style={{ textAlign: "right"}}>
        <Button type="primary" htmlType="submit">
          Giriş
        </Button>
      </Form.Item>
    </Form>
     </Col>
    </Row>
    </div>
  );
}

export default LoginScreen;