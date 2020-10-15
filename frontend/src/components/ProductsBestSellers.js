import React from 'react'
import '../styles/home.css'
import '../styles/mediaQuerys/mediaCards.css'
import ItemCard from './ItemCard'



//Componente que divide y renderiza los productos mas populares que se mostrarán

class ProductsBestSellers extends React.Component{
    state = {
        products:[]
    }

    async componentDidMount(){
        //Ordeno los productos recibidos por props
        var ordered = await this.props.products.sort((a,b) => b.views-a.views)
        //Los primeros 6 son guardados en un array
        var products = ordered.slice(0, 6)
        
        this.setState({
            ...this.state,
            products,
            
        })
        
    }


    render(){
 
        return(
            <>
            <div className="conteiner-card">
                {this.state.products.map(product => {
                    return (
                        <>
                            <ItemCard key={product.id} item={product}/>
                        </>
                    )
                })}
            </div>
            
            </>
        )
        
    }

}

export default ProductsBestSellers