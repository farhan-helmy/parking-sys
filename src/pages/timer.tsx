import type { NextPage } from "next"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";




const Timer: NextPage = () => {

  const [parkingStartTime, setParkingStartTime] = useState("");
  const [parkingEndTime, setParkingEndTime] = useState("");
  const [priceAndTime, setPriceAndTime] = useState("");
  const [price, setPrice] = useState(0);
  const router = useRouter()
  const getCarTime = trpc.parking.getCarTime.useQuery({ plate: router.query.plate as string });
  const setParkingTime = trpc.parking.startParking.useMutation();
  const setEndTime = trpc.parking.endParking.useMutation();
  const getParkingPrice = trpc.parking.getPrice.useQuery();

  const startTimer = () => {
    // get the current time
    const now = new Date().toUTCString();
    setParkingStartTime(now);
    setParkingTime.mutate({ plate: router.query.plate as string, start_time: now, status: "parking" });
    getCarTime.refetch();
  }

  const exitParking = () => {
    const now = new Date().toUTCString();
    setParkingEndTime(now);
    console.log(parkingStartTime)
    setEndTime
      .mutateAsync({ plate: router.query.plate as string, end_time: now, status: "exit" })
      .then(() => {
        // calculate difference between two times
        const startTime = new Date(getCarTime.data?.start_time as string);
        const endTime = new Date(now);
        const diff = endTime.getTime() - startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor(diff / 1000);
        // change the price from string to float
        const price = hours * parseInt(getParkingPrice.data?.price as string);
        setPriceAndTime(`You have parked for ${hours} hours, ${minutes} minutes and ${seconds} seconds. Your total price is ${price} ringgit`)
      })
      .catch((err) => {
        console.log(err);
      })
    getCarTime.refetch();
  }

  const pay = () => {
    router.push({pathname: "/pay", query: {plate: router.query.plate, price: price}})
  }

  useEffect(() => {
    if (getCarTime.data?.status === "exit") {
      const now = new Date().toUTCString();
      setParkingEndTime(now);
      const startTime = new Date(getCarTime.data?.start_time as string);
      const endTime = new Date(now);
      const diff = endTime.getTime() - startTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor(diff / 1000);
      const price = hours * parseInt(getParkingPrice.data?.price as string);
      setPrice(price);
      setPriceAndTime(`You have parked for ${hours} hours, ${minutes} minutes and ${seconds} seconds. Your total price is ${price} ringgit`)
    }
  }, [getCarTime.data?.start_time, getCarTime.data?.status, getParkingPrice.data?.price])

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex flex-col justify-center h-full pt-20">
        <div className="flex flex-col justify-center items-center sm:mx-auto sm:w-full sm:max-w-md">

          {getCarTime.data?.status === "parking" && (
            <div className="items-center justify-center text-center pb-3">
              <h1 className="font-bold text-4xl">Parking {getCarTime.data.plateNumber} in progress</h1>
              <h1 className="font-light text-xl">parking start time {getCarTime.data.start_time} </h1>
            </div>
          )}
          {getCarTime.data?.status === "" || getCarTime.data?.status === "paid" && (
            <div className="items-center justify-center text-center pb-3">
              <h1 className="font-bold text-4xl">Hello {getCarTime.data.plateNumber}</h1>
              <h1 className="font-light text-xl">please press start button to start your timer </h1>
            </div>
          )}
          {getCarTime.data?.status === "exit" && (
            <div className="items-center justify-center text-center pb-3">
              <h1 className="font-bold text-4xl">{getCarTime.data.plateNumber} exit</h1>
              <h1 className="font-light text-xl">please pay for parking </h1>
              <p>the rate is RM{getParkingPrice.data?.price} per hour</p>
            </div>
          )}
          <button
            disabled={getCarTime.data?.status === "parking" ? true : false}
            onClick={() => startTimer()}
            type="button"
            className={`${getCarTime.data?.status === "exit" ? "hidden" : ""} inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-6 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >

            <h1 className="font-bold">{getCarTime.data?.status === "parking" ? "In Progress" : "Start"}</h1>

          </button>
         
            <button
              onClick={() => exitParking()}
              type="button"
              className={`${getCarTime.data?.status === "exit" ? "hidden" : ""} mt-4 shadow-lg inline-flex items-center rounded-full border bg-red-600 p-6 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <h1 className="font-bold">Exit</h1>
            </button>
          <button
            onClick={() => pay()}
            type="button"
            className={`${getCarTime.data?.status === "exit" ? "" : "hidden"} mt-4 shadow-lg inline-flex items-center rounded-full border bg-green-600 p-6 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <h1 className="font-bold">Pay</h1>
          </button>
          {priceAndTime && (
            <div className="items-center justify-center text-center pb-3">
              <h1 className="font-bold text-4xl">{priceAndTime}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Timer;
