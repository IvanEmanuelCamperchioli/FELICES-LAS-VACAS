import React from 'react'
import { Link } from 'react-router-dom'

const HomeAdmin = () => {
    return (
        <>
            <button><Link to='admin-form'>Form Admin</Link></button>
            <button><Link to='/admin-edit'>Edit Product</Link></button>
        </>
    )
}

export default HomeAdmin