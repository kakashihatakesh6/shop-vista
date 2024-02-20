/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [change, setChange] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push('/')
        }
        console.log("router =>", router.query.token)
    }, [router])

    const handleChange = (e) => {

        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        else if (e.target.name === "password") {
            setpassword(e.target.value);
        }
        else if (e.target.name === "cpassword") {
            setCPassword(e.target.value);
        }

    }

    const sendResetEmail = async () => {

        let data = {
            email: email,
            sendMail: true
        }
        console.log(data)
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        });

        let res = await a.json();
        console.log("res =>", res)

        if (res.success) {
            console.log("Password reset instructions have been sent to your email");
            toast.success('Email has been sent', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            console.log("Error");
            toast.error('Sorry, Email is not valid', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const resetPassword = async () => {
        if (password === cpassword) {
            let data = {
                sendMail: false,
                verificationToken: router.query.token,
                password,
                cpassword,
            }
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            })

            let res = await a.json();
            console.log("response =>", res);
            if (res.success) {
                console.log("Password has been changed")
                toast.success('Password changed successfully', {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setChange(true)

                setTimeout(() => {
                    router.push('/login');
                }, 2000);

            } else {
                console.log("Error");
                toast.error('Sorry, Try again', {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        } else {
            console.log("Error");
            toast.error('Sorry, try again', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }


    return (
        <div className="flex min-h-[100vh] flex-col justify-start px-6 py-12 lg:px-8">

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto "
                    src="/logo-shop-round.png"
                    style={{ width: 'auto', height: "75px" }}
                    alt="shop-vista-logo"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
                <p className='mt-2 text-center text-sm text-gray-600'>
                    Or
                    <Link href={'/login'} className='font-medium text-pink-600 hover:text-pink-500' >
                        <span> Login</span>
                    </Link>
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">


                {router.query.token && <div>

                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                    <div className="mt-2">
                        <input value={password} onChange={handleChange} autoComplete='on' id="password" name="password" type="password" required className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                    </div>

                    <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm New Password</label>
                    <div className="mt-2">
                        <input value={cpassword} onChange={handleChange} autoComplete='on' id="cpassword" name="cpassword" type="password" required className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                    </div>

                </div>}


                {!router.query.token && <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input value={email} onChange={handleChange} autoComplete='on' id="email" name="email" type="email" required className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                }


                {router.query.token &&
                    <div>
                        <button disabled={password !== cpassword} onClick={resetPassword} type="Submit" className="flex w-full justify-center 
                            rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold 
                            leading-6 text-white shadow-sm hover:bg-orange-500 
                            focus-visible:outline focus-visible:outline-2 
                            focus-visible:outline-offset-2 disabled:bg-pink-400
                            focus-visible:outline-orange-600">Reset Password</button>
                    </div>
                }

                {change && <span className='text-green-700 my-4 font-semibold'>Password changed successfully!</span>}

                {!router.query.token &&
                    <div>
                        <button onClick={sendResetEmail} type="submit" className="flex w-full justify-center 
                            rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold
                             leading-6 text-white shadow-sm hover:bg-orange-500 
                             focus-visible:outline focus-visible:outline-2
                              focus-visible:outline-offset-2 
                              focus-visible:outline-orange-600">Continue</button>
                    </div>
                }






                {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?
                    <Link href="/signup" className="font-semibold leading-6 text-orange-600 hover:text-orange-500"> Sign in</Link>
                </p> */}
            </div >
        </div >
    )
}

export default Forgot