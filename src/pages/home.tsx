import { NextPage } from "next"
import Link from "next/link";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const Home: NextPage = () => {
  const [plate, setPlate] = useState("");
  const addPlateNumber = trpc.parking.savePlate.useMutation();
  const router = useRouter()
  const handlePlateChange = (e: any) => {
    e.preventDefault();
    addPlateNumber.mutate({ plate });
  }

  useEffect(() => {
    if (addPlateNumber.isSuccess) {
      router.push({ pathname: '/timer', query: { plate: addPlateNumber.data.plateNumber } })
    }

  }, [addPlateNumber, router])

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Please enter your car registration no.</h2>

        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <div className="mt-1">
                  <input
                    type="text"
                    autoComplete="car_reg"
                    required
                    placeholder="eg: WPQ 2762"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setPlate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(e) => handlePlateChange(e)}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
