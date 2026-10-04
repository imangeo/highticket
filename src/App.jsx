import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import StrategyCall from "./pages/StrategyCall";
import GlobalPrism from "./components/ui/GlobalPrism"; // FOND PRISMATIQUE

function App() {
  return (
    <Router>
      <GlobalPrism speed={1} />
      <Header/>
      <div className="min-h-screen flex flex-col font-sans text-ink relative z-10 bg-transparent">
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
