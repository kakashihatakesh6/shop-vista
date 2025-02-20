import { ShoppingCart } from "lucide-react"

export default function CartButton({ itemCount, onClick }) {
  return (
    <button
      onClick={onClick}
      // className="mb-4 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
      className="mb-4 text-black p-2 rounded-full  transition-colors"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}

