import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { errorMsg } from "../utils/alert";
import { postReq } from "../utils/req";
import { Button, Dialog, DialogBody, DialogFooter, Input, Typography } from "@material-tailwind/react";
import { FaCode, FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";

function Auth() {
    const [q] = useSearchParams();
    const invite = q.get('invite');
    const [form, setForm] = useState({
        email: '',
        invite: invite || ''
    });
    const [disabled, setDisabled] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState(invite ? 'signup':'signin')//signup
    async function submit() {
        try {
            const { email, invite } = form;
            setDisabled(true);
            if (!email || !email.includes('@')) throw new Error("Please enter a valid email");
            if (invite && (isNaN(invite) || invite < 1)) throw new Error("Please enter a valid invite code");
            const res = await postReq('/user/auth', { email, invite });
            const { ok, msg } = res.data;
            if (ok) {
                setOpenModal(true);
            } else {
                errorMsg(msg);
            }
        } catch (error) {
            errorMsg(error.message);
        } finally {
            setDisabled(false);
        }
    }
    return (
        <div className="flex items-center justify-center flex-col w-full h-[100vh]">
            <div className="flex items-center justify-center w-[90%] sm:w-[500px] bg-white p-[20px] gap-[20px] rounded-[20px] flex-col">
                <Typography variant="h2" color="blue-gray">
                    {type === 'signup' ? "Registration" : "Login"}
                </Typography>
                <Input color="blue" icon={<FaEnvelope />} type="email" variant="standard" label="Your email address here" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value.trim().toLowerCase() })} />
                {type === 'signup' && <Input color="blue" icon={<FaCode />} type="number" variant="standard" label="Invitation code (Optional)" value={form.invite} onChange={(e) => setForm({ ...form, invite: e.target.value })} />}
                <Button onClick={submit} loading={disabled} className="w-full" color="blue" variant="gradient">Submit</Button>
                <div className="flex items-center justify-center w-full gap-[10px]">
                    <span className="w-[40%] h-[1px] bg-blue-gray-100"></span>
                    <span>OR</span>
                    <span className="w-[40%] h-[1px] bg-blue-gray-100"></span>
                </div>
                <Button onClick={() => setType(type === 'signin' ? 'signup' : 'signin')} color="blue" variant="text" className="w-full bg-blue-50">
                    {type === 'signup'?'Login':'Register'}
                </Button>
            </div>
            <Dialog open={openModal}>
                <DialogBody className="flex items-center justify-start flex-col gap-1">
                    <FaEnvelopeOpenText className="text-[90px] text-cyan-500" />
                    <Typography variant="h6" className="text-center" color="blue-gray">We have sent a message to your email, please check it!</Typography>
                </DialogBody>
                <DialogFooter>
                    <Button color="blue" className="w-full" onClick={() => setOpenModal(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default Auth;