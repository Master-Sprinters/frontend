import React, { useEffect, useState } from "react";
import MasterPicture from "../images/Master.jpeg"
import { Button, Input, Form, message } from 'antd';
import { FC } from "react";
import { Col, Row } from 'antd';
import "../styles.css"
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import SmartContractPic from "../images/SmartContract.jpg"
import LoginBottom from "../images/LoginBottom.svg"
import LoginTop from "../images/LoginTop.svg"

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

        <Button id="login-btn" type="primary" htmlType="submit" onClick={handleLogin}>
            BAŞLA
        </Button>

    ]

    return (
        <div style={{ overflowY: "scroll", height: "100vh" }}>
            <div className="image-wrapper"><img id="login-top-img" src={LoginTop} alt="loginTop" /></div>
            <Row justify="center" align="middle">
                <Col span={12} style={{ textAlign: "center" }}>
                    <div className="login-left">
                        <h5 className="login-left-title">MetaMask İle Bağlanın;</h5>
                        <p className="login-left-description">
                            MetaMask Ethereum blok zinciri ile etkileşim kurmak için
                            kullanılan bir kripto para cüzdanıdır. Metamask cüzdan kullanmak
                            için, Chrome, Firefox, Edge veya Brave gibi Chromium tabanlı bir web
                            tarayıcısı gereklidir. Metamask cüzdan ile size özel tanımlanmış private
                            key sayesinde sitemize tek tıkla üye olabilir ve kayıt yapabilirsiniz.
                            Sitemiz üzerinden MetaMask cüzdanınızdaki kripto para varlıkları ile smart
                            contract oluşturabilirsiniz.
                        </p>
                        {loginButton}
                    </div>
                </Col>
                <Col span={12}>
                    <div className="image-wrapper"><img id="smart-contract-img" src={SmartContractPic} alt="eth" /></div>
                </Col>
            </Row>
            <div style={{ marginTop: "100px" }} id="login-bottom">
            </div>
        </div>
    );
}

export default LoginScreen;