import React, { useState, useEffect } from 'react';
import '../home.scss';
import Image from 'next/image';
import Increment from '../productpage/components/increment';
import useSWR from "swr";
import Loading from './loading';
import { Defaults } from './default';
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MiniCarts = ({ open, closeCart }) => {


    const { data: products, error: productError } = useSWR(`/cart`, fetcher);

    const [openPopup, setOpenPopup] = useState(false);
    const [popupMessage, setpopupMessage] = useState("");
    const [popuptype, setPopupType] = useState('')

    function openPop() {
        setOpenPopup(true);
        setTimeout(() => {
            setOpenPopup(false);
        }, 2000);
    }

    const {
        isSignInOpen, openSignIn, closeSignIn,
        isRegisterOpen, openRegister, closeRegister,
        isVer, OpenVer, CloseVer,
        showError, hideError, showSuccess, hideSuccess
    } = Defaults();


    if (productError) {
        console.log(productError)
        console.log('error');
        setpopupMessage("Sign in required");
        setPopupType('error')
        openPop();
        openSignIn()
        return;
    }

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
};

export default MiniCarts;
