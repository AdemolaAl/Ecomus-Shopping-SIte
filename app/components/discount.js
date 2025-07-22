import '../home.scss'
import Image from 'next/image'
import { useCountdownTimer } from './timer'

export default () => {
    return (
        <div className='discount'>
            <div className='cvr'>
                <p>SALE UP TO 30% OFF TODAY</p>
                <p>Best Deals Discounts</p>
                <p>Fast wireless charging on-the-go.</p>
                <button>Shop collection</button>
            </div>

        </div>
    )
}

export function Discount2(){
    const countdown = useCountdownTimer('2025-08-01T00:00:00');
    const formatTime = (time) => time.toString().padStart(2, '0');
    return(
        <div className='discount2'>
             <Image
                src='/collection-72.jpg'
                alt="Description of the image"
                width={5000}
                height={3000}
            />
            <div className='second'>
                <p>ULTIMATE APPLE ACCESSORY.</p>
                <p>60% Discount</p>
                <p>Find the latest and greatest gadgets to enhance your electronic devices.</p>
                <p>Hungry up ! Deals end in :</p>
                <div className='times'>
                    <div className='time'>
                        <div className='cvrr'> 
                            {countdown.days}
                            <p>Days</p>
                        </div>
                    </div>
                    <div className='time'>
                        <div className='cvrr'> 
                            {countdown.hours}
                            <p>Hours</p>
                        </div>
                    </div>
                    <div className='time'>
                        <div className='cvrr'> 
                            {countdown.minutes}
                            <p>Minutes</p>
                        </div>
                    </div>
                    <div className='time'>
                        <div className='cvrr'> 
                            {countdown.seconds}
                            <p>Seconds</p>
                        </div>
                    </div>
                </div>
                
                <button>Shop now</button>
            </div>
        </div>
    )
}