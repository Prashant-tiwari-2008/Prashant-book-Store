import React from 'react'

const CartPricing = () => {
    
    return (
        <div className='flex basis-[32%] flex-col'>
            <div className="p-6 max-w-md rounded-lg shadow-md dark:shadow-gray-600">
                {/* Price Details */}
                <div className="py-4">
                    <h2 className="font-semibold text-lg mb-2">Price Details (2 Items)</h2>
                    <div className="flex justify-between text-gray-100">
                        <span>Total MRP</span>
                        <span>₹2248.00</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Discount on MRP</span>
                        <span>-₹160.00</span>
                    </div>
                    <div className="flex justify-between text-gray-200">
                        <span>Order Value</span>
                        <span>₹2088.00</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping Charges</span>
                        <span className="text-green-600">Free</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-xl font-semibold">
                        <span>You Pay</span>
                        <span>₹2088.00</span>
                    </div>
                </div>

                {/* Discount Message */}
                <div className="bg-yellow-100 text-yellow-800 text-sm rounded-md p-2 mb-4">
                    <span>Congrats! ₹160 saved on this order</span>
                </div>

                {/* Note */}
                <p className="text-gray-500 text-sm mb-4">
                    Note: Order cannot be cancelled once packed
                </p>

                {/* Proceed Button */}
                <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    PROCEED TO PAYMENT
                </button>
            </div>
        </div>

    )
}

export default CartPricing