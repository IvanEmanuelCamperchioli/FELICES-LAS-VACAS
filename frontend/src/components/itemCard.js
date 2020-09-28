import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import productsActions from '../redux/actions/productsActions'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const ItemCard = (props) => {

    const [quantity, setQuantity] = useState(0)

    const changeInput = (e) =>{
      e.preventDefault()  
      if (e.target.value === "up"){
        setQuantity(quantity+1)
      }else{
        setQuantity(quantity-1)
        if (quantity <= 0){
          setQuantity(0)
        }
      }
    }

    const addItem = (e) =>{
      e.preventDefault()
      if (quantity > props.item.stock){
        alert("NO DISPONEMOS DE LA CANTIDAD SOLICITADA EN STOCK")
      }else{
      if (quantity !== 0){
        props.addToCart(props.item, quantity)  
      }
      }

      
    }

    return (
      <Card className={{margin:"2vw"}}>
        <CardImg top width="100%" src={props.item.photo}/>
        <CardBody>
          <CardTitle>{props.item.name}</CardTitle>
          <CardSubtitle>${props.item.price}</CardSubtitle>
         <div style={{display:"flex", flexDirection:"column", margin:"0.3vw"}}>
         <Button style={{margin:"0.3vw"}}><NavLink to={`/producto/${props.item._id}`} style={{color:"white", textDecoration:"none", textAlign:"center", width: "10vw"}}>ver más</NavLink> 
        </Button>
        <div>
          <input value={quantity} type="number"></input>
          <button value="up" onClick={changeInput}>+</button>
          <button calue="down" onClick={changeInput}>-</button>
        </div>
        <button onClick={addItem}>Añadir al carrito</button>
         </div>
          </CardBody>
      </Card>
    );
};

const mapDispatchToProps = {
  addToCart: productsActions.addToCart
}
const mapStateToProps = (state) => {

return{
  state
}
}
export default connect(mapStateToProps,mapDispatchToProps) (ItemCard);