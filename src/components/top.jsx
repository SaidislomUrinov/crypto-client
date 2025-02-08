import { IconButton } from "@material-tailwind/react";
import { FaBell, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Top() {
    const nv = useNavigate();
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