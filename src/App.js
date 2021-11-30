import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Documents } from "./components/Documents";
import { Login } from "./components/Login";
import {Email} from './components/Email'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/documents/:id" element={<Documents />} />
          {/* <Route path="/email" element={<Email />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
