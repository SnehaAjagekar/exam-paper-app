import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/mainPage";
import DistributorPage from "./components/Distributer";
import ReceiverPage from "./components/ReceiverPage";
import LoginAsPage from "./components/LoginAsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./components/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="loginAs" element={<LoginAsPage />} />
          <Route path="distributor" element={<DistributorPage />} />
          <Route path="receiver" element={<ReceiverPage />} />

          


        </Route>
      </Routes>
    </Router>
  );
}

export default App;