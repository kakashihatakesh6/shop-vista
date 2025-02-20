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
import { Minus, Plus, X } from "lucide-react";
import NewCart from "@/components/NewCart";
import CartButton from "./CartButton";


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
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)

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

  const handleProceed = () => {
    if (cartItems.length === 0) {
      toast.error("Please add items to the cart before proceeding.")
      return
    }
    setShowCustomerForm(true)
    setShowCart(false)
  }

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

  const navLinks = [
    {
      name: 'Smartphones',
      href: '/smartphones'
    },
    {
      name: 'Clothes',
      href: '/tshirts'
    },
    {
      name: 'Baby & Kids',
      href: '/kids'
    },
    {
      name: 'Electronics',
      href: '/electronics'
    },
    {
      name: 'Jwelery',
      href: '/jwelery'
    },
    {
      name: 'Cameras',
      href: '/jewelery'
    },
    {
      name: 'Audio',
      href: '/jewelery'
    },
    {
      name: 'Laptop',
      href: '/jewelery'
    },
    {
      name: 'Books',
      href: '/books'
    },
    {
      name: 'Kitchen',
      href: '/kitchen'
    },
    {
      name: 'Offer Zone',
      href: '/kitchen'
    },
  ]

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  }

  console.log("cart =>", cart)

  return (
    <>
      <div className={`flex flex-col navbar justify-center md:flex-row md:justify-start 
            items-center py-2 shadow-md sticky top-0
      bg-white z-10`}>

        <div className="logo absolute left-1 top-1 md:relative order-1 mx-12 px-2 rounded-full " style={{ width: '101px', height: '44px' }}>
          <Link href={"/"}>
            <p className="font-semibold text-2xl">Shop<span className="text-orange-400">Vista</span></p>
          </Link>
        </div>

        <div className="nav relative md:mx-12 md:order-2 order-3">
          <ul className="flex py-3 px-4 md:px-20 mt-10 md:mt-0 rounded-md uppercase text-white md:justify-center md:items-center flex-wrap space-x-1 md:space-x-3 text-sm md:text-md font-bold "
            style={{ background: 'linear-gradient(45deg, #fa630e, #f1bf80, #ff550a)' }}>
            {navLinks.map((item, index) => (
              <Link key={index} href={`${item.href}`}>
                <li className="hover:text-orange-600">{item.name}</li>
              </Link>
            ))}

          </ul>
        </div>

        <div className="flex order-2 md:order-3 justify-center items-center cart mx-5 my-1 absolute right-0 top-1 md:top-2 ">

          <div onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>

            {user.value ? (
              <span className="flex flex-row justify-center items-center p-1 mb-4 mx-2 md:mx-12 ">
                <FaRegUserCircle className="text-2xl mx-2 cursor-pointer" />
                <p className="font-normal">Nikhil</p>
              </span>
            ) : (
              <Link href={"/login"} className="mb-4 md:mx-5">
                <button className="bg-orange-600 px-2 py-1 mb-4 rounded-md text-sm text-white mx-2">Login</button>
              </Link>
            )}


            <div>
              <Link href={""}>
                {dropdown && user.value && <div className="main-drop fixed right-36 bg-white shadow-lg border top-14 rounded-md py-4 px-5 w-32 z-20">
                  <ul>
                    <Link href={"/myaccount"}><li className="py-1 hover:text-orange-700 text-sm">My Account</li></Link>
                    <Link href={"/myorders"}><li className="py-1 hover:text-orange-700 text-sm">Orders</li></Link>
                    <Link onClick={logout} href={"/login"}><li className="py-1 hover:text-orange-700 text-sm">Logout</li></Link>
                  </ul>
                </div>}
              </Link>
            </div>

          </div>

          <CartButton
            itemCount={cartItems.length}
            onClick={() => setShowCart(true)}
          />

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


        <NewCart
          items={cart}
          updateQuantity={addToCart}
          removeItem={removeFromCart}
          onClose={() => setShowCart(false)}
          onProceed={handleProceed}
          isOpen={showCart}
        />

      </div >
    </>
  );
};

export default Navbar;
