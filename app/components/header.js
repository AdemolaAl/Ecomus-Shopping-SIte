import Image from 'next/image';
import '../home.scss'
import SignInPopup from './signin';
import RegisterPopup from './Register';
import VerificationPopup from './verification';
import Loading from './loading';
import Success from './success';
import { Error } from './success';
import { Defaults } from './default';
import MiniCarts from './minicart';

export default function Header() {

    const {
        isSignInOpen, openSignIn, closeSignIn,
        isRegisterOpen, openRegister, closeRegister,
        isVer, OpenVer, CloseVer,
        loading, openLoading, closeLoading,
        cart , openCart , closeCart,
        errorHeight, successHeight, message,
        showError, hideError, showSuccess, hideSuccess
    } = Defaults();



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
                <i className="fa-regular fa-user" onClick={openSignIn}></i>
                <i className="fa-solid fa-cart-shopping" onClick={openCart}></i>
            </div>

            <Error height={errorHeight} message={message}/>
            <Success height={successHeight} message={message}/>
            <MiniCarts open={cart} closeCart={closeCart}/>
            <Loading openLoading={loading}/>
            <SignInPopup isOpen={isSignInOpen} onClose={closeSignIn} registerFunc={openRegister} openLoading={openLoading} closeLoading={closeLoading} />
            <RegisterPopup isOpen={isRegisterOpen} onClose={closeRegister} signinFunc={openSignIn} openVer={OpenVer} openLoading={openLoading} closeLoading={closeLoading} showError={showError} hideError={hideError} showSuccess={showSuccess} hideSuccess={hideSuccess} />
            <VerificationPopup isOpenVer={isVer} onCloseVer={CloseVer} openLoading={openLoading} closeLoading={closeLoading} showError={showError} hideError={hideError} showSuccess={showSuccess} hideSuccess={hideSuccess} />

                
        </div>
    )
}






