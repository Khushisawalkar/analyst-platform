import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analysts from "./pages/Analysts";
import AnalystDetail from "./pages/AnalystDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analysts" element={<Analysts />} />
      <Route path="/analyst/:id" element={<AnalystDetail />} />
    </Routes>
  );
}

export default App;