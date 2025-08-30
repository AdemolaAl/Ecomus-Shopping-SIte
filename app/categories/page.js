'use client'
import '../home.scss'

import Header from "../components/header";
import { Category2 } from '../components/category.js'; 
import { WhiteFooter } from '../components/footer'
import CollectionText from '../components/collection-text'; 

export default ()=>{
    return(
        <div>
            <Header />
            <CollectionText text='Collections' />


            <WhiteFooter />
            

        </div>
        

    )
}