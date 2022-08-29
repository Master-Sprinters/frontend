import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Popconfirm,
  notification,
  Select,
} from 'antd';
import { useState } from 'react';
import { FC } from 'react';
import { ethers } from "ethers";
import 'antd/dist/antd.min.css';
import "../styles.css"
import type { NotificationPlacement } from 'antd/es/notification';

const ethPrice = require('eth-price');

type Props = {
  contract: ethers.Contract | undefined;
}

const units = ['Ether', 'Wei', 'Gwei', 'Finney', 'TRY']

const unitFactors = {
  Ether: 1000000,    //10^-18
  Wei: 1,
  Gwei: 1000,        //^-9
  Finney: 100000,     //^-15
  TRY: 1,
}

type UnitType = keyof typeof unitFactors;

const ChildAdd: FC<Props> = ({ contract }) => {

  const [childName, setChildName] = useState("")
  const [childSurname, setChildSurname] = useState("")
  const [childAccount, setChildAccount] = useState("")
  const [deliverDate, setDeliverDate] = useState<Date>(new Date(2000))
  const [deliverAmount, setDeliverAmount] = useState(0)
  var [submitUnit, setSubmitUnit] = useState<UnitType>("Ether")

  const { Option } = Select;


  const text = "İşlemi onaylıyor musunuz?"

  const displaySuccesNotification = (placement: NotificationPlacement) => {
    notification.success({
      message: `Çocuk ekleme başarılı`,
      placement,
    });
  };

  const handleChildAdd = async () => {

    if (typeof childName === 'undefined') {
      return
    }

    var budgetChange: number = deliverAmount
    var isTry: boolean = false;

    if (submitUnit == "TRY") {
      isTry = true
      console.log("try içindeyim")
      console.log(await ethPrice('try'))
      // alınan string'i parse'lar, 27000 gibi bir değer kalır. sonra deliverAmount / 27000 değeri işlemi yapılır
      budgetChange = deliverAmount / parseFloat((await ethPrice('try')).toString().replace("TRY: ", "").replace(",", "."))
      submitUnit = "Ether"
    }

    var sentStr: string = budgetChange.toString()
    var sentValue: ethers.BigNumber = ethers.utils.parseUnits(sentStr, submitUnit.toLowerCase())
    console.log("sent unit: " + submitUnit)
    console.log("sent value: " + sentValue + " wei")

    if (submitUnit == "Ether" && isTry) {
      submitUnit = "TRY"
    }

    if (typeof contract !== 'undefined') {

      contract.addChild(childAccount, childName, childSurname, (Math.floor(deliverDate?.getTime() / 1000)), { value: sentValue })
        .then(async (res: any) => {
          await res.wait()
          displaySuccesNotification('bottomRight')
        })
        .catch((err: any) => {
          let result = `${err.reason}`.toString()
          notification['error']({
            message: `Çocuk ekleme başarısız.`,
            description: result.substring(result.indexOf("'")+1, (result.length)-1)
          });
        })
    }
  }

  return (
    <>
      <h5 id="child-add-title"> Çocuk Ekle ve Para Yatır</h5>
      <div className="child-add-form">
        <Row justify="center" align="middle">
          <Col span={16}>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              size="middle"
              style={{textAlign:"center"}}
            >
              <Form.Item style={{paddingTop:"30px"}} label={<label className="child-add-label">Çocuğunuzun Adı:</label>}
                rules={[{ required: true, message: 'Çocuğunuzun adını giriniz...' }]}
              >
                <Input onChange={(e) => setChildName(e.target.value)} />
              </Form.Item>
              <Form.Item label={<label className="child-add-label">Çocuğunuzun Soyadı:</label>}
                rules={[{ required: true, message: 'Çocuğunuzun soy adını giriniz...' }]}
              >
                <Input onChange={(e) => setChildSurname(e.target.value)} />
              </Form.Item>
              <Form.Item label={<label className="child-add-label">Çocuğunuzun Hesap Adresi:</label>}
                rules={[{ required: true, message: 'Lütfen bilgisi giriniz...' }]}
              >
                <Input onChange={(e) => setChildAccount(e.target.value)} />
              </Form.Item>
              <Form.Item label={<label className="child-add-label">Aktarılacak Varlık Miktarı:</label>}
                rules={[{ required: true, message: 'Devredilecek miktarı giriniz' }]}>
                <Col>
                  <Row>
                    <InputNumber onChange={(e) => setDeliverAmount(+e.valueOf())} />
                    <Select defaultValue={"Ether"} style={{ width: 100, paddingLeft: "10px" }} onChange={(unit: UnitType) => { setSubmitUnit(unit) }}>
                      {units.map(unit => (<Option key={unit}>{unit}</Option>))}
                    </Select>
                  </Row>
                </Col>
              </Form.Item>
              <Form.Item label={<label className="child-add-label">Devir Tarihi:</label>}
                rules={[{ required: true, message: 'Geçerli bir devir tarihi giriniz' }]}
              >
                <DatePicker style={{width:"100%"}} onChange={(e) => setDeliverDate(e!.toDate())} />
              </Form.Item >
              <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center", paddingTop: "5%" }}>
                <Popconfirm placement="bottom" title={text} onConfirm={handleChildAdd} okText="Evet" cancelText="Hayır">
                  <Button id="child-add-btn" type="primary" htmlType="submit" >Kaydet</Button>
                </Popconfirm>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      </>
      );
};

      export default ChildAdd;
