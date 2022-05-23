import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register";
import Login from './pages/Login';
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
