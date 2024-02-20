import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';

const Orders = () => {
    const [Orders, setOrders] = useState();
    const [IsLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({ value: null });
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const myUser = JSON.parse(localStorage.getItem("myUser"));
        if (!token) {
            router.push('/');
        }
        setUser(myUser);
        fetchOrders(myUser)
    }, [])

    const fetchOrders = async (myUser) => {
        setIsLoading(true);
        try {
            const endpoint = `${process.env.NEXT_PUBLIC_HOST}/api/getorders?userId=${myUser._id}`;
            const res = await axios.get(endpoint);
            const orderRes = res.data.orders;
            console.log(orderRes)
            setOrders(orderRes);
            setIsLoading(false);

        } catch (error) {
            console.log({ error: "Some Error Occured!" })
            setIsLoading(false)
        }
    }

    console.log("oders =>", Orders)



    return (
        <div>

            <h1 className='font-semibold text-center p-5 text-2xl'>My Orders</h1>
            {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}
            <div className="flex flex-col min-h-screen">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">OrderId</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Price</th>
                                        <th scope="col" className="px-6 py-4">Shipping Address</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Orders?.map((item, index) => (
                                        <tr key={index}
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item._id}</td>
                                            {item.products.map((item2, index2) => (
                                                <>
                                                    <td className="whitespace-nowrap px-6 py-4">{item2.name}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{item2.price}</td>
                                                </>
                                            ))}
                                            <td className="whitespace-nowrap px-6 py-4">{item.shippingAddress.address}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.status}</td>
                                        </tr>
                                    ))}

                                    {/* <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                        <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                                        <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                                        <td className="whitespace-nowrap px-6 py-4">@fat</td>
                                    </tr>
                                    <tr
                                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                        <td className="whitespace-nowrap px-6 py-4">Larry</td>
                                        <td className="whitespace-nowrap px-6 py-4">Wild</td>
                                        <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                                    </tr>
                                     */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}


export default Orders


