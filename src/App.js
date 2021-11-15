import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Documents } from "./components/Documents";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/documents/:id" element={<Documents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
