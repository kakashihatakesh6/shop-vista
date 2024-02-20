/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeProducts = ({ addToCart, buyNow, variants }) => {
    const [pin, setpin] = useState()
    const router = useRouter();
    const { slug } = router.query;
   
    const [serviceability, setserviceability] = useState()
    // const [color, setcolor] = useState(product.color)
    // const [size, setsize] = useState(product.size)
    const [color, setcolor] = useState('blue')
    const [size, setsize] = useState('M')


    // useEffect(() => {
    //     // setcolor(product.color);
    //     // setsize(product.size)
    // }, [router.query])


    const changePin = (e) => {
        setpin(e.target.value)
    }

    const checkServiceability = async () => {

        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()

        if (Object.keys(pinJson).includes(pin)) {
            setserviceability(true)
            toast.success('Pincode is serviceable', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            setserviceability(false)
            toast.error('Sorry, Service not available here!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const refreshVariant = (newColor, newSize) => {
        let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`;
        router.push(url);
    }


    const [ProductData, setProductsData] = useState();
    const [IsLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState();

    useEffect(() => {
        console.log("slug =>", slug);
        fetchSlugData();

    }, [])

    const fetchSlugData = async () => {
        setIsLoading(true);
        try {
            // if (!(slug.toString().length >= 0)) {
            //     const endpoint = `${process.env.NEXT_PUBLIC_HOST}/api/getproducts`;
            //     const res = await axios.get(endpoint)
            //     const slugItem = res.data;
            //     setProduct(slugItem);
            // }
            const endpoint = `https://fakestoreapi.com/products/${slug}`;
            const res = await axios.get(endpoint);
            const slugItem = res.data;
            console.log("res =>", slugItem)
            setProduct(slugItem);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.log({ error: "Some Error Occured!" })
            setIsLoading(false)
        }
    }


    return <>

        <main className='overflow-hidden min-h-screen'>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {IsLoading && <div role="status" className='absolute mt-60 left-[50rem]'>
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
            }

            {!IsLoading &&
                <section className="min-h-screen text-gray-600 body-font overflow-hidden">
                    <div className="container px-5 py-16 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            {product && product.img !== undefined ? (
                                <img alt="ecommerce" className="lg:w-1/2 w-full px-24 lg:h-auto object-contain object-top rounded" src={product?.img} />
                            ) : (
                                <img alt="ecommerce" className="lg:w-1/2 w-full px-24 lg:h-auto object-contain object-top rounded" src={product?.image} />
                            )}
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">SHOP VISTA</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.title} ({size}/{color})</h1>


                                <p className="leading-relaxed">{product?.description}</p>

                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                    {variants ? (<div className="flex">
                                        <span className="mr-3">Color</span>
                                        {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={() => { refreshVariant('white', size) }} className={`border-2 rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-none'}`}></button>}
                                        {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={() => { refreshVariant('blue', size) }} className={`border-2  ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-none'}`}></button>}
                                        {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={() => { refreshVariant('green', size) }} className={`border-2  ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-none'}`}></button>}
                                        {Object.keys(variants).includes('purple') && Object.keys(variants['purple']).includes(size) && <button onClick={() => { refreshVariant('purple', size) }} className={`border-2ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${color === 'purple' ? 'border-black' : 'border-none'}`}></button>}
                                        {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={() => { refreshVariant('black', size) }} className={`borde ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-black' : 'border-none'}`}></button>}
                                        {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={() => { refreshVariant('red', size) }} className={`border-2 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-none'}`}></button>}
                                        {Object.keys(variants).includes('gray') && Object.keys(variants['gray']).includes(size) && <button onClick={() => { refreshVariant('gray', size) }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'gray' ? 'border-black' : 'border-none'}`}></button>}
                                        {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={() => { refreshVariant('yellow', size) }} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black' : 'border-none'}`}></button>}
                                    </div>
                                    ) : (
                                        <div className='flex'>
                                            <span className="mr-3 font-semibold">Color</span>
                                            <button className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-none'}`}></button>
                                        </div>
                                    )
                                    }
                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3">Size</span>
                                        <div className="relative">
                                            {variants ?
                                                (
                                                    <select value={size} onChange={(e) => { refreshVariant(color, e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base pl-3 pr-10">
                                                        {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                                                        {Object.keys(variants[color]).includes("M") && <option value={'M'}>M</option>}
                                                        {Object.keys(variants[color]).includes("L") && <option value={'L'}>L</option>}
                                                        {Object.keys(variants[color]).includes("XL") && <option value={'XL'}>XL</option>}
                                                        {Object.keys(variants[color]).includes("XXL") && <option value={'XXL'}>XXL</option>}
                                                    </select>
                                                ) : (
                                                    <select value={size} onChange={(e) => { setsize(e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base pl-3 pr-10">
                                                        <option value={'S'}>S</option>
                                                        <option value={'M'}>M</option>
                                                        <option value={'L'}>L</option>
                                                        <option value={'XL'}>XL</option>
                                                        <option value={'XXL'}>XXL</option>
                                                    </select>
                                                )
                                            }
                                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                <svg fill="none" stroke="currentColor" strokelineup="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                    <path d="M6 9l6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex">
                                    {product && product.availableQty !== undefined ?
                                        (
                                            <>
                                                {product?.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}.00</span>}
                                                {/* {product?.availableQty <= 0 && <span className="title-font font-medium text-2xl text-gray-900">Out of Stock!</span>} */}
                                                <button disabled={product.availableQty <= 0} onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }} className="flex ml-8 text-white bg-orange-500 disabled:bg-orange-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded">Add to Cart</button>
                                                <button disabled={product.availableQty <= 0} onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} className="flex ml-5 text-white bg-orange-500 disabled:bg-orange-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded">Buy Now</button>
                                            </>
                                        ) : (
                                            <>
                                                <span className="title-font font-medium text-2xl text-gray-900">₹{product?.price}.00</span>
                                                {/* <span className="title-font font-medium text-2xl text-gray-900">Out of Stock!</span> */}
                                                <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }} className="flex ml-8 text-white bg-orange-500 disabled:bg-orange-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded">Add to Cart</button>
                                                <button onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} className="flex ml-5 text-white bg-orange-500 disabled:bg-orange-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-orange-600 rounded">Buy Now</button>
                                            </>
                                        )
                                    }

                                    {/* <button disabled={product.availableQty <= 0} onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }}
                                    className="flex ml-8 text-white bg-orange-500 disabled:bg-orange-300 border-0 py-2 px-2 md:px-6 focus:outline-none
                                  hover:bg-orange-600 rounded">Add to Cart</button>

                                <button disabled={product.availableQty <= 0} onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }}
                                    className="flex ml-5 text-white bg-orange-500 disabled:bg-orange-300 border-0 py-2 px-2 md:px-6 focus:outline-none
                                  hover:bg-orange-600 rounded">Buy Now</button> */}

                                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                        <svg fill="currentColor" strokelineup="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>

                                </div>

                                <div className="pin mt-5 flex space-x-2">
                                    <input onChange={changePin} className='px-2 border-2 border-gray-400 rounded-md' placeholder='Enter your pincode' type="text" name="" id="" />
                                    <button onClick={checkServiceability} className='flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded'>Check</button>
                                </div>
                                {!serviceability && (serviceability != null) &&
                                    <div className='text-red-700'>
                                        Service not available
                                    </div>
                                }
                                {serviceability && (serviceability != null) &&
                                    <div className='text-green-700'>
                                        Pincode is serviceable
                                    </div>
                                }



                            </div>
                        </div>
                    </div>
                </section>
            }

        </main>


    </>

}

export default HomeProducts;

// export async function getServerSideProps(context) {

//     if (!mongoose.connections[0].readyState) {
//         await mongoose.connect(process.env.MONGO_URI)
//     }
//     let product = await Product.findOne({ slug: context.query.slug })
//     let variants = await Product.find({ title: product.title })
//     let colorSizeSlug = {} // {red: {xl: {slug: 'wear-the-code-xl}}}
//     for (let item of variants) {
//         if (Object.keys(colorSizeSlug).includes(item.color)) {
//             colorSizeSlug[item.color][item.size] = { slug: item.slug }
//         }
//         else {
//             colorSizeSlug[item.color] = {}
//             colorSizeSlug[item.color][item.size] = { slug: item.slug }
//         }
//     }

//     return {
//         props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
//     }
// }



