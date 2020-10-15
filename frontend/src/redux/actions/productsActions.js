import axios from "axios"
import Swal from "sweetalert2"

const productsActions = {
    getProducts: () => {
        return async (dispatch, getState) => {
            
            const res = await axios.get("http://127.0.0.1:4000/api/items")
            
            dispatch({
                type: 'GET_PRODUCTS_USER',
                payload: res.data.products,
            })
            return res.data.products
        }
    },
    getProductById: (idProduct) => {
        return async (dispatch, getState) => {
            const res = await axios.get("http://127.0.0.1:4000/api/items/"+idProduct)

            dispatch({
                type: "GET_PRODUCT"
            })
            return res.data.response.product
        }
    },
    addToCart: (product, quantity) =>{
        return async (dispatch, getState) =>{
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    quantity,
                    product
                }
            })
        }
    },
    addProducts:(productId) =>{
        return async (dispatch, getState) =>{
            dispatch({
                type: "UP_QUANTITY",
                payload: productId
            })
        }
    },
    removeProducts:(productId) =>{
        return async (dispatch, getState) =>{
            dispatch({
                type: "DOWN_QUANTITY",
                payload: productId
            })
        }
    },
    deleteProducts:(productId) =>{
        return async (dispatch, getState) =>{
            dispatch({
                type: "DELETE_PRODUCT",
                payload: productId
            })
        }
    },
    forcedCart:() =>{
        return async (dispatch, getState) =>{
            dispatch({
                type: "FORCE_CART"
            })
        }
    },
    deleteAllProducts:()=>{
        return async(dispatch, getState)=>{
            dispatch({
                type:"DELETE_CART"
            })
        }
    },
    confirm:(products, token) =>{
        return async (dispatch, getState)=>{
            const res = await axios.post("http://localhost:4000/api/shopConfirm/",products
            , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            dispatch({
                type:"DELETE_CART"
            }) 
        }
    }
}

export default productsActions