import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faServer, faKissWinkHeart } from '@fortawesome/free-solid-svg-icons'
import FormAdmin from '../components/FormAdmin'
import EditAdmin from '../components/EditAdmin'
import Footer from '../components/Footer'
import HeaderAdmin from '../components/HeaderAdmin'

const HomeAdmin = () => {

    const [bodyEdit, setBodyEdit] = useState('')
    
    const styleContainer = {
        padding: "3%",
        marginTop: "3%",
        marginBottom: "3%",
        borderRadius: "0.5rem",
        background: "#2b3035",
    }

    const switchBody = (aBody) => {
        setBodyEdit(aBody)
    }

    return (
        <>
            <HeaderAdmin/>
            <div style={styleContainer} className='container'>
                <h1 style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "whitesmoke",
                    fontSize: '8vw'
                }}>Welcome Admin<FontAwesomeIcon style={{marginLeft:'1vh'}} icon={faKissWinkHeart}></FontAwesomeIcon></h1>
            </div>

            <div style={styleContainer} className="container">
                <div className="row d-flex mb-3">
                    <div className=" d-flex col-md-6 p-2">
                        <button onClick={() => switchBody('add')} className="btn btn-success btn-lg btn-block"><FontAwesomeIcon icon={faServer}></FontAwesomeIcon> Add Product</button>
                    </div>
                    <div className="col-md-6 p-2">
                        <button onClick={() => switchBody('edit')} className="btn btn-success btn-lg btn-block"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Edit Product</button>
                    </div>
                </div>
                {(bodyEdit === 'add') && <FormAdmin/>}
                {(bodyEdit === 'edit') && <EditAdmin/>}
                {(bodyEdit === '') && 
                <>
                    <div className="col-md-12">
                        <div className="profile-img" style={{
                            backgroundImage: 'url(http://getwallpapers.com/wallpaper/full/b/9/c/366662.jpg)', 
                            height: '38vh', 
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderRadius: "0.5rem",
                            color: "white"
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                fontSize: '8vw'
                            }}>
                                Mood Hacking
                            </div>
                        </div>
                    </div>
                </>}
            </div>
            <Footer/>
        </>
    )
}

export default HomeAdmin