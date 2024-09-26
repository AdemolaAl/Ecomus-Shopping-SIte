
import '../../productpage/productpage.scss'

import { useCountdownTimer } from '../../components/timer';

export default function Hurry({time}) {

  const { days, hours, minutes, seconds } = useCountdownTimer(time);

  if(days,hours,minutes,seconds == 0){
    return(
        <div className='hurry'>
            <p className='ended'>SALE ENDED</p>
        </div>
    )
  }

    return (
        <div className='hurry'>
            <p>HURRY UP! SALE ENDS IN:</p>
            <p>{days}Days : {hours}Hours : {minutes}Mins : {seconds}Secs</p>
        </div>
    )
}