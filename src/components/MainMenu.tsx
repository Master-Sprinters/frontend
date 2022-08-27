import { FC, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import Key from "../images/Key.png"
import Check from "../images/Check.png"
import TradeViewChart from 'react-crypto-chart';
import { CandleStickConfig, DeffaultChartLayout, HistogramConfig } from "react-crypto-chart/lib/esm/utils/types";
import { CrosshairMode, LineStyle } from "lightweight-charts";


type PropsF = {
    clientName: string;
    clientAddress: number;
}

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


        <TradeViewChart pair="BTCUSDT" interval={"1m"} candleStickConfig={    {
        upColor: "#00c176",
        downColor: "#cf304a",
        borderDownColor: "#cf304a",
        borderUpColor: "#00c176",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
    }} histogramConfig={{
        base: 0,
        lineWidth: 2,
        priceFormat: {
            type: "volume",
        },
        overlay: true,
        scaleMargins: {
            top: 0.8,
            bottom: 0,
        },
    }} chartLayout={    {
        layout: {
            backgroundColor: "#ededed",
            textColor: "#253248",
        },
        grid: {
            vertLines: {
            color: "#838fa3",
            style: LineStyle.SparseDotted,
            },
            horzLines: {
            color: "#838fa3",
            style: LineStyle.SparseDotted,
            },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
        },
        priceScale: {
            borderColor: "#485c7b",
        },
        timeScale: {
            borderColor: "#485c7b",
            timeVisible: true,
            secondsVisible: false,
        },
    }}/>
    </div>
    )

}

export default MainMenu;