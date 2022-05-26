import React from 'react'
import { useSelector } from 'react-redux';
import Loading from './Loading';
/* import Toast from './Toast'; */

const Notify = () => {
    const { isFetching } = useSelector(store => store.user)
    //console.log(message);
    return (
        <div>
            {/*  <Loading /> */}
            {isFetching && <Loading />}

        </div>
    )
}

export default Notify
