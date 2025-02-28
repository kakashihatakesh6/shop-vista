import React from 'react'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import OrderDetails from '@/components/OrderDetails';

export default function OrdersPost({params}) {
    const router = useRouter();
    console.log("params =>", params)
    const { orderId } = router.query;
    console.log("orderId =>", orderId)
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // useEffect(() => {
    //     const fetchOrder = async () => {
    //         try {
    //             // const response = await fetch(`/api/order/${slug}`)
    //             const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getorder?slug=${slug}`)
    //             console.log("API call: ", response)

    //             if (!response.ok) {
    //                 throw new Error(
    //                     response.status === 404
    //                         ? "Order not found"
    //                         : "Failed to fetch order details"
    //                 )
    //             }

    //             const orderData = await response.json()
    //             setOrder(orderData.order)
    //         } catch (err) {
    //             console.log("error occurred while fetching order details =>", err)
    //             setError(err instanceof Error ? err.message : "Failed to fetch order details")
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     if (slug) {
    //         fetchOrder()
    //     }
    // }, [])

    // if (loading) {
    //     return <div className="text-center mt-8">Loading...</div>
    // }

    // if (error) {
    //     return <div className="text-center mt-8 text-red-500">{error}</div>
    // }

    // if (!order) {
    //     return <div className="text-center mt-8">Order not found</div>
    // }

    return (
        <div className="container mx-auto px-4 py-8">
            <OrderDetails orderId={orderId} />
        </div>
    )
}





