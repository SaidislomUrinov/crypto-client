import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq } from "../utils/req";
import { useDispatch } from "react-redux";
import { updateUser } from "../contexts/user";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { FiAlertCircle } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";

function Verify() {
    const { id } = useParams();
    const [status, setStatus] = useState('');//success, reject
    const [message, setMessage] = useState('');
    const [loaded, setLoaded] = useState(false);
    const dp = useDispatch();
    useEffect(() => {
        setLoaded(false);
        getReq('/user/activate', { _id: id }).then(res => {
            const { ok, data, msg, access } = res.data;
            if (!ok) {
                setStatus('reject');
                setMessage(msg);
            } else {
                setStatus('success');
                setMessage(msg);
                localStorage.setItem('access', access);
                setTimeout(() => {
                    dp(updateUser(data));
                    nv('/');
                }, 500);
            }
        }).catch(() => {
            setStatus('reject');
            setMessage('Failed to verify your account');
        }).finally(() => {
            setLoaded(true)
        })
    }, [id]);
    const nv = useNavigate();
    return (
        <div className="flex items-center justify-center w-full h-[100vh]">
            {!loaded && <Spinner className="w-[50px] h-[50px]" color="blue" />}
            {loaded &&
                <div className="flex items-center justify-center w-[90%] sm:w-[500px] bg-white rounded-[20px] p-[20px] gap-[20px] flex-col">
                    {status === 'reject' ? <FiAlertCircle className="text-[50px] text-red-500" /> : <FaCircleCheck className="text-[50px] text-green-500" />}
                    <Typography className="text-center" color="blue-gray">{message}</Typography>
                    {status === 'reject' &&
                        <Button onClick={()=>nv('/')} color="blue">
                            Login or Register
                        </Button>
                    }
                </div>
            }
        </div>
    );
}

export default Verify;