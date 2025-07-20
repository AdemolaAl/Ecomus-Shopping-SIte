'use client'
import Image from 'next/image';
import '../home.scss';
import VerificationPopup from './verification';
import Loading from './loading';
import MiniCarts from './minicart';
import { useGlobalState } from './default2';

export default function Header() {
    const { state, dispatch } = useGlobalState();

    
    const handleOpenSignIn = () => dispatch({ type: 'OPEN_SIGNIN' });
    const handleOpenCart = () => dispatch({ type: 'OPEN_CART' });
    const handleCloseCart = () => dispatch({ type: 'CLOSE_CART' });
    const handleOpenRegister = () => dispatch({type:'OPEN_REGISTER'})

    const {
        cart,
    } = state;

    console.log(state);

    return (
        <div className="header">
            <Image
                src='/public/ecomus.svg'
                alt="Description of the image"
                width={0}
                height={0}
                className='image'
                style={{
                    width: '150px',
                    height: 'fit-Content',
                }}
            />
            <div className="middle">
                <p>Home <i className="fa-solid fa-chevron-down"></i> </p>
                <p>Shop <i className="fa-solid fa-chevron-down"></i> </p>
                <p>Product <i className="fa-solid fa-chevron-down"></i> </p>
                <p>Pages <i className="fa-solid fa-chevron-down"></i> </p>
                <p>Blog <i className="fa-solid fa-chevron-down"></i> </p>
            </div>
            <div className="right">
                <i className="fa-regular fa-user" onClick={handleOpenSignIn}></i>
                <i className="fa-solid fa-cart-shopping" onClick={handleOpenCart}></i>
            </div>

            <MiniCarts open={cart} closeCart={handleCloseCart} />
        </div>
    );
}
