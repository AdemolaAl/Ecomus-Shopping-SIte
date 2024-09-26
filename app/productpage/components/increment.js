import '../../home.scss'
import { useState } from 'react';

export default function Increment({max=20}){
    const [num, setNum] =  useState(1);

    function increase(){
        if(num !== max){
            setNum((prev)=>prev+1)
        }
        
    }
    function decrease(){
        if(num !== 1){
            setNum((prev)=>prev-1)
        }        
    }


    return(
        <div className='incre'>
            <button onClick={decrease}>-</button>
            <p>{num}</p>
            <button onClick={increase}>+</button>
        </div>
    )
}