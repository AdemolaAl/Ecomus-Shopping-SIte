import '../home.scss'

export default function Success({height, message}){
    return(
        <div className='popup-cvr'>
            <div className='popup1' style={{backgroundColor:'green', top:`${height}px `}}>
                {message}
            </div>
            
        </div>
    )
}
export function Error({height, message}){
    return(
        <div className='popup-cvr'>
            <div className='popup1' style={{backgroundColor:'red', top:`${height}px `}}>
                {message}
            </div>
            
        </div>
    )
}