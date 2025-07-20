// components/SignInPopup.js
import React from 'react';
import '../home.scss';
import { useState, useEffect } from 'react';
import { useGlobalState } from './default2';

const RegisterPopup = () => {
   
    const { state, dispatch } = useGlobalState();

    const openSignIn = () => dispatch({ type: 'OPEN_SIGNIN' });
    const openLoading = () => dispatch({ type: 'OPEN_LOADING' });
    const openVer = () => dispatch({ type: 'OPEN_VERIFICATION' });
    const closeLoading = () => dispatch({type:'CLOSE_LOADING'})
    const closeRegister = () => dispatch({type:'CLOSE_REGISTER'})
   
    const {
        isRegisterOpen,
    } = state;
    
    
    if (!isRegisterOpen) return null;
    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')

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
            const res = await fetch('/usersignup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, number }),
            });

            const data = await res.json();
            if (data.message === 'successfull') {
                openVer();
                showPopup('Registration Successful', 'success')
                setTimeout(() => {
                    closeRegister()
                }, 1500);
            }
            else {
                showPopup(data.message, 'error')
            }

        } catch (error) {

            console.error('Error during signup:', error);

            showPopup('Error During Sign in', 'error')
            setTimeout(() => { hidePopup() }, 3000)
            

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
                    <h2>Register</h2>
                    <div onClick={closeRegister} className='x'>×</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" required name='username' placeholder='Username' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <input type="email" required name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" required name='number' placeholder='Phone Number' onChange={(e) => setNumber(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" required name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='flex1'>
                        <button type="submit" className='signIn'>Sign In</button>
                        <div className='create' onClick={openSignIn}>Already have an account? Log in here</div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegisterPopup;
