import { FC, useEffect, useState } from 'react';
import RegisterScreen from './pages/RegisterScreen';
import ChildScreen from './pages/ChildScreen';
import 'antd/dist/antd.min.css';
import { ethers } from "ethers";
import "./styles.css"
import AdminScreen from './pages/AdminScreen';
import ParentScreen from './pages/ParentScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './services/Contract';

const App: FC = () => {

  const [username, setUserName] = useState("")
  const [currentAddress, setCurrentAddress] = useState("")
  const [userRole, setUserRole] = useState(3)
  const [currentContract, setCurrentContract] = useState<ethers.Contract | undefined>()

  const connectProvider = async () => {
    //@ts-ignore
    const metaMaskProvider = window.ethereum
    if (typeof metaMaskProvider !== 'undefined') { //check if metamask is installed
      const provider = new ethers.providers.Web3Provider(metaMaskProvider)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      
      const role = await contract.getRole(address)

      console.log(role)
      setUserRole(role)
      setCurrentAddress(address)
      setCurrentContract(contract)
      return { role, address, contract }
    }
  }

  useEffect(() => {
    //Runs only on the first render
    connectProvider().then((res) => {
      setUserRole(res?.role)
      //@ts-ignore
      setCurrentAddress(res?.address)
      setCurrentContract(res?.contract)
    }
    )
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<RegisterScreen
            username={username}
            setUserName={setUserName}
            userRole={userRole}
            connectProvider={connectProvider}
            contract={currentContract}
            address={currentAddress}
            setUserRole={setUserRole} />} />
          <Route path="register-screen" element={<RegisterScreen
            username={username}
            setUserName={setUserName}
            userRole={userRole}
            connectProvider={connectProvider}
            contract={currentContract}
            address={currentAddress}
            setUserRole={setUserRole} />} />
          <Route path="admin-screen" element={<AdminScreen
            address={currentAddress}
            connectProvider={connectProvider}
            contract={currentContract} />} />
          <Route path="parent-screen" element={<ParentScreen
            userRole={userRole}
            connectProvider={connectProvider}
            contract={currentContract} />} />
          <Route path="child-screen" element={<ChildScreen
            userRole={userRole}
            connectProvider={connectProvider} 
            contract={currentContract} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
