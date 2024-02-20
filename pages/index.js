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
import Link from 'next/link';





export default function Home() {
  const [ProductsData, setProductsData] = useState();
  const [ElectronicsData, setElectronicsData] = useState();
  const [IsLoading, setIsLoading] = useState(false);


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
    'https://m.media-amazon.com/images/G/31/img21/MA2023/AFrevamp_winterflip/Menhero/Wimter_bestseller_3000x800._SX3000_QL85_FMpng_.png',
    'https://m.media-amazon.com/images/G/31/img21/MA2023/AFrevamp_winterflip/Menhero/output_t-shirts-shirts-more_3000x800_4._CB574367716_.gif',
    'https://m.media-amazon.com/images/G/31/img21/MA2023/AFrevamp_winterflip/Menhero/output_winter-men-1_3000x800_6._CB574367716_.gif',
    'https://m.media-amazon.com/images/G/31/img21/MA2023/Winterflip/P0/winter/hero/new/USPA_3000x8001._SX3000_QL85_FMpng_.png'

  ]

  const randow = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/katariy/Portkey/New_design/stripes/04.jpg',
    // 'https://images.bewakoof.com/uploads/grid/app/desktop-banner-Cosy-Winterwear-Common-1705648318.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/Meghana/Neo9Pro/CLP/ILM/D115399419_WLD-iQOO-Quest-Days---Design-SIM_1242x450.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/D93751383_WLD_BAU_Motorola_BrandDays_1242x450.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Banhita/MSOAPPLE/NEWAPPLE/BAUCLP/D103632795_Mob_Hero_1242x450.jpg',

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



  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const endpoint = `https://fakestoreapi.com/products`;

      const res = await axios.get(endpoint);
      const products = res.data;
      setElectronicsData(products);
      setIsLoading(false);

    } catch (error) {
      console.log({ error: "Some Error Occured!" })
      setIsLoading(false)
    }
  }

  console.log("Data =>", ElectronicsData);








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

      {IsLoading && <div role="status" className='absolute mt-60 left-[50rem]'>
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      }

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

              <SwiperSlide key={index}><img src={item} alt="images" style={{ objectFit: 'contain' }} /></SwiperSlide>

            ))}
          </div>

        </Swiper>

      </section>



      <section className="text-gray-600 body-font space-y-4">

        <div className="container px-5 py-4 mx-auto bg-white">
          <div className='flex w-full flex-row justify-between my-4 bg-slate-50'>
            <h3 className='text-xl md:text-2xl font-semibold'>Clothes, Bags & more</h3>
            <button className='mx-4 bg-orange-500 text-white p-1 flex text-center rounded-full'>
              <IoIosArrowForward size={24} />
            </button>
          </div>

          <div className="flex flex-wrap -m-4 shadow-sm bg-slate-100">

            {ElectronicsData && ElectronicsData.slice(0, 6).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <Link href={`/homeproduct/${item.id}`} className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={item.image} />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{parseInt(item.price)}</p>
                  </div>
                </div>

              </div>

            ))}

          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto shadow-sm bg-slate-100">

          <div className="flex flex-wrap w-full mb-6 flex-col items-center text-center">
            <img src={randow[0]} alt="" />
          </div>
          <div className="flex flex-wrap -m-4">

            <div className="xl:w-1/3 md:w-1/2 w-full h-[220px] px-1">
              <img src={randow[2]} alt="img-2" style={{ width: 'auto', height: '220px', objectFit: 'fill' }} />
            </div>
            <div className="xl:w-1/3 md:w-1/2 w-full h-[220px] px-1">
              <img src={randow[3]} alt="img-2" style={{ width: 'auto', height: '220px', objectFit: 'fill' }} />
            </div>
            <div className="xl:w-1/3 md:w-1/2 w-full h-[220px] px-1">
              <img src={randow[1]} alt="img-2" style={{ width: 'auto', height: '220px', objectFit: 'fill' }} />
            </div>
            <div className="xl:w-1/3 md:w-1/2 w-full h-[220px] px-1">
              <img src={randow[1]} alt="img-2" style={{ width: 'auto', height: '220px', objectFit: 'fill' }} />
            </div>
            <div className="xl:w-1/3 md:w-1/2 w-full h-[220px] px-1">
              <img src={randow[2]} alt="img-2" style={{ width: 'auto', height: '220px', objectFit: 'fill' }} />
            </div>
            <div className="xl:w-1/3 md:w-1/2 w-full h-[220px] px-1">
              <img src={randow[3]} alt="img-2" style={{ width: 'auto', height: '220px', objectFit: 'fill' }} />
            </div>




          </div>
        </div>
      </section >


      <section className="text-gray-600 body-font space-y-4">

        <div className="container px-5 py-4 mx-auto bg-white">
          <div className='flex w-full flex-row justify-between my-4 bg-slate-50'>
            <h3 className='text-xl md:text-2xl font-semibold'>Beauty, Food, Toys & more</h3>
            <button className='mx-4 bg-orange-500 text-white p-1 flex text-center rounded-full'>
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="flex flex-wrap -m-4 shadow-sm bg-slate-100">

            {ElectronicsData && ElectronicsData.slice(7, 13).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <Link href={`/homeproduct/${item.id}`} className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={item.image} />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{parseInt(item.price)}</p>
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

            {ElectronicsData && ElectronicsData.slice(14, 20).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <Link href={`/homeproduct/${item.id}`} className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={item.image} />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{parseInt(item.price)}</p>
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

            {ElectronicsData && ElectronicsData.slice(4, 10).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <Link href={`/homeproduct/${item.id}`} className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={item.image} />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{parseInt(item.price)}</p>
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

            {ElectronicsData && ElectronicsData.slice(8, 14).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <Link href={`/homeproduct/${item.id}`} className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={item.image} />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{parseInt(item.price)}</p>
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

            {ElectronicsData && ElectronicsData.slice(4, 10).map((item, index) => (

              <div key={index} className="lg:w-1/6 md:w-1/4 py-4 px-1 w-full">
                <div className='m-[1px] p-2 border-2 border-gray-200 rounded-sm'>
                  <Link href={`/homeproduct/${item.id}`} className="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-full block" src={item.image} />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{parseInt(item.price)}</p>
                  </div>
                </div>

              </div>

            ))}

          </div>
        </div>

      </section >





      {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center" style={{ background: `url(${randow[0]})`, backgroundSize: 'cover' }}>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Shop at ShopVista get affortable price</h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
          </div>
          <div className="flex flex-wrap -m-4">

            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[2]})`, backgroundSize: 'cover' }}>
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
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[3]})`, backgroundSize: 'cover' }}>
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
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[2]})`, backgroundSize: 'contain' }}>
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
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[3]})`, backgroundSize: 'contain' }}>
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
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[2]})`, backgroundSize: 'contain' }}>
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
            <div className="xl:w-1/3 md:w-1/2 p-4" style={{ background: `url(${randow[3]})`, backgroundSize: 'contain' }}>
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
      </section > */}







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
