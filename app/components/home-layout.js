import React from 'react';
import Header from './header.js'; // your header component
import Footer from './footer.js'; // your footer component

const SpecialLayout = ({children}) => {
  return (
    <div>
      <Header />
      
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default SpecialLayout;
