import React from 'react'
import '../styles/home.css'

class Destacado extends React.Component {

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
                <div className="conteiner-card">
                    <div className="card">
                        <div style={{backgroundImage: `url()`}}></div>
                        <p>imagen</p>
                        <h1>producto</h1>
                        <p className="price">$ 99.99</p>
                        <p>descripcion del producto</p>
                        <p><button>Agregar al carrito</button></p>
                    </div>
                    <div className="card">
                        <div style={{backgroundImage: `url()`}}></div>
                        <p>imagen</p>
                        <h1>producto</h1>
                        <p className="price">$ 99.99</p>
                        <p>descripcion del producto</p>
                        <p><button>Agregar al carrito</button></p>
                    </div>
                    <div className="card">
                        <div style={{backgroundImage: `url()`}}></div>
                        <p>imagen</p>
                        <h1>producto</h1>
                        <p className="price">$ 99.99</p>
                        <p>descripcion del producto</p>
                        <p><button>Agregar al carrito</button></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Destacado