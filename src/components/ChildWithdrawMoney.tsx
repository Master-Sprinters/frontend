import React, {useState} from "react";
import {FC} from "react";
import {Button} from "antd";
import {Row, Col, Space} from "antd";

const ChildWithdrawMoney: FC = () => {

    const [name, setName] = useState<string>("Kaan Can")
    const [surname, setSurname] = useState<string>("Bozdoğan")
    const [accId, setAccId] = useState<string>("161044070")
    const [transferDate, setTransferDate] = useState<string>("13/05/2025")
    const [budget, setBudget] = useState<string>("123 ETH")


    const returnRow = (leftStr: string, rightStr: string) => {
        return (
            <Row justify="center" className="child-text" style={{paddingBottom: "15px"}}>
                <Col span={10} style={{textAlign: "right"}} >
                    {leftStr}
                </Col>
                <Col span={13} offset={1} style={{textAlign: "left"}}>
                    {rightStr}
                </Col>
            </Row>
        );
    }

    return (
        <div>
            <Row
                justify="center" className="child-header"
                style={{paddingTop: "90px", paddingBottom: "60px"}}
            >
                Para Çek
            </Row>   
            {returnRow("İsim Soyisim :", name+" "+surname)}
            {returnRow("Hesap ID :", accId)}
            {returnRow("Devir Tarihi :", transferDate)}
            {returnRow("Varlık Miktarı :", budget)}
            <Row justify="center" style={{paddingTop: "60px"}}>
                <Button id="child-withdraw-btn" type="primary" className="std-button">
                    Çek
                </Button>
            </Row> 
            
        </div>
    );

}

export default ChildWithdrawMoney;