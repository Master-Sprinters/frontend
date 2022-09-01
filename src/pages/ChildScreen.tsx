import { ethers } from "ethers";
import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import WithdrawMoney from '../components/WithdrawMoney'

type Props = {
    connectProvider: () => Promise<{
        role: any;
        address: string;
        contract: ethers.Contract;
    } | undefined>;
    contract: ethers.Contract | undefined;
}

const ChildScreen: FC<Props> = ({ connectProvider, contract }) => {

    const [name, setName] = useState<string>("")
    const [accId, setAccId] = useState<string>("")
    const [transferDate, setTransferDate] = useState("")
    const [budget, setBudget] = useState<string>("")
    const [retrieved, setRetrieved] = useState(false)

    useEffect(() => {
        getChildInfo();
    });

    const getChildInfo = async () => {
        if (typeof contract !== 'undefined') {
            const res = await contract.getChild()
            
            setRetrieved(true)
            setName(res.name.concat(" ").concat(res.surname));
            setAccId(res._address)
            setTransferDate(new Date(Number(res.releaseDate.toHexString()) * 1000).toDateString())
            setBudget(ethers.utils.formatEther(res.balance))
        }
    };

    const DisplayContent = () => {
        if (retrieved) {
            return (<WithdrawMoney _isParentAcc={false} _name={name} _accId={accId} _transferDate={transferDate} _budget={budget} contract={contract} />)
        } else {
            return (<h5> Loading </h5>)
        }
    }

    return (
        <DisplayContent />
    )
}

export default ChildScreen;