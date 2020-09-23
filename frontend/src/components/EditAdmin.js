import React, { useEffect } from 'react'
import { connect } from "react-redux"
import adminActions from '../redux/actions/adminActions'

const EditAdmin = (props) => {

    useEffect (() => {
        props.getProducts()
    }, [])

    return (
        <>
            <div style={{
                height:'inherit',
                display:'flex',
                flexDirection:'column',
                justifyContent: 'center',
            }}>
                {props.products.map((product,index) => {
                    return(
                    <p key={index}>{product.name}</p>
                    )
                })}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.adminRed.products
    }
}

const mapDispatchToProps = {
    getProducts: adminActions.getProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAdmin)