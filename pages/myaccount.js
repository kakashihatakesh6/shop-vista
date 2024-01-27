import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const MyAccount = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    // const [disable, setDisable] = useState("")
    const [user, setUser] = useState({ value: null });
    const [password, setPassword] = useState("");
    const [cnpassword, setCNPassword] = useState("");
    const [npassword, setnpassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const myUser = JSON.parse(localStorage.getItem("myUser"));
        setUser(myUser);
        if (!token) {
            router.push('/')
        }
        // console.log("myUser =>", myUser);

        fetchData(token);

    }, [router.query])


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
    }

    const handleUserSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = { email: user.email, token: token, address, name, phone, pincode };
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const edata = await res.json();
            console.log("HandleUserSubmitData =>", edata);

            toast.success("User has been updated!", {
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
        catch (error) {
            console.log("Error", error);
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
    }


    const handlePassword = async () => {
        try {

            if (npassword === cnpassword) {

                const token = localStorage.getItem("token");
                const data = { token: token, password, npassword, cnpassword };

                const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(data)
                });
                const response = await res.json();
                console.log("HandlePassData =>", response);

                if (response.success) {
                    toast.success("Password updated!", {
                        position: "top-left",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    setPassword("");
                    setnpassword("");
                    setCNPassword("");
                } else {
                    toast.error("Invalid Credentials", {
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
            }else{
                console.log(error, "Invalid Credentials!");
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


        } catch (error) {
            console.log("Error", error);
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
    }


    const handleChange = async (e) => {

        if (e.target.name == 'name') {
            setName(e.target.value);
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value);
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value);
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
        else if (e.target.name == 'npassword') {
            setnpassword(e.target.value);
        }
        else if (e.target.name == 'cnpassword') {
            setCNPassword(e.target.value);
        }
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value);
        }
    }


    return (
        <>
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
            <div className='container mx-auto my-9'>
                <h1 className='text-3xl text-center font-bold'>Update your Account</h1>
            </div>

            <div className='container px-6 md:mx-18'>
                <h2 className='font-semibold text-xl'>1. Delivery Details</h2>

                <div className="flex mx-auto my-2">

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input value={name} onChange={handleChange} type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">

                        {user ?
                            (
                                <div className="mb-4">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email <span className='font-semibold text-red-800'>(cannot be updated)</span></label>
                                    <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                    <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            )}

                    </div>

                </div>



                <div className="px-2 w-full">
                    <div className="mb-4">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                        <textarea value={address} onChange={handleChange} className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' name="address" id="address" cols="30" rows="2"></textarea>
                    </div>
                </div>

                <div className="flex mx-auto my-2">

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                            <input value={phone} onChange={handleChange} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/2">
                        <div className="mb-4">
                            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                            <input value={pincode} onChange={handleChange} type="pincode" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                </div>

                <div className="flex justify-left my-3">
                    <Link href={''} onClick={handleUserSubmit}>
                        <button className="flex mx-2 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-md">
                            Submit</button>
                    </Link>
                </div>



                <h2 className='font-semibold text-xl'>2. Change Password</h2>


                <div className="flex mx-auto my-2">

                    <div className="px-2 w-1/3">
                        <div className="mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input value={password} onChange={handleChange} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/3">
                        <div className="mb-4">
                            <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
                            <input value={npassword} onChange={handleChange} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="px-2 w-1/3">
                        <div className="mb-4">
                            <label htmlFor="cnpassword" className="leading-7 text-sm text-gray-600">Confirm NewPassword</label>
                            <input value={cnpassword} onChange={handleChange} type="password" id="cnpassword" name="cnpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                </div>


                <div className="flex justify-left my-2">
                    <Link href={''} onClick={handlePassword}>
                        <button className="flex mx-2 text-white bg-orange-500 border-0 py-2 px-2 focus:outline-none hover:bg-orange-600 rounded text-md">
                            Submit</button>
                    </Link>
                </div>

            </div>
        </>
    )
}


// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readyState) {
//         await mongoose.connect(process.env.MONGO_URI)
//     }
//     let gotUser = Product.findOne({email: user.email});

//     return {
//         props: {gotUser: gotUser}
//     }

// }



export default MyAccount