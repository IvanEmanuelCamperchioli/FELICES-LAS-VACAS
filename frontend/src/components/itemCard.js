import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import productsActions from '../redux/actions/productsActions'
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import '../styles/mediaQuerys/mediaCards.css'
import '../styles/home.css'
import { motion } from "framer-motion";



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
      if (quantity > props.item.stock) {
        alert("NO DISPONEMOS DE LA CANTIDAD SOLICITADA EN STOCK")
      } else {
      if (quantity !== 0) {
        props.addToCart(props.item, quantity)  
      }
      }
    }

    return (
      <Card className="cardProduct">
        <CardImg top width="100%" src={props.item.photo}/>
        <CardBody className="card-body-item">
          <CardTitle>{props.item.name}</CardTitle>
          <CardSubtitle>${props.item.price}</CardSubtitle>
          <div className="allCardInputs" style={{display:"flex", flexDirection:"column", margin:"0.3vw"}}>
            <Button className="viewMore">
              <NavLink className="viewMore-navLink" to={`/producto/${props.item._id}`}>ver más</NavLink>
            </Button>
            <div className="cardInput">
              <div className="masomenos">
                <input value={quantity} type="number"></input>
                <button value="up" onClick={changeInput}>+</button>
                <button calue="down" onClick={changeInput}>-</button>
              </div>
              <motion.a
              />
              <motion.button 
                className="addToCart" onClick={addItem}
                whileHover={{ scale: (1.08) }}
                onHoverStart={e => {}}
                onHoverEnd={e => {}}
              >
                Añadir al carrito
              </motion.button>
            </div>
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
