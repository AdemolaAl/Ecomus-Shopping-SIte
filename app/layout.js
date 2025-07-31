'use client'
import './home.scss';
import { Inter } from 'next/font/google';
import SignInPopup from './components/signin';
import Loading from './components/loading';
import VerificationPopup from './components/verification';
import RegisterPopup from './components/Register';
import { GlobalStateProvider } from './components/default2';
import GeneralPopup from './components/generalpopup';
const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* You can include meta tags, title, and other head elements here */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <script src='https://kit.fontawesome.com/0b68ed503d.js' crossOrigin='anonymous'></script>
      </head>
      <body className={inter.className}>
        <GlobalStateProvider>
          <Loading />
          <SignInPopup />
          <RegisterPopup />
          <VerificationPopup />
          <GeneralPopup />
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}
