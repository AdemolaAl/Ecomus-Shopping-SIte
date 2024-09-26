// components/SignInPopup.js
import React, { useState } from 'react';
import '../productpage.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddReviewPopup({ isOpen, onClose, productId , added }) {
    if (!isOpen) return null;
    const [selectedStar, setSelectedStar] = useState(0);

    const [review, setReview] = useState({
        productId,
        title:'',
        stars:5,
        review:''
    }) 

    const onChange = (e) =>{
        const { name, value } = e.target;
        setReview({
            ...review,
            [name]: value,
        });
    }

    const handleSubmit2 = async (e) => {
        
        e.preventDefault();
        try {
            const res = await fetch('/writeReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            
        } catch (error) {

            console.error('Error during signup:', error);

        }finally{
            onClose();
            added()
        }
    };


    const [hoverStar, setHoverStar] = useState(0);
    const handleMouseEnter = (index) => setHoverStar(index);
    const handleMouseLeave = () => setHoverStar(0);
    const handleClick = (index) => {setSelectedStar(index); setReview({
        ...review,
        stars: index,
    })}

    return (
        <form>
            <div className='add-review'>
                <div className='review-cvr'>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <p className='first'>Write a review</p>
                        <div onClick={onClose} className='x' style={{fontSize:"30px", cursor:'pointer'}}>×</div>

                    </div>
                    
                    <div className='cvr'>
                        <p>Title</p>
                        <input type='text' placeholder='Title' name='title' onChange={onChange} />
                    </div>

                    <div className="stars" onMouseLeave={handleMouseLeave}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                style={{ color: hoverStar >= index || selectedStar >= index ? 'gold' : '' }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onClick={() => handleClick(index)}
                            />
                        )) }
                    </div>

                    <div className='cvr'>
                        <p>Review</p>
                        <textarea type='text' placeholder='Write review' name='review' onChange={onChange} autoCorrect='on' minLength={30}/>
                    </div>

                    <button onClick={handleSubmit2}>Submit</button>
                </div>
            </div>
        </form>
    );
}
