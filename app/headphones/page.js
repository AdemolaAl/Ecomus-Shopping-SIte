'use client'
import '../home.scss'

import Header from "../components/header";
import { WhiteFooter } from '../components/footer'
import CollectionText from '../components/collection-text'; 

export default ()=>{
    return(
        <div>
            <Header />
            <CollectionText text='Headphones' />
            
            <div className='categories2Flex'>
                <Category2 />
                <Category2 />
                <Category2 />
                <Category2 />
                <Category2 />
                <Category2 />
            </div>

            <WhiteFooter />
            

        </div>
        

    )
}