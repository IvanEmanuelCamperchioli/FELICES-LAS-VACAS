import React from 'react'
import { Link } from 'react-router-dom'

const HomeAdmin = () => {
    return (
        <>
            <button><Link to='/formadmin'>Form Admin</Link></button>
            <button><Link to='/editadmin'>Edit Product</Link></button>
        </>
    )
}

export default HomeAdmin