import React,{useEffect, useRef} from 'react';
import {NavLink, Redirect} from 'react-router-dom'

const Paypal = (props) => {

    const redirect = () => {
        return <Redirect to='/'/>  
    }

    console.log(parseFloat(Number(props.total).toFixed(2)));

<<<<<<< HEAD
const Paypal = (props) => {
=======
>>>>>>> 64fa4897a890d668199d0ceef14c372db5b8e82b
    const paypal = useRef()
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) =>{
                return actions.order.create({
                    intent:'CAPTURE',
                    purchase_units:[
                        {description: 'Felices las vacas', amount:{
                            value: parseInt(Number(props.total).toFixed(2)),
                            currency_code: 'USD'
                        }}
                    ]
                })
            },
            onApprove: async(data, actions)=>{
                const order= await actions.order.capture()
                console.log(order)
                redirect()
            },
            onError: (err)=>{
                console.log(err)
                redirect()
            }
        }).render(paypal.current)
    },[])

    return (
        
        <>
          <div ref={paypal}></div>  
        </>
    );
};

export default Paypal;