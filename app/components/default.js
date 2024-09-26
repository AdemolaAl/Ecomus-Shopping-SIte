// utils/headerFunctions.js
import { useState, useEffect } from 'react';

export function Defaults() {
    const [isSignInOpen, setSignInOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [isVer, setVer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorHeight, setErrorHeight] = useState(-200);
    const [successHeight, setSuccessHeight] = useState(-200);
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState(false)

    const openCart  = () =>{ setCart(true);  setSignInOpen(false); setRegisterOpen(false); }
    const closeCart =  () => setCart(false)

    const openSignIn = () => { setSignInOpen(true); setRegisterOpen(false); };
    const closeSignIn = () => setSignInOpen(false);

    const OpenVer = () => { setVer(true); setSignInOpen(false); setRegisterOpen(false); };
    const CloseVer = () => setVer(false);

    const openLoading = () => { setLoading(true); };
    const closeLoading = () => { setLoading(false); };

    const openRegister = () => { setRegisterOpen(true); setSignInOpen(false); };
    const closeRegister = () => setRegisterOpen(false);

    function showError(message) {
        setErrorHeight(0);
        setSuccessHeight(-200);
        setMessage(message);
    }

    function hideError() {
        setErrorHeight(-200);
    }

    function showSuccess(message) {
        setSuccessHeight(0);
        setErrorHeight(-200);
        setMessage(message);
    }

    function hideSuccess() {
        setSuccessHeight(-200);
    }

    useEffect(() => {
        if (isSignInOpen || isRegisterOpen ||  cart) {
            document.body.classList.add('noScroll');
        } else {
            document.body.classList.remove('noScroll');
        }
    }, [isSignInOpen, isRegisterOpen, cart]);

    return {
        isSignInOpen, openSignIn, closeSignIn,
        isRegisterOpen, openRegister, closeRegister,
        isVer, OpenVer, CloseVer,
        cart, openCart, closeCart,
        loading, openLoading, closeLoading,
        errorHeight, successHeight, message,
        showError, hideError, showSuccess, hideSuccess
    };
}
