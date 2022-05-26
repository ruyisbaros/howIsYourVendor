import React from 'react'
import { useSelector } from 'react-redux';
import Loading from './Loading';
/* import Toast from './Toast'; */

const Notify = () => {
    const { authFetching } = useSelector(store => store.user)
    const { usersFetching } = useSelector(store => store.users)
    //console.log(message);
    return (
        <div>
            {/*  <Loading /> */}
            {authFetching && <Loading />}
            {usersFetching && <Loading />}

        </div>
    )
}

export default Notify
