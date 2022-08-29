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
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

type Props = {
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
  dueDate: string;
}

const AdminScreen: FC<Props> = ({ connectProvider, contract }) => {

  const [totalAmount, setTotalAmount] = useState<number>(0)

  const navigate = useNavigate()

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
      sorter: (a, b) => a.dueDate.length - b.dueDate.length,
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
          <a onClick={() => connectChildren(row)}>Çocukları Görüntüle</a>
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
  let currentChildren: ChildDataType[] = []
  let parentTable: JSX.Element[] = []
  const [data, setData] = useState<ParentDataType[]>()
  const [currentScreen, setCurrentScreen] = useState<JSX.Element[]>(parentTable)

  //displays parent table by using the given parameter as dataSource
  const displayParentTable = (tableData: ParentDataType[]) => {
    setCurrentScreen(
      [
        <div key={1} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <div className="table-layout">
            <h5 id="parent-table-title">Ebeveynler Tablosu</h5>
            <Table
              rowKey='key'
              columns={columns}
              dataSource={tableData}
              onChange={onChange}
              size='small'
              pagination={{ pageSize: 4 }}
            />
          </div>
        </div>
      ])
  }


  //called when user clicks 'display children'
  const displayChildTable = (tableData: ChildDataType[]) => {

    const currentChildContent = [
      <div key={2} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <div className="table-layout">
          <h5 id="parent-table-title">Çocuklar Tablosu</h5>
          <Table
            rowKey='key'
            style={{ textAlign: "center" }}
            columns={childColumns}
            dataSource={tableData}
            onChange={onChangeChild}
            size='small'
            pagination={{ pageSize: 4 }}
          />
        </div>
      </div>
    ]
    setCurrentScreen(currentChildContent)
  }

  //assigns the given array parameter to current parents variable to be used
  //on displayParentTable function 
  const assginParents = (parentData: any) => {

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

  //assigns the given array parameter to current parents variable to be used
  //on displayParentTable function 
  const assignChildren = (childrenData: any) => {

    for (let i = 0; i < childrenData.length; i++) {
      const element: ChildDataType = {
        key: i,
        name: childrenData[i][1].concat(" ").concat(childrenData[i][2]),
        accountID: childrenData[i][0],
        amount: Number(childrenData[i][4].toHexString()) / (Math.pow(10, 18)),
        dueDate: new Date(Number(childrenData[i][3].toHexString()) * 1000).toDateString(),
      }

      if (element.accountID.toString() !== ethers.constants.AddressZero) {
        currentChildren.push(element)
      }
      console.log(element.dueDate)
    }
    //setData(currentParents)
    displayChildTable(currentChildren)
  }

  //gets the parent list from backend and calls assign parents function with retrieved data
  const connectParents = async () => {
    let parentsRes
    if (typeof contract !== 'undefined') {
      parentsRes = await contract.getAllParents()
      assginParents(parentsRes)
    }
    else {
      connectProvider().then(async (res) => {
        parentsRes = await res?.contract.getAllParents()
        assginParents(parentsRes)
      })
    }
  }

  //gets the child list from backend and calls assign getChildren function with retrieved data
  const connectChildren = async (row: any) => {

    let childrenRes

    if (typeof contract !== 'undefined') {
      childrenRes = await contract.getChildren(row.accountID)
      assignChildren(childrenRes)
    } else {
      connectProvider().then(async (res) => {
        childrenRes = await res?.contract.getChildren(row.accountID)
        assignChildren(childrenRes)
      })
    }
  }

  const getTotalAmount = async () => {
    if (typeof contract !== 'undefined') {
      setTotalAmount(await contract.seeContractBalance() / Math.pow(10,18))
    }
  }

  useEffect(() => {
    //Runs only on the first render, calls parent table from backend
    connectParents()
    getTotalAmount()

    console.log("total amount: " + totalAmount)
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
      getTotalAmount()

      console.log("total amount: " + totalAmount)
    } else if (e?.key === '2') {
      navigate("/")
      //exit
    }
  }

  return (
    <>
      <SiteLayout child={currentScreen} menuItems={items} handleContent={handleCurrentScreen} />
    </>
  );
}

export default AdminScreen;
