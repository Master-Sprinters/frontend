import { FC } from 'react';
import 'antd/dist/antd.min.css';
import "../styles.css"
import { Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useState } from 'react';
import {
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import SiteLayout, { getItem, MenuItem } from '../components/SiteLayout';

interface DataType {
  key: React.Key;
  name: string;
  accountID: number;
  action: string;
}

interface ChildDataType {
  key: React.Key;
  name: string;
  accountID: number;
  amount: number;
  dueDate: Date;
}

const AdminScreen: FC = () => {

  const childColumns: ColumnsType<ChildDataType> = [
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Hesap ID',
      dataIndex: 'accountID',
      key: 'accountID',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.accountID - b.accountID,
    },
    {
      title: 'Devredilecek Miktar',
      dataIndex: 'amount',
      key: 'amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Devir Tarihi',
      dataIndex: 'dueDate',
      key: 'dueDate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.dueDate.getFullYear() - b.dueDate.getFullYear(),
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

  const columns: ColumnsType<DataType> = [
    {
      title: 'İsim',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Hesap ID',
      dataIndex: 'accountID',
      key: 'accountID',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.accountID - b.accountID,
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (row) => (
        <Space size="middle">
          <a onClick={()=> displayChildContent(row)}>Çocukları Görüntüle</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      accountID: 32,
      action: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      accountID: 42,
      action: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      accountID: 32,
      action: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      accountID: 32,
      action: 'London No. 2 Lake Park',
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, sorter, extra) => {
    console.log('params', pagination, sorter, extra);
  };
  const onChangeChild: TableProps<ChildDataType>['onChange'] = (pagination, sorter, extra) => {
    console.log('params', pagination, sorter, extra);
  };

  const items: MenuItem[] = [
    getItem('Ebeveyn Tablosu', '1', <TeamOutlined />),
    getItem('Çıkış', '2', <LogoutOutlined />),
  ];

  const parentTable:JSX.Element[] = [
    <div key={1} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <h5 id="parent-table-title">Ebeveynler Tablosu</h5>
        <Table
          rowKey='key'
          style={{ width: "80%", textAlign: "center", paddingLeft: "20%" }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>

  ]

  const [currentScreen, setCurrentScreen] = useState<JSX.Element[]>(parentTable)

  const handleCurrentScreen = (e: MenuItem) => {
    console.log(e?.key)
    if (e?.key === '1') {
      setCurrentScreen(parentTable)
    } else if (e?.key === '2') {
      //exit
    }
  }
  const currentChildContent = [
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

  //called when user clicks 'display children'
  const displayChildContent = (row: any) => {

    setCurrentScreen(currentChildContent)
    console.log(row)
  }

  return (
    <>
      <SiteLayout child={currentScreen} menuItems={items} handleContent={handleCurrentScreen} />
    </>
  );
}

export default AdminScreen;
