import { FC, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import Key from "../images/Key.png"
import Check from "../images/Check.png"
import { AdvancedChart } from "react-tradingview-embed";


type PropsF = {
    clientName: string;
    clientAddress: number;
}

const App = () => <AdvancedChart widgetProps={  
    {
        "width": 980,
        "height": 610,
        "symbol": "BINANCE:ETHTRY",
        "interval": "5",
        "timezone": "Europe/Istanbul",
        "theme": "light",
        "style": "3",
        "locale": "tr",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": true,
        "save_image": false,
        "container_id": "tradingview_b6f00"
    }
} />;

const MainMenu: FC<PropsF> = ({clientName, clientAddress}) => {

    return (
    <div key={1} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div className="main-layout">
            <h2 id="welcome-name">Hoş geldin {clientName}</h2>
            <h5 id="address">
                <img id="key-icon" src={Key} alt="key"/>
                {clientAddress}
            </h5>
        </div>

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

        <div className="tradingview_b6f00">
            <App></App>
        </div>
    </div>
    )

}

export default MainMenu;