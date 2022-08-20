import React, {useState} from "react";
import WithdrawMoney from '../components/WithdrawMoney'


const ChildScreen = () => {

    const [name, setName] = useState<string>("Kaan Can")
    const [surname, setSurname] = useState<string>("Bozdoğan")
    const [accId, setAccId] = useState<string>("161044070")
    const [transferDate, setTransferDate] = useState<string>("13/05/2025")
    const [budget, setBudget] = useState<string>("123 ETH")


    return (
        <WithdrawMoney _isParentAcc={false} _name={name} _surname={surname} _accId={accId} _transferDate={transferDate} _budget={budget}/>
    )
}

export default ChildScreen;