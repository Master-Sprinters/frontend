import { FC } from 'react';
import RegisterScreen from './components/RegisterScreen';
import ChildWithdrawMoney from './components/ChildWithdrawMoney';
import 'antd/dist/antd.min.css';
import { ethers } from "ethers";
import "./styles.css"
import AdminScreen from './components/AdminScreen';
import Parent from './components/ParentSecreen';
import Money from './components/Money';
const App: FC = () => {
  return (
    <div className="App">
     < Money/>
    </div>
  );
}

export default App;
