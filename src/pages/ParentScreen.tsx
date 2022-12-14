import { FC, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import "../styles.css"
import {
  Popconfirm,
  notification,
  Table
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useState } from 'react';
import {
  TeamOutlined,
  LogoutOutlined,
  HomeOutlined,
  EyeOutlined
} from '@ant-design/icons';
import ChildAdd from '../components/ChildAdd';
import SiteLayout, { getItem, MenuItem } from '../components/SiteLayout';
import WithdrawMoney from '../components/WithdrawMoney';
import MainMenu from '../components/MainMenu';
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
    connectProvider: () => Promise<{
      role: any;
      address: string;
      contract: ethers.Contract;
    } | undefined>;
    contract: ethers.Contract | undefined;
  }

  const ParentScreen: FC<Props> = ( { connectProvider, contract }) => {
          
    const [currentScreen, setCurrentScreen] = useState<JSX.Element[]>([])
    let currentChildren: ChildDataType[] = []

    const navigate = useNavigate()

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
        {
          title: 'Sil',
          key: 'operation2',
          fixed: 'right',
          width: 100,
          render: (row) =>       <Popconfirm placement="bottomRight" title={"Çocuğu silip varlığı geri almak istediğinize emin misiniz?"} onConfirm={() => deleteChild(row.accountID)} okText="Evet" cancelText="Hayır">
          <a style={{color: 'red'}}>Çocuğu Sil</a>
        </Popconfirm>,
        },
    ];

    const deleteChild = async (accId: string) => {

      if(contract !== undefined){
        const res = await contract.cancelChild(accId)
        const res2 = await res.wait()
      }
    };
    
   
    const onChangeChildTable: TableProps<ChildDataType>['onChange'] = (pagination, sorter, extra) => {
      console.log('params', pagination, sorter, extra);
    }; 

    const childAddDepositForm: JSX.Element[] = [
        <ChildAdd key={1} contract={contract} />
    ]
    const displayChildTable = (tableData: ChildDataType[]) => {

      const currentChildContent = [
        <div key={2} className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <div className="table-layout">
          <h5 id="parent-table-title">Çocuklar Tablosu</h5>
          <Table
            id='parent-child-table'
            rowKey='key'
            style={{ textAlign: "center" }}
            columns={childColumns}
            dataSource={tableData}
            onChange={onChangeChildTable}
            size='small'
            pagination={{pageSize: 4}}
          />
          </div>
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
          dueDate: new Date(Number(childrenData[i][3].toHexString())*1000).toDateString(),
        }
        if (element.accountID.toString() !== ethers.constants.AddressZero) {
          currentChildren.push(element)
        }
      }
      //setData(currentParents)
      displayChildTable(currentChildren)
    }

    const connectChildren = async () => {
      connectProvider().then(async (res) => {
        res?.contract.getChildrenAsParent()
        .then((childrenRes: any) => {
          assignChildren(childrenRes)
        })
      })  
    }
  
    useEffect(() => {
      //Runs only on the first render, calls parent table from backend
      displayMain()
  
    }, []);

    const menuItems: MenuItem[] = [
      getItem('Ana Menü', '1', <HomeOutlined />),
      getItem('Görüntüle/Değişiklik Yap', '2', <EyeOutlined />),
      getItem('Çocuk Ekle', '3', <TeamOutlined />),
      getItem('Çıkış', '4', < LogoutOutlined />),
    ]

    const displayEditContent = (row:any) => {

      const currentEditContent = [
        <WithdrawMoney key={3} _isParentAcc={true} _name={row.name} _accId={row.accountID} _transferDate={row.dueDate} _budget={row.amount} contract={contract}/>
      ]
      setCurrentScreen(currentEditContent)
    }

    const displayMain = () => {
      // yazıyı falan ekle
      // graph api
      // çocuklara aktarılan toplam miktar yazdır

      var clientName
      var clientAddress

      if (typeof contract !== 'undefined') {
        contract.getParent()
          .then(async (res: any) => {
            const setMainMenu = [
              <MainMenu key={15} clientName={res.name} clientAddress={res._address} connectProvider={connectProvider}/>
            ]
            
            setCurrentScreen(setMainMenu)
          })
          .catch((err: any) => {
            notification['error']({
              message: `Hata.`,
              description: `${err.reason}`
            });
          })
      }
    }

    const handleCurrentContent = (e: MenuItem) => {
      if (e?.key === '1') {
        displayMain()
      } else if (e?.key === '2') {
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
