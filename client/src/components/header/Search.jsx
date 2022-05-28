import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { usersFetchFail, usersFetchStart, usersFetchSuccess } from '../../redux/usersSlicer'
import UserCard from '../user/UserCard'

import LoadingGif from '../../images/loading-2.gif'

const Search = () => {

    const { users, usersFetching } = useSelector(store => store.users)
    const { token } = useSelector(store => store.currentUser)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (search) {
            const getUsers = async () => {
                try {
                    dispatch(usersFetchStart())
                    const { data } = await axios.get(`/api/v1/users/search?username=${search}`, {
                        headers: { authorization: token }
                    })
                    dispatch(usersFetchSuccess(data))
                } catch (error) {
                    dispatch(usersFetchFail())
                    toast.error(error.response.data.message)
                }

            }
            getUsers();
        } else {
            dispatch(usersFetchSuccess([]))
        }

    }, [token, dispatch, search])

    const handleClose = () => {
        setSearch("")
        dispatch(usersFetchSuccess([]))

    }
    /*  const handleSearch = async (e) => {
         e.preventDefault()
         if (!search) return;
         try {
             setLoad(true)
             dispatch(usersFetchStart())
             const { data } = await axios.get(`/api/v1/users/search?username=${search}`, {
                 headers: { authorization: token }
             })
             dispatch(usersFetchSuccess(data))
             setLoad(false)
         } catch (error) {
             dispatch(usersFetchFail())
             setLoad(false)
         }
 
     } */

    return (
        <form className="search_form" /* onSubmit={handleSearch} */>
            <input type="text" name="search" id="search" value={search} title="Enter to search"
                onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />
            <div className="search_icon" style={{ opacity: search ? "0" : "0.5" }}>
                <span className="material-icons">search</span>
                <span >Enter to search</span>
            </div>
            <div className="close_search" onClick={handleClose} style={{ opacity: users.length === 0 && "0" }}>&times;</div>
            <button type="submit" style={{ display: "none" }}>Search</button>
            {/*  <img className="loading" src={LoadingGif} alt="Loading..." /> */}
            {load && <img src={LoadingGif} alt="Loading..." className="loading" />}

            <div className="users">
                {
                    users?.map(user => (
                        <UserCard key={user._id}
                            user={user} border="border" handleClose={handleClose} />
                    ))
                }
            </div>
        </form>
    )
}

export default Search