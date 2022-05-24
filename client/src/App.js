import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Register from "./pages/Register";
import Login from './pages/Login';
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Notify from "./components/notify/Notify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken, refreshTokenFail } from "./redux/loginSlicer";
import axios from "axios";

function App() {

  const { token } = useSelector(store => store.user)
  const dispatch = useDispatch()


  const refreshTokenFunc = async () => {
    try {
      const { data } = await axios.post("/api/v1/auth/refresh_token")
      dispatch(refreshToken({ token: data.accessToken, user: data.current_user }))
    } catch (error) {
      dispatch(refreshTokenFail(error.response.data.message))
    }
  }

  useEffect(() => {
    if (localStorage.getItem("firstLogin")) {
      refreshTokenFunc()

      setTimeout(() => {
        refreshTokenFunc()
      }, 14 * 60 * 1000)
    }

  }, [])

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Notify />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={token ? <Home /> : <Register />} />
            <Route path="/login" element={token ? <Home /> : <Login />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
