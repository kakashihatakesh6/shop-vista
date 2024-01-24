import Link from 'next/link'
import React from 'react'
const Footer = () => {
  return (
    <div className='flex flex-center' style={{ background: 'rgb(24, 24, 24)' }}>

      <footer className="text-gray-600 body-font w-screen ml-10" style={{ background: 'rgb(24, 24, 24)' }}>
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            {/* <Link href={"/"}> */}
            <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <img src="/logo-shop-round.png" alt="" style={{width: '40px', height: '40px'}} />
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-orange-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg> */}
              <span className="ml-3 text-xl text-[#FDD835]">Shop Vista</span>


            </Link>
            {/* </Link> */}
            <p className="mt-2 text-sm text-white">Buy Clothes, Furnitures, Home Appliances, Mobile Phones, Laptop, Tech Gadgets, Hardware at Lowest Price.</p>
            <div className='py-5 space-y-1'>
              <span className='text-white text-sm'>15 Days return policy*</span>
              <p className='text-white text-sm'>Cash on Delivery</p>
            </div>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-[#FDD835] tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'#'} className="text-white ">T-Shirts</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white ">Mobile Phones</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white ">Home Appliances</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white">Tech Gadgets</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-[#FDD835] tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'#'} className="text-white ">Vegetables</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white ">Fruits</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white ">Grocery</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white">Electronics</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  text-[#FDD835] tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'#'} className="text-white ">Books</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white">Mugs</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white">Stickers</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white">Laptop</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium  text-[#FDD835] tracking-widest text-sm mb-3">CATEGORIES</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href={'#'} className="text-white ">Tables</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white">Fans</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white">Kitchen Appliances</Link>
                </li>
                <li>
                  <Link href={'#'} className="text-white">Hoodies</Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 flex w-full">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 ShopVista - All rights Reserved
              <Link href={'#'} rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@ShopVista</Link>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <Link href={"#"} className="text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </Link>
              <Link href={'#'} className="ml-3 text-gray-500">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </Link>
              <Link href={'#'} className="ml-3 text-gray-500">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </Link>
              <Link href={'#'} className="ml-3 text-gray-500">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </Link>
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer