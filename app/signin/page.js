'use client'

import SignInPopup from "../components/signin"
import Loading from "../components/loading";
import { useState } from "react";


export default function Signin() {
    const [loading, setLoading] = useState(false)
    const openLoading =()=>{setLoading(true)}
    const closeLoading = ()=>{setLoading(false)}


    function redirectTo(url) {
        window.location.href = url;
    }
    return (
        <div>
            <Loading openLoading={loading}/>
            <SignInPopup isOpen={true} registerFunc={() => redirectTo('/')} onClose={()=>{}} openLoading={openLoading} closeLoading={closeLoading} showX={false} />
        </div>
        
    )
}