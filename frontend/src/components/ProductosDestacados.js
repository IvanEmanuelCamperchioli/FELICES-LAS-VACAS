import React from 'react'
import '../styles/home.css'
import { NavLink } from 'react-router-dom';

class ProductosDestacados extends React.Component{
    state = {
        firstThree: [],
        secondThree:[],
    }

    async componentDidMount(){
        
        var ordered = await this.props.products.sort((a,b) => b.views-a.views)
        
        var first = ordered.slice(0, 3)
        var second = ordered.slice(3, 6)
        
        this.setState({
            ...this.state,
            firstThree: first,
            secondThree: second
        })

    }


    render(){
 
        return(
            <>
            <div className="conteiner-card">
                {this.state.firstThree.map(product => {
                    return (
                        <>
                            <div className="card">
                                <div className="productoImg" style={{backgroundImage: `url(${product.photo})`}}></div>
                                <h1>{product.name}</h1>
                                <p className="price">$ {product.price}</p>
                                <p>{product.description}</p>
                                <p><NavLink to="/itam"><button>Ver más</button></NavLink></p>
                                <p><NavLink to="/carrito"><button>Agregar al carrito</button></NavLink></p>
                            </div>
                        </>
                    )
                })}
            </div>
            <div className="conteiner-card">
                {this.state.secondThree.map(product => {
                    return (
                        <>
                            <div className="card">
                                <div className="productoImg" style={{backgroundImage: `url(${product.photo})`}}></div>
                                <h1>{product.name}</h1>
                                <p className="price">$ {product.price}</p>
                                <p>{product.description}</p>
                                <p><NavLink to="/itam"><button>Ver más</button></NavLink></p>
                                <p><button>Agregar al carrito</button></p>
                            </div>
                        </>
                    )
                })}
            </div>
            </>
        )
        
    }

}

export default ProductosDestacados