import React from 'react'
import { Link } from 'react-router-dom'

const HomeAdmin = () => {
    return (
        <>
            <button><Link to='/form-admin'>Form Admin</Link></button>
            <button><Link to='/edit-admin'>Edit Product</Link></button>
        </>
    )
}

export default HomeAdmin