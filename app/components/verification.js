// components/SignInPopup.js
import React from 'react';
import '../home.scss';
import { useState } from 'react';

const VerificationPopup = ({ isOpenVer, onCloseVer, openLoading, closeLoading, showError, hideError, showSuccess, hideSuccess }) => {
    if (!isOpenVer) return null;
    const [code, setCode] = useState('')

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
                onCloseVer()
                showSuccess('Verification Successfull');
                setTimeout(() => { hideSuccess() }, 3000)
            }
        } catch (error) {

            console.error('Error during signup:', error);
            showError('Error Verifying');
            setTimeout(() => { hideError() }, 3000)

        } finally {
            closeLoading()
            
        }
    };


    return (
        <div className='signin-cvr'>
            <div className='signin'>
                <div className='flex2'>
                    <h2>Verification</h2>
                    <div onClick={onCloseVer} className='x'>×</div>
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
