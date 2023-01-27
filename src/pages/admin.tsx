import { useState } from "react";
import { trpc } from "../utils/trpc";

const Admin = () => {
  const [price, setPrice] = useState('')
  const [subsequentPrice, setSubsequentPrice] = useState('')
  const getPrice = trpc.parking.getPrice.useQuery();

  const updatePrice = trpc.parking.updatePrice.useMutation();

  return (
    <>

      <h1 className="text-center text-3xl pt-4">
        Welcome to admin page
      </h1>
      <div className="mt-5">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Set parking price per entry
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  autoComplete="given-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {
                  getPrice.data?.price && (
                    <p className="mt-2 text-sm text-gray-500">Current price: {getPrice.data?.price} </p>
                  )
                }
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 mt-2"
                >
                  Set parking price per subsequent hour
                </label>
                <input
                  onChange={(e) => setSubsequentPrice(e.target.value)}
                  type="number"
                  autoComplete="given-name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
                {
                  getPrice.data?.price && (
                    <p className="mt-2 text-sm text-gray-500">Current price: {getPrice.data?.subsequnce} </p>
                  )
                }

                <div className="pt-2">
                  <button
                    onClick={() => updatePrice.mutateAsync({ id: 1, price: price, subsequnce: subsequentPrice })}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </>

  )
}

export default Admin;