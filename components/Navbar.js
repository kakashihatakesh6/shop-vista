/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronDown, CircleUserRound, EllipsisVertical, ShoppingCart } from "lucide-react";
import NewCart from "@/components/NewCart";
import CartButton from "./CartButton";

const Navbar = ({ user, cart, addToCart, removeFromCart, clearCart, subTotal, logout }) => {
  const [dropdown, setDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const [myUser, setMyUser] = useState()
  const router = useRouter();
  console.log("user =>", user)

  useEffect(() => {
    if (["/checkout", "/order", "/orders"].includes(router.pathname)) {
      setShowCart(false);
    }

    const myUser = JSON.parse(localStorage.getItem("myUser"));
    setMyUser(myUser);

  }, [router.pathname]);

  return (
    <div className="navbar flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md sticky top-0 bg-white z-10">
      <div className="logo absolute left-1 md:relative mx-8 px-2 rounded-full">
        <Link href="/">
          <p className="font-semibold text-2xl">Shop<span className="text-orange-400">Vista</span></p>
        </Link>
      </div>

      <div className="nav relative md:mx-12">
        <ul className="flex py-3 px-10 mt-10 md:mt-0 rounded-md uppercase text-white md:justify-center md:items-center flex-wrap space-x-1 md:space-x-3 text-sm md:text-md font-bold" style={{ background: 'linear-gradient(45deg, #fa630e, #f1bf80, #ff550a)' }}>
          {[{ name: "Smartphones", href: "/smartphones" }, { name: "Clothes", href: "/tshirts" }, { name: "Baby & Kids", href: "/kids" }, { name: "Electronics", href: "/electronics" }, { name: "Jewelry", href: "/jewelery" }, { name: "Cameras", href: "/jewelery" }, { name: "Audio", href: "/jewelery" }, { name: "Laptop", href: "/jewelery" }, { name: "Books", href: "/books" }, { name: "Kitchen", href: "/kitchen" }, { name: "Offer Zone", href: "/kitchen" }].map((item, index) => (
            <Link key={index} href={item.href}>
              <li className="hover:text-orange-600">{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="hidden md:flex md:items-center md:space-x-4 relative">
        {myUser ? (
          <div className="relative">
            <button onClick={() => setDropdown(!dropdown)} className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
              <CircleUserRound size={28} className="mr-2" />
              <span>{myUser?.name.split(" ")[0] || 'Nikhil'}</span>
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${dropdown ? "rotate-180" : ""}`} />
            </button>
            {dropdown && (
              <div className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                <Link href="/newuserprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                <Link href="/myorders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-orange-600 px-4 py-1 rounded-md text-white">Login</button>
          </Link>
        )}

        <div className="relative">
          <CartButton itemCount={Object.keys(cart).length} onClick={() => setShowCart(true)} />
          {Object.keys(cart).length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {Object.keys(cart).length}
            </span>
          )}
        </div>

        <div className="relative">
          <button onClick={() => setMoreDropdown(!moreDropdown)} className="inline-flex items-center px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
            <EllipsisVertical size={28} />
          </button>
          {moreDropdown && (
            <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
              <Link href="/myaccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</Link>
              <Link href="/myaccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact Us</Link>
              <Link href="/myaccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Feedback</Link>
            </div>
          )}
        </div>
      </div>

      <NewCart items={cart} updateQuantity={addToCart} removeItem={removeFromCart} onClose={() => setShowCart(false)} isOpen={showCart} />
    </div>
  );
};

export default Navbar;
