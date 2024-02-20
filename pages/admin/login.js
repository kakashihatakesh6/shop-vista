/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Head from "next/head";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push('/')
        }
    }, [router])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = { email, password };
            let apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/login`;

            // let axiosConfig = {
            //   headers: {
            //     'Content-Type': 'application/json',
            //     "Access-Control-Allow-Origin": "*",
            //   }
            // };

            let res = await axios.post(apiUrl, { data });
            let response = await res.data;
            console.log(response);

            if (response.success == true) {
                localStorage.setItem("token", response.token);
                localStorage.setItem("myUser", JSON.stringify(response.myUser));
                toast.success("You are successfully logged in!", {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                toast.error("response.error", {
                    position: "top-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

            setEmail("");
            setPassword("");

        } catch (error) {
            toast.error("Please Enter The Valid Credentials", {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


    };

    const handleChange = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value);
        } else if (e.target.name == "password") {
            setPassword(e.target.value);
        }
    };


    return (
        <>
            <Head>
                <title>Admin | Login</title>
            </Head>

            <div className="flex min-h-screen flex-col justify-start px-6 py-12 lg:px-8">
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
                    <h2 className="mt-6 mx-auto text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Admin Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={handleChange}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link
                                        href={"/forgot"}
                                        className="font-semibold text-orange-600 hover:text-orange-500"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={handleChange}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <Link
                        href="/signup"
                        className="font-semibold leading-6 text-orange-600 hover:text-orange-500"
                    >
                        {" "}
                        Create a account
                    </Link>
                </p> */}
                </div>
            </div>
        </>
    );
};

export default Login;
