import React, { useEffect } from "react"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

export default function ProfileUpdate() {
    const [imagePreview, setImagePreview] = useState("/placeholder.svg?height=128&width=128")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();
    const [formData, setFormData] = useState()
    const [user, setUser] = useState()



    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsSubmitting(false)
    }

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
        setFormData({
            name: res.name,
            address: res.address,
            email: res.email,
            pincode: res.pincode,
            phone: res.phone
        })
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

    return (
        <div className="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-1">Profile Settings</h2>
                <p className="text-gray-600 mb-6">Update your profile information and preferences.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Image
                                src={'/t-shirt.webp' || "/placeholder.svg"}
                                alt="Profile preview"
                                width={128}
                                height={128}
                                className="rounded-full object-cover w-32 h-32"
                            />
                            <label
                                htmlFor="picture"
                                className="absolute bottom-0 right-0 p-2 rounded-full bg-orange-500 hover:bg-orange-600 cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="sr-only">Upload profile picture</span>
                            </label>
                            <input type="file" id="picture" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h3 className="font-medium">{user?.name}</h3>
                            <p className="text-sm text-gray-500">Upload a new profile picture.</p>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                First name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={user?.name?.split(" ")[0]}
                                placeholder={user?.name?.split(" ")[0]}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Last name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                value={user?.name?.split(" ")[1]}
                                placeholder={user?.name?.split(" ")[1]}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={user?.email}
                            placeholder={user?.email}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            placeholder="Tell us a little bit about yourself"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px]"
                        ></textarea>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            placeholder="Enter your location"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                            Website
                        </label>
                        <input
                            id="website"
                            type="url"
                            placeholder="nikhildasar.vercel.app"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Updating Profile...
                            </>
                        ) : (
                            "Update Profile"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

