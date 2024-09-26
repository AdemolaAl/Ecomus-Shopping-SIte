// components/SignInPopup.js
import React from 'react';
import '../home.scss';
import { useState, useEffect } from 'react';

const RegisterPopup = ({ isOpen, onClose, signinFunc, openVer, openLoading, closeLoading, showError, hideError, showSuccess, hideSuccess }) => {
    if (!isOpen) return null;
    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')

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
                showSuccess('Registation Successfull');
                setTimeout(() => { hideSuccess() }, 3000)
            }
        } catch (error) {

            console.error('Error during signup:', error);

            showError('Error Inserting User');
            setTimeout(() => { hideError() }, 3000)

        } finally {
            closeLoading()
        }
    };

    return (
        <div className='signin-cvr'>
            <div className='signin'>
                <div className='flex2'>
                    <h2>Register</h2>
                    <div onClick={onClose} className='x'>×</div>
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
                        <div className='create' onClick={signinFunc}>Already have an account? Log in here</div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegisterPopup;
