import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

const HeaderAdmin = () => {
    return (
        <>
            <div className='d-flex justify-content-between header-sup'>
                <h5 className="titleHeader">Felices las vacas | Alimentación conciente</h5>
                <button className='btn btn-primary'><Link style={{color: 'white'}} to='/log-out'>LogOut</Link></button>
            </div>
        </>
    )
}

export default HeaderAdmin