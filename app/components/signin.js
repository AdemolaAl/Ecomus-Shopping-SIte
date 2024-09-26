// components/SignInPopup.js
import React from 'react';
import '../home.scss';
import { useState, } from 'react';

const SignInPopup = ({ isOpen, onClose, registerFunc, openLoading, closeLoading, showX=(true) }) => {
    if (!isOpen) return null;

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
                    onClose()
                }, 1500);
            }
            else {
                showPopup(data.message, 'error')
            }
        } catch (error) {
            console.error('Error during signup:', error);

            showPopup('Error During Sign in', 'error')

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
                    {showX && <div onClick={onClose} className='x'>×</div>}
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
                        <div className='create' onClick={registerFunc}>New customer? Create your account </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignInPopup;
