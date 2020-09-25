import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import adminActions from '../redux/actions/adminActions'
import CardEdit from './CardEdit'

const EditAdmin = (props) => {

    useEffect (() => {
        props.getProducts()
    }, [])

    return (
        <>
            {props.products.map((product,index) => 
                <CardEdit key={index} product={product}/>
            )}
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