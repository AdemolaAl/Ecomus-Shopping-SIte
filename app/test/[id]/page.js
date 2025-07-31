"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { useGlobalState } from "@/app/components/default2";
import Image from "next/image";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

import "../../home.scss";
import "../../productpage/productpage.scss";

import Header from "@/app/components/header";
import Footer , { WhiteFooter } from "@/app/components/footer";
import Bestseller from "@/app/productpage/components/bestseller";
import Increment from "@/app/productpage/components/increment";
import CustomPaging from "@/app/productpage/components/productImage";
import ProductDetails from "@/app/productpage/components/productdetails";
import People from "@/app/productpage/components/people";
import { useState, useEffect } from "react";
import AddReviewPopup from "@/app/productpage/components/addreview";
import Hurry from "@/app/preview/components/hurry";
import Loading2 from "@/app/components/loading2";
import Popup from "@/app/components/popup";

export default function Profile() {
  const { state, dispatch } = useGlobalState();


  const params = useParams();
  const { id } = params;

  const { data: product, error: productError } = useSWR(
    `/product/${id}`,
    fetcher
  );
  if (product)[
    console.log(product)
    
  ]


  const [key, setKey] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setpopupMessage] = useState("");
  const [popuptype, setPopupType] = useState('')

  function remountDiv() {
    setKey((prevKey) => prevKey + 1);
  }

  useEffect(() => {
    setActiveTab("reviews");
  }, [key]);



  const [review, setReview] = useState(false);

  function closeReview() {
    setReview(false);
  }
  function openReview() {
    setReview(true);
  }

  function openPop() {
    setOpenPopup(true);
    setTimeout(() => {
      setOpenPopup(false);
    }, 2000);
  }

  const openLoading = () => dispatch({ type: 'OPEN_LOADING' });
  const closeLoading = () => dispatch({type:'CLOSE_LOADING'})
  const openSignIn = () => dispatch({ type: 'OPEN_SIGNIN' });


  async function handleSubmit2() {
    openLoading();

    try {
      const res = await fetch(`/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          // You can add other form data if needed
        }),
      });

      if (res.status === 401) {
        const data = await res.json();
        console.log(data.message);
        setpopupMessage("Sign in required");
        setPopupType('error')
        openSignIn()
        return;
      }

      setPopupType('success')
      setpopupMessage("Item added to cart");

    } catch (error) {
      console.error("Error during adding to cart:", error);
    } finally {
      closeLoading();
      openPop();
    }
  }
  
  return (
    <div>
      
      {product ? (
        <div>
          <Header />
          <Popup open={openPopup} message={popupMessage} type={popuptype} />

          <AddReviewPopup
            isOpen={review}
            onClose={closeReview}
            productId={product.id}
            added={remountDiv}
          />

          <div className="productPageMain">

            <div className="left">

              <div className="routes">
                Home &gt; Shoes &gt; {product.productName}
              </div>

              <CustomPaging
                first={product.images[0].image}
                
                second={product.images[1].image}
                third={product.images[2].image}
                fourth={product.images[3].image}
              />
            </div>
            

            

            <div className="right">
              <p className="main-text">{product.productName}</p>

              <Bestseller amount={10} />

              <div className="price">
                {product.DiscountPrice ? (
                  <>
                    <s>${product.originalPrice}</s>
                    <p>${product.DiscountPrice}</p>
                    <div>
                      {((product.originalPrice - product.DiscountPrice) /
                        product.originalPrice) *
                        100}
                      % OFF
                    </div>
                  </>
                ) : (
                  <p>${product.originalPrice}</p>
                )}
              </div>

              <Hurry time={product.timer} />

              
             

              <div className="flex1">
                <div>
                  <p className="quan">Quantity</p>
                  <Increment max={Number(product.quantity)} />
                </div>

                <button className="add" onClick={handleSubmit2}>
                  Add to cart - ${product.originalPrice}
                </button>

                <button className="heart">
                  <i className="fa-regular fa-heart"></i>
                </button>

                <button className="heart">
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
              </div>

              <button className="buy-now">
                Buy it Now
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>

              <div className="afterbuttons">
                <div className="afterbutton">
                  Estimate delivery times: 12-26 days (International), 3-6 days
                  (United States).
                </div>
                <div className="afterbutton">
                  Return within 30 days of purchase. Duties & taxes are
                  non-refundable.
                </div>
              </div>

              <div className="Guarantee">
                <svg className="hdt-inline-block" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="currentColor"><path d="M10.5 0.614258L2.625 3.47813V10.4055C2.62689 11.7575 2.94764 13.0901 3.56122 14.2949C4.17479 15.4997 5.06388 16.5428 6.15628 17.3394L10.5 20.4986L14.8437 17.3394C15.9361 16.5428 16.8252 15.4997 17.4388 14.2949C18.0524 13.0901 18.3731 11.7575 18.375 10.4055V3.47813L10.5 0.614258ZM17.0625 10.4055C17.0607 11.5506 16.789 12.6791 16.2694 13.6994C15.7498 14.7198 14.9969 15.6033 14.072 16.2783L10.5 18.8764L6.92803 16.2783C6.00306 15.6033 5.25023 14.7198 4.73064 13.6994C4.21104 12.6791 3.93931 11.5506 3.9375 10.4055V4.39688L10.5 2.01076L17.0625 4.39688V10.4055Z"></path><path d="M7.68184 8.88757L6.75391 9.81551L9.67881 12.7404L14.2443 8.17489L13.3164 7.24695L9.67881 10.8845L7.68184 8.88757Z"></path></svg>
                Guanteed safe <br />checkout with:

                <Image
                  src='/public/idMJJ4PV-S_1753717874914.svg'
                  alt="Description of the image"
                  width={5000}
                  height={3000}
                  className="img"
                  />
                
                

              </div>
                 
                
            </div>
          </div>
          <ProductDetails
            openReview={openReview}
            description={product.description}
            reviews={product.reviews}
            key={key}
            activeTab2={activeTab}
          />

          <People />
          <People text="Recently Viewed" />

          <Footer />
        </div>
      ) : (
        //help me call openloading here
        <Loading2 loading={true}/>
      )}
    </div>
  );
}
