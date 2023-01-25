import { useRouter } from "next/router"
import { useEffect } from "react"
import { trpc } from "../utils/trpc"

const Pay = () => {
  const router = useRouter()
  const updateStatus = trpc.parking.updatePayStatus.useMutation()

  const payNow = () => {
    updateStatus.mutateAsync({ plate: router.query.plate as string, status: "paid" })
      .then(() => {
        router.push({ pathname: "/payment-success", query: { plate: router.query.plate } })
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <>
      <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
        <div className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700">
          <div className="w-full pt-1 pb-5">
            <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i className="mdi mdi-credit-card-outline text-3xl"></i>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">Secure payment info</h1>
            <p className="text-center font-semibold text-blue-400">Pay RM{router.query.price} ?</p>
          </div>
          <div className="mb-3 flex -mx-2">
            <div className="px-2">
              <label htmlFor="type1" className="flex items-center cursor-pointer">
                <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked />
                <p className="font-light py-2 px-2 bg-gray-500 rounded-sm ml-2 text-white">Test Bank</p>
              </label>
            </div>
          </div>

          <div>
            <button onClick={() => payNow()} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Pay