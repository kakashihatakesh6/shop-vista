import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart, CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";

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
  const [sidebar, setSidebar] = useState(false);
  const [myuser, setmyuser] = useState({})
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ['/checkout', '/order', '/orders']
    if (exempted.includes(router.pathname)) {
      setSidebar(false)
    }


    const u = JSON.parse(localStorage.getItem("myUser"));
    setmyuser(u);

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

      <Link href={""}>
        {dropdown && !sidebar && <div className="main-drop absolute right-[5.1rem] bg-white shadow-lg border top-11 rounded-md py-4 px-5 w-32 z-20">
          <ul>
            <Link href={"/myaccount"}><li className="py-1 hover:text-orange-700 text-sm">My Account</li></Link>
            <Link href={"/orders"}><li className="py-1 hover:text-orange-700 text-sm">Orders</li></Link>
            <Link onClick={logout} href={"/login"}><li className="py-1 hover:text-orange-700 text-sm">Logout</li></Link>
          </ul>
        </div>}
      </Link>

      <div className={`flex flex-col navbar justify-center md:flex-row
     md:justify-start items-center py-2 shadow-md sticky top-0
      bg-white z-10 ${!sidebar && 'overflow-hidden'}`}>
        <div className="logo mx-8 ">
          <Link href={"/"}>
            <Image
              src={"/wearme-bar.png"}
              width={100}
              height={20}
              alt=""
              style={{ width: "auto", height: "auto" }}
            />
          </Link>
        </div>
        <div className="nav my-2 mx-12">
          <ul className="flex items-center space-x-3 md:text-md font-bold">
            <Link href={"/tshirts"}>
              <li className="hover:text-orange-600">Tshirts</li>
            </Link>
            <Link href={"/hoodies"}>
              <li className="hover:text-orange-600">Hoodies</li>
            </Link>
            <Link href={"/stickers"}>
              <li className="hover:text-orange-600">Stickers</li>
            </Link>
            <Link href={"/mugs"}>
              <li className="hover:text-orange-600">Mugs</li>
            </Link>
            <Link href={"/mugs"}>
              <li className="hover:text-orange-600">Books</li>
            </Link>
            <Link href={"/mugs"}>
              <li className="hover:text-orange-600">Smartphones</li>
            </Link>
            <Link href={"/mugs"}>
              <li className="hover:text-orange-600">Tools</li>
            </Link>
          </ul>
        </div>

        <div className="flex cart mx-5 my-1 absolute right-0 top-1 md:top-2 ">

          <Link href={"/"} onMouseOver={() => { setDropdown(true) }}  >
            {/* {dropdown && !sidebar && <div className="absolute right-12 bg-white shadow-lg border top-6 rounded-md py-4 px-5 w-32 z-80">
              <ul>
                <Link href={"/myaccount"}><li className="py-1 hover:text-orange-700 text-sm">My Account</li></Link>
                <Link href={"/orders"}><li className="py-1 hover:text-orange-700 text-sm">Orders</li></Link>
                <Link onClick={logout} href={"/login"}><li className="py-1 hover:text-orange-700 text-sm">Logout</li></Link>
              </ul>
            </div>} */}

            {user.value && !sidebar && <span onMouseLeave={() => setDropdown(false)} className="flex flex-row justify-center items-center p-1 mb-4 md:mx-14 ">
              <MdAccountCircle className="text-2xl mx-2 md:text-3xl cursor-pointer" />
              <p className="font-semibold ">{myuser.name}</p>
            </span>}

          </Link>

          {!user.value && <Link href={"/login"}>
            <button className="bg-orange-600 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button>
          </Link>}

          <CiShoppingCart
            onClick={toggleCart}
            className="text-2xl md:text-3xl cursor-pointer"
          />

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
