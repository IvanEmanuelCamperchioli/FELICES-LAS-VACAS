import React from 'react'
import { connect } from 'react-redux'
import productsActions from '../redux/actions/productsActions'
import "../styles/ItemCart.css"


class ItemCart extends React.Component{
    state={
        product : this.props.product.product,
        quantity:this.props.product.quantity
    }

    addOne = (idProduct) =>{
        var quan = this.state.quantity
        this.setState({
            ...this.state,
            quantity: quan+1
        })
        this.props.addProduct(idProduct)
    }
    removeOne = (idProduct) =>{
        var quan = this.state.quantity
        this.setState({
            ...this.state,
            quantity: quan-1
        })
        this.props.removeProduct(idProduct)
    }
    delete = (idProduct) =>{
        this.props.deleteProduct(idProduct)
    }
    render(){
        return (
        <>
        <div className= "containerItemCart">
            <div><img src={this.state.product.photo}></img></div>
            <div className="texto">
                <h3>{this.state.product.name}</h3>
                <p>Unidades seleccionadas: {this.state.quantity}</p>
                <p>Subtotal: ${this.state.product.price * this.state.quantity}</p>
                <button onClick={() => this.addOne(this.state.product._id)}>+</button>
                <button onClick={() => this.removeOne(this.state.product._id)}>-</button>
                <button onClick={() => this.delete(this.state.product._id)}>Eliminar</button>
            </div>
        </div>
        </>
        )
    }
}

const mapDispatchToProps = {
    addProduct: productsActions.addProducts,
    removeProduct: productsActions.removeProducts,
    deleteProduct: productsActions.deleteProducts
}

export default connect(null, mapDispatchToProps)(ItemCart)