import { FC, useEffect, useState } from 'react';
import RegisterScreen from './pages/RegisterScreen';
import ChildScreen from './pages/ChildScreen';
import 'antd/dist/antd.min.css';
import { ethers } from "ethers";
import "./styles.css"
import AdminScreen from './pages/AdminScreen';
import ParentScreen from './pages/ParentScreen';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './services/Contract';
import LoginScreen from './pages/LoginScreen';

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: any) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const App: FC = () => {

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
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

  const navigate = useNavigate()

  useEffect(() => {
    //direct the user to login page if adress changes
    //@ts-ignore
    const metaMaskProvider = window.ethereum
    if (metaMaskProvider) {
      metaMaskProvider.on("accountsChanged", () => {
        navigate("/")
        window.location.reload();
      });
    }
  });

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginScreen
            userRole={userRole} />} />
          <Route path="register-screen" element={<RegisterScreen
            name={name}
            setName={setName}
            surname={surname}
            setSurname={setSurname}
            userRole={userRole}
            connectProvider={connectProvider}
            contract={currentContract}
            address={currentAddress}
            setUserRole={setUserRole} />} />
          <Route path="admin-screen" element={
            <ProtectedRoute isAllowed={userRole === 0} redirectPath="/">
              <AdminScreen
                connectProvider={connectProvider}
                contract={currentContract} />
            </ProtectedRoute>
          } />
          <Route path="parent-screen" element={
            <ProtectedRoute isAllowed={userRole === 1} redirectPath="/">
              <ParentScreen
                connectProvider={connectProvider}
                contract={currentContract} /> </ProtectedRoute>}
          />
          <Route path="child-screen" element={
          <ProtectedRoute isAllowed={userRole === 2} redirectPath="/">
          <ChildScreen
            connectProvider={connectProvider}
            contract={currentContract} />
            </ProtectedRoute>} />
        </Routes>
      </div>
  );
}

export default App;
