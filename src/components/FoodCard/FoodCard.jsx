import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item, priceConditional }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useContext(AuthContext);
    // const [cart, refetch] = useCart();
    const [, refetch] = useCart();

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location?.pathname);

    const handleAddToCart = item => {
        console.log(item);
        if (user && user?.email) {
            const orderItem = { menuItemId: _id, name, image, price, email: user?.email, };

            fetch("https://bistro-boss-server-one-hazel.vercel.app/carts", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(orderItem),
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Food added on the cart.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to order the food',
                // text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login Now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    // )
                    navigate("/login", { state: { from: location } });
                }
            })
        }
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-2 pt-2">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            {
                !priceConditional && <p className="text-white bg-slate-900 absolute right-0 rounded p-1 mt-4 mr-4">${price}</p>
            }
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={() => handleAddToCart(item)} className="btn border-0 border-b-2 bg-slate-100 text-black hover:text-white">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;