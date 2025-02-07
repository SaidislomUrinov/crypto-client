import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReq } from "./utils/req";
import { updateUser } from "./contexts/user";
import { errorMsg } from "./utils/alert";
import { Button } from "@material-tailwind/react";

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
    <Button>
      OK
    </Button>
    </>
  );
}

export default App; 