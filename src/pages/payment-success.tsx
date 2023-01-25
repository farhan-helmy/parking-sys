import QRCode from "react-qr-code";


const PaymentSuccess = () => {
  return (
    <>
      <div>
        <div>
          <h1 className="text-center mt-4 font-bold text-green-600 text-4xl">Payment success !</h1> 
        </div>
     

        <div style={{ height: "auto", margin: "0 auto", maxWidth: 500, width: "100%" }}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value="Tetst  "
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </>
  )
}

export default PaymentSuccess