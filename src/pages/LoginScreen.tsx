import React, { useEffect, useState } from "react";
import MasterPicture from "../images/Master.jpeg"
import { Button, Input, Form, message } from 'antd';
import { FC } from "react";
import { Col, Row } from 'antd';
import "../styles.css"
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

type Props = {
    userRole: number;
    connectProvider: () => void;
}

const LoginScreen: FC<Props> = ({ userRole, connectProvider }) => {

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
                navigate("/register-screen")
                break;
            }
        }
    }

    const loginButton = [

        <Button id="register-btn" type="primary" htmlType="submit" onClick={handleLogin}>
            Giriş Yap
        </Button>

    ]

    return (
        <Row justify="center" align="middle">
            <Col span={12} style={{ textAlign: "center" }}>
                <img className="master-img" src={MasterPicture} alt="Master"></img>
            </Col>
            <Col span={12} style={{ paddingLeft: "100px" }}>
                {loginButton}
            </Col>
        </Row>
    );
}

export default LoginScreen;