import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
  } from 'antd';
  import React, { useState } from 'react';
  import { FC } from 'react';
import 'antd/dist/antd.min.css';
import "../styles.css"
import { Layout, Menu, MenuProps, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

  
  type SizeType = Parameters<typeof Form>[0]['size'];
  
  const ChildAdd: React.FC = () => {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
    const { Content, Sider } = Layout;
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
    getItem('Görüntüle/Değişiklik yap', '2', <TeamOutlined />),
    getItem('Cocuk Ekle Ve Para Yatır', '3', <TeamOutlined />),
    getItem('Çıkış', '4', < LogoutOutlined />),
  ];
    const [collapsed, setCollapsed] = useState(false);
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
      setComponentSize(size);
    };
      const childform=[
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
      >
        <Form.Item label="Ad Ve Soyad Giriz">
          <Input />
        </Form.Item>
        <Form.Item label="Hesap Bilgisi">
          <Input />
        </Form.Item>
       
        <Form.Item label="Devredilicek Tarih">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Devredilicek Miktar">
          <InputNumber />
        </Form.Item>
        <Form.Item >
          <Button>Kaydet</Button>
        </Form.Item>
      </Form>

      ]
    return (
       //return child table
       <Layout style={{ minHeight: '100vh' }}>
       <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
         <div className="logo" />
         <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
       </Sider>
       <Layout className="site-layout">
         <Content style={{ margin: '0 16px' }}>
            {
                childform
            }
         </Content> 
       </Layout>
     </Layout>
    );
  };
  
  export default ChildAdd;