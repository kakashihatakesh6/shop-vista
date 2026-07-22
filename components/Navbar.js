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
    <>
      <div className="navbar flex flex-col md:flex-row justify-center md:justify-start items-center py-2 shadow-md sticky top-0 bg-white z-30">
        <div className="flex w-full md:w-auto justify-between items-center px-4 md:px-0">
          <div className="logo mx-0 md:mx-8 px-2 rounded-full">
            <Link href="/">
              <p className="font-semibold text-2xl">Shop<span className="text-orange-400">Vista</span></p>
            </Link>
          </div>

          {/* Mobile Actions - Only visible on mobile screen sizes (< md) */}
          <div className="flex items-center space-x-2 md:hidden">
            {myUser ? (
              <div className="relative">
                <button onClick={() => setDropdown(!dropdown)} className="inline-flex items-center rounded-md p-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  <CircleUserRound size={24} />
                </button>
                {dropdown && (
                  <div className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">Hi, {myUser?.name.split(" ")[0]}</div>
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="bg-orange-600 px-3 py-1 rounded-md text-white text-sm">Login</button>
              </Link>
            )}

            <div className="relative">
              <CartButton itemCount={Object.keys(cart).length} onClick={() => setShowCart(true)} />
              {Object.keys(cart).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">
                  {Object.keys(cart).length}
                </span>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setMoreDropdown(!moreDropdown)} className="inline-flex items-center p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                <EllipsisVertical size={24} />
              </button>
              {moreDropdown && (
                <div className="absolute right-0 z-40 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Link href="/myaccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</Link>
                  <Link href="/myaccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact Us</Link>
                  <Link href="/myaccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Feedback</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Menu (hidden on mobile, matches original desktop design exactly) */}
        <div className="hidden md:block nav relative md:mx-12">
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
                  <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
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
      </div>

      {/* Mobile Premium Navigation Menu (visible on mobile only, styled as clean visual pills, completely separate row) */}
      <div className="md:hidden w-full overflow-x-auto no-scrollbar py-3 px-4 bg-[#f8fafc] border-b border-gray-200/85 shadow-sm">
        <div className="flex items-center space-x-2.5 whitespace-nowrap">
          {[
            { name: "Smartphones", icon: "📱", href: "/smartphones" },
            { name: "Clothes", icon: "👕", href: "/tshirts" },
            { name: "Baby & Kids", icon: "👶", href: "/kids" },
            { name: "Electronics", icon: "💻", href: "/electronics" },
            { name: "Jewelry", icon: "💎", href: "/jewelery" },
            { name: "Cameras", icon: "📷", href: "/jewelery" },
            { name: "Audio", icon: "🎧", href: "/jewelery" },
            { name: "Laptop", icon: "💻", href: "/jewelery" },
            { name: "Books", icon: "📚", href: "/books" },
            { name: "Kitchen", icon: "🍳", href: "/kitchen" },
            { name: "Offer Zone", icon: "🔥", href: "/kitchen" }
          ].map((item, index) => (
            <Link key={index} href={item.href} className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-orange-50 border border-gray-200/80 rounded-full text-xs font-bold text-gray-700 shadow-sm active:scale-95 transition-all duration-200">
              <span className="text-sm leading-none">{item.icon}</span>
              <span className="leading-none">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <NewCart items={cart} updateQuantity={addToCart} removeItem={removeFromCart} onClose={() => setShowCart(false)} isOpen={showCart} />
    </>
  );
};

export default Navbar;
