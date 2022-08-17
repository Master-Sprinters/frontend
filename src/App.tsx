import { FC } from 'react';
import RegisterScreen from './components/RegisterScreen';
import ChildWithdrawMoney from './components/ChildWithdrawMoney';
import 'antd/dist/antd.min.css';
import { ethers } from "ethers";
import "./styles.css"
import AdminScreen from './components/AdminScreen';
import Parent from './components/ParentSecreen';

const App: FC = () => {
  return (
    <div className="App">
     <Parent />
    </div>
  );
}

export default App;
