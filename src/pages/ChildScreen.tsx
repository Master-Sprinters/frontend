import { Contract, ethers } from "ethers";
import React, { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import WithdrawMoney from '../components/WithdrawMoney'

type Props = {
    userRole: number;
    connectProvider: () => void;
    contract: ethers.Contract | undefined;
}

interface ChildDataType {
    key: React.Key;
    name: string;
    surname: string;
    accountID: number;
    amount: number;
    dueDate: string;
}

const ChildScreen: FC<Props> = ({ userRole, connectProvider, contract }) => {

    const [name, setName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [accId, setAccId] = useState<string>("")
    const [transferDate, setTransferDate] = useState("")
    const [budget, setBudget] = useState<string>("")
    const [retrieved, setRetrieved] = useState(false)

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

        if (userRole !== 2) {//redirect to login page if role is not child
            navigate("/")
            window.location.reload();
        }

        getChildInfo();
    });

    const getChildInfo = async () => {
        if (typeof contract !== 'undefined') {
            const res = await contract.getChild()

            console.log(res)
            setRetrieved(true)
            setName(res.name.concat(" ").concat(res.surname));
            setAccId(res._address)
            setTransferDate(new Date(Number(res.releaseDate.toHexString())*1000).toDateString())
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