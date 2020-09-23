import axios from "axios"

const adminActions = {

    newProduct: (aProduct) => {
        return async (dispatch, getState) => {
            const res = await axios.post("http://127.0.0.1:4000/api/items", aProduct)

            dispatch({
                type: 'SEND_PRODUCT'
            })
            
            return {
                success: true,
                res: res,
            }

        }
    },

    getProducts: () => {
        return async (dispatch, getState) => {
            
            const res = await axios.get("http://127.0.0.1:4000/api/items")

            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data.products,
            })
        }
    }
}

export default adminActions