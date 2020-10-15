import React from 'react'
import { connect } from 'react-redux'
import productsActions from '../redux/actions/productsActions'
import '../styles/home.css'
import ProductsBestSellers from './ProductsBestSellers'

class BestSellers extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        //Cuando el componente se monta obtengo los productos
        const getProducts = async () => {
            let products = await this.props.getProducts()
            this.setState({products})

        }
        getProducts()
      
    }

    render() {

        const logo = require('../images/logo.png')

        return (
            <div className="handler">  
                
                <div className="containerTitle">
                    <h3>PRODUCTOS</h3>
                    <h4>¿Qué tenés ganas de comer hoy?</h4>
                    <h5>Conocé todas nuestras opciones ricas y saludables</h5>
                </div>
                <div className="containerProductsImg"></div>
                <div className="container-logo">
                    <div className="logo" style={{backgroundImage: `url(${logo})`}}></div>
                
                
                    <h1 className="titulo">Destacado</h1>
                    <h5>QUEDATE EN CASA, HACÉ TU PEDIDO Y NOSOTROS TE LO LLEVAMOS</h5>
                        {this.state.products.length === 0 
                            ?   <h1>Lodading</h1>
                            :   <ProductsBestSellers products={this.state.products}/>}
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = {
    getProducts: productsActions.getProducts
}

export default connect(null, mapDispatchToProps) (BestSellers)

