import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import StrategyCall from "./pages/StrategyCall";
import GlobalPrism from "./components/ui/GlobalPrism";
import GlobalToast from "./components/ui/GlobalToast"; // <-- IMPORT

function App() {
  return (
    <Router>
      <GlobalPrism speed={1} />
      <GlobalToast /> {/* <-- BRANCHÉ ICI */}
      <div className="min-h-screen flex flex-col font-sans text-white relative z-10 bg-transparent">
        <Header />
        <div className="flex-grow bg-transparent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appel-strategique" element={<StrategyCall />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
