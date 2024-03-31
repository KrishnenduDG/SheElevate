import React from 'react'

const ProductCard = () => {
  return (
    <div className="group relative block overflow-hidden max-w-[300px] border rounded-xl drop-shadow-xl">

      <img
        src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 bg-white p-6">
        <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"> New </span>

        <h3 className="mt-4 text-lg font-medium text-gray-900">

        </h3>

        <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

        <form className="mt-4">
          <button
            className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
          >
            Click to view
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductCard