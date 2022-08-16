import { FC } from 'react';
import RegisterScreen from './components/RegisterScreen';
import 'antd/dist/antd.min.css';
import { ethers } from "ethers";
import "./styles.css"

const App: FC = () => {
  return (
    <div className="App">
     <RegisterScreen />
    </div>
  );
}

export default App;
