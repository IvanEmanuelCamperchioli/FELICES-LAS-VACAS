import React, {useState} from 'react'
import { connect } from "react-redux"
import adminActions from '../redux/actions/adminActions'

const CardEdit = (props) => {

    const [modifyStock, setModifyStock] = useState({
        cantModify: 0,
        viewMore: false,
    })

    const viewSwitch = () => {
        setModifyStock({
            ...modifyStock,
            viewMore: !modifyStock.viewMore,
        })
    }

    const readInput = e => {
        setModifyStock({
            ...modifyStock,
            [e.target.name]: (e.target.name === 'cantModify') ? parseInt(e.target.value) : e.target.value
        })
    }

    const editStock = async (cantModify) => {

        (props.product.stock + cantModify < 0) 
            ? await props.modifyStock( (-props.product.stock), props.product._id ) 
            : await props.modifyStock( cantModify, props.product._id )
        props.getProducts()

    }

    return (
        <>
            <div className="conteiner-card">
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
            </div>
        </>
    )
}

const mapDispatchToProps = {
    modifyStock: adminActions.modifyStock,
    getProducts: adminActions.getProducts
}

export default connect(null, mapDispatchToProps)(CardEdit)