import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Paypal from './Paypal'
import ItemFinish from './ItemFinish'
import '../styles/finishShopping.css'
import productsActions from '../redux/actions/productsActions'


const FinishShopping = (props) => {

    const [countTotalDolar, setCountTotalDolar] = useState(0)
    const [visibilityPaypal, setVisibilityPaypal] = useState(false)

    useEffect(() => {
        totalDolar()
    }, [])

    const totalDolar = () => {

        let countTotal = 0
        const changeDolar =  0.013

        props.cartProducts.map(product => {
            countTotal += (parseInt(product.quantity) * parseInt(product.product.price))
        })

        setCountTotalDolar(countTotal * changeDolar)
    }

    return (
        <>
            <h3 className="nameFinish">Resumen de compra</h3>
            <div className="mainCont">
                <div className="maincontainerStract">
                    {props.cartProducts.map(product=>{
                        
                        return <ItemFinish item= {product} />
                        
                    })}
                </div>
                
            </div>
                <h4 className="subtotalx">Subtotal: {props.countTotal}</h4>
            <div className="buttons">
                <button className="btn1" onClick={async () =>{
                    if(props.countTotal !== 0){
                        props.confirm(props.cartProducts, props.token)
                    } 
                }}>Pagar en efectivo</button>
                <button className="btn1" onClick={() => setVisibilityPaypal(true)}>Pagar con paypal</button>
                {(visibilityPaypal) && <Paypal total={countTotalDolar} />}
            </div>


        </>
    )
}

const mapDispatchToProps = {
    confirm: productsActions.confirm
}

const mapStateToProps = (state) => {
    var countTotal = 0
        state.productsRed.cartProducts.map(product =>{
        countTotal += (parseInt(product.quantity) * parseInt(product.product.price))
    })
    return {
        token: state.usersRed.token,
        cartProducts: state.productsRed.cartProducts,
        countTotal
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishShopping)