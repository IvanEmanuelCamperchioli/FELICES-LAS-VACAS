import React, { useState } from 'react'
import { connect } from "react-redux"
import adminActions from '../redux/actions/adminActions'

const FormAdmin = (props) => {

    const validationMinLength = ['name', 'description', 'category']
    const validationMinNumeric = ['price', 'stock']

    const [newProduct, setNewProduct] = useState({
        name:'',
        price:0,
        description:'',
        stock:0,
        category:'',
        photo:'',
        photo1:'',
    })

    const [errors, setErrors] = useState(newProduct)

    const readInput = e => {  
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
    }

    const sendInfo = async e => {
        
        e.preventDefault()

        const errorsCopy = errors
        
        validationMinLength.map(property => {
            errorsCopy[property] = ((newProduct[property].length === 0)
            ? `The product must have a ${property}`
            : ""
        )})

        validationMinNumeric.map(property => {
            errorsCopy[property] = ((newProduct[property] <= 0)
            ? `the product must have a ${property} greater than 0`
            : 0
        )})

        setErrors({...errorsCopy})

        

        if (errors.name === "" && errors.price === 0 && errors.description === "" && errors.stock=== "" && errors.category=== "" && errors.rating=== 0 && errors.views === 0) {
            
          

            const response = await props.newProduct(newProduct)

            if (response.success) {
                
                
            }
            
        }
    }

    return (
        <>
            <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between'
            }}>
                <label>Name Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='text' name='name' placeholder='Write the product name'
                    onChange={readInput} />

                <label>Price Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='number' name='price' placeholder='Write the product price (number)'
                    onChange={readInput} />

                <label>Description Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='text' name='description' placeholder='Write the product description'
                    onChange={readInput} />

                <label>Stock Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='number' name='stock' placeholder='Write the product stock (number)'
                    onChange={readInput} />

                <label>Category Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='text' name='category' placeholder='Write the product category'
                    onChange={readInput} />

                <label>Photo Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='text' name='photo' placeholder='Write the product photo (url)'
                    onChange={readInput} />

                <label>Photo1 Product</label>
                <input style={{
                    borderRadius: '3vw'
                }} type='text' name='photo1' placeholder='Write the product photo1 (url)'
                    onChange={readInput} />  

                <button onClick={sendInfo}>Send</button>

            </div>
        </>
    )
}

const mapDispatchToProps = {
    newProduct: adminActions.newProduct,
}

export default connect(null, mapDispatchToProps)(FormAdmin)