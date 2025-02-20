import { X, Plus, Minus } from "lucide-react"
import { useRouter } from "next/router"

// interface CartProps {
//   items: CartItem[]
//   updateQuantity: (id: string, quantity: number) => void
//   removeItem: (id: string) => void
//   onClose: () => void
//   onProceed: () => void
//   isOpen: boolean
// }

export default function NewCart({ items, updateQuantity, removeItem, onClose, onProceed, onClearCart, isOpen }) {
  const total = Object.keys(items)?.reduce((sum, item) => sum + items[item].price * items[item].qty, 0)
  console.log("items in new cart =>", items, total)
  const router = useRouter()

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } z-40`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[448px] bg-white shadow-2xl transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-out z-50`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {Object.keys(items)?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-lg">Your cart is empty</p>
              </div>
            ) : (
              Object.keys(items)?.map((k, index) => (
                <div
                  key={k}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    {/* <h3 className="font-semibold text-gray-800">{item?.name}</h3> */}
                    <h3 className="font-semibold text-gray-800">{items[k].name}</h3>
                    <p className="text-sm text-gray-600">₹{items[k]?.price?.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={() => removeItem(
                          k,
                          1,
                          items[k].price,
                          items[k].name,
                          items[k].size,
                          items[k].variant
                        )}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Minus className="w-4 h-4 text-blue-600" />
                      </button>
                      <span className="mx-3 font-medium text-gray-800">{items[k].qty}</span>
                      <button
                        onClick={() => updateQuantity(
                          k,
                          1,
                          items[k].price,
                          items[k].name,
                          items[k].size,
                          items[k].variant
                        )}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <Plus className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    {/* <button
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button> */}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg text-gray-600">Total</span>
              <span className="text-2xl font-bold text-gray-800">₹{total?.toFixed(2)}</span>
            </div>
            <button
              onClick={() => router.push('/checkout')}
              disabled={items?.length === 0}
              className="w-full bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Proceed to Checkout
            </button>
            
          </div>
        </div>
      </div>
    </>
  )
}

