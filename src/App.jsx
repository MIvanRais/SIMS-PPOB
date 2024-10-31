import CssBaseline from "@mui/material/CssBaseline";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Registration from "./Registration";
import Home from "./Home";
import TopUp from "./TopUp";
import Pembelian from "./Pembelian";
import Transaction from "./Transaction";
import Akun from "./Akun";
import EditProfile from "./EditProfile";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/topup" element={<TopUp />}></Route>
        <Route path="/pembelian" element={<Pembelian />}></Route>
        <Route path="/transaction" element={<Transaction />}></Route>
        <Route path="/akun" element={<Akun />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
      </Routes>
    </>
  );
}

export default App;
