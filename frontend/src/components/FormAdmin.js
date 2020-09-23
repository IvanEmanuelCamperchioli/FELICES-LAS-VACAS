import React, { useState } from 'react'

const FormAdmin = () => {

    const [newProduct, setNewProduct] = useState({
        name:'',
        price:0,
        description:'',
        comments:[],
        brand:'',
        views:0,
    })

    const readInput = e => {  
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }

    console.log(newProduct);

    return (
        <>
            <label>Name Product</label>
            <input style={{
                borderRadius: '3vw'
            }} type='text' name='name' placeholder='Write your name'
                onChange={readInput} />

            <label>Price Product</label>
            <input style={{
                borderRadius: '3vw'
            }} type='number' name='price' placeholder='Write your price'
                onChange={readInput} />
        </>
    )
}

export default FormAdmin