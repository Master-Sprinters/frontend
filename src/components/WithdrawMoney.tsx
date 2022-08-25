import React, {useState} from "react";
import {FunctionComponent} from "react";
import {Button, Form, InputNumber, DatePicker, Select, Row, Col, message, Radio} from "antd";
import moment from "moment";
import "../styles.css"
import { ethers } from "ethers";
import notification, { NotificationPlacement } from "antd/lib/notification";



type Params = {
    _name: string,
    _accId: string,
    _transferDate: string,
    _budget: string,
    _isParentAcc: boolean,
    contract: ethers.Contract | undefined,
}

type BtnParams = {
    id: string,
    text: string,
    height: string,
    width: string,
    padding: string,
    onClick: React.MouseEventHandler<HTMLElement>,
}

const budgetType = {
    Ether: 0.000000001,
    Wei: 1000000000,
    Gwei: 1,
    Finney: 0.000001,
    TL: 1
}

const WithdrawMoney: FunctionComponent<Params> = ({_name, _accId, _transferDate, _budget, _isParentAcc, contract}: Params) => {

//vars
    const [form] = Form.useForm()

    const [name, setName] = useState<string>(_name)
    const [accId, setAccId] = useState<string>(_accId)
    const [transferDate, setTransferDate] = useState<string>(_transferDate)
    const [budget, setBudget] = useState<string>(_budget)

    const [leftRadioClicked, setleftRadioClicked] = useState<boolean>(true)
    const [clickedRadioColor, setClickedRadioColor] = useState<string>("#40A9FF")

    const [newBudget, setNewBudget] = useState<number>(0);
    const [newDate, setNewDate] = useState<Date>(new Date(2000))

    const { Option } = Select;

    const displaySaveSuccesNotification = (placement: NotificationPlacement, userMessage: string) => {
        notification.success({
          message: userMessage,
          placement,
        });
      };
      
//button onClickmethods
    const onClickSave = async () => {
        console.log("save button clicked. New budget: " + newBudget)

        var change: number = newBudget

        if (newBudget != 0) {
            if (window.confirm('Yeni bilgileri kaydetmek istediğinize emin misiniz?')) {
                console.log("save button: accepted onclicksave")

                if (leftRadioClicked) {
                    if(typeof contract !== 'undefined'){
                        const addition = (parseInt(budget) + newBudget).toString()
                        const res = await contract.parentDeposit(accId, { value: ethers.utils.parseEther(newBudget.toString()) })
                        const res2 = await res.wait()
                        console.log(res2)
                        setBudget(addition)
                    }
                }
                else {
                    console.log("elsein içi")
                    if(typeof contract !== 'undefined'){
                        const subtraction = (parseInt(budget) + (-1 * newBudget)).toString()
                        const res = await contract.parentWithdraw(accId, ethers.utils.parseEther(newBudget.toString()))
                        const res2 = await res.wait()
                        console.log(res2)
                        setBudget(subtraction)
                    }
                }

                displaySaveSuccesNotification('bottomRight', 'Yeni Bilgiler Kaydedildi.')
            }
            else {
                console.log("save button: rejected")
            }
        }

        if(typeof contract !== 'undefined'){
            console.log("Changing date")
            const res = await contract.changeReleaseDate(accId, (Math.floor(newDate?.getTime() / 1000)))
            console.log((Math.floor(newDate?.getTime() / 1000)))
        }
    }

    const onClickWithdraw = async () => {
        console.log("save button clicked")

        if (window.confirm('Varlığı hesabınıza çekmek istediğinize emin misiniz?')) {
            console.log("save button: accepted onclickwithdraw")
            setBudget("0")
            
            //back-end com
            if(typeof contract !== 'undefined'){
                const res = await contract.childWithdraw()
                const res2 = await res.wait()
                console.log(res2)
            }

            displaySaveSuccesNotification('bottomRight', 'Para çekildi')

        }
        else {
            console.log("save button: rejected")
        }
    }

//input onChange methods
    const onBudgetChange = (e: number) => {
        console.log("new budget input: " + e)
        setNewBudget(e)
    }

    const onDateChange = (e: any, dateString: string) => {
        console.log(dateString)
        setNewDate(new Date(dateString))
    }

    const formLayout = {
        labelCol: { span: 11},
        wrapperCol: { span: 13},
    };

//design components
    const getTitle = () => {
        var title: string
        var padding: string

        if (_isParentAcc) {
            title = "Varlık ve Devir Tarihini Düzenle"
            padding = "3%"
        }
        else {
            title = "Para Çek"
            padding = "10px"
        }

        return (
            <Row justify="center" className="child-header" style={{paddingTop: "75px", paddingBottom: "50px", paddingRight: padding}}>
                {title}
            </Row>
        )
    }

    const getRow = (leftStr: string, rightStr: string) => {
        return (
            <Form.Item
                label={<div className="child-left-text"> {leftStr} </div>}
                labelAlign="right"
            >
                <div className="child-text"> {rightStr} </div>
            </Form.Item>
        );
    }

    const btnParams: BtnParams = {
        id: _isParentAcc ? "parent-btn": "child-btn",
        text: _isParentAcc ? "Kaydet": "Parayı Çek",
        height: _isParentAcc ? "60px": "65px",
        width:  _isParentAcc ? "120px": "130px",
        padding: _isParentAcc ? "30px": "25px",
        onClick: _isParentAcc ? onClickSave: onClickWithdraw,
    }

//desing
    return (
        <div>
            {getTitle()}

            <Form {...formLayout}
                form={form}
                initialValues={{ remember: true }}
                autoComplete="off"
                colon={false}
            >

                {getRow("İsim Soyisim :", name)}
                {getRow("Hesap ID :", accId)}
                {getRow("Devir Tarihi :", transferDate)}
                {getRow("Varlık Miktarı :", budget)}

                {_isParentAcc &&                         
                    <div>
                        <Form.Item
                            label={<div className="child-left-text"> Yeni Miktar : </div>}
                            rules={[{ required: true, message: 'Lütfen miktarı giriniz.' }]}
                            labelAlign="right"
                        >
                            <Col>
                                <Row>
                                    <InputNumber
                                        id="transfer-amount" min={0} required={true}
                                        style={{width: "140px"}}
                                        onChange={(e) => e != null ? onBudgetChange(+e.valueOf()) : onBudgetChange(0)}
                                    />
                                    <Select defaultValue="Gwei" style={{ width: 100, paddingLeft: "10px" }}>
                                        <Option value="TL">TL</Option>
                                        <Option value="Wei">Wei</Option>
                                        <Option value="Gwei">Gwei</Option>
                                        <Option value="Finney">Finney</Option>
                                        <Option value="Ether">Ether</Option>
                                    </Select>
                                </Row>
                                <Row style={{paddingTop: "10px"}}>
                                    <Radio.Group style={{width: "140px"}}>
                                        <Radio.Button
                                            style={{color: "black", backgroundColor: leftRadioClicked ? clickedRadioColor: "", width: "70px"}}
                                            value="large" onClick={() => {setleftRadioClicked(true)}}
                                        >
                                            Ekle
                                        </Radio.Button>
                                        <Radio.Button
                                            style={{color: "black", backgroundColor: leftRadioClicked ? "": clickedRadioColor, width: "70px"}}
                                            value="large" onClick={() => {setleftRadioClicked(false)}}
                                        >
                                            Çıkar
                                        </Radio.Button>
                                    </Radio.Group>
                                </Row>
                            </Col>
                        </Form.Item>

                        <Form.Item
                            label={<div className="child-left-text"> Yeni Devir Tarihi : </div>}
                            labelAlign="right"
                        >
                            <DatePicker id="transfer-date"
                                defaultValue={moment(transferDate)}
                                allowClear={false} style={{width: "140px"}}
                                onChange={(e: any, dateString: string) => onDateChange(e,dateString)}
                            />
                        </Form.Item>
                    </div>
                }
            
                <Form.Item
                    wrapperCol={{ ...formLayout.wrapperCol, offset: 11 }}
                    style={{paddingTop: btnParams.padding}}
                >
                    <Button id={btnParams.id} type="primary" htmlType="submit"
                        className="std-button" style={{width: btnParams.width, height: btnParams.height}}
                        onClick={btnParams.onClick}
                    >
                        {btnParams.text}
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
}

export default WithdrawMoney;