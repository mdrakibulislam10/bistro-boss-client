import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {
    const [cart, refetch] = useCart();

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const total = parseFloat(totalPrice.toFixed(2));

    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this item!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://bistro-boss-server-one-hazel.vercel.app/carts/${item._id}`, {
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deleteCount > 0) {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                            }
                            refetch();
                        })
                }
            })
    };

    return (
        <section className="w-full">
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>

            <div className="uppercase font-semibold h-[60px] flex justify-evenly items-center">
                <h3 className="text-3xl">Total Items: {cart?.length}</h3>
                <h3 className="text-3xl">Total Price: {total && total}</h3>
                <Link to={"/dashboard/payment"}>
                    <button className="btn btn-warning btn-sm">PAY</button>
                </Link>
            </div>

            <div className="overflow-x-auto flex justify-center mt-5">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask rounded w-12 h-12">
                                                <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item?.name}</td>
                                    <td className="">${item?.price}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-md bg-red-600 text-white"><FaTrashAlt /></button>
                                    </td>
                                </tr>
                            )
                        }
                        {/* row 1 */}

                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </section>
    );
};

export default MyCart;