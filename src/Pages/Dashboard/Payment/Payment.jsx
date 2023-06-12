import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../../hooks/useCart";

// TODO: provide publishable key;
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);

const Payment = () => {
    const [cart] = useCart();

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));

    return (
        <div>
            <SectionTitle
                subHeading={"Please Provide"}
                heading={"Payment"}
            />
            <h2 className="mb-5">Teka o teka tumi uira uira aso......</h2>

            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price} />
            </Elements>
        </div>
    );
};

export default Payment;