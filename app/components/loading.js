// components/SignInPopup.js
import React from 'react';
import '../home.scss';
import Image from 'next/image';

const Loading = ({ openLoading }) => {
    if (!openLoading) return null;



    return (
        <div className='signin-cvr loading'>
            
            <Image
                src='/public/logo-white.svg'
                alt="Description of the image"
                width={0}
                height={0}
                className='image pulse'
                style={{
                    width: '150px',
                    height: 'fit-Content',
                }}
            />
        </div>
    );
};

export default Loading;
