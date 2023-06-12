import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    /* const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch("")
            return res.json();
        },
    }) */

    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await axiosSecure.get("https://bistro-boss-server-one-hazel.vercel.app/users");
        return res.data;
    });

    const handleMakeAdmin = user => {
        fetch(`https://bistro-boss-server-one-hazel.vercel.app/users/admin/${user._id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin now.`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    };

    const handleDelete = () => {

    };

    return (
        <div className="w-full">
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>

            <h3 className="text-3xl font-semibold my-4">Total users: {users.length}</h3>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user?.role === "admin" ? "Admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-md bg-yellow-600  text-white"><FaUserShield /> </button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-md bg-red-600 text-white"><FaTrashAlt /></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;