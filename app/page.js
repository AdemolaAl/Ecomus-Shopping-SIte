'use client'
import React, { useState, useEffect } from 'react';

import SpecialLayout from './components/home-layout'
import ThreeDivSlider from './components/ThreeDivSlider';
import ContinuousSlider from './components/continuousslide.js'
import Categories from './components/categories';
import Discount from './components/discount';
import ProductDiv1 from './components/productdiv';
import Trending from './components/trending';
import SignInPopup from './components/signin';
import RegisterPopup from './components/Register'
import { Discount2 } from './components/discount';
import VerificationPopup from './components/verification';
import Loading from './components/loading';
import { Error }  from './components/success';
import Success from './components/success';

import Marquee from './components/slider';

// app/shared-layout/page.js
export default function HomePage() {

  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isVer, setVer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorHeight, setErrorHeight] = useState(-200) 
  const [successHeight, setSuccessHeight] = useState(-200) 
  const [message , setMessage] = useState('')

  const openSignIn = () => { setSignInOpen(true); setRegisterOpen(false) };
  const closeSignIn = () => setSignInOpen(false);

  const openLoading =()=>{setLoading(true)}
  const closeLoading = ()=>{setLoading(false)}

  const OpenVer =()=>{  setVer(true); setSignInOpen(false); setRegisterOpen(false) };
  const CloseVer =()=> setVer(false)


  const openRegister = () => { setRegisterOpen(true); setSignInOpen(false);}
  const closeRegister = () => setRegisterOpen(false)

  function showError(message){
    setErrorHeight(0)
    setSuccessHeight(-200)
    setMessage(message)
  }
  function hideError(){
    setErrorHeight(-200)
  }

  function showSuccess(message){
    setSuccessHeight(0)
    setErrorHeight(-200)
    setMessage(message)
  }
  function hideSuccess(){
    setSuccessHeight(-200)
  }



  

  useEffect(() => {
    if (isSignInOpen || isRegisterOpen) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }
  }, [isSignInOpen, isRegisterOpen]);


  return (
    <SpecialLayout signInFunc={openSignIn} >

      <Error height={errorHeight} message={message}/>
      <Success height={successHeight} message={message}/>
      <Loading openLoading={loading}/>
      
      <ThreeDivSlider />
      <Marquee/>

      <Categories />
      <Discount />
      <ProductDiv1 />
      <Trending />
      <Discount2 />

    </SpecialLayout>
  );
}
