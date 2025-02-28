import OrderList from '@/components/OrderList'
import React from 'react'

const NewOrderListPage = () => {
    return (
        <div className="container mx-auto px-8 py-8">
            {/* <h1 className="text-3xl font-bold mb-6">My Orders</h1> */}
            <OrderList />
        </div>
    )
}

export default NewOrderListPage