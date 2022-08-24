import { FC, useEffect } from 'react';
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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ethers } from 'ethers';

type Props = {
  address: string;
  connectProvider: () => Promise<{
    role: any;
    address: string;
    contract: ethers.Contract;
  } | undefined>;
  contract: ethers.Contract | undefined;
}

interface ParentDataType {
  key: React.Key;
  name: string;
  accountID: number;
}

interface ChildDataType {
  key: React.Key;
  name: string;
  accountID: number;
  amount: number;
  dueDate: Date;
}

const AdminScreen: FC<Props> = ({ address, connectProvider, contract }) => {

  const navigate = useNavigate()

  const redirectUser = async () => {

    if (typeof contract !== 'undefined') {

      const role = await contract.getRole(address)
      if (role !== 0) {//redirect to login page if role is not admin
        navigate("/")
        window.location.reload();
      }
    }

  }

  useEffect(() => {
    //direct the user to login page if adress changes

    //@ts-ignore
    const metaMaskProvider = window.ethereum
    if (metaMaskProvider) {
      metaMaskProvider.on("accountsChanged", () => {
        connectProvider()
        navigate("/")
        window.location.reload();
      });
      redirectUser()
    }
  });

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

  const columns: ColumnsType<ParentDataType> = [
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
          <a onClick={() => displayChildTable(row)}>Çocukları Görüntüle</a>
        </Space>
      ),
    },
  ];

  const onChange: TableProps<ParentDataType>['onChange'] = (pagination, sorter, extra) => {
    console.log('params', pagination, sorter, extra);
  };
  const onChangeChild: TableProps<ChildDataType>['onChange'] = (pagination, sorter, extra) => {
    console.log('params', pagination, sorter, extra);
  };

  let currentParents: ParentDataType[] = []
  let parentTable: JSX.Element[] = []
  let childTable: JSX.Element[] = []
  const [data, setData] = useState<ParentDataType[]>()
  const [currentScreen, setCurrentScreen] = useState<JSX.Element[]>(parentTable)

  //displays parent table by using the given parameter as dataSource
  const displayParentTable = (tableData: ParentDataType[]) => {
    setCurrentScreen(
      [
        <div key={1} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <h5 id="parent-table-title">Ebeveynler Tablosu</h5>
          <Table
            rowKey='key'
            style={{ width: "80%", textAlign: "center", paddingLeft: "20%" }}
            columns={columns}
            dataSource={tableData}
            onChange={onChange}
          />
        </div>
      ])
  }


  //called when user clicks 'display children'
  const displayChildTable = (row: any) => {

    setCurrentScreen(currentChildContent)
    console.log(row)
  }

  //assigns the given array parameter to current parents variable to be used
  //on displayParentTable function 
  const assginParents = (parentData:any) => {

    for (let i = 0; i < parentData.length; i++) {
      const element: ParentDataType = {
        key: i,
        name: parentData[i][1].concat(" ").concat(parentData[i][2]),
        accountID: parentData[i][0],
      }

      currentParents.push(element)
    }
    setData(currentParents)
    displayParentTable(currentParents)

  }

  //gets the parent list from backend and calls assign parents function with retrieved data
  const connectParents = async () => {

    let parentsRes

    if (typeof contract !== 'undefined') {
      parentsRes = await contract.getAllParents()
      assginParents(parentsRes)
    } else {
      connectProvider().then(async (res) => {
        parentsRes = await res?.contract.getAllParents()
        assginParents(parentsRes)
      })
    }
  }

  useEffect(() => {
    //Runs only on the first render, calls parent table from backend
    connectParents()

  }, []);

  const items: MenuItem[] = [
    getItem('Ebeveyn Tablosu', '1', <TeamOutlined />),
    getItem('Çıkış', '2', <LogoutOutlined />),
  ];

  //displays different content according to the selected item on sidebar
  const handleCurrentScreen = (e: MenuItem) => {
    console.log(e?.key)
    if (e?.key === '1') {
      connectParents()
    } else if (e?.key === '2') {
      navigate("/")
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

  return (
    <>
      <SiteLayout child={currentScreen} menuItems={items} handleContent={handleCurrentScreen} />
    </>
  );
}

export default AdminScreen;
