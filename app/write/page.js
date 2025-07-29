'use client';

import '../home.scss';
import './write.scss';
import { useState, useEffect } from 'react';
import Header from "../components/header";
import { WhiteFooter } from '../components/footer';
import CollectionText from '../components/collection-text';
import {useRouter} from 'next/navigation';
import Loading from '../components/loading';


export default function ProductForm() {
    const router = useRouter()
    const [selectValue, setSelectValue] = useState("");
    const [showCallOption, setShowCallOption] = useState(false);
    const [selectTimer, setSelectTimer] = useState(false);
    const [loading , setLoading] = useState(false);

    const [formData, setFormData] = useState({
        productname: '',
        originalPrice: '',
        DiscountPrice: '',
        timer: '',
        quantity: '',
        des: '',
        images:[],
        file1: null,
        file2: null,
        file3: null,
        file4: null,
    });


    function openLoading(){setLoading(true)}
    function closeLoading(){setLoading(false)}

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
            const reader = new FileReader();

            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    images: [...formData.images, {image : reader.result}],
                    [id]: reader.result, // base64 encoded file
                });
            };

            reader.readAsDataURL(file); // Read file as base64
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Save the form data to localStorage
        localStorage.setItem('formData', JSON.stringify(formData));
        router.push('/preview')

    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        openLoading()

        try {
            const res = await fetch('/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            router.push(`/test/${data.shortIdM}`)


        } catch (error) {

            console.error('Error during signup:', error);

        }finally{
            closeLoading()
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
            <CollectionText text='Add a product' />
            <Loading openLoading={loading} />

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
