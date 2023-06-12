import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import "./CheckoutForm.css";

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardErr, setCardErr] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        if (price > 0) { // eta na korle pay korar por cart theke item gulo deleteMany korar por err dibe.
            // fetch()
            axiosSecure.post("/create-payment-intent", { price }) // price: price;
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        //
        console.log("card", card);

        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            // console.log("error", error);
            setCardErr(error.message);
        }
        else {
            setCardErr("");
            // console.log("PaymentMethod", paymentMethod);
        }

        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card, //
                billing_details: {
                    email: user?.email || "unknown",
                    name: user?.name || "anonymous",
                },
            },
        })

        if (confirmError) {
            console.log(confirmError);
        }

        setProcessing(false);
        console.log("paymentIntent", paymentIntent);
        if (paymentIntent.status === "succeeded") {
            const transactionId = paymentIntent.id;
            setTransactionId(transactionId);

            const payment = {
                email: user?.email,
                transactionId,
                price,
                date: new Date(),
                cartItems: cart.map(item => item._id), // cart e add kora product gulor _id items arr te thakbe; karon map arr return kore;
                menuItems: cart.map(item => item.menuItemId),
                status: "Service Pending",
                quantity: cart.length,
                itemsName: cart.map(item => item.name), // itemsName arr te cart e add kora product gulor name pabo arki;
            };

            axiosSecure.post("/payments", payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        // 
                    }
                })
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-2/3">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary mt-5" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                cardErr && <p className="text-red-600">{cardErr}</p>
            }
            {
                transactionId && <p className="text-green-500">Transaction Complete With Transaction Id: {transactionId}</p>
            }
        </>
    );
};

export default CheckoutForm;