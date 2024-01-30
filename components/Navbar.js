/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart, CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";
import { FaRegUserCircle } from "react-icons/fa";
import { PiDotsThreeVertical } from "react-icons/pi";


const Navbar = ({
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  logout,
}) => {
  const ref = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [dropHelp, setDropHelp] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [myuser, setmyuser] = useState({})
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ['/checkout', '/order', '/orders']
    if (exempted.includes(router.pathname)) {
      setSidebar(false)
    }
    if (localStorage.getItem('token')) {

      const u = JSON.parse(JSON.stringify(localStorage.getItem("myUser")));
      setmyuser(u);
    }

  }, [])

  // console.log("myuser =>", myuser)

  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };



  const toggleDropdown = () => {
    setDropdown(!dropdown);
  }

  return (
    <>

      <div className={`flex flex-col navbar justify-center md:flex-row
     md:justify-start items-center py-2 shadow-md sticky top-0
      bg-white z-10 ${!sidebar && 'overflow-hidden'}`}>

        <div className="logo absolute left-1 top-1 md:relative order-1 mx-12 px-2 rounded-full " style={{ width: '101px', height: '44px' }}>
          <Link href={"/"}>
            {/* <img src="/logo-shop-round.png" alt="image-logo" style={{ width: "101px", height: "34px", objectFit: 'contain' }} /> */}
            <p className="font-semibold text-2xl">Shop<span className="text-orange-400">Vista</span></p> 
          </Link>
        </div>

        <div className="nav relative md:mx-12 md:order-2 order-3">
          <ul className="flex py-3 px-4 md:px-20 mt-10 md:mt-0 rounded-md uppercase text-white md:justify-center md:items-center flex-wrap space-x-1 md:space-x-3 text-sm md:text-md font-bold "
          style={{background: 'linear-gradient(45deg, #fa630e, #f1bf80, #ff550a)'}}>
            <Link href={"/smartphones"}>
              <li className="hover:text-orange-600">Smartphones</li>
            </Link>
            <Link href={"/tshirts"}>
              <li className="hover:text-orange-600">Clothes</li>
            </Link>
            <Link href={"/kids"}>
              <li className="hover:text-orange-600">Baby & Kids</li>
            </Link>
            <Link href={"/electronics"}>
              <li className="hover:text-orange-600">Electronics</li>
            </Link>
            <Link href={"/jewelery"}>
              <li className="hover:text-orange-600">Jwelery</li>
            </Link>
            <Link href={"/jewelery"}>
              <li className="hover:text-orange-600">Cameras</li>
            </Link>
            <Link href={"/jewelery"}>
              <li className="hover:text-orange-600">Audio</li>
            </Link>
            <Link href={"/jewelery"}>
              <li className="hover:text-orange-600">Laptops</li>
            </Link>
            <Link href={"/books"}>
              <li className="hover:text-orange-600">Books</li>
            </Link>
            <Link href={"/kitchen"}>
              <li className="hover:text-orange-600">Kitchen</li>
            </Link>
            <Link href={"/"}>
              <li className="hover:text-orange-600">Offer Zone</li>
            </Link>
          </ul>
        </div>

        <div className="flex order-2 md:order-3 justify-center items-center cart mx-5 my-1 absolute right-0 top-1 md:top-2 ">

          <div onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} >
           
              {user.value && !sidebar && <span className="flex flex-row justify-center items-center p-1 mb-4 mx-2 md:mx-12 ">
                <FaRegUserCircle className="text-2xl mx-2 md:text-2xl cursor-pointer" />
                <p className="font-normal ">Nikhil</p>
              </span>}

              <div>
                <Link href={""}>
                  {dropdown && !sidebar && <div className="main-drop fixed right-36 bg-white shadow-lg border top-14 rounded-md py-4 px-5 w-32 z-20">
                    <ul>
                      <Link href={"/myaccount"}><li className="py-1 hover:text-orange-700 text-sm">My Account</li></Link>
                      <Link href={"/orders"}><li className="py-1 hover:text-orange-700 text-sm">Orders</li></Link>
                      <Link onClick={logout} href={"/login"}><li className="py-1 hover:text-orange-700 text-sm">Logout</li></Link>
                    </ul>
                  </div>}
                </Link>
              </div>

          
          </div>

          {!user.value && <Link href={"/login"} className="mb-4 md:mx-5">
            <button className="bg-orange-600 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button>
          </Link>}

          <button className="mb-4">
            <CiShoppingCart
              onClick={toggleCart}
              className="text-2xl md:text-3xl cursor-pointer"
            />
          </button>

          {/* <button className="mb-4 ml-4 " >
            <PiDotsThreeVertical size={22}
              className="text-sm md:text-3xl cursor-pointer"
            />
          </button> */}

          <div className="flex justify-center items-center" onMouseEnter={() => setDropHelp(true)} onMouseLeave={() => { setDropHelp(false) }}>
            <span className="mb-4 ml-4" >
              <PiDotsThreeVertical size={22}
                className="text-sm md:text-3xl cursor-pointer"
              />
            </span>

            <div>
              <Link href={""}>
                {dropHelp && !sidebar && <div className="fixed top-12 right-5 bg-white shadow-lg border rounded-md py-4 px-5 w-32 z-50">
                  <ul>
                    <Link href={"/myaccount"}><li className="py-1 hover:text-orange-700 text-sm">Help Center</li></Link>
                    <Link href={"/myaccount"}><li className="py-1 hover:text-orange-700 text-sm">Contact Us</li></Link>
                    <Link href={"/myaccount"}><li className="py-1 hover:text-orange-700 text-sm">Feedback</li></Link>
                  </ul>
                </div>}
              </Link>
            </div>

          </div>


        </div>


        <div
          className={`sidebar absolute sideCart overflow-y-scroll w-72 h-[100vh] top-0
         bg-orange-100 px-8 py-10 z-20 transition-all
      ${sidebar ? 'right-0' : "-right-96"}`}
          ref={ref}
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span
            className="absolute top-2 right-2 text-2xl text-orange-500 cursor-pointer"
            onClick={toggleCart}
          >
            <IoIosCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 && (
              <div className="my-4 font-semibold">Your cart is Empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-3 ">
                    <div className="w-2/3 px-2 font-semibold">
                      {cart[k].name} ({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="w-1/3 flex justify-center items-center font-semibold text-lg">
                      <CiCircleMinus
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <CiCirclePlus
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          {/* <div className="subt flex justify-center">{subTotal}</div> */}
          <div className="subt flex justify-left my-2">
            <p className="font-semibold">
              Total <span className="font-normal">₹{subTotal}</span>
            </p>
          </div>

          <div className="flex">
            <Link href={"/checkout"}>
              <button className="flex text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-md">
                <IoBagCheckOutline className="m-1" /> Checkout
              </button>
            </Link>
            <button
              onClick={clearCart}
              className="flex ml-3 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-md"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div >
    </>
  );
};

export default Navbar;
