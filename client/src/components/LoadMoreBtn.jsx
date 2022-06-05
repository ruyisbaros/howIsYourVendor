import React from 'react'

const LoadMoreBtn = ({ result, page, handleLoadMore, loading }) => {

    return (
        <>
            {
                result < 3 * (page - 1) ? "" :
                    !loading && <button className="d-block btn btn-dark load_more mx-auto" onClick={handleLoadMore}>
                        Load More
                    </button>
            }

        </>
    )
}

export default LoadMoreBtn