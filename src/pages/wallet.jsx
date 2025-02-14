import { useSelector } from "react-redux";
import format from "../utils/format";
import { SiTether } from "react-icons/si";
import { useEffect, useState } from "react";
import { getReq } from "../utils/req";
import { errorMsg } from "../utils/alert";
import { FaArrowDown } from "react-icons/fa";
import Loading from "../components/loading";
import { Spinner } from "@material-tailwind/react";

function Wallet() {
    const { balance, email } = useSelector(e => e.user);
    const [transactions, setTransaction] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        getReq('/user/transactions').then(res => {
            const { ok, data, msg } = res.data;
            if (ok) {
                setTransaction(data);
                console.log(data)
            } else {
                errorMsg(msg);
            }
        }).catch(() => {
            errorMsg('Error fetching transactions');
        }).finally(() => {
            setLoaded(true);
        })
    }, []);
    return (
        <div className="flex items-center justify-start flex-col w-full gap-[15px]">
            {/* balance */}
            <div className="flex items-center justify-center flex-col w-[95%] h-[150px] rounded-[22px] p-[20px] relative bg-gradient-to-br from-purple-500 to-indigo-800 overflow-hidden">
                <div className="absolute top-[20px] z-[2] left-[20px]">
                    <p className="text-white">Currnet Balance</p>
                </div>
                <p className="text-[30px] font-j w-full z-[2] flex items-center justify-start gap-1 font-semibold text-white"><span className="text-[25px] text-gray-200 ">$</span> {format(balance)}</p>
                <div className="absolute bottom-[20px] z-[2] right-[20px]">
                    <p className="text-[15px] text-white">{email}</p>
                </div>
                <SiTether className="absolute top-[20px] text-[30px] right-[20px] text-white z-[2]" />
                <div className="absolute top-0 right-0 h-[100px] w-[100px] rounded-bl-full bg-[#00000038]"> </div>
                <div className="absolute bottom-0 left-0 h-[100px] w-[100px] rounded-tr-full bg-[#00000038]"> </div>
            </div>
            {/*  */}
            <div className="flex items-start justify-start flex-col w-[95%] p-[10px] bg-white rounded-[20px]">
                {/*  */}
                <p className="flex w-full border-b items-center justify-start gap-1 font-semibold text-[20px]">Transactions<FaArrowDown className="text-blue-500" /></p>
                {/*  */}
                <div className="flex items-center flex-col justify-start w-full">
                    {!loaded &&
                        <div className="flex items-center justify-center w-full h-[30vh] flex-col">
                            <Spinner color="blue" />
                        </div>
                    }{loaded && !transactions?.[0] &&
                        <div className="flex items-center justify-center w-full h-[30vh] flex-col">
                            <p>No transaction!</p>
                        </div>
                    }{loaded && transactions?.[0] &&
                        transactions?.map((t, i) => {
                            return (
                                <div className="flex items-center justify-between w-full border-b py-[5px]" key={i}>
                                    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Wallet;