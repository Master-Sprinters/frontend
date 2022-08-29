import { FC, useEffect, useState } from "react";
import { Col, Row } from "antd";
import Key from "../images/Key.png"
import Check from "../images/Check.png"
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
    
    return (
    <div key={1} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div className="main-layout">
            <h2 id="welcome-name">Hoş geldin {clientName} </h2>
            <h5 id="address">
                <img id="key-icon" src={Key} alt="key"/>
                {clientAddress}
            </h5>
        </div>
        
        <Row>
            <Col span={8}>
                <h5>{totalAmount}</h5>
            </Col>
            
            <Col span={16}>
                <div className="main-text-box">
                    <p>
                        <img id="check-icon" src={Check} alt="check"/>
                        Çocuk Ekle sekmesinden dilediğiniz kadar çocuk tanımlayabilir ve istediğiniz tarihte çocuğunuza belirlediğiniz tutardaki varlığınızı aktarabilirsiniz.
                    </p>
                    <p>
                        <img id="check-icon" src={Check} alt="check"/>
                        Görüntüle / Değişiklik Yap sekmesinde çocuk bilgilerini görüntüleyebilirsiniz. Devredilecek varlık miktarına ekleme/çıkarma ve devir tarihi değişikliği yapabilirsiniz.
                    </p>
                </div>
            </Col>
        </Row>

        <div className="tradingview_b6f00">
            <App></App>
        </div>
    </div>
    )

}

export default MainMenu;