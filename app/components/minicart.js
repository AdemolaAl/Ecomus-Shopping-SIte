import React, { useState, useEffect } from 'react';
import '../home.scss';
import Image from 'next/image';
import Increment from '../productpage/components/increment';

const MiniCarts = ({ open, closeCart }) => {
    const [slide, setSlide] = useState(false);

    useEffect(() => {
        if (open) {
            setSlide(true); // Slide in when `open` becomes true
        }
    }, [open]);

    function close() {
        setSlide(false); // Slide out animation
        setTimeout(() => {
            closeCart(); 
        }, 500); 
    }

    if (!open && !slide) return null; // Prevent rendering if the cart is not open or sliding

    return (
        <div className='signin-cvr minicartcvr'>
            <div className={`minicart ${slide ? 'opened' : ''}`}>
                <div className='first'>
                    <p>Shopping cart</p>
                    <div className='x' onClick={close}>×</div>
                </div>
                <div className='products'>
                    <div className='product'>
                        <Image
                            src={'/xbox1.jpg'}
                            alt="Example image"
                            width={500}
                            height={300}
                            className='main'

                            
                        />
                        <div className='left'>
                            <p>Nike</p>
                            <p className='price'>$45.00</p>
                            <Increment />
                        </div>
                        
                    </div>
                    <div className='product'>
                        <Image
                            src={'/xbox1.jpg'}
                            alt="Example image"
                            width={500}
                            height={300}
                            className='main'

                            
                        />
                        <div className='left'>
                            <p>Nike</p>
                            <p className='price'>$45.00</p>
                            <Increment />
                        </div>
                        
                    </div>
                    <div className='product'>
                        <Image
                            src={'/xbox1.jpg'}
                            alt="Example image"
                            width={500}
                            height={300}
                            className='main'

                            
                        />
                        <div className='left'>
                            <p>Nike</p>
                            <p className='price'>$45.00</p>
                            <Increment />
                        </div>
                        
                    </div>
                </div>

                <div className='subtotal'>
                    <div className='first'>
                        <p>Subtotal</p>
                        <p>$49.99 USD</p>
                    </div>
                    <p>Taxes and shipping calculated at checkout</p>
                    <div className='line'></div>
                    <span className='input'>
                        <input type='checkbox' />
                        <p>I agree with the terms and conditions</p>
                    </span>
                    <div className='buttons'>
                        <button className='b1'>View cart</button>
                        <button className='b2'>check out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniCarts;
