import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NFTs from "./components/NFTs";
import Profile from "./components/User/Profile";
import History from "./components/User/History";
import Mint from "./components/User/Mint";
import Transfer from "./components/User/Transfer";
import NFT from "./components/NFT";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/marketplace" element={<NFTs />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
