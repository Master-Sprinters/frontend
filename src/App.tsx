import { FC, useState } from 'react';
import RegisterScreen from './pages/RegisterScreen';
import ChildScreen from './pages/ChildScreen';
import 'antd/dist/antd.min.css';
import { ethers } from "ethers";
import "./styles.css"
import AdminScreen from './pages/AdminScreen';
import ParentScreen from './pages/ParentScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Money from './components/Money';
import ChildAdd from './components/ChildAdd';

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
            <Route path="child-screen" element={<ChildScreen />} />
            <Route path="deposit-screen" element={<Money />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
