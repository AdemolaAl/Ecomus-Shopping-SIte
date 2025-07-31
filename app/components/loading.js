// components/SignInPopup.js
import React, { useState } from 'react';
import '../home.scss';
import Image from 'next/image';
import { useGlobalState } from './default2';

const Loading = () => {

    const {state} = useGlobalState()


    const {loading} = state;

    console.log(loading)
    if (!loading) return null;



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
