import { IconButton } from "@material-tailwind/react";
import { FaBell, FaUsers, FaWallet } from "react-icons/fa";
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const nv = useNavigate();
    const p = useLocation().pathname;
    return (
        <div className="fixed z-[5] bottom-0 left-0 w-full flex items-center justify-center">
            <div className="flex items-center justify-between w-full max-w-[768px] h-[70px] bg-white rounded-t-[20px] px-[10px]">
                {/*  */}
                <div className="flex items-center justify-center w-1/5">
                    <div onClick={() => nv('/wallet')} className="cursor-pointer flex items-center justify-center flex-col gap-1">
                        <IconButton className="rounded-[30px]" variant={p === '/wallet' ? 'gradient' : 'text'} color={p === '/wallet' ? 'blue' : 'blue-gray'}>
                            <FaWallet className="text-[20px]" />
                        </IconButton>
                        <p className="text-blue-gray-500 text-[10px] uppercase">Wallet</p>
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-center w-1/5">
                    <div onClick={() => nv('/withdraw')} className="cursor-pointer flex items-center justify-center flex-col gap-1">
                        <IconButton className="rounded-[30px]" variant={p === '/withdraw' ? 'gradient' : 'text'} color={p === '/withdraw' ? 'blue' : 'blue-gray'}>
                            <FaMoneyBillTransfer className="text-[20px]" />
                        </IconButton>
                        <p className="text-blue-gray-500 text-[10px] uppercase">withdraw</p>
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-center w-1/5">
                    <div onClick={() => nv('/')} className="cursor-pointer flex items-center justify-center flex-col gap-1">
                        <IconButton className="rounded-[30px]" variant={p === '/' ? 'gradient' : 'text'} color={p === '/' ? 'blue' : 'blue-gray'}>
                            <FaMoneyBillTrendUp className="text-[20px]" />
                        </IconButton>
                        <p className="text-blue-gray-500 text-[10px] uppercase">Mining</p>
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-center w-1/5">
                    <div onClick={() => nv('/referrals')} className="cursor-pointer flex items-center justify-center flex-col gap-1">
                        <IconButton className="rounded-[30px]" variant={p === '/referrals' ? 'gradient' : 'text'} color={p === '/referrals' ? 'blue' : 'blue-gray'}>
                            <FaUsers className="text-[20px]" />
                        </IconButton>
                        <p className="text-blue-gray-500 text-[10px] uppercase">referrals</p>
                    </div>
                </div>
                {/*  */}
                <div className="flex items-center justify-center w-1/5">
                    <div onClick={() => nv('/messages')} className="cursor-pointer flex items-center justify-center flex-col gap-1">
                        <IconButton className="rounded-[30px]" variant={p === '/messages' ? 'gradient' : 'text'} color={p === '/messages' ? 'blue' : 'blue-gray'}>
                            <FaBell className="text-[20px]" />
                        </IconButton>
                        <p className="text-blue-gray-500 text-[10px] uppercase">messages</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;