import { FC } from 'react';
import RegisterScreen from './components/RegisterScreen';
import ChildWithdrawMoney from './components/ChildWithdrawMoney';
import 'antd/dist/antd.min.css';
import { ethers } from "ethers";
import "./styles.css"

const App: FC = () => {
  return (
    <div className="App">
     <ChildWithdrawMoney />
    </div>
  );
}

export default App;
