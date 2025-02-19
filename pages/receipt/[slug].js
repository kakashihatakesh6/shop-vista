import React from 'react'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function ReceiptPost() {
    const router = useRouter();
    const { slug } = router.query;
    console.log("slug =>", slug)
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // const response = await fetch(`/api/order/${slug}`)
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getorder?slug=${slug}`)
                console.log("API call: ", response)

                if (!response.ok) {
                    throw new Error(
                        response.status === 404
                            ? "Order not found"
                            : "Failed to fetch order details"
                    )
                }

                const orderData = await response.json()
                setOrder(orderData.order)
            } catch (err) {
                console.log("error occurred while fetching order details =>", err)
                setError(err instanceof Error ? err.message : "Failed to fetch order details")
            } finally {
                setLoading(false)
            }
        }

        if (slug) {
            fetchOrder()
        }
    }, [slug])

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500">{error}</div>
    }

    if (!order) {
        return <div className="text-center mt-8">Order not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-2">
                <button
                    // onClick={() => router.back()}
                    onClick={() => router.push('/myorders')}
                    className="mr-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center"
                >
                    <span>← Back</span>
                </button>
                {/* <h1 className="text-3xl font-bold ml-32">Receipt</h1> */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold">Order ID: {order._id}</h2>
                    <p>Date: {new Date(order?.createdAt).toLocaleString()}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Customer Details:</h3>
                    <p>Name: {order?.shippingAddress?.name}</p>
                    <p>Email: {'nkdasar@gmail.com'}</p>
                    <p>Phone: {order?.shippingAddress?.mobileNo}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Items:</h3>
                    <table className="w-full mt-2">
                        <thead>
                            <tr>
                                <th className="text-left">Item</th>
                                <th className="text-left">Quantity</th>
                                <th className="text-right">Price</th>
                                <th className="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.products?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td className="text-right">₹{item.price.toFixed(2)}</td>
                                    <td className="text-right">₹{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="text-xl font-bold mb-4 text-right">Total: ${order.total.toFixed(2)}</div> */}
                <div className="text-xl font-bold mb-4 text-right">Total: ₹{order.totalPrice}</div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold">Payment Information:</h3>
                    <p>Payment ID: {order._id}</p>
                    <p>Status: Paid</p>
                </div>
            </div>
        </div>
    )
}





