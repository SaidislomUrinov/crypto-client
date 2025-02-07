import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getReq } from "./utils/req";

function App() {
  const {id} = useSelector(e=>e.user);
  useEffect(()=>{
    getReq('/user//')
  },[])
  return (
    <>
    </>
  );
}

export default App; 