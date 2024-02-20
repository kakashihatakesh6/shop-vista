/* eslint-disable @next/next/no-script-component-in-head */
import React, { useEffect, useState } from 'react'
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import axios from 'axios';
import useRazorpay from 'react-razorpay';

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const Razorpay = useRazorpay();

  const [myOrderId, setmyOrderId] = useState('')

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [adddress, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [disable, setDisable] = useState("")
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myUser = JSON.parse(localStorage.getItem("myUser"));
    setUser(myUser);
    fetchData(token);

  }, [])

  console.log("user =>", user, cart);

  const fetchData = async (token) => {
    let data = { token: token }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        'Content-type': "application/json",
      },
      body: JSON.stringify(data),
    })

    let res = await a.json();
    // console.log("FetchData =>", res);
    setName(res.name);
    setAddress(res.address);
    setPincode(res.pincode);
    setPhone(res.phone);
    getpincode(res.pincode);
  }

  const getpincode = async (pin) => {
    if (pin.length == 6) {
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      let pinJson = await pins.json();
      if (Object.keys(pinJson).includes(pin)) {
        setCity(pinJson[pin][0]);
        setState(pinJson[pin][1]);

      }
    } else {
      setCity('');
      setState('');
    }
  }

  const handleChange = async (e) => {

    if (e.target.name == 'name') {
      setName(e.target.value);
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value);
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value);
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value);
      getpincode(e.target.value);
    }

    else if (e.target.name == 'city') {
      setCity(e.target.value);
    }
    else if (e.target.name == 'state') {
      setState(e.target.value);
    }




  }

  const initiateRazorPayment = async () => {
    try {
      const data = {
        amount: 250,
        user: user._id,
        cart: cart,
        totalPrice: subTotal,
        paymentMethod: 'online',
        name: name,
        mobileNo: phone,
        address: adddress,
        postalCode: pincode,
      }
      const endpoint = `${process.env.NEXT_PUBLIC_HOST}/api/razorpretransaction`;
      const res = await axios.post(endpoint, { data })
      console.log("res.data =>", res.data);
      const rData = res.data.data;
      makePayment(rData);

    } catch (error) {
      console.log("error ")
    }
  }

  const makePayment = (data) => {
    try {
      console.log("my", data)

      const options = {
        "key": process.env.RAZOR_KEY_Id, // Enter the Key ID generated from the Dashboard
        "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "ShopVista", //your business name
        "description": "Test Transaction",
        "image": "/logo-shop-round.png",
        "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": name, //your customer's name
          "email": email,
          "contact": phone //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
          "address": adddress
        },

        handler: async (response) => {
          console.log("response from handler=>", response)
          try {
            const verifyUrl = `${process.env.NEXT_PUBLIC_HOST}/api/razorverify`;
            const res = await axios.post(verifyUrl, { response, orderID: data.id })
            console.log(res)
          } catch (error) {
            console.log("error")
          }
        },
        options: {
          checkout: {
            method: {
              netbanking: 1,
              card: 1,
              upi: 1,
              wallet: 1
            }
          }
        },

        "theme": {
          "color": "#f9853f"
        }
      };
      console.log(options)

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      // e.preventDefault()

    } catch (error) {
      console.log("Error OCuured!", error)
    }
  }







  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
        <Script type="application/javascript" src={`${process.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} onload="onScriptLoad();" crossorigin="anonymous"></Script>
      </Head >

      <div className='flex'>

        <div className='container px-6 md:mx-40'>
          <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
          <h2 className='font-semibold text-xl'>1. Delivery Details</h2>

          <div className="flex mx-auto my-2">

            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                <input value={name} onChange={handleChange} type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

            <div className="px-2 w-1/2">

              {user === null ? (
                <div className="mb-4">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                  <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              ) : (
                <div className="mb-4">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email <span className='font-semibold text-red-800'>(cannot be updated)</span></label>
                  <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
                </div>

              )}

            </div>

          </div>

          <div className="px-2 w-full">
            <div className="mb-4">
              <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
              <textarea value={adddress} onChange={handleChange} className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' name="address" id="address" cols="30" rows="2"></textarea>
            </div>
          </div>

          <div className="flex mx-auto my-2">

            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                <input value={phone} onChange={handleChange} type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                <input value={city} onChange={handleChange} type="city" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

          </div>

          <div className="flex mx-auto my-2">

            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                <input value={state} onChange={handleChange} type="state" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

            <div className="px-2 w-1/2">
              <div className="mb-4">
                <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                <input value={pincode} onChange={handleChange} type="pincode" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>

          </div>

          <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>
          <div className="sidebar right-0 top-0 bg-pink-100 px-20 py-5 z-20 ">

            <ol className='list-decimal font-semibold px-30'>

              {Object.keys(cart).length === 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
              {Object.keys(cart).map((k) => {
                return <li key={k}>
                  <div className="item flex my-3">
                    <div className='w-2/3 px-2 font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                    <div className='w-1/3 flex justify-center items-center font-semibold text-lg'>
                      <CiCircleMinus onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer' />
                      <span className='mx-2 text-sm'>{cart[k].qty}</span>
                      <CiCirclePlus onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer' />
                    </div>
                  </div>
                </li>
              })}

            </ol>
            <div className="subt flex justify-left">
              <p className='font-semibold'>Total <span className='font-normal'>₹{subTotal}</span></p>
            </div>
          </div>

          <div className="flex justify-center my-2">

            <Link href={'/checkout'}>
              <button onClick={() => { initiateRazorPayment() }} className="flex mx-2 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-md">
                <IoBagCheckOutline className='m-1' />Pay₹{subTotal}</button>
            </Link>
            {/* <button onClick={clearCart} className="flex mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md">
              Clear Cart</button> */}
          </div>








        </div>
      </div>
    </>
  )
}

export default Checkout