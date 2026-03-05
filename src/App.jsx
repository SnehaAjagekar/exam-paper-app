import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/mainPage";
import DistributorPage from "./components/Distributer";
import ReceiverPage from "./components/ReceiverPage";
import LoginAsPage from "./components/LoginAsPage";
import AboutPage from './components/AboutPage';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Profile from './components/Profile';
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="distributor" element={<DistributorPage />} />
          <Route path="receiver" element={<ReceiverPage />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<AboutPage />} />
          {/* <Route path="contactPage" element={<ContactPagectPage />}></Route> */}
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;