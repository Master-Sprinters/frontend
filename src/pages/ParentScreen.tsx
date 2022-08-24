import { FC, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import "../styles.css"
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useState } from 'react';
import {
  TeamOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import ChildAdd from '../components/ChildAdd';
import SiteLayout, { getItem, MenuItem } from '../components/SiteLayout';
import WithdrawMoney from '../components/WithdrawMoney';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

  interface ChildDataType {
    key: React.Key;
    name: string;
    accountID: number;
    amount: number;
    dueDate: string;
  } 
  
  type Props = {
    userRole: number;
    connectProvider: () => Promise<{
      role: any;
      address: string;
      contract: ethers.Contract;
    } | undefined>;
    contract: ethers.Contract | undefined;
  }

  const ParentScreen: FC<Props> = ( {userRole, connectProvider, contract }) => {
          
    const [currentScreen, setCurrentScreen] = useState<JSX.Element[]>([])
    let currentChildren: ChildDataType[] = []

    const navigate = useNavigate()
    const redirectUser = async () => {

      if (typeof contract === 'undefined') {
        connectProvider().then((res) => {if (res?.role !== 1) {//redirect to login page if role is not parent
          navigate("/")
        }})

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
      }
      redirectUser()
    });

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
        sorter: (a, b) => new Date(a.dueDate).getFullYear() - new Date(b.dueDate).getFullYear(),
      },
      {
          title: 'Düzenle',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: (row) => <a onClick={()=> displayEditContent(row)} >Varlık ve Tarihi Düzenle</a>,
        },
    ];
   
    const onChangeChildTable: TableProps<ChildDataType>['onChange'] = (pagination, sorter, extra) => {
      console.log('params', pagination, sorter, extra);
    }; 

    const childAddDepositForm: JSX.Element[] = [
        <ChildAdd key={1} contract={contract} />
    ]
    const displayChildTable = (tableData: ChildDataType[]) => {

      const currentChildContent = [
        <div key={2} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <h5 id="parent-table-title">Çocuklar Tablosu</h5>
          <Table
            rowKey='key'
            style={{ textAlign: "center" }}
            columns={childColumns}
            dataSource={tableData}
            onChange={onChangeChildTable}
          />
        </div>
      ]
      setCurrentScreen(currentChildContent)
    }

    const assignChildren = (childrenData:any) => {

      for (let i = 0; i < childrenData.length; i++) {
        const element: ChildDataType = {
          key: i,
          name: childrenData[i][1].concat(" ").concat(childrenData[i][2]),
          accountID: childrenData[i][0],
          amount: Number(childrenData[i][4].toHexString())/(Math.pow(10,18)),
          dueDate: new Date(Number(childrenData[i][3].toHexString())).toDateString(),
        }
  
        currentChildren.push(element)
        console.log(element.dueDate)
      }
      //setData(currentParents)
      displayChildTable(currentChildren)
    }

    const connectChildren = async () => {

      let childrenRes
        connectProvider().then(async (res) => {
          childrenRes = await res?.contract.getChildrenAsParent()
          assignChildren(childrenRes)
        })
      
    }
  
    useEffect(() => {
      //Runs only on the first render, calls parent table from backend
      connectChildren()
  
    }, []);

    const menuItems: MenuItem[] = [
      getItem('Ana Menü', '1', <TeamOutlined />),
      getItem('Görüntüle/Değişiklik Yap', '2', <TeamOutlined />),
      getItem('Çocuk Ekle Ve Para Yatır', '3', <TeamOutlined />),
      getItem('Çıkış', '4', < LogoutOutlined />),
    ]

    const displayEditContent = (row:any) => {

      const currentEditContent = [
        <WithdrawMoney key={3} _isParentAcc={true} _name={row.name} _surname={row.name} _accId={row.accountID} _transferDate={row.dueDate} _budget={row.amount}/>
      ]
      setCurrentScreen(currentEditContent)
      console.log(row)
    }

    const handleCurrentContent = (e: MenuItem) => {
      console.log(e?.key)
      if (e?.key === '2') {
        connectChildren()
      } else if (e?.key === '3') {
        setCurrentScreen(childAddDepositForm)
      } else if(e?.key === '4'){
        navigate("/")
      }
    }

    return (
      <SiteLayout child={currentScreen} menuItems={menuItems} handleContent={handleCurrentContent}/>
    );
  }
export default ParentScreen;
