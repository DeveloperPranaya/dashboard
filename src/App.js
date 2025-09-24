import { Routes, Route } from "react-router-dom";
import KozmoDashboard from "./pages/KozmoDashboard";
import IntakeAgent from "./pages/IntakeAgent";
import "./style/global.css";

function App() {
 
  return (
     <Routes>
      <Route path="/" element={<KozmoDashboard />} />
      <Route path="/intake-agent" element={<IntakeAgent />} />
    </Routes>
  );
}

export default App;
