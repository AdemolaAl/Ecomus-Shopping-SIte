'use client';

import '../home.scss';
import './write.scss';
import { useState, useEffect } from 'react';
import Header from "../components/header";
import { WhiteFooter } from '../components/footer';
import CollectionText from '../components/collection-text';
import {useRouter} from 'next/navigation';
import { useGlobalState } from '../components/default2';
import Loading from '../components/loading';
import Category from '../components/category';


export default function ProductForm() {
    const { state, dispatch } = useGlobalState();
    const router = useRouter()
    const [selectValue, setSelectValue] = useState("");
    const [showCallOption, setShowCallOption] = useState(false);
    const [selectTimer, setSelectTimer] = useState(false);

    const [formData, setFormData] = useState({
        productname: '',
        originalPrice: '',
        DiscountPrice: '',
        timer: '',
        quantity: '',
        category: '',
        des: '',
        images:[]
    });

    


    const openLoading = () => {dispatch({ type: 'OPEN_LOADING' })} 
    const closeLoading = () => dispatch({type:'CLOSE_LOADING'})

    const handleSelectTimer = (e) => {
        const value = e.target.value;
        setSelectTimer(value === 'Yes');
    };

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectValue(value);
        setShowCallOption(value === 'Yes');
    };

    const handleChange = (e) => {
        const { name, value, files, id } = e.target;
        if (name === 'file' && files.length > 0) {
            const file = files[0];

            
                setFormData({
                    ...formData,
                    images: [...formData.images, file],
                });
            

        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    



    const handleSubmit = (e) => {
        openLoading();
        e.preventDefault();

        // Save the form data to localStorage
        localStorage.setItem('formData', JSON.stringify(formData));
        router.push('/preview')

    };

    const handleSubmit2 = async (e) => {
        openLoading();

        e.preventDefault();
        

        try {
            const form = new FormData();

            form.append('productname', formData.productname);
            form.append('originalPrice', formData.originalPrice);
            form.append('DiscountPrice', formData.DiscountPrice);
            form.append('category', formData.category);
            form.append('quantity', formData.quantity);
            form.append('timer', formData.timer);
            form.append('des', formData.des);

            // append all images if needed
            formData.images.forEach((file, index) => {
                form.append('images', file);
            });

            const res = await fetch('/create', {
                method: 'POST',
                body: form, // no need to set headers
            });

            const data = await res.json();
            router.push(`/test/${data.shortIdM}`);
        } catch (error) {
            console.error('Error during submit:', error);
        } finally {
            closeLoading();
        }
    };


    useEffect(() => {
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }
    }, []);



    return (
        <div>
            <Header />
            <Loading />
            
            <CollectionText text='Add a product' />

            <form id="contactForm" /*</div>onSubmit={handleSubmit}*/ >
                <div className="input-main">
                    <p>Product Name</p>
                    <input
                        type="text"
                        placeholder="Product Name"
                        id="name"
                        name="productname"
                        onChange={handleChange}
                    />
                </div>

                <div className="cvr">
                    <div className="input-main">
                        <p>Original Price</p>
                        <input
                            type="text"
                            placeholder="Price"
                            id="originalPrice"
                            name="originalPrice"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="cvr">
                    <div className="input-main">
                        <p>Do you have a discount Price?</p>
                        <select id="afford" name="afford" required onChange={handleSelectChange} value={selectValue}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                </div>

                {showCallOption && (
                    <div>
                        <div className="input-main">
                            <p>Discount price</p>
                            <input
                                type="text"
                                placeholder="Discount Price"
                                id="DiscountPrice"
                                name="DiscountPrice"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="cvr">
                            <div className="input-main">
                                <p>Do you want a timer?</p>
                                <select id="timerOption" name="timerOption" required onChange={handleSelectTimer}>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                        </div>

                    </div>
                )}

                {selectTimer && (
                    <div className="input-main">
                        <p>Discount time</p>
                        <input
                            type='number'
                            placeholder="Days, Hours, Minutes, Seconds"
                            name="timer"
                            id="timer"
                            onChange={handleChange}
                        />
                    </div>
                )}

                <div className="input-main">
                    <p>Product Image1</p>
                    <input
                        type="file"
                        name="file"
                        id="file1"
                        onChange={handleChange}
                    />
                </div>
                {/* Repeat the input fields for other images if needed */}
                <div className="input-main">
                    <p>Product Image2</p>
                    <input
                        type="file"
                        name="file"
                        id="file2"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-main">
                    <p>Product Image3</p>
                    <input
                        type="file"
                        name="file"
                        id="file3"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-main">
                    <p>Product Image4</p>
                    <input
                        type="file"
                        name="file"
                        id="file4"
                        onChange={handleChange}
                    />
                </div>
                <div className="input-main">
                    <p>Quantity</p>
                    <input
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        id="quantity"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-main">
                    <p>Category</p>
                    <input
                        type="text"
                        placeholder="category"
                        name="category"
                        id="category"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-main">
                    <p>Description</p>
                    <textarea
                        style={{ height: '300px', fontFamily: 'unset' }}
                        placeholder="Description"
                        name="des"
                         onChange={handleChange}
                    ></textarea>
                </div>

                
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className="button2"
                    style={{ color: 'black', backgroundColor: 'white' }}
                >
                    Preview
                </button>
                <button
                    type='submit'
                    onClick={handleSubmit2}
                    className="button2"
                    style={{ color: 'black', backgroundColor: 'white' }}
                >
                    send
                </button>
            </form>

            <WhiteFooter />
        </div>
    );
}
