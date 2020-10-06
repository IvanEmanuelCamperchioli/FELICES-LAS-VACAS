import React,{useEffect, useRef} from 'react';

const Paypal = (props) => {
    const paypal = useRef()
    useEffect((
        window.paypal.Buttons({
            createOrder: (data, actions, err) =>{
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units:[
                        {description: "Felices las vacas", amount:{
                            value: props.total,
                            currency_code: "USD"
                        }}
                    ]
                })
            },
            onApprove: async(data, actions)=>{
                const order= await actions.order.capture()
                console.log(order)
            },
            onError: (err)=>{
                console.log(err)
            }
        })
    ),[])
    return (
        <div>
            
        </div>
    );
};

export default Paypal;