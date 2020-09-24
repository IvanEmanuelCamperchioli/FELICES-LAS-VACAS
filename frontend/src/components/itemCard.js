import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const ItemCard = (item) => {
  console.log(item)
    return (
        <>
      <Card className={{margin:"2vw"}}>
        <CardImg top width="100%" src={item.item.photo}/>
        <CardBody>
          <CardTitle>{item.item.name}</CardTitle>
          <CardSubtitle>${item.item.price}</CardSubtitle>
         <div style={{display:"flex", flexDirection:"column", margin:"0.3vw"}}>
         <Button style={{margin:"0.3vw"}}><NavLink to="item" style={{color:"white", textDecoration:"none", textAlign:"center", width: "10vw"}}>ver más</NavLink> 
        </Button>
        <Button>Añadir al carrito</Button>
         </div>
          </CardBody>
      </Card>
    </>
    );
};

export default ItemCard;