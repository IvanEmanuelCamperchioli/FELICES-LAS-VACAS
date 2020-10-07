import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Paypal from "./Paypal"

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
            <div>
                <button onClick={() => setVisibilityPaypal(true)}>Pagar con paypal</button>
                {(visibilityPaypal) && <Paypal total={countTotalDolar} />}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        cartProducts: state.productsRed.cartProducts,
    }
}

export default connect(mapStateToProps, null)(FinishShopping)