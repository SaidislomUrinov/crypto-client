import { Button, Chip, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { FaCopy, FaUsers } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { useSelector } from "react-redux";
import format from "../utils/format";
import { getReq } from "../utils/req";
import { errorMsg } from "../utils/alert";

function Referrals() {
    const { id } = useSelector(e => e.user);
    const { ref1Percent, ref2Percent, ref3Percent, ref1Bonus, ref2Bonus, ref3Bonus } = useSelector(e => e.cfg);
    const [loaded, setLoaded] = useState(false);
    const [state, setState] = useState({
        ref1: 0,
        ref2: 0,
        ref3: 0,
        ref1Profit: 0,
        ref2Profit: 0,
        ref3Profit: 0,
    });
    useEffect(() => {
        getReq('/user/referrals').then(res => {
            const { ok, data, msg } = res.data;
            if (ok) {
                setState(data);
            }else{
                errorMsg(msg);
            }
        }).catch(()=>{
            errorMsg('Error fetching referrals');
        }).finally(()=>{
            setLoaded(true);
        })
    }, [])
    return (
        <div className="flex items-center justify-start flex-col w-[95%] gap-[10px]">
            {/*  */}
            <div className="flex gap-[10px] items-start justify-start flex-col w-full p-[20px] rounded-[20px] bg-white">
                <p className="flex items-center text-[18px] justify-start gap-1 font-semibold">
                    Referrals
                    <FaUsers className="text-blue-500" />
                </p>
                {/*  */}
                <div className="flex items-start justify-strat flex-col w-full gap-1">
                    <p className="min-w-max text-[14px]">Invitation link: </p>
                    <div className="flex items-center justify-center w-full relative">
                        <input className="px-[10px] h-[40px] sm:text-[16px] text-[12px] w-full text-blue-700 font-semibold font-j rounded-[10px] bg-gray-100" value={`https://profitway.lol?invite=${id}`} readOnly name="" id="" />
                        <div className="absolute right-[5px]">
                            <Button onClick={() => window.navigator.clipboard.writeText(`https://profitway.lol?invite=${id}`)} color="blue" variant="gradient" size="sm">Copy</Button>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-strat w-full gap-1">
                    <p className="min-w-max text-[14px]">Invitation code: </p>
                    <Chip value={`${id}`} variant="ghost" />
                    <IconButton onClick={() => window.navigator.clipboard.writeText(`${id}`)} size="sm" color="blue" variant="gradient">
                        <FaCopy />
                    </IconButton>
                </div>
                {/*  */}
                <p className="flex items-center justify-center text-[14px] font-semibold bg-gray-100 rounded-[10px] p-[10px]">Expand your referral team to increase your income🔥</p>
            </div>
            {/*  */}
            <div className="flex gap-[10px] items-start justify-start flex-col w-full p-[20px] rounded-[20px] bg-white">
                <p className="text-[20px] font-semibold">Earned: <span className="text-green-500 font-j">+${format((state.ref1Profit + state.ref2Profit + state.ref3Profit))}</span></p>
            </div>
            {/*  */}
            {loaded && <div className="flex items-center justify-center w-full rounded-[10px] bg-white">
                {/* ref1 */}
                <div className="flex items-center justify-start flex-col w-1/3 py-[5px] gap-[10px] ">
                    {/*  */}
                    <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-gradient-to-br from-cyan-300 to-cyan-600">
                        <FaUserGroup className="text-white" />
                    </div>
                    {/*  */}
                    <Chip value={`LVL: 1`} color="cyan" className="w-full flex items-center justify-center rounded-none" variant="ghost" />
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Profit</p>
                        <p className="font-bold text-[20px] uppercase text-blue-gray-800">
                            {Math.floor(ref1Percent * 100)}%
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Referrals</p>
                        <p className="font-bold text-[20px] uppercase text-blue-gray-800">
                            {state?.ref1}
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600 text-center">For active referrals</p>
                        <p className="font-bold font-j text-[14px] text-blue-500">
                            +${format(ref1Bonus)}
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Earned</p>
                        <p className="font-bold font-j text-[14px] uppercase text-green-500">
                            +${format(state?.ref1Profit)}
                        </p>
                    </div>
                </div>
                {/* ref2 */}
                <div className="flex items-center border-x border-blue-gray-200 justify-start flex-col w-1/3 py-[5px] gap-[10px] ">
                    {/*  */}
                    <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-gradient-to-br from-light-blue-300 to-light-blue-600">
                        <FaUserGroup className="text-white" />
                    </div>
                    {/*  */}
                    <Chip value={`LVL: 2`} color="light-blue" className="w-full flex items-center justify-center rounded-none" variant="ghost" />
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Profit</p>
                        <p className="font-bold text-[20px] uppercase text-blue-gray-800">
                            {Math.floor(ref2Percent * 100)}%
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Referrals</p>
                        <p className="font-bold text-[20px] uppercase text-blue-gray-800">
                            {state?.ref2}
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600 text-center">For active referrals</p>
                        <p className="font-bold font-j text-[14px] text-blue-500">
                            +${format(ref2Bonus)}
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Earned</p>
                        <p className="font-bold font-j text-[14px] uppercase text-green-500">
                            +${format(state?.ref2Profit)}
                        </p>
                    </div>
                </div>
                {/* ref3 */}
                <div className="flex items-center justify-start flex-col w-1/3 py-[5px] gap-[10px] ">
                    {/*  */}
                    <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-gradient-to-br from-indigo-300 to-indigo-600">
                        <FaUserGroup className="text-white" />
                    </div>
                    {/*  */}
                    <Chip value={`LVL: 3`} color="indigo" className="w-full flex items-center justify-center rounded-none" variant="ghost" />
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Profit</p>
                        <p className="font-bold text-[20px] uppercase text-blue-gray-800">
                            {Math.floor(ref3Percent * 100)}%
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Referrals</p>
                        <p className="font-bold text-[20px] uppercase text-blue-gray-800">
                            {state?.ref3}
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600 text-center">For active referrals</p>
                        <p className="font-bold font-j text-[14px] text-blue-500">
                            +${format(ref3Bonus)}
                        </p>
                    </div>
                    {/*  */}
                    <div className="flex items-center justify-center w-full flex-col">
                        <p className="font-semibold text-[12px] uppercase text-blue-gray-600">Earned</p>
                        <p className="font-bold font-j text-[14px] uppercase text-green-500">
                            +${format(state?.ref3Profit)}
                        </p>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Referrals;