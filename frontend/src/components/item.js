import React from 'react';
import '../styles/itemsprofile.css'

const Item = () => {
    return (
        <><div className='container'>
            <div className='inf'></div>
            <div className='stuff'>
                <div className='img'></div>
                <div className='data'>
                    <div></div>
                    <div className='buy_details'>
                        <button>agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Item;