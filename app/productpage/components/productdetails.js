import { useState } from "react";
import Image from "next/image";

export default function ProductDetails({ openReview ,description = 'hello',
    reviews =[] , activeTab2
}) {
    const [activeTab, setActiveTab] = useState(activeTab2);

    return (
        <div className="details">
            <div className="top">
                <button
                    onClick={() => setActiveTab("description")}
                    className={activeTab === "description" ? "active" : ""}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={activeTab === "reviews" ? "active" : ""}
                >
                    Reviews
                </button>
            </div>
            <div className="bottom">
                {activeTab === "description" && <p>{description}</p>}

                {activeTab === "reviews" && (
                    <div>
                        <div className="reviews" >
                            {reviews.slice().reverse().map((review) => (
                                <div className="review" key={review.id}>
                                    <Image
                                        src={'/xbox1.jpg'} // Replace with a dynamic image URL if necessary
                                        alt="Example image"
                                        width={500}
                                        height={300}
                                    />
                                    <div className="texts">
                                        <p>{review.username}</p>
                                        <p>{new Date(review.createdAt).toLocaleDateString()}</p>
                                        <div className="stars" >
                                            {[1, 2, 3, 4, 5].map((index) => (
                                                <i className="fa-solid fa-star" style={{ color: index <= review.stars ? 'gold' : 'rgb(172, 170, 170)' }}></i>
                                            ))}
                                        </div>
                                        <p>{review.review}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={openReview}>Add a review</button>
                    </div>
                    
                )}
            </div>
        </div>
    );
}
