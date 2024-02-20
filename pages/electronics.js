/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';

const Electronics = () => {
    const [ProductsData, setProductsData] = useState();
    const [IsLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const data = { category: 'kids' };
            const endpoint = `https://fakestoreapi.com/products/category/electronics`;

            const res = await axios.get(endpoint);
            const products = res.data;
            setProductsData(products);
            setIsLoading(false);

        } catch (error) {
            console.log({ error: "Some Error Occured!" })
            setIsLoading(false)
        }
    }

    console.log("Data =>", ProductsData);


    return (
        <div className='min-h-screen'>

            <Head>
                <title>Smartphones</title>
            </Head>

            <main className='overflow-x-hidden'>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-12 mx-12">
                        <div className="flex flex-wrap -m-4 justify-center">


                            {/* <div role="status" className='min-h-screen flex w-full justify-center pt-40'> */}
                            {IsLoading &&
                                <div role="status" className='absolute mt-40'>
                                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            }


                            {ProductsData && ProductsData.map((item, index) => {


                                return <div key={index} className="lg:w-1/5 md:w-1/2 p-4 shadow-lg m-5">
                                    <Link href={`/product/${item.id}`} className="block relative rounded overflow-hidden m-0" passHref>
                                        <img alt="ecommerce" className="h-[30vh] md:h-[36vh] block m-0 md:m-auto" src={item.image} />
                                    </Link>
                                    <div className="mt-4 text-center md:text-left">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                                        <p>Price: <span className="mt-1 text-orange-500 font-semibold">₹{item.price}</span></p>
                                        <div className="mt-1">
                                            Size: <span className='border border-gray-300 px-1 mx-1'>{item.size}</span>
                                        </div>

                                    </div>
                                </div>

                            })}





                        </div>
                    </div>
                </section>

            </main>
        </div >
    )
}

export default Electronics
