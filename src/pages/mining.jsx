import { useDispatch, useSelector } from "react-redux";
import format from "../utils/format";
import { BsFan } from "react-icons/bs";
import { useState } from "react";
import { Button, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Option, Popover, PopoverContent, PopoverHandler, Select, Typography } from "@material-tailwind/react";
import { BiSolidCoin, BiSolidUpArrowAlt } from "react-icons/bi";
import { FaCheckCircle, FaCopy, FaRocket } from "react-icons/fa";
import { postReq } from "../utils/req";
import { errorMsg, successMsg } from "../utils/alert";
import Countdown from 'react-countdown';
import { updateUser } from "../contexts/user";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { SiTether } from "react-icons/si";
function Mining() {
    const { balance, profit, dailyProfit, lvl, email } = useSelector(e => e.user);
    const { currencies, lvlPrice, profit: percent } = useSelector(e => e.cfg);
    const [claimDisabled, setClaimDisabled] = useState(false);
    const [openUpgrade, setOpenUpgrade] = useState(false);
    const [nextLvl, setNextLvl] = useState(lvl + 1);
    const dp = useDispatch();
    function next() {
        setNextLvl(nextLvl + 1);
    };
    function prev() {
        if (nextLvl - 1 > lvl) {
            setNextLvl(nextLvl - 1);
        }
    };
    const claim = async () => {
        try {
            if (Number(profit) < 0.1) throw new Error("Min. calim: $ 0.1");
            setClaimDisabled(true);
            const res = await postReq('/user/claim');
            const { ok, data, msg } = res.data;
            if (!ok) throw new Error(msg);
            dp(updateUser(data));
            successMsg("Claimed🔥")
        } catch (error) {
            errorMsg(error.message)
        } finally {
            setClaimDisabled(false);
        }
    };
    // 
    const upgradePrice = () => {
        return lvlPrice * Math.pow(2, nextLvl - 1)
    };
    const [currency, setCurrency] = useState('');
    const [network, setNetwork] = useState('');
    const [disabledUpgrade, setDisabledUpgrade] = useState(false);
    const [wallet, setWallet] = useState({
        network: '',
        wallet: '',
        qr: '',
        currency: '',
        payAmount: 0,
        amount: 0,
        unix: 0,
        lvl: 0
    });
    function closeWallet() {
        setWallet({
            network: '',
            wallet: '',
            qr: '',
            currency: '',
            payAmount: 0,
            amount: 0,
            unix: 0,
            lvl: 0
        });
    }
    function closeUpgrade() {
        setOpenUpgrade(false);
        setCurrency('');
        setNetwork('');
        setDisabledUpgrade(false);
    };
    async function upgradeLvl() {
        try {
            setDisabledUpgrade(true);
            const res = await postReq('/user/deposit', { currency, network, lvl: nextLvl });
            const { ok, data, msg } = res.data;
            if (!ok) throw new Error(msg);
            setWallet(data);
            closeUpgrade();
        } catch (error) {
            errorMsg(error.message);
        } finally {
            setDisabledUpgrade(false)
        }
    };
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
            {/* miner */}
            <div className="flex items-center bg-white rounded-[22px] p-[10px] justify-between w-[95%]">
                {/* MINER */}
                <div className="flex items-center justify-center gap-[10px]">
                    <div className="flex items-center w-[80px] h-[80px] justify-center bg-indigo-500 shadow-md rounded-[15px] relative">
                        <BsFan className={`text-[60px] hover:animate-spin text-white ${dailyProfit > 0 ? 'animate-spin' : ''}`} />
                        <span className="absolute duration-200 hover:rotate-[90deg] flex items-center justify-center rounded-full top-[5px] rotate-[-45deg] right-[5px] bg-white w-[10px] h-[10px]">
                            <span className="w-[1px] h-[5px] bg-gray-800 rounded"></span>
                        </span>
                        <span className="absolute duration-200 hover:rotate-[-90deg] flex items-center justify-center rounded-full top-[5px] left-[5px] rotate-[45deg] bg-white w-[10px] h-[10px]">
                            <span className="w-[1px] h-[5px] bg-gray-800 rounded"></span>
                        </span>
                        <span className="absolute duration-200 hover:rotate-[90deg] flex items-center justify-center rounded-full bottom-[5px] rotate-[-45deg] right-[5px] bg-white w-[10px] h-[10px]">
                            <span className="w-[1px] h-[5px] bg-gray-800 rounded"></span>
                        </span>
                        <span className="absolute duration-200 hover:rotate-[-90deg] flex items-center justify-center rounded-full bottom-[5px] left-[5px] rotate-[45deg] bg-white w-[10px] h-[10px]">
                            <span className="w-[1px] h-[5px] bg-gray-800 rounded"></span>
                        </span>
                    </div>
                    {/*  */}
                    <div className="flex items-start justify-center flex-col">
                        <div className="flex items-center justify-start gap-1">
                            <p className="text-blue-gray-600">Miner LVL:</p>
                            <Chip size="sm" color="blue" variant="ghost" value={lvl} />
                        </div>
                        <p className="font-semibold font-j text-[25px] text-blue-gray-800">${format(profit, 6, 6)}</p>
                        <p className="text-blue-gray-600 text-[14px]">Dailiy income: <b className="text-green-500 font-j">${format(dailyProfit)}</b></p>
                    </div>
                </div>
                {/*  */}
                {profit > 0.1 ?
                    <Button Button disabled={claimDisabled} variant="gradient" className="w-[100px] sm:flex hidden" loading={claimDisabled} onClick={claim} color="indigo">
                        Claim
                    </Button>
                    :
                    <Popover>
                        <PopoverHandler>
                            <Button variant="gradient" className="w-[100px] sm:flex hidden" color="indigo">
                                Claim
                            </Button>
                        </PopoverHandler>
                        <PopoverContent className="border border-blue-gray-500">
                            <p>Min. claim: $ 0.1</p>
                        </PopoverContent>
                    </Popover>
                }
            </div>
            <Button onClick={claim} loading={claimDisabled} color="indigo" variant="gradient" className="sm:hidden w-[95%] from-pink-500 to-blue-500" size="sm">Claim profit <BiSolidCoin className="text-[20px]" /></Button>
            {/* next level */}
            <div className="flex items-center justify-center gap-1 w-[95%]">
                {/*  */}
                <div className="bg-gradient-to-r from-pink-500 to-indigo-500 p-4 rounded-2xl text-white shadow-md w-full relative overflow-hidden">
                    <h3 className="text-lg font-bold z-[2] mb-2 text-start">🔥 Next Level Benefits 🔥</h3>
                    <ul className="space-y-2 text-sm z-[2]">
                        <li className="flex items-center gap-2">
                            <FaCheckCircle /> <span className="font-medium">+<span className="font-j">${format((lvlPrice * Math.pow(2, lvl)) * percent)}</span>/day income</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaRocket /> <span className="font-medium">Faster mining speed</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaMoneyBillTrendUp /> <span className="font-medium">Increased efficiency</span>
                        </li>
                    </ul>
                </div>
                {/*  */}
            </div>
            {/* actions */}
            <div className="flex items-center justify-center w-[95%] gap-1">
                {/*  */}
                <Button onClick={() => setOpenUpgrade(true)} color="indigo" variant="gradient" className="sm:w-full w-full from-indigo-500 to-purple-500" size="sm">Upgrade miner lvl<BiSolidUpArrowAlt className="text-[20px]" /></Button>
            </div>
            {/*  */}
            <div className={`flex duration-200 fixed left-0 ${openUpgrade ? 'bottom-0' : 'bottom-[-100vh]'} items-center justify-end w-full flex-col h-[100vh] bg-[#0009] z-[6]`}>
                <div className="flex items-center flex-col bg-white rounded-t-[20px] w-full max-w-[768px] p-[20px]">
                    <Typography className="font-semibold flex items-center justify-start">Upgrade miner LVL<BiSolidUpArrowAlt className="text-[20px] text-blue-500" /></Typography>
                    <Typography className="font-semibold text-blue-gray-700 text-[14px] gap-1 flex items-center justify-start">Currentc LVL: <span className="text-blue-500">{lvl}</span></Typography>
                    {/*  */}
                    <div className="flex items-center flex-col border justify-center gap-1 p-[10px] bg-gray-100 rounded-[10px]">
                        <Typography className="text-blue-gray-800 font-semibold text-[14px] gap-1 flex items-center justify-start">How many levels do we upgrade?</Typography>
                        {/*  */}
                        <div className="flex items-center justify-center gap-1">
                            <IconButton onClick={prev} disabled={nextLvl - 1 <= lvl} color="orange">
                                -
                            </IconButton>
                            <IconButton variant="outlined" color="blue">
                                {nextLvl}
                            </IconButton>
                            <IconButton onClick={next} color="green">
                                +
                            </IconButton>
                        </div>
                        {/*  */}
                        <Typography className="text-blue-gray-800 text-[14px] gap-1 flex items-center justify-start">Upgrade amount: <b className="text-blue-500 font-j">${format(upgradePrice())}</b></Typography>
                        <Typography className="text-blue-gray-800 font-semibold text-[14px] gap-1 flex items-center justify-start">Daily income: <b className="text-green-500 font-bold font-j">+${format(upgradePrice() * percent)}</b></Typography>
                    </div>
                    {/*  */}
                    <hr className="my-[10px] bg-gray-400 w-full" />
                    <div className="flex items-center justify-start flex-col gap-[10px] w-full">
                        <Select color="blue" label="Select currency *" className="active:scale-100" onChange={e => { setCurrency(e); setNetwork('') }} value={currency}>
                            {currencies?.map((c, i) => {
                                return (
                                    <Option className="text-black" key={i} value={c?.title}>{c?.title}</Option>
                                );
                            })}
                        </Select>
                        {currency && <Select color="blue" label="Select network *" className="active:scale-100" onChange={e => { setNetwork(e) }} value={network}>
                            {currencies?.find(c => c?.title === currency)?.networks?.map((c, i) => {
                                return (
                                    <Option className="text-black" key={i} value={c}>{c?.toUpperCase()}</Option>
                                );
                            })}
                        </Select>}
                    </div>
                    <hr className="my-[10px] bg-gray-400 w-full" />
                    <div className="flex items-center justify-end w-full gap-[10px]">
                        <Button size="sm" disabled={disabledUpgrade} variant="gradient" onClick={closeUpgrade}>Close</Button>
                        <Button size="sm" disabled={!currency || !network || disabledUpgrade} loading={disabledUpgrade} variant="gradient" color="green" onClick={upgradeLvl}>Upgrade now</Button>
                    </div>
                </div>
                {/*  */}
            </div>
            {/* wallet */}
            <Dialog open={wallet.currency !== ''}>
                <DialogHeader>
                    <Typography className="font-bold">Upgrade LVL to {wallet.lvl}</Typography>
                </DialogHeader>
                <DialogBody className="flex border-y items-center justify-start flex-col gap-1">
                    <Typography className="text-black font-j">
                        <Countdown date={(wallet.unix * 1000) + (60 * 30 * 1000)} />
                    </Typography>
                    <div className="flex items-center justify-center w-[150px] h-[150px] overflow-hidden">
                        <img src={wallet.qr} alt="" />
                    </div>
                    <Typography className="text-black flex items-center justify-center gap-1 font-semibold font-j">
                        <FaCopy className="text-blue-gray-500 active:scale-90 cursor-pointer" onClick={() => window.navigator.clipboard.writeText(wallet.payAmount)} />
                        {wallet.payAmount} {wallet.currency} = <span className="text-green-500 font-j">${format(wallet.amount)}</span>
                    </Typography>
                    <div className="flex items-center justify-center gap-1">
                        <Typography className="text-black flex items-center justify-center gap-1 font-semibold">Network:</Typography>
                        <Chip variant="ghost" color="blue" size="sm" value={wallet.network} />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 items-center justify-center w-full">
                        <input type="text" readOnly color="blue" value={wallet.wallet} className="border bg-blue-gray-50 text-[14px] text-black px-[10px] w-full rounded-[10px] h-[35px]" />
                        <Button onClick={() => window.navigator.clipboard.writeText(wallet.wallet)} size="sm" className="min-w-[150px]" color="blue-gray">
                            <FaCopy />
                            Copy address
                        </Button>
                    </div>
                    <Typography className="text-[12px] text-center text-black">Transfer the specified amount to the given wallet. The assets will be transferred to your account within 1 minute!</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button className="w-full" variant="gradient" onClick={closeWallet} size="sm">
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </div >
    );
}

export default Mining;