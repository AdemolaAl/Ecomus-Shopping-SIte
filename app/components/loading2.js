
import '../home.scss';
import Image from 'next/image';

const Loading2 = ({loading=false}) => {

    if (!loading) return null;



    return (
        <div className='signin-cvr loading'>
            
            <Image
                src='/public/logo-white.svg'
                alt="Description of the image"
                width={0}
                height={0}
                className='image pulse'
                style={{
                    width: '150px',
                    height: 'fit-Content',
                }}
            />
        </div>
    );
};

export default Loading2;
