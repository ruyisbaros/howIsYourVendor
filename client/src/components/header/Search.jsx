import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { usersFetchFail, usersFetchStart, usersFetchSuccess } from '../../redux/usersSlicer'
import UserCard from '../user/UserCard'

const Search = () => {

    const { users } = useSelector(store => store.users)
    const { token } = useSelector(store => store.user)
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")

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

    return (
        <form className="search_form">
            <input type="text" name="search" id="search" value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />
            <div className="search_icon" style={{ opacity: search ? "0" : "0.5" }}>
                <span className="material-icons">search</span>
                <span >Search</span>
            </div>
            <div className="close_search" onClick={() => setSearch("")} style={{ opacity: users.length === 0 && "0" }}>&times;</div>
            <div className="users">
                {
                    users?.map(user => (
                        <Link key={user._id} to={`/profile/${user._id}`} onClick={() => setSearch("")}>
                            <UserCard user={user} border="border" />
                        </Link>
                    ))
                }
            </div>
        </form>
    )
}

export default Search