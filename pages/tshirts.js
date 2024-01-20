/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import mongoose from 'mongoose';
import Product from '../models/Product';

const Tshirts = ({ products }) => {

  return (
    <div className='min-h-screen'>

      <Head>
        <title>T-shirts</title>
      </Head>

      <main className='overflow-x-hidden'>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-12">
            <div className="flex flex-wrap -m-4 justify-center">


              {Object.keys(products).map(item => {


                return <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 shadow-lg m-5">
                  <Link href={`/product/${products[item].slug}`} className="block relative rounded overflow-hidden m-0" passHref>
                    <img alt="ecommerce" className="h-[30vh] md:h-[36vh] block m-0 md:m-auto" src={products[item].img} />
                  </Link>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                     {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                     {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                     {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                     {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                     {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes('red') && <button className="border-2 border-red-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('black') && <button className="border-2 border-black ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('green') && <button className="border-2 border-green-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('purple') && <button className="border-2 border-purple-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('blue') && <button className="border-2 border-blue-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('white') && <button className="border-2 border-white-300 ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('yellow') && <button className="border-2 border-yellow-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('gray') && <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('orange') && <button className="border-2 border-orange-300 ml-1 bg-orange-700 rounded-full w-6 h-6 focus:outline-none"></button>}
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

export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: 'tshirt' })
  let tshirts = {}

  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }

    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}

export default Tshirts