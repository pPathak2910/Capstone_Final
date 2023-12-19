//@ts-nocheck
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Job from "./pages/Job";
import Forum from "./pages/Forum";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/job" element={<Job />}></Route>
      <Route path="/forum" element={<Forum />}></Route>
    </Routes>
  );
}

export default App;
