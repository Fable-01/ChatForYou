import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";


import Home from "../page/Home";
import Chart from "../page/Chart";
import Favourite from "../page/Favourite";
import Layout from "../layouts/Layout";

const namesymblo = [
  "BTCUSD/90",
  "ETHUSD/80",
  "SOLUSD/48543",
  "BNBUSD/2710",
  "XRPUSD/58",
  "DOGEUSD/2",
  "USDTUSD/518"
]


const Approuter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>
        <Layout/>
        <Outlet/>
        </>}>
        {namesymblo.map((s)=>{
          return <Route path={`/chart/:${s}`} element={<Chart/>} />
        })}
          <Route index element={<Home/>} />
          
          <Route path="/favourite" element={<Favourite/>} />
        </Route>
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Approuter;
