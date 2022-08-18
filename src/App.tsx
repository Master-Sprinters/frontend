import { FC, useState } from 'react';
import RegisterScreen from './components/RegisterScreen';
import ChildWithdrawMoney from './components/ChildWithdrawMoney';
import 'antd/dist/antd.min.css';
import { ethers } from "ethers";
import "./styles.css"
import AdminScreen from './components/AdminScreen';
import ParentScreen from './components/ParentScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: FC = () => {

  const [username, setUserName] = useState<string>("")
  const [address, setAdress] = useState<string>("")

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path="/" element={<RegisterScreen username={username} setUserName={setUserName}/>} />
            <Route path="register-screen" element={<RegisterScreen username={username} setUserName={setUserName}/>} />
            <Route path="admin-screen" element={<AdminScreen />} />
            <Route path="parent-screen" element={<ParentScreen />} />
            <Route path="child-screen" element={<ChildWithdrawMoney />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
