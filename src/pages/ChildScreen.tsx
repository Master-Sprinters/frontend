import React, {useEffect, useState, FC} from "react";
import { useNavigate } from "react-router-dom";
import WithdrawMoney from '../components/WithdrawMoney'

type Props = {
    userRole: number;
    connectProvider: () => void;
  }

const ChildScreen:FC<Props> = ( {userRole, connectProvider }) => {

    const [name, setName] = useState<string>("Kaan Can")
    const [surname, setSurname] = useState<string>("Bozdoğan")
    const [accId, setAccId] = useState<string>("161044070")
    const [transferDate, setTransferDate] = useState<string>("13/05/2025")
    const [budget, setBudget] = useState<string>("123 ETH")

    const navigate = useNavigate()

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
    
        if(userRole !== 2){//redirect to login page if role is not child
            navigate("/")
            window.location.reload();
        }
      });

    return (
        <WithdrawMoney _isParentAcc={false} _name={name} _accId={accId} _transferDate={transferDate} _budget={budget}/>
    )
}

export default ChildScreen;