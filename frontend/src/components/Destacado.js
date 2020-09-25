import React from 'react'
import '../styles/home.css'
import ProductosDestacados from './ProductosDestacados'

class Destacado extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        fetch("http://127.0.0.1:4000/api/items")
            .then(response => response.json())
            .then(json => this.setState({ products: json.products }))
    }

    render() {

        const logo = require('../images/logo.png')

        return (
            <div className="handler">  
                <div className="container-logo">
                    <div className="logo" style={{backgroundImage: `url(${logo})`}}></div>
                </div> 
                <div style={{height: '10vh', width: '100%'}}></div>
                <h1 className="titulo">Destacado</h1>
                <h5>QUEDATE EN CASA, HACÉ TU PEDIDO Y NOSOTROS TE LO LLEVAMOS</h5>
                    {this.state.products.length === 0 
                        ?   <h1>Lodading</h1>
                        :   <ProductosDestacados products={this.state.products}/>
                    }
            </div>
        )
    }
}

export default Destacado

