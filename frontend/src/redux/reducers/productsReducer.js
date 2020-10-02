const initialState = {
    products: [],
    cartProducts: []
}

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_USER':
            return {
                ...state,
                products: action.payload,
            }
        case 'ADD_TO_CART':

            var newProducts =  state.cartProducts
            newProducts.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(newProducts))
            return{
                ...state,
                cartProducts: newProducts
            }
        case 'UP_QUANTITY':
            state.cartProducts.map(product =>{
                if (product.product._id === action.payload){
                    product.quantity +=1
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cartProducts))
            return state
        case 'DOWN_QUANTITY':
            state.cartProducts.map(product =>{
                if (product.product._id === action.payload){
                    product.quantity -=1
                }
            })
            localStorage.setItem('cart', JSON.stringify(state.cartProducts))
                return state    
        case "DELETE_PRODUCT":
            var newProducts = state.cartProducts.filter( product =>
                product.product._id !== action.payload
            )
            localStorage.setItem('cart', JSON.stringify(newProducts))
            return{
                ...state,
                cartProducts: newProducts
            }
        case "FORCE_CART":
            var cart = JSON.parse(localStorage.getItem('cart'))
            
            return{
                ...state,
                cartProducts: cart
            }
        default:
            return state
    }
}

export default productsReducer