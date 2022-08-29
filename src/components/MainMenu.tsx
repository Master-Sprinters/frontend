import { FC, useEffect, useState } from "react";
import { Col, Row } from "antd";
import Key from "../images/Key.png"
import Check from "../images/Check.png"
import Eth2 from "../images/Eth2.png"
import { AdvancedChart } from "react-tradingview-embed";
import { ethers } from "ethers";

type Props = {
    clientName: string;
    clientAddress: number;
    connectProvider: () => Promise<{
        role: any;
        address: string;
        contract: ethers.Contract;
    } | undefined>;
}

const App = () => <AdvancedChart widgetProps={

    {
        "width": window.screen.width*0.5,
        "height": window.screen.height*0.5,
        "symbol": "BINANCE:ETHTRY",
        "interval": "5",
        "timezone": "Europe/Istanbul",
        "theme": "dark",
        "style": "3",
        "locale": "tr",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "save_image": false,
        "container_id": "tradingview_b6f00"
    }
} />;

const MainMenu: FC<Props> = ({clientName, clientAddress, connectProvider}) => {

    const [totalAmount, setTotalAmount] = useState("")

    const [amountHeight, setAmountHeight] = useState(document.getElementById("parent-info")?.clientHeight)

    useEffect(() => {
        connectChildren()
    })

    const connectChildren = async () => {
        var totalAmount: number = 0
        connectProvider().then(async (res) => {
          res?.contract.getChildrenAsParent()
          .then(async (childrenRes: any) => {
            await childrenRes  
            for (let i = 0; i < childrenRes.length; i++) {
                totalAmount += Number(ethers.utils.formatEther(childrenRes[i][4]))
            }           
            setTotalAmount(totalAmount.toFixed(4).toString())
          })
        })   
    }
    
    useEffect(() => {
        setAmountHeight(document.getElementById("parent-info")?.clientHeight)
    })

    return (
    <div key={1} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div className="main-layout" style={{paddingLeft: "30px", paddingTop: "10px"}}>
            <Row id="welcome-name" className="parent-main-title">Hoş geldin {clientName} </Row>
            <Row id="address" className="parent-main-id">
                <img id="key-icon" src={Key} alt="key"/>
                <div style={{paddingLeft: "10px"}}> {clientAddress} </div>
            </Row>
        </div>
        
        <Row style={{paddingTop: "30px"}}>            
            <Col id="parent-info" span={16} className="edit-form">
                <div className="parent-info-text" style={{padding: "25px", minHeight: "250px"}}>
                    <Row>
                        <Col span={1}> <img id="check-icon" src={Check} alt="check"/> </Col>
                        <Col span={23} className="parent-info-text" style={{paddingLeft: "15px"}}>
                            <strong> Çocuk Ekle </strong> sekmesinden dilediğiniz kadar çocuk tanımlayabilir ve istediğiniz tarihte çocuğunuza belirlediğiniz tutardaki varlığınızı aktarabilirsiniz.
                        </Col>
                    </Row>
                    <Row style={{paddingTop: "20px", marginBottom: "0px"}}>
                        <Col span={1}> <img id="check-icon" src={Check} alt="check"/> </Col>
                        <Col span={23} style={{paddingLeft: "15px"}}>
                        <strong> Görüntüle / Değişiklik Yap </strong> sekmesinde çocuk bilgilerini görüntüleyebilirsiniz. Devredilecek varlık miktarına ekleme/çıkarma ve devir tarihi değişikliği yapabilirsiniz.
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col span={7} className="edit-form" style={{paddingTop: "15px", height: amountHeight}}>
                <Row justify="center">
                    <img src={Eth2} style={{padding:"10px"}}/>
                </Row>
                <Row className="parent-amount-text" justify="center" style={{paddingBottom: "10px"}}>
                    Devredilecek Toplam Varlık:
                </Row>
                <Row justify="center">
                    <span className="parent-amount"> {totalAmount} </span> <span className="parent-amount-text"> ETH </span>
                </Row>
            </Col>
        </Row>

        <div className="tradingview_b6f00" style={{paddingTop: "50px"}}>
            <App></App>
        </div>
    </div>
    )

}

export default MainMenu;