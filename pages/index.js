/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useEffect, useState } from 'react'
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';


import { IoIosArrowForward } from "react-icons/io";





export default function Home() {
  const [ProductsData, setProductsData] = useState();


  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token => ", token);
  }, [])

  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",

  ];

  const banners = [
    'https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/fd77eeeb2d597bb0.jpg?q=20',
    'https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/e7b40c1b2a494248.jpg?q=20',
    'https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/df3f286955c6dc67.jpg?q=20',
    'https://rukminim2.flixcart.com/fk-p-flap/1000/170/image/ed12b7707a04473c.jpg?q=20'

  ]

  const randow = [
    'https://images.bewakoof.com/uploads/grid/app/DESKTOP-MIDSIZE-cosysweater-common-1705557343.jpg',
    'https://images.bewakoof.com/uploads/grid/app/desktop-banner-Cosy-Winterwear-Common-1705648318.jpg'
  ]

  useEffect(() => {
    fetchProductsData();
  }, [])

  const fetchProductsData = async () => {

    try {
      let apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/getproducts`;

      // let axiosConfig = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     "Access-Control-Allow-Origin": "*",
      //   }
      // };

      let res = await axios.get(apiUrl);
      let response = await res.data;
      setProductsData(response.tshirts);

      if (response.success) {
        console.log("Successfully fetched the Data ");
      } else {
        console.log({ error: "Internal Server Error" })
      }

    } catch (error) {
      console.log({ error: "Internal Server Error" });
    }


  }

  console.log(ProductsData)





  return (
    <>
      <Head>
        <title>Shopvista.com - Buy premium products at affordable price</title>
        <meta name="description" content="Codeswear.com - wear the code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>

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

      <section className="herosection">

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <div>
            {banners.map((item, index) => (

              <SwiperSlide key={index}><img src={item} alt="images" /></SwiperSlide>

            ))}
          </div>

        </Swiper>

      </section>

      <section className="text-gray-600 body-font space-y-4">

        <div className="container px-5 py-4 mx-auto bg-white">
          <div className='flex w-full flex-row justify-between my-4 bg-slate-50'>
            <h3 className='text-xl md:text-2xl font-semibold'>Best of Electronics</h3>
            <button className='mx-4 bg-orange-500 text-white p-1 flex text-center rounded-full'>
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="flex flex-wrap -m-4 shadow-sm bg-slate-100">

            {ProductsData && Object.keys(ProductsData).slice(0, 6).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={ProductsData[item].img} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ProductsData[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{ProductsData[item].title}</h2>
                    <p className="mt-1">₹{ProductsData[item].price}</p>
                  </div>
                </div>

              </div>

            ))}

          </div>
        </div>

        <div className="container px-5 py-4 mx-auto bg-white">
          <div className='flex w-full flex-row justify-between my-4 bg-slate-50'>
            <h3 className='text-xl md:text-2xl font-semibold'>Beauty, Food, Toys & more</h3>
            <button className='mx-4 bg-orange-500 text-white p-1 flex text-center rounded-full'>
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="flex flex-wrap -m-4 shadow-sm bg-slate-100">

            {ProductsData && Object.keys(ProductsData).slice(0, 6).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={ProductsData[item].img} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ProductsData[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{ProductsData[item].title}</h2>
                    <p className="mt-1">₹{ProductsData[item].price}</p>
                  </div>
                </div>

              </div>

            ))}

          </div>
        </div>

        <div className="container px-5 py-4 mx-auto bg-white">
          <div className='flex w-full flex-row justify-between my-4 bg-slate-50'>
            <h3 className='text-xl md:text-2xl font-semibold'>Top Selection</h3>
            <button className='mx-4 bg-orange-500 text-white p-1 flex text-center rounded-full'>
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="flex flex-wrap -m-4 shadow-sm bg-slate-100">

            {ProductsData && Object.keys(ProductsData).slice(0, 6).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={ProductsData[item].img} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ProductsData[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{ProductsData[item].title}</h2>
                    <p className="mt-1">₹{ProductsData[item].price}</p>
                  </div>
                </div>

              </div>

            ))}

          </div>
        </div>

        <div className="container px-5 py-4 mx-auto bg-white">
          <div className='flex w-full flex-row justify-between my-4 bg-slate-50'>
            <h3 className='text-xl md:text-2xl font-semibold'>Discounts for You</h3>
            <button className='mx-4 bg-orange-500 text-white p-1 flex text-center rounded-full'>
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="flex flex-wrap -m-4 shadow-sm bg-slate-100">

            {ProductsData && Object.keys(ProductsData).slice(0, 6).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={ProductsData[item].img} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ProductsData[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{ProductsData[item].title}</h2>
                    <p className="mt-1">₹{ProductsData[item].price}</p>
                  </div>
                </div>

              </div>

            ))}

          </div>
        </div>

        <div className="container px-5 py-4 mx-auto bg-white">
          <div className='flex w-full flex-row justify-between my-4 bg-slate-50'>
            <h3 className='text-xl md:text-2xl font-semibold'>Home & Kitchen Essentials</h3>
            <button className='mx-4 bg-orange-500 text-white p-1 flex text-center rounded-full'>
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="flex flex-wrap -m-4 shadow-sm bg-slate-100">

            {ProductsData && Object.keys(ProductsData).slice(0, 6).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={ProductsData[item].img} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ProductsData[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{ProductsData[item].title}</h2>
                    <p className="mt-1">₹{ProductsData[item].price}</p>
                  </div>
                </div>

              </div>

            ))}

          </div>
        </div>
        
        <div className="container px-5 py-4 mx-auto bg-white">
          <div className='flex w-full flex-row justify-between my-4 bg-slate-50'>
            <h3 className='text-xl md:text-2xl font-semibold'>Grooming, Books, Auto & more</h3>
            <button className='mx-4 bg-orange-500 text-white p-1 flex text-center rounded-full'>
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="flex flex-wrap -m-4 shadow-sm bg-slate-100">

            {ProductsData && Object.keys(ProductsData).slice(0, 6).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={ProductsData[item].img} />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{ProductsData[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{ProductsData[item].title}</h2>
                    <p className="mt-1">₹{ProductsData[item].price}</p>
                  </div>
                </div>

              </div>

            ))}

          </div>
        </div>

      </section>







      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center" style={{ background: `url(${randow[0]})` }}>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Shop at ShopVista get affortable price</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
          </div>
          <div className="flex flex-wrap -m-4">

            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[0]})`, backgroundSize: 'contain' }}>
              <div className="border border-gray-200 p-6 rounded-lg hidden">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Tshirts</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[1]})`, backgroundSize: 'contain' }}>
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Hoodies</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[0]})`, backgroundSize: 'contain' }}>
              <div className="border border-gray-200 p-6 rounded-lg hidden">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Tshirts</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[1]})`, backgroundSize: 'contain' }}>
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Hoodies</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[0]})`, backgroundSize: 'contain' }}>
              <div className="border border-gray-200 p-6 rounded-lg hidden">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Tshirts</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[1]})`, backgroundSize: 'contain' }}>
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Hoodies</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>


          </div>
        </div>
      </section >





      {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center" style={{background: `url(${randow[0]})`}}>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Shop at ShopVista get affortable price</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4"  style={{background: `url(${randow[0]})`, backgroundSize: 'contain'}}>
              <div className="border border-gray-200 p-6 rounded-lg hidden">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Tshirts</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{background: `url(${randow[1]})`, backgroundSize: 'contain'}}>
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Hoodies</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Jeans</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Trousers</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Joggers</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Shoes</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
          </div>

        </div>
      </section> */}





    </>
  )
}
