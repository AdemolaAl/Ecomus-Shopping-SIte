'use client'
import '../home.scss'
import './productpage.scss'

import Header from "../components/header";
import { WhiteFooter } from '../components/footer'
import Bestseller from './components/bestseller';
import { useCountdownTimer } from '../components/timer';
import Increment from './components/increment';
import CustomPaging from './components/productImage';
import ProductDetails from './components/productdetails';
import People from './components/people';
import { useState, useEffect } from 'react';
import AddReviewPopup from './components/addreview'



export default () => {

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    }, []);


    const time = useCountdownTimer({ days: 1, hours: 0, minutes: 0, seconds: 0 });

    // Format time components to always show two digits
    const formatTime = (time) => time.toString().padStart(2, '0');

    const [review, setReview] = useState(false)

    function closeReview() {
        setReview(false)
    }
    function openReview() {
        setReview(true)
    }









    return (
        <div>

            <Header />

            <AddReviewPopup isOpen={review} onClose={closeReview}/>

            <div className='productPageMain'>
                <CustomPaging />

                <div className='right'>
                    <p className='main-text'>Xbox Series S -1TB Gaming All-Digital Console, 4K Streaming Media</p>

                    <Bestseller amount={10} />

                    <div className='price'>
                        <p>$8.00</p>
                        <s>$10.00</s>
                        <div>20% OFF</div>
                    </div>

                    <div className='hurry'>
                        <p>HURRY UP! SALE ENDS IN:</p>
                        <p>{time.days}Days : {formatTime(time.hours)}Hours : {formatTime(time.minutes)}Mins : {formatTime(time.seconds)}Secs</p>
                    </div>

                    <p className='quan'>Quantity</p>
                    <Increment />

                    <div className='flex1'>
                        <button className='add'>Add to cart</button>
                        <button className='heart'><i className="fa-regular fa-heart"></i></button>
                    </div>

                    <div className='afterbuttons'>
                        <div className='afterbutton'>
                            Estimate delivery times: 12-26 days (International), 3-6 days (United States).
                        </div>
                        <div className='afterbutton'>
                            Return within 30 days of purchase. Duties & taxes are non-refundable.
                        </div>
                    </div>



                </div>



            </div>
            <ProductDetails openReview={openReview} />

            <People />
            <People text='Recently Viewed' />


            <WhiteFooter />


        </div>


    )
}