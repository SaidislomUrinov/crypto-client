import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReq } from "./utils/req";
import { updateUser } from "./contexts/user";
import { errorMsg } from "./utils/alert";
import Auth from "./components/auth";
import { Toaster } from "react-hot-toast";
import Verify from "./components/verify";
import { Route, Routes } from "react-router-dom";

function App() {
  const { id } = useSelector(e => e.user);
  const dp = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getReq('/user/verify').then((res) => {
      const { ok, data } = res.data;
      if (ok) {
        dp(updateUser(data));
        setLoaded(true);
      }
    }).catch(() => {
      errorMsg();
    })
  }, [])
  return (
    <>
      {!id ?
        <Routes>
          <Route path="*" element={<Auth />} />
          <Route path="/verify/:id" element={<Verify />} />
        </Routes>
        : ''
      }
      <Toaster containerStyle={{ zIndex: '99999' }} toastOptions={{ style: { maxWidth: '600px' } }} />
    </>
  );
}

export default App; 