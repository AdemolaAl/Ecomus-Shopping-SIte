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
  return (
    <SpecialLayout >
      
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
