"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { useGlobalState } from "@/app/components/default2";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

import "../../home.scss";
import "../../productpage/productpage.scss";

import Header from "@/app/components/header";
import { WhiteFooter } from "@/app/components/footer";
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
  const {
    data: reviewsData,
    error: reviewsError,
    mutate,
  } = useSWR(`/getReview/${id}`, fetcher);

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

  useEffect(() => {
    mutate();
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
            productId={product.shortId}
            added={remountDiv}
          />

          <div className="productPageMain">
            <CustomPaging
              first={product.image}
              second={product.image2}
              third={product.image3}
              fourth={product.image4}
            />

            <div className="right">
              <p className="main-text">{product.productName}</p>

              <Bestseller amount={10} />

              <div className="price">
                {product.DiscountPrice ? (
                  <>
                    <p>${product.DiscountPrice}</p>
                    <s>${product.originalPrice}</s>
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

              <p className="quan">Quantity</p>
              <Increment max={Number(product.quantity)} />

              <div className="flex1">
                <button className="add" onClick={handleSubmit2}>
                  Add to cart
                </button>

                <button className="heart">
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>

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
            </div>
          </div>
          <ProductDetails
            openReview={openReview}
            description={product.description}
            reviews={reviewsData}
            key={key}
            activeTab2={activeTab}
          />

          <People />
          <People text="Recently Viewed" />

          <WhiteFooter />
        </div>
      ) : (
        //help me call openloading here
        <Loading2 loading={true}/>
      )}
    </div>
  );
}
