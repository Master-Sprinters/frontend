import { FC } from 'react';
import 'antd/dist/antd.min.css';
import "../styles.css"
import { Layout, Menu, MenuProps, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useState } from 'react';
import {
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import ChildAdd from '../components/ChildAdd';


  interface ChildDataType {
    key: React.Key;
    name: string;
    accountID: number;
    amount: number;
    dueDate: Date;
  }
  
  const childColumns: ColumnsType<ChildDataType> = [
    {
      title: 'İsim',
      dataIndex: 'name',
      key:'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Hesap ID',
      dataIndex: 'accountID',    
      key:'accountID',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.accountID - b.accountID,
    },
    {
      title: 'Devredilecek Miktar',
      dataIndex: 'amount',
      key:'amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Devir Tarihi',
      dataIndex: 'dueDate',
      key:'dueDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.dueDate.getFullYear() - b.dueDate.getFullYear(),
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a>action</a>,
      },
  ];
  
  const childData = [
    {
      key: '1',
      name: 'John Brown',
      accountID: 32,
      amount: 22,
      dueDate: new Date(),
    },
    {
      key: '2',
      name: 'Jim Green',
      accountID: 42,
      amount: 22,
      dueDate: new Date(),
    },
    {
      key: '3',
      name: 'Joe Black',
      accountID: 52,
      amount: 22,
      dueDate: new Date(),
    },
    {
      key: '4',
      name: 'Jim Red',
      accountID: 62,
      amount: 22,
      dueDate: new Date(),
    },
  ];
 
  const { Content, Sider } = Layout;
  const onChangeChild: TableProps<ChildDataType>['onChange'] = (pagination, sorter, extra) => {
    console.log('params', pagination, sorter, extra);
  };
  
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
  
  const ParentScreen: FC = () => {
  
    const [currentScreen, setCurrentScreen] = useState<JSX.Element[]>()
    const [collapsed, setCollapsed] = useState(false);
  
    const handleCurrentScreen = (e: MenuItem) => {
      console.log(e?.key)
      if (e?.key === '2') {
        setCurrentScreen(childAddDepositForm)
      } else if (e?.key === '3') {
        setCurrentScreen(childTable)
      }
    }
    
    const childAddDepositForm: JSX.Element[] = [
        <ChildAdd key={1} />
    ]

    const childTable: JSX.Element[] = [

        <div key={2} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <h5 id="parent-table-title">Çocuklar Tablosu</h5>
          <Table
            rowKey='key'
            style={{ width: "80%", textAlign: "center", paddingLeft: "20%" }}
            columns={childColumns}
            dataSource={childData}
            onChange={onChangeChild}
          />
        </div>
    ]
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo" />
            <Menu onClick={handleCurrentScreen} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              {currentScreen}
            </Content>
          </Layout>
        </Layout>
    );
  }
export default ParentScreen;
