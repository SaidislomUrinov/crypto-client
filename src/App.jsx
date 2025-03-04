import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReq } from "./utils/req";
import { updateUser } from "./contexts/user";
import { errorMsg } from "./utils/alert";
import Auth from "./components/auth";
import { Toaster } from "react-hot-toast";
import Verify from "./components/verify";
import { Route, Routes } from "react-router-dom";
import Top from "./components/top";
import Navbar from "./components/navbar";
import Mining from "./pages/mining";
import Loading from "./components/loading";
import { updateConfigs, updateCurrency } from "./contexts/cfg";
import AnimationBG from "./components/animation";
import Referrals from "./pages/referrals";
import Wallet from "./pages/wallet";

function App() {
  const { id } = useSelector(e => e.user);
  const dp = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getReq('/user/verify').then((res) => {
      const { ok, data } = res.data;
      if (ok) {
        dp(updateUser(data));
      }
    }).catch(() => {
      errorMsg();
    }).finally(() => {
      setLoaded(true);
    });
    getReq('/user/currencies').then(res => {
      const { ok, data } = res.data;
      if (ok) {
        dp(updateCurrency(data));
      }
    });
    getReq('/user/configs').then(res => {
      const { ok, data } = res.data;
      if (ok) {
        dp(updateConfigs(data));
      }
    })
  }, [])
  return (
    <>
      {!loaded && <Loading />}
      {!id ?
        <Routes>
          <Route path="*" element={<Auth />} />
          <Route path="/verify/:id" element={<Verify />} />
        </Routes>
        :
        <div className="flex items-center justify-start flex-col w-full py-[80px]">
          <Top />
          <Routes>
            <Route path="/" element={<Mining />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
          <Navbar />
        </div>
      }
      <Toaster containerStyle={{ zIndex: '99999' }} toastOptions={{ style: { maxWidth: '600px' } }} />
      <AnimationBG />
    </>
  );
}

export default App; 