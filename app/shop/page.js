"use client";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { useGlobalState } from "@/app/components/default2";
import Image from "next/image";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

import "../home.scss";
import "../productpage/productpage.scss";

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




  const { data: products, error: productError } = useSWR(
    `/products`,
    fetcher
  );


  const [key, setKey] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setpopupMessage] = useState("");
  const [popuptype, setPopupType] = useState('')

  function remountDiv() {
    setKey((prevKey) => prevKey + 1);
  }


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
      
      {products ? (
        <div>
          <Header />
          <Popup open={openPopup} message={popupMessage} type={popuptype} />


          <Footer />
        </div>
      ) : (
        //help me call openloading here
        <Loading2 loading={true}/>
      )}
    </div>
  );
}
