import '../home.scss'
import Image from 'next/image';

export default function ProductDiv1() {
    return (
        <div className='flex'>
            <div className='productdiv1'>
                <div className='cvr'>
                    <Image
                        src='/electronic-6.png'
                        alt="Example image"
                        width={500}
                        height={300}
                    />
                    <p>HOT ACESSORIES</p>
                    <p>Smart Assistant</p>
                    <button>Shop now</button>
                </div>
            </div>
            <div className='productdiv1'>
                <div className='cvr'>
                    <Image
                        src='/electronic-7.png'
                        alt="Example image"
                        width={500}
                        height={300}
                    />
                    <p>FREE AND FAST SHIPPING</p>
                    <p>True Earbuds</p>
                    <button>Shop now</button>
                </div>
            </div>
        </div>

    )
}

export function ProductDiv2() {
    return (
        <div className='productdiv2'>
            <div className='cvr'>
                <Image
                    src='/apple-iphone-12-r1.jpg'
                    alt="Example image"
                    width={500}
                    height={300}
                />
            </div>

            <p>Iphone 12 base model </p>
            <p>$799</p>
        </div>
    )
}