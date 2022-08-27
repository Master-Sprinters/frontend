import { FC, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import Key from "../images/Key.png"
import Check from "../images/Check.png"
import TradeViewChart from 'react-crypto-chart';


type Props = {
    clientName: string;
    clientAddress: number;
}

const MainMenu: FC<Props> = ({clientName, clientAddress}) => {


    
    return (
    <div key={1} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div className="main-layout">
            <h2 id="welcome-name">Hoş geldin {clientName}</h2>
            <h5 id="address">
                <img id="key-icon" src={Key} alt="key"/>
                {clientAddress}
            </h5>
        </div>

        <div className="text-box">
            <p>
                <img id="check-icon" src={Check} alt="check"/>
                Çocuk Ekle sekmesinden dilediğiniz kadar çocuk tanımlayabilir ve istediğiniz tarihte çocuğunuza belirlediğiniz tutardaki varlığınızı aktarabilirsiniz.
            </p>
            <p>
                <img id="check-icon" src={Check} alt="check"/>
                Görüntüle / Değişiklik Yap sekmesinde çocuk bilgilerini görüntüleyebilirsiniz. Devredilecek varlık miktarına ekleme/çıkarma ve devir tarihi değişikliği yapabilirsiniz.
            </p>
        </div>
    </div>
    )

}

export default MainMenu;