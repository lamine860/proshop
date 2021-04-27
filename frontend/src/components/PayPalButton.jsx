import React from "react";
import Message from "./common/Message";

const PayPalButton = ({ amount, onSuccess }) => {
  const [error, setError] = React.useState(null);
  const [paid, setPaid] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const payPalRef = React.useRef();
  React.useEffect(() => {
    if (window.paypal && !mounted) {
      setMounted(true)
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "Payment for an order",
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const details = await actions.order.capture();
            setPaid(true);
            onSuccess(details);
          },
          onError: (err) => {
            console.log(err);
            setError(err);
          },
        })
        .render(payPalRef.current);
    }
  }, [amount, onSuccess, mounted]);
  if (paid) {
    return <Message variant="success">Payment successfully!</Message>;
  } else if (error) {
    return <Message variant="danger">Payment fail!</Message>;
  }
  return (
    <>
      <h3>Pay with PayPal</h3>
      <div ref={payPalRef}></div>
    </>
  );
};

export default PayPalButton;
