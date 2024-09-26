import React from 'react';
import Header from './header.js'; // your header component
import Footer from './footer.js'; // your footer component

const SpecialLayout = ({ children , signInFunc}) => {
  return (
    <div>
      <Header signInFunc={signInFunc}/>
      
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default SpecialLayout;
