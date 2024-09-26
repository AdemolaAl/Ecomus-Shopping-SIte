'use client'
import '../home.scss'
import '../productpage/productpage.scss'

import Header from "../components/header";
import { WhiteFooter } from '../components/footer'
import Bestseller from '../productpage/components/bestseller';
import Increment from '../productpage/components/increment';
import CustomPaging from '../productpage/components/productImage';
import ProductDetails from '../productpage/components/productdetails';
import People from '../productpage/components/people';
import Hurry from './components/hurry';
import { useState, useEffect } from 'react';
import AddReviewPopup from '../productpage/components/addreview'



export default () => {

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    }, []);


    const [review, setReview] = useState(false)
    function closeReview() {
        setReview(false)
    }
    function openReview() {
        setReview(true)
    }


    return (
        <div>
            {formData  ? (
                <div>
                    <Header />

                    <AddReviewPopup isOpen={review} onClose={closeReview} />

                    <div className='productPageMain'>
                        <CustomPaging first={formData.file1} second={formData.file2} third={formData.file3} fourth={formData.file4} />

                        <div className='right'>
                            <p className='main-text'>{formData.productname}</p>

                            <Bestseller amount={10} />

                            <div className='price'>
                                
                                
                                
                                {formData.DiscountPrice ? 
                                    <>
                                        <p>${formData.DiscountPrice}</p>
                                        <s>${formData.originalPrice}</s>
                                        <div>{((formData.originalPrice - formData.DiscountPrice)/formData.originalPrice)*100}% OFF</div>
                                    </>
                                     
                                    : <p>${formData.originalPrice}</p>
                                }
                                
                                
                            </div>

                            <Hurry days ={formData.timer.split(',').map(Number)[0]} hours={formData.timer.split(',').map(Number)[1]} minutes={formData.timer.split(',').map(Number)[2]} seconds={formData.timer.split(',').map(Number)[3]} />

                            

                            <p className='quan'>Quantity</p>
                            <Increment max={Number(formData.quantity)}/>


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
                    <ProductDetails openReview={openReview} description={formData.des} />

                        <People />
                        <People text='Recently Viewed' />


                    <WhiteFooter />


                </div>
            ) :
                (
                    <div>No preview</div>
                )

            }




        </div>


    )
}