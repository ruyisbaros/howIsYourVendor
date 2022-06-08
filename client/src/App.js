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
import Header from "./components/header/Header";
import Messages from "./pages/Messages";
import Discover from "./pages/Discover";
import Notifies from "./pages/Notifies";
import Profile from "./pages/Profile";
import StatusModal from "./components/status/StatusModal.jsx"
import SingleProfilePost from "./pages/SingleProfilePost";
import { refreshToken, refreshTokenFail } from "./redux/authSlicer";
import { postsFetchFail, postsFetchStart, postsFetchSuccess } from "./redux/postsSlicer";
import axios from "axios";
import io from "socket.io-client"
import { getSocket } from "./redux/authSlicer";
import SocketClient from "./SocketClient";
import { fetchAllNotifications } from "./redux/notifySlicer";


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

  }, [token, localStorage.getItem("firstLogin")]);

  //SOCKET API
  useEffect(() => {
    const socket = io()
    dispatch(getSocket(socket))
    return () => socket.close()
  }, [dispatch, token])

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

  useEffect(() => {
    const getNotifies = async () => {
      const { data } = await axios.get("/api/v1/notifications/all", {
        headers: { authorization: token }
      })
      console.log(data);

      dispatch(fetchAllNotifications(data))
    }
    getNotifies()
  }, [token, dispatch])

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Notify />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {token && <Header />}
          {token && <SocketClient />}
          {status && <StatusModal />}
          <Routes>
            <Route path="/" element={localStorage.getItem("firstLogin") ? <Home /> : <Login />} />
            <Route path="/messages" element={token ? <Messages /> : <Login />} />
            <Route path="/discover" element={token ? <Discover /> : <Login />} />
            <Route path="/notify" element={token ? <Notifies /> : <Login />} />
            <Route path="/profile/:id" element={token ? <Profile /> : <Login />} />
            <Route path="/post/:id" element={token ? <SingleProfilePost /> : <Login />} />
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
