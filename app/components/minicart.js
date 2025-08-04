import React, { useState, useEffect } from 'react';
import '../home.scss';
import Image from 'next/image';
import Increment from '../productpage/components/increment';
import useSWR from "swr";
import Loading from './loading';
import { Defaults } from './default';
import { useGlobalState } from './default2';

const fetcher = async (...args) => {
    const res = await fetch(...args, { credentials: 'include' }); // Include cookies
    if (!res.ok) {
        const errorData = await res.json();
        const error = new Error('An error occurred while fetching the data.');
        error.status = res.status;
        error.info = errorData;
        throw error;
    }
    return res.json();
};


const MiniCarts = ({ open, closeCart }) => {


    const { data: products, error: productError } = useSWR(`/cart`, fetcher);

    const { state, dispatch } = useGlobalState();

    const openSignIn = () => dispatch({ type: 'OPEN_SIGNIN' });
    const openPopup = (message , type) => 
        { 
            dispatch({type:'OPEN_POPUP'});
            dispatch({type:'SET_POPUPMESSAGE', payload : message})
            dispatch({type:'SET_POPUPTYPE', payload : type})
            setTimeout(()=>{ dispatch({type:'CLOSE_POPUP'}) }, 2000)
        }





    /*useEffect(() => {
        if (productError) {
            openPopup(productError.info.error, 'error')
        }
    }, [productError]);*/



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



    if (!productError) {
        return (
            <div className='signin-cvr minicartcvr'>
                <div className={`minicart ${slide ? 'opened' : ''}`}>
                    <div className='first'>
                        <p>Shopping cart</p>
                        <div className='x' onClick={close}>×</div>
                    </div>
                    {products ?
                        <div className='products'>
                            {products.slice().reverse().map((product) => (
                                <div className='product'>
                                    <Image
                                        src={product.image}
                                        alt="Example image"
                                        width={500}
                                        height={300}
                                        className='main'
                                    />
                                    <div className='left'>
                                        <p>{product.productName}</p>
                                        <p className='price'>{product.DiscountPrice}</p>
                                        <Increment max={product.quantity} />
                                    </div>

                                </div>
                            ))}
                        </div>

                        :
                        <Loading openLoading={true} />

                    }

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
    }





};

export default MiniCarts;
