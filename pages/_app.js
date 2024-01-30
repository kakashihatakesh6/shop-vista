// import '@/styles/globals.css'
import '../styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0)
  const router = useRouter();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    console.log("This is useEffect from _app.js")
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
    try {

      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }

    } catch (error) {
      console.error(error);
      localStorage.clear();
    }

    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random())
    }

  }, [router.query])

  // Saving Cart to local storage
  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);

    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt)
  }
  // Adding Items to cart
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }
    setCart(newCart);
    saveCart(newCart);
    
  }

  // Clear Cart
  const clearCart = () => {
    setCart({})
    saveCart({})
  }

  //Remove From Cart
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    console.log(newCart[itemCode])
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart);
    saveCart(newCart)
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    saveCart({})

    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant }

    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout')


    // addToCart(slug, 1, 499, product.title, size, color)
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    // router.push("/")
  }

  return <>
   <LoadingBar
        color='#ec4899'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
    <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
    <Component user={user} buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer />
   
  </>
}
