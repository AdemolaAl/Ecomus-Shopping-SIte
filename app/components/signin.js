// components/SignInPopup.js
import React from 'react';
import '../home.scss';
import { useState, } from 'react';
import { useGlobalState } from './default2';
import Popup from './popup';

const SignInPopup = ({ showX = (true) }) => {

    const { state, dispatch } = useGlobalState();
    const openRegister = () => dispatch({ type: 'OPEN_REGISTER' });
    const openLoading = () => dispatch({ type: 'OPEN_LOADING' });
    const closeLoading = () => dispatch({ type: 'CLOSE_LOADING' })
    const closeSignin = () => dispatch({ type: 'CLOSE_SIGNIN' })
    const openPopup = (message , type) => 
        { 
            dispatch({type:'OPEN_POPUP'});
            dispatch({type:'SET_POPUPMESSAGE', payload : message})
            dispatch({type:'SET_POPUPTYPE', payload : type})
            setTimeout(()=>{ dispatch({type:'CLOSE_POPUP'}) }, 2000)
        }

    const {isSignInOpen} = state;

    if (!isSignInOpen) return null;


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            const res = await fetch('/usersignin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (data.message === 'successful') {
                showPopup('Signin Successful', 'success')
                setTimeout(() => {
                    closeSignin()
                }, 1500);
            }
            else {
                showPopup(data.message, 'error')  
                openPopup(data.message, 'error')
            }
        } catch (error) {
            console.error('Error during signup:', error);



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
                    <h2>Sign In</h2>
                    {showX && <div onClick={closeSignin} className='x'>×</div>}
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" required name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" required name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <a href=''>Forgot your password?</a>
                    <div className='flex1'>
                        <button type="submit" className='signIn'>Sign In</button>
                        <div className='create' onClick={openRegister}>New customer? Create your account </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignInPopup;
