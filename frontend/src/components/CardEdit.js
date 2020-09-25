import React, {useState} from 'react'
import { connect } from "react-redux"
import adminActions from '../redux/actions/adminActions'

const CardEdit = (props) => {

    const [modifyStock, setModifyStock] = useState({
        cantModify: 0,
        viewMoreStock: false,
    })

    const [modifyPrice, setModifyPrice] = useState({
        cantModify: 0,
        viewMorePrice: false,
    })

    const viewSwitchStock = () => {
        setModifyStock({
            ...modifyStock,
            viewMoreStock: !modifyStock.viewMoreStock,
        })
    }

    const viewSwitchPrice = () => {
        setModifyPrice({
            ...modifyPrice,
            viewMorePrice: !modifyPrice.viewMorePrice,
        })
    }

    const readInputStock = e => {
        setModifyStock({
            ...modifyStock,
            [e.target.name]: (e.target.name === 'cantModify') ? parseInt(e.target.value) : e.target.value
        })
    }

    const readInputPrice = e => {
        setModifyPrice({
            ...modifyPrice,
            [e.target.name]: parseInt(e.target.value)
        })
    }

    const editStock = async (cantModify) => {

        (props.product.stock + cantModify < 0) 
            ? await props.modifyStock( (-props.product.stock), props.product._id ) 
            : await props.modifyStock( cantModify, props.product._id )
        props.getProducts()
    }

    const editPrice = async (cantModify) => {

        (cantModify < 0) 
            ? await props.modifyPrice( 0, props.product._id ) 
            : await props.modifyPrice( cantModify, props.product._id )
        props.getProducts()
    }

    const styleProperty = {
        paddingTop: "2px",
        paddingBottom: "2px",
        borderRadius: "0.5rem",
        background: "white",
        justifyContent: "space-between",
        marginBottom: "10px",
    }

    return (
        <>
            <div style={{
                padding: "3%",
                marginTop: "3%",
                marginBottom: "3%",
                borderRadius: "0.5rem",
                background: "#2b3035",
            }} className="container ">

                <div className="row">
                    <div className="col-md-3 col-sm-12">
                        <div className="profile-img" style={{
                            backgroundImage: `url(${props.product.photo})`, 
                            height: '38vh', 
                            width: '20vw',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            borderRadius: "0.5rem",
                        }}>
                        </div>
                    </div>
                    <div className="flex col-md-9">
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex text-primary">{props.product.name}</div>
                            </div>
                        </div>
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex">Category: <span className="text-danger">{props.product.category}</span></div>
                            </div>
                        </div>
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex">Description: {props.product.description}</div>
                            </div>
                        </div>
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex">Stock: {props.product.stock}</div>
                            </div>
                            {modifyStock.viewMoreStock && 
                                <>
                                    <input type='number' name='cantModify' onChange={readInputStock} placeholder='Quantity to modify'/>
                                    <span className="flex"><button onClick={() => editStock(modifyStock.cantModify)} className='btn btn-secondary'>Increase stock</button></span>
                                    <span className="flex"><button onClick={() => editStock(-modifyStock.cantModify)} className='btn btn-secondary'>Decrease stock</button></span>
                                </>
                            }
                            <span><button onClick={viewSwitchStock} className='btn btn-primary'>{modifyStock.viewMore ? "Don't modify stock" : 'Modify stock'}</button></span>
                        </div>
                        <div style={styleProperty} className="row col-md-12" >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <div className="flex">Price: {props.product.price}$</div>
                            </div>
                            {modifyPrice.viewMorePrice && 
                                <>
                                    <input type='number' name='cantModify' onChange={readInputPrice} placeholder='New price'/>
                                    <span className="flex"><button onClick={() => editPrice(modifyPrice.cantModify)} className='btn btn-secondary'>New price</button></span>
                                </>
                            }
                            <span><button onClick={viewSwitchPrice} className='btn btn-primary'>{modifyPrice.viewMore ? "Don't modify price" : 'Modify price'}</button></span>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div style={styleProperty} className="row col-md-12" >
                                    <div className="flex">Views: {props.product.views}</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={styleProperty} className="row col-md-12" >
                                    <div className="flex">Rating: {props.product.rating}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* <div className="conteiner-card">
                <div className="card">
                    <div className="card-header">
                        <h1>{props.product.name}</h1>
                    </div>
                    <img src={props.product.photo} className="card-img-top" alt="photo1" />
                    <p>{props.product.price}</p>
                    <p>{props.product.description}</p>
                    <p>{props.product.stock}</p>
                    {modifyStock.viewMore && 
                        <>
                            <input type='number' name='cantModify' onChange={readInput} placeholder='Cant Modify'/>
                            <p><button onClick={() => editStock(modifyStock.cantModify)}>Increase stock</button></p>
                            <p><button onClick={() => editStock(-modifyStock.cantModify)}>Decrease stock</button></p>
                        </>
                    }
                    <p><button onClick={viewSwitch}>{modifyStock.viewMore ? "Don't modify stock" : 'Modify Stock'}</button></p>
                    
                </div>
            </div> */}
        </>
    )
}

const mapDispatchToProps = {
    modifyStock: adminActions.modifyStock,
    modifyPrice: adminActions.modifyPrice,
    getProducts: adminActions.getProducts
}

export default connect(null, mapDispatchToProps)(CardEdit)