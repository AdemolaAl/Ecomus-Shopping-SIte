import '../home.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default ({ text1 = <>Savings for <br /> dads and grads.</>, images = '/Slideshow_Electronics2-removebg-preview.png', color = '#f7f7f7' }) => {
    return (
        <div className='slides' style={{ backgroundColor: color }}>
            <div className='cvr'>
                

                <div className='texts'>
                    <motion.div
                        initial={{ opacity: 0, x: 50, y: 70 }} // Starting state
                        whileInView={{ opacity: 1, x: 0, y: 0 }} // Final state when in view
                        transition={{ duration: 0.5, delay: 0.3 }} // Duration of the animation
                        viewport={{ once: false, amount: 0.2 }} // Only animate once when in view
                    >
                        <p>UP TO 40% OFF CHARGES AND MORE.</p>
                    </motion.div>



                    <motion.div
                        initial={{ opacity: 0, y: 200 }} // Starting state
                        whileInView={{ opacity: 1, y: 0 }} // Final state when in view
                        transition={{ duration: 0.5, delay: 0.3 }} // Duration of the animation
                        viewport={{ once: false, amount: 0.2 }} // Only animate once when in view
                    >
                        <p className='big'>{text1}</p>
                        <button>Shop colletion</button>
                    </motion.div>
                </div>


                <Image
                    src={images}
                    alt="Example image"
                    width={500}
                    height={300}
                />
            </div>

        </div>
    )
}