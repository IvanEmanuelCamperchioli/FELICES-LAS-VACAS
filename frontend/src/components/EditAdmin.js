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
            <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent: 'center',
            }}>
                
                {props.products.map((product,index) => 
                    <CardEdit key={index} product={product}/>
                )}
                    
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