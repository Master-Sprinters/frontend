import { useEffect } from "react";
import { Button } from 'antd';
import { FC } from "react";
import { Col, Row } from 'antd';
import "../styles.css"
import { useNavigate } from "react-router-dom";
import SmartContractPic from "../images/SmartContract.jpg"
import LoginTop from "../images/LoginTop.svg"

type Props = {
    userRole: number;
}

const LoginScreen: FC<Props> = ({ userRole }) => {

    const navigate = useNavigate()

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

        <Button key={10} id="login-btn" type="primary" htmlType="submit" onClick={handleLogin}>
            Başla
        </Button>

    ]

    return (
        <div id="login-wrapper">
            <div className="image-wrapper"><img id="login-top-img" src={LoginTop} alt="loginTop" /></div>
            <Row justify="center" align="middle">
                <Col span={12} style={{ textAlign: "center" }}>
                    <div className="login-left">
                        <h5 className="login-left-title">MetaMask İle Bağlanın;</h5>
                        <p className="login-left-description">
                            MetaMask, Ethereum blok zinciri ile etkileşim kurmak için
                            kullanılan bir kripto para cüzdanıdır. Metamask cüzdan kullanmak
                            için, Chrome veya Firefox gibi Chromium tabanlı bir web
                            tarayıcısı gereklidir. Metamask cüzdan ile size özel tanımlanmış private
                            key sayesinde sitemize tek tıkla kayıt yapabilirsiniz.
                            Sitemiz üzerinden MetaMask cüzdanınızdaki ETH ile smart
                            işlem oluşturabilirsiniz.
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