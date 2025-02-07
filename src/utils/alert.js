import toast from "react-hot-toast";

export const successMsg = (msg = 'Success') => toast.success(msg);
export const errorMsg = (msg = 'Error') => toast.error(msg);