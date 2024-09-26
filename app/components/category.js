import '../home.scss';
import Image from 'next/image';

export default function Category(){
    return(
        <div className='category'>
            <p>Headphone</p>
            <p>6 items</p>
            <button>Shop now</button>
            <Image
                    src={'next.svg'}
                    alt="Example image"
                    width={500}
                    height={300}
            />
        </div>
    )
}

export function Category2(){
    return(
        <div className='category2'>
            <button>Headphone</button>
            <Image
                    src={'next.svg'}
                    alt="Example image"
                    width={500}
                    height={300}
            />
        </div>
    )
}