import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, Eye } from "lucide-react"
import { generatePDF } from "../lib/pdfGenerator"
import { useRouter } from "next/router"
import axios from "axios"

export default function PaymentHistoryPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({ value: null });
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token");
        const myUser = JSON.parse(localStorage.getItem("myUser"));
        if (!token) {
            router.push('/');
        }
        setUser(myUser);
        // fetchOrders(myUser)
    }, [])

    useEffect(() => {

        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            const myUser = JSON.parse(localStorage.getItem("myUser"));
            console.log("fetching orders", myUser)
            setLoading(true);
            try {
                const endpoint = `${process.env.NEXT_PUBLIC_HOST}/api/getorders?userId=${myUser._id}`;
                const res = await axios.get(endpoint);
                const orderRes = res.data.orders.reverse();
                console.log("res =>", orderRes)
                setOrders(orderRes);
                setLoading(false);

            } catch (error) {
                console.log("some error occurred.", error)
                setLoading(false)
            }
        }

        fetchOrders()

    }, [])



    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "failed":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const handleDownload = (order) => {
        generatePDF(order)
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex w-full justify-center">
                <h1 className='font-semibold text-center pb-5 text-2xl'>My Orders</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            {/* <th className="py-3 px-4 text-left">#</th> */}
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Order ID</th>
                            {/* <th className="py-3 px-4 text-left">Customer</th> */}
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Amount</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                <td className="py-3 px-4">{order._id}</td>
                                {/* <td className="py-3 px-4">{order?.customer?.name}</td> */}
                                <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                {/* <td className="py-3 px-4">${order.total.toFixed(2)}</td> */}
                                <td className="py-3 px-4">₹{order.totalPrice}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex space-x-2">
                                        <Link href={`/receipt/${order._id}`}>
                                            <button className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                                <Eye size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDownload(order)}
                                            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                        >
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* <div className="mt-8">
                <Link href="/" className="text-blue-500 hover:text-blue-700">
                    &larr; Back to POS
                </Link>
            </div> */}
        </div>
    )
}