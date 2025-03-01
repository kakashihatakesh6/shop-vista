/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { orders } from "../lib/orders"
import { DownloadIcon } from "lucide-react"
import { generatePDF } from "@/lib/pdfGenerator"

// Icons (same as before)
function ArrowLeftIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 19-7-7 7-7"></path>
      <path d="M19 12H5"></path>
    </svg>
  )
}

function PackageIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.29 7 12 12 20.71 7"></polyline>
      <line x1="12" y1="22" x2="12" y2="12"></line>
    </svg>
  )
}

function ClockIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
}

function TruckIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 17h4V5H2v12h3"></path>
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"></path>
      <path d="M14 17h1"></path>
      <circle cx="7.5" cy="17.5" r="2.5"></circle>
      <circle cx="17.5" cy="17.5" r="2.5"></circle>
    </svg>
  )
}

function HomeDeliveryIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  )
}

function CheckCircleIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  )
}

function AlertCircleIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" x2="12" y1="8" y2="12"></line>
      <line x1="12" x2="12.01" y1="16" y2="16"></line>
    </svg>
  )
}

function ShoppingBagIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
      <path d="M3 6h18"></path>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  )
}

export default function OrderDetails({ orderId }) {
  const [order, setOrder] = useState(null)
  const [activeTab, setActiveTab] = useState("items")
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/getorder?orderId=${orderId}`) // Adjust API endpoint accordingly
        if (!response.ok) {
          throw new Error("Failed to fetch order")
        }
        const data = await response.json()
        console.log("order =>", data)
        setOrder(data.order)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])


  // useEffect(() => {
  //   // Find the order with the matching ID
  //   const foundOrder = orders.find((o) => o.id === orderId)
  //   if (foundOrder) {
  //     setOrder(foundOrder)
  //   }
  // }, [orderId])

  // Format status for display
  const formatStatus = (status) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "order_placed":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-purple-100 text-purple-800"
      case "shipped":
        return "bg-amber-100 text-amber-800"
      case "out_for_delivery":
        return "bg-teal-100 text-teal-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "returned":
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "order_placed":
        return <ShoppingBagIcon className="h-4 w-4" />
      case "processing":
        return <ClockIcon className="h-4 w-4" />
      case "shipped":
        return <TruckIcon className="h-4 w-4" />
      case "out_for_delivery":
        return <HomeDeliveryIcon className="h-4 w-4" />
      case "delivered":
        return <CheckCircleIcon className="h-4 w-4" />
      case "cancelled":
        return <AlertCircleIcon className="h-4 w-4" />
      case "returned":
        return <PackageIcon className="h-4 w-4" />
    }
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 px-8 mb-6">
      <div className="flex items-center gap-4">
        <Link href="/neworder" className="p-2 border rounded-full hover:bg-gray-50 transition-colors">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Order {order.orderNumber}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
            >
              {getStatusIcon(order.status)}
              <span className="ml-1">{formatStatus(order.status)}</span>
            </span>
          </h1>
          <p className="text-gray-500">Placed on {format(new Date(order.date), "MMMM d, yyyy")}</p>
        </div>
      </div>

      {/* Order Tracking */}
      {order.status !== "cancelled" && order.status !== "returned" && (
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4">Order Status</h2>
          <OrderTracker order={order} />

          {order.trackingNumber && (
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Tracking Number</p>
                <p className="text-sm text-gray-500">{order.trackingNumber}</p>
              </div>
              {order.estimatedDelivery && (
                <div className="mt-2 sm:mt-0">
                  <p className="text-sm font-medium">Estimated Delivery</p>
                  <p className="text-sm text-gray-500">{format(new Date(order.estimatedDelivery), "MMMM d, yyyy")}</p>
                </div>
              )}
              <button className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Track Package
              </button>
            </div>
          )}
        </div>
      )}

      {/* Receipt and Invoice Section */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Order Invoice</h2>
          <button
            onClick={() => {
              /* Add download logic here */
              generatePDF(order)
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <DownloadIcon className="h-5 w-5 mr-2" />
            Download Invoice
          </button>
        </div>
        <div className="border-t pt-4">
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax</span>
                <span>₹{(order.total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Total</span>
                <span>₹{(order.total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Tabs */}
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === "items" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("items")}
            >
              Items
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === "shipping" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("shipping")}
            >
              Shipping
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === "payment" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("payment")}
            >
              Payment
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "items" && (
            <div className="space-y-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <img
                      src={"/no_image.png"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        ₹{item.price.toFixed(2)}
                      </span>
                      {order.status === "delivered" && (
                        <button className="text-sm text-blue-600 hover:underline">Write a Review</button>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-6">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₹{order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>₹{(order.total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t my-2 pt-2"></div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{(order.total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>

              {(order.status === "shipped" || order.status === "out_for_delivery" || order.status === "delivered") && (
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Shipping Method</h4>
                  <p>Standard Shipping (3-5 business days)</p>
                  {order.trackingNumber && (
                    <div className="mt-2">
                      <p className="text-sm">Tracking Number: {order.trackingNumber}</p>
                      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Track Package
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "payment" && (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Payment Method</h4>
                <p>{order.paymentMethod}</p>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Billing Address</h4>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Link href="/orders" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Back to Orders
        </Link>

        {order.status === "delivered" && (
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Buy Again
          </button>
        )}

        {(order.status === "order_placed" || order.status === "processing") && (
          <button className="px-6 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            Cancel Order
          </button>
        )}
      </div>
    </div>
  )
}

function OrderTracker({ order }) {
  const steps = [
    { id: "order_placed", label: "Order Placed" },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "out_for_delivery", label: "Out for Delivery" },
    { id: "delivered", label: "Delivered" },
  ]

  // Find the current step index
  const currentStepIndex = steps.findIndex((step) => step.id === order.status)

  // If cancelled or returned, don't show the tracker
  if (order.status === "cancelled" || order.status === "returned") {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-700">
          {order.status === "cancelled" ? "This order was cancelled" : "This order was returned"}
        </p>
      </div>
    )
  }

  return (
    <div className="relative pb-12">
      <div className="flex items-center justify-between mb-16">
        {steps.map((step, index) => {
          // Check if this step is completed based on status history
          const isCompleted = order.statusHistory.some((history) => history.status === step.id)
          const isCurrent = step.id === order.status

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isCompleted ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 text-gray-400"
                  }`}
              >
                {step.id === "order_placed" && <ShoppingBagIcon className="h-5 w-5" />}
                {step.id === "processing" && <ClockIcon className="h-5 w-5" />}
                {step.id === "shipped" && <TruckIcon className="h-5 w-5" />}
                {step.id === "out_for_delivery" && <HomeDeliveryIcon className="h-5 w-5" />}
                {step.id === "delivered" && <CheckCircleIcon className="h-5 w-5" />}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${isCurrent ? "text-blue-600" : isCompleted ? "text-gray-900" : "text-gray-500"
                  }`}
              >
                {step.label}
              </span>
              {isCurrent && (
                <span className="mt-1 text-xs text-gray-500">
                  {step.id === "order_placed"
                    ? "We've received your order"
                    : step.id === "processing"
                      ? "Preparing your order"
                      : step.id === "shipped"
                        ? "Your order is on the way"
                        : step.id === "out_for_delivery"
                          ? "Arriving today"
                          : "Your order has arrived"}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{
            width:
              order.status === "order_placed"
                ? "0%"
                : order.status === "processing"
                  ? "25%"
                  : order.status === "shipped"
                    ? "50%"
                    : order.status === "out_for_delivery"
                      ? "75%"
                      : order.status === "delivered"
                        ? "100%"
                        : "0%",
          }}
        />
      </div>

      {/* Status history timeline */}
      <div className="mt-8 border-l-2 border-gray-200 pl-4 space-y-6">
        {order.statusHistory.map((history, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-6 mt-1 w-4 h-4 rounded-full bg-blue-600"></div>
            <div>
              <p className="font-medium">
                {history.status === "order_placed"
                  ? "Order Placed"
                  : history.status === "processing"
                    ? "Processing"
                    : history.status === "shipped"
                      ? "Shipped"
                      : history.status === "out_for_delivery"
                        ? "Out for Delivery"
                        : history.status === "delivered"
                          ? "Delivered"
                          : history.status === "cancelled"
                            ? "Cancelled"
                            : "Returned"}
              </p>
              <p className="text-sm text-gray-500">{format(new Date(history.date), "MMMM d, yyyy")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

