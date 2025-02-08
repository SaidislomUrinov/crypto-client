import { IconButton } from "@material-tailwind/react";
import { FaBell, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import socket from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateUser } from "../contexts/user";
function Top() {
    const nv = useNavigate();
    const dp = useDispatch();
    const { id } = useSelector(e => e.user);
    useEffect(() => {
        const sckt = socket(id);
        sckt.on('updateProfit', data => {
            dp(updateUser(data));
        });
    }, []);
    return (
        <div className="fixed z-[5] top-0 left-0 w-full flex items-center justify-center">
            <div className="flex items-center justify-between w-full max-w-[768px] h-[70px] bg-white rounded-b-[20px] px-[10px]">
                <IconButton onClick={() => nv('/profile')} className="rounded-[10px]" variant="gradient" color="blue">
                    <FaUser />
                </IconButton>
                <Link className="text-[20px] font-bold text-blue-500 select-none" to={'/'}>
                    PROFITWAY
                </Link>
                <IconButton onClick={() => nv('/messages')} className="rounded-[10px]" variant="gradient" color="orange">
                    <FaBell />
                </IconButton>
            </div>
        </div>
    );
}

export default Top;