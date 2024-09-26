'use client'
import '../home.scss'
import './cart.scss'
import Image from 'next/image';

import Header from "../components/header";
import { WhiteFooter } from '../components/footer'
import CollectionText from '../components/collection-text';

export default function cart ()  {
    return (
        <div>
            <Header />
            <CollectionText text='Headphones' />

            <div className='main'>
                <div className='products'>
                    <div className='product'>
                        <Image
                            src='/xbox1.jpg'
                            alt="Description of the image"
                            width={300}
                            height={300}
                            style={{
                                width: '200px',
                                height: 'fit-content',
                                maxHeight: '100%'
                            }}
                        />
                        <div className='texts'>
                            <p>Iphone 12 pro max </p>
                            <p>$32.00</p>
                            <p>In stock</p>
                        </div>

                        <select id="category" name="category">
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                        </select>

                        <p>🗙</p>

                    </div>
                    <div className='product'>
                        <Image
                            src='/apple-iphone-12-r1.jpg'
                            alt="Description of the image"
                            width={300}
                            height={300}
                            style={{
                                width: "200px",
                                height: 'fit-content',
                                maxHeight: '100%'
                            }}
                        />
                        <div className='texts'>
                            <p>Iphone 12 pro max </p>
                            <p>$32.00</p>
                            <p>In stock</p>
                        </div>

                        <select id="category" name="category">
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                            <option value="General Inquiry">1</option>
                        </select>

                        <p>🗙</p>

                    </div>
                </div>

                <div className='summary'>
                    <p>Order summary</p>
                    <div className='flex'>
                        <p>Subtotal</p>
                        <p>$99.00</p>
                    </div>
                    <div className='flex'>
                        <p>Subtotal</p>
                        <p>$99.00</p>
                    </div>
                    <div className='flex'>
                        <p>Subtotal</p>
                        <p>$99.00</p>
                    </div>
                    <div className='flex'>
                        <p>Subtotal</p>
                        <p>$99.00</p>
                    </div>
                    <button>Checkout</button>
                </div>
            </div>

            <WhiteFooter />


        </div>


    )
}

