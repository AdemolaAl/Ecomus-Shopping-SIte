import '../home.scss'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer>
            
            <div className="top">
                <div>
                    <Image
                        src='/public/logo-white.svg'
                        alt="Description of the image"
                        width={0}
                        height={0}
                        style={{
                            width: '150px',
                            height: 'fit-Content',
                        }}
                    />
                    <p>
                        Address: 1234 Fashion Street, Suite 567,<br />
                        New York, NY 10001<br />
                        Email: info@fashionshop.com<br />
                        Phone: (212) 555-1234
                    </p>
                </div>

                <div>
                    <p>Help</p>
                    <p>Privacy Policy</p>
                    <p>Shipping</p>
                    <p>Terms and condition</p>
                    <p>FAQ'S</p>
                </div>
                <div>
                    <p>About Us</p>
                    <p>Our Story</p>
                    <p>Contact us</p>
                    <p>Our Stores</p>
                </div>
                <div className='email'>
                    <p>Sign Up for Email</p>
                    <p>Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!</p>
                </div>
            </div>
            <div className="bottom">
                <p>© 2024 Ecomus Store. All Rights Reserved</p>
            </div>
        </footer>
    )
}
export  function GreyFooter() {
    return (
        <footer className='grey'>
            <div className="top">
                <div>
                    <Image
                        src='/public/ecomus.svg'
                        alt="Description of the image"
                        width={0}
                        height={0}
                        style={{
                            width: '150px',
                            height: 'fit-Content',
                        }}
                    />
                    <p>
                        Address: 1234 Fashion Street, Suite 567,<br />
                        New York, NY 10001<br />
                        Email: info@fashionshop.com<br />
                        Phone: (212) 555-1234
                    </p>
                </div>

                <div>
                    <p>Help</p>
                    <p>Privacy Policy</p>
                    <p>Shipping</p>
                    <p>Terms and condition</p>
                    <p>FAQ'S</p>
                </div>
                <div>
                    <p>About Us</p>
                    <p>Our Story</p>
                    <p>Contact us</p>
                    <p>Our Stores</p>
                </div>
                <div className='email'>
                    <p>Sign Up for Email</p>
                    <p>Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!</p>
                </div>
            </div>
            <div className="bottom">
                <p>© 2024 Ecomus Store. All Rights Reserved</p>
            </div>
        </footer>
    )
}
export  function WhiteFooter() {
    return (
        <footer className='white'>
            <div className="top">
                <div>
                    <Image
                        src='/public/ecomus.svg'
                        alt="Description of the image"
                        width={0}
                        height={0}
                        style={{
                            width: '150px',
                            height: 'fit-Content',
                        }}
                    />
                    <p>
                        Address: 1234 Fashion Street, Suite 567,<br />
                        New York, NY 10001<br />
                        Email: info@fashionshop.com<br />
                        Phone: (212) 555-1234
                    </p>
                </div>

                <div>
                    <p>Help</p>
                    <p>Privacy Policy</p>
                    <p>Shipping</p>
                    <p>Terms and condition</p>
                    <p>FAQ'S</p>
                </div>
                <div>
                    <p>About Us</p>
                    <p>Our Story</p>
                    <p>Contact us</p>
                    <p>Our Stores</p>
                </div>
                <div className='email'>
                    <p>Sign Up for Email</p>
                    <p>Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!</p>
                </div>
            </div>
            <div className="bottom">
                <p>© 2024 Ecomus Store. All Rights Reserved</p>
            </div>
        </footer>
    )
}