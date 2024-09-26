import '../../home.scss'
import { useState , useEffect } from 'react';

export default function ({ amount = 1 }) {

    const [seconds, setSeconds] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => !prevSeconds);
        }, 500);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);



    return (
        <div className='bestseller'>
            <div>Best Seller</div>

            {seconds ? <i className="fa-solid fa-bolt"></i> : <i className="fa-solid fa-bolt" style={{color:'white'}}></i>}
            <p>Selling fast! {amount} {amount == 1 ? 'person' : 'people'} have this in their cart{amount === 1 ? "" : "s"}.</p>
        </div>
    )
}