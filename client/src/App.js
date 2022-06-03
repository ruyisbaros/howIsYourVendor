import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Register from "./pages/Register";
import Login from './pages/Login';
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Notify from "./components/notify/Notify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken, refreshTokenFail } from "./redux/authSlicer";
import axios from "axios";
import Header from "./components/header/Header";
import Messages from "./pages/Messages";
import Discover from "./pages/Discover";
import Notifies from "./pages/Notifies";
import Profile from "./pages/Profile";
import StatusModal from "./components/status/StatusModal.jsx"
import { postsFetchFail, postsFetchStart, postsFetchSuccess } from "./redux/postsSlicer";


function App() {

  const { token, currentUser } = useSelector(store => store.currentUser)
  const { status } = useSelector(store => store.posts)
  const dispatch = useDispatch()


  const refreshTokenFunc = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/refresh_token")
      dispatch(refreshToken({ token: data.accessToken, currentUser: data.current_user }))

    } catch (error) {
      dispatch(refreshTokenFail(error.response.data.message))
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("firstLogin")) {
      refreshTokenFunc()

      setTimeout(() => {
        refreshTokenFunc()
      }, 13 * 24 * 60 * 60 * 1000) //13 days
    }

  }, [token]);

  const getPosts = async () => {
    try {
      dispatch(postsFetchStart())
      const { data } = await axios.get("/api/v1/posts/all", {
        headers: { authorization: token }
      })
      //console.log(data);
      dispatch(postsFetchSuccess({ posts: data.posts, result: data.results }))
    } catch (error) {
      dispatch(postsFetchFail(error.response.data.message))
    }
  }
  /* console.log(posts); */

  useEffect(() => {
    if (token) getPosts()
  }, [dispatch, token, status === false, currentUser.followings])

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Notify />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {token && <Header />}
          {status && <StatusModal />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/messages" element={token ? <Messages /> : <Login />} />
            <Route path="/discover" element={token ? <Discover /> : <Login />} />
            <Route path="/notify" element={token ? <Notifies /> : <Login />} />
            <Route path="/profile/:id" element={token ? <Profile /> : <Login />} />
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
