// components/SignInPopup.js
import React from 'react';
import '../home.scss';
import { useState } from 'react';import { useGlobalState } from './default2';

const VerificationPopup = () => {
    const { state, dispatch } = useGlobalState();
    const openLoading = () => dispatch({ type: 'OPEN_LOADING' });
    const closeVer = () => dispatch({ type: 'OPEN_VERIFICATION' });
    const closeLoading = () => dispatch({type:'CLOSE_LOADING'}) 
    const {isVer} = state;

    
    
    if (!isVer) return null;
    const [code, setCode] = useState('')

    const [popup, setPopup] = useState({ visible: false, message: '', type: '' });

    function showPopup(message, type) {
        setPopup({ visible: true, message, type });
        setTimeout(() => {
            hidePopup();
        }, 3000);
    }

    function hidePopup() {
        setPopup({ visible: false, message: '', type: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        openLoading()

        try {
            const res = await fetch('/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await res.json();

            if (data.message === 'successfull') {
                showPopup('Signin Successful', 'success')
                setTimeout(() => {
                    closeVer()
                }, 1500);
            }

        } catch (error) {

            console.error('Error during signup:', error);
            showPopup('Error During Sign in', 'error')
            setTimeout(() => {
                closeVer()
            }, 1500);

        } finally {
            closeLoading()

        }
    };


    return (
        <div className='signin-cvr'>
            <div className='signin'>
                {popup.visible && (
                    <div className={`popup ${popup.type}`}>
                        {popup.message}
                    </div>
                )}
                <div className='flex2'>
                    <h2>Verification</h2>
                    <div onClick={closeVer} className='x'>×</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" required name='code' placeholder='xxxxxx' onChange={(e) => setCode(e.target.value)} />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default VerificationPopup;
