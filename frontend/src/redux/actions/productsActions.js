import axios from "axios"

const productsActions = {
    getProducts: () => {
        return async (dispatch, getState) => {
            
            const res = await axios.get("http://127.0.0.1:4000/api/items")
            console.log(res)
            dispatch({
                type: 'GET_PRODUCTS_USER',
                payload: res.data.products,
            })
            
        }
    },
    getProductById: (idProduct) => {
        return async (dispatch, getState) => {
            const res = await axios.get("http://127.0.0.1:4000/api/items/"+idProduct)
            console.log(res)
            dispatch({
                type: "GET_PRODUCT"
            })
            return res.data.response.product
        }
    }
}

export default productsActions