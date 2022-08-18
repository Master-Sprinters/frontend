import React, { useState } from "react";
import { FC } from "react";
import { Button } from "antd";
import { Row, Col } from "antd";
import 'antd/dist/antd.min.css';
import "../styles.css"
import { Layout, Menu, MenuProps, Space, Table } from 'antd';

import {
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import type { DatePickerProps, TimePickerProps } from 'antd';
import { DatePicker, Select, TimePicker } from 'antd';
const { Option } = Select;

type PickerType = 'time' | 'date';

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType;
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange'];
}) => {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};
const Money: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Content, Sider } = Layout;
  const [name, setName] = useState<string>("furkan")
  const [surname, setSurname] = useState<string>("dursun")
  const [accId, setAccId] = useState<string>("61044070")
  const [transferDate, setTransferDate] = useState<string>("13/05/2025")
  const [budget, setBudget] = useState<string>("125 ETH")
  const [type, setType] = useState<PickerType>('date');

  const zaman = [
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType type={type} onChange={value => console.log(value)} />
    </Space>
  ]

  const returnRow = (leftStr: string, rightStr: string | JSX.Element[]) => {
    return (
      <Row justify="center" className="child-text" style={{ paddingBottom: "15px" }}>
        <Col span={10} style={{ textAlign: "right" }} >
          {leftStr}
        </Col>
        <Col span={13} offset={1} style={{ textAlign: "left" }}>
          {rightStr}
        </Col>
      </Row>
    );
  }
  const content_table = [
    <div>

      <Row
        justify="center" className="child-header"
        style={{ paddingTop: "90px", paddingBottom: "60px" }}
      >
        Varlık Ve Tarih Düzenle
      </Row>
      {returnRow("İsim Soyisim :", name + " " + surname)}
      {returnRow("Hesap ID :", accId)}
      {returnRow("Devir Tarihi :", zaman)}
      {returnRow("Mevcut Miktarı :", budget)}
      <Row justify="center" style={{ paddingTop: "60px" }}>
        <Button id="child-withdraw-btn" type="primary" className="std-button">
          Kaydet
        </Button>
      </Row>


    </div>
  ]
  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
  ): MenuItem {
    return {
      key,
      icon,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem('Ana Menü', '1', <TeamOutlined />),
    getItem('Görüntüle\Değişiklik yap', '2', <TeamOutlined />),
    getItem('Cocuk Ekle Ve Para Yatır', '3', <TeamOutlined />),
    getItem('Çıkış', '4', < LogoutOutlined />),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          {content_table}
        </Content>
      </Layout>
    </Layout>

  );


}

export default Money;