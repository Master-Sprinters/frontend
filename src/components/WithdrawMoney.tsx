import React, {useState} from "react";
import {FunctionComponent} from "react";
import {Button, Form, InputNumber, DatePicker} from "antd";
import {Row, message} from "antd";
import moment from "moment";
import "../styles.css"


type Params = {
    _name: string;
    _surname: string;
    _accId: string;
    _transferDate: string;
    _budget: string;
    _isParentAcc: boolean;
}

const WithdrawMoney: FunctionComponent<Params> = ({_name, _surname, _accId, _transferDate, _budget, _isParentAcc}: Params) => {

    const [name, setName] = useState<string>(_name)
    const [surname, setSurname] = useState<string>(_surname)
    const [accId, setAccId] = useState<string>(_accId)
    const [transferDate, setTransferDate] = useState<string>(_transferDate)
    const [budget, setBudget] = useState<string>(_budget)
    
    const [newBudget, setNewBudget] = useState<string>("")
    const [newDate, setNewDate] = useState<string>("")

    const dateFormatList = ['DD/MM/YYYY'];


    const returnRow = (leftStr: string, rightStr: string) => {
        return (
            <Form.Item
                key={leftStr}
                label={leftStr}
                labelAlign="right"
                className="child-text"
                style={{font:"inherit", fontSize:"inherit"}}
            >
                {rightStr}
            </Form.Item>
        );
    }

    const withdrawConfirm = () => {
        setBudget("0 ETH");
        message.info('Para hesabınıza çekildi.');
    }

    const saveConfirm = () => {
        message.info('Yeni bilgiler kaydedildi.');
    }

    const onClickSave = () => {
        console.log("save button clicked")

        if (window.confirm('Yeni bilgileri kaydetmek istediğinize emin misiniz?')) {
            console.log("save button: accepted")
            setBudget("100 ETH")
        }
        else {
            console.log("save button: rejected")
        }
    }

    const onClickWithdraw = () => {
        console.log("save button clicked")

        if (window.confirm('Varlığı hesabınıza çekmek istediğinize emin misiniz?')) {
            console.log("save button: accepted")
            setBudget("0 ETH")
        }
        else {
            console.log("save button: rejected")
        }
    }

    const fromLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 13, offset: 1 },
      };

    const onBudgetChange = (e: number) => {
        console.log(e)
    }


    return (
        <div>
            {_isParentAcc && 
                <div key="parent">
                    <Row justify="center" className="child-header" style={{paddingTop: "75px", paddingBottom: "50px"}}>
                        <h5 id="edit-assets-title">Varlık ve Devir Tarihini Düzenle </h5>
                    </Row>

                    <Form {...fromLayout}
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        colon={false}
                    >
                        {returnRow("İsim Soyisim :", name+" "+surname)}
                        {returnRow("Hesap ID :", accId)}
                        {returnRow("Devir Tarihi :", transferDate)}
                        {returnRow("Varlık Miktarı :", budget)}

                        <Form.Item
                            label="Yeni Miktar :"
                            name="amount"
                            rules={[{ required: true, message: 'Lütfen miktarı giriniz.' }]}
                            labelAlign="right"
                        >
                            <InputNumber
                                id="transfer-amount" min={0} required={true}
                                style={{width: "150px"}}
                                onChange={(e) => onBudgetChange(+e.valueOf())}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Yeni Devir Tarihi :"
                            name="date"
                            labelAlign="right"
                        >
                            <DatePicker format={dateFormatList} style={{width: "150px"}}
                                    value={moment(transferDate, dateFormatList)}
                                    allowClear={false}
                                />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ ...fromLayout.wrapperCol, offset: 11 }}
                            style={{paddingTop: "20px"}}
                        >
                            <Button id="child-withdraw-btn" type="primary" htmlType="submit"
                                className="std-button" style={{width: "120px", height: "60px"}}
                                onClick={onClickSave}
                            >
                                Kaydet
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            }
            
            {!_isParentAcc &&
                <div key="child">
                    <Row justify="center" className="child-header" style={{paddingTop: "75px", paddingBottom: "50px"}}>
                        Para Çek
                    </Row>
                    <Form {...fromLayout}
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        colon={false}
                    >
                        {returnRow("İsim Soyisim :", name+" "+surname)}
                        {returnRow("Hesap ID :", accId)}
                        {returnRow("Devir Tarihi :", transferDate)}
                        {returnRow("Varlık Miktarı :", budget)}

                        <Form.Item
                            wrapperCol={{ ...fromLayout.wrapperCol, offset: 11 }}
                            style={{paddingTop: "20px"}}
                        >
                            <Button id="child-withdraw-btn" type="primary"
                                className="std-button" style={{width: "140px", height: "70px"}}
                                onClick={onClickWithdraw}
                            >
                                Parayı Çek
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            }
            
        </div>
    );
}

export default WithdrawMoney;