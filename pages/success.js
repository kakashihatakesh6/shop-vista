/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const Success = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center pb-48 items-center'>
        <div className='flex mb-4 px-12 py-6 rounded-full bg-green-500 text-white'><span className='text-[3rem]'>✓</span></div>
        <h1 className="text-3xl font-bold">Success</h1>
        <h4>Your Order has been recieved</h4>
        <Link href='/' className='bg-orange-300 py-1 px-2 text-white'>Go to Homepage</Link>
    </div>
  )
}

export default Success