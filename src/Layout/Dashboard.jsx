import { FaBook, FaCalendarAlt, FaCartPlus, FaGripHorizontal, FaHome, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [cart] = useCart();

    // TODO: load data from the server to have dynamic isAdmin based on data;
    // const isAdmin = true;

    const [isAdmin] = useAdmin(); // isAdmin = true or false;

    return (

        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                {/* Page content here */}
                <div className="m-2 lg:m-14">

                    <Outlet />

                </div>
            </div>

            <div className="drawer-side bg-[#D1A054]">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80">
                    {/* Sidebar content here */}

                    {
                        isAdmin
                            ? <>
                                <li><NavLink to={"/dashboard/admin-home"}> <FaHome /> Admin Home</NavLink></li>
                                <li><NavLink to={"/dashboard/addItem"}> <FaUtensils /> Add Items</NavLink></li>
                                <li><NavLink to={"/dashboard/manageItems"}> <FaGripHorizontal /> Manage Item</NavLink></li>
                                <li><NavLink to={"/"}> <FaBook /> Manage Bookings(not implemented)</NavLink></li>
                                <li><NavLink to={"/dashboard/allUsers"}> <FaUsers /> All Users</NavLink></li>
                            </>

                            : <>
                                <li><NavLink to={"/dashboard/user-home"}> <FaHome /> User Home</NavLink></li>
                                <li><NavLink to={"/"}> <FaCalendarAlt /> reservation</NavLink></li>
                                <li><NavLink to={"/"}> <FaWallet /> Payment History</NavLink></li>
                                <li className="flex flex-row items-center">
                                    <NavLink to={"/dashboard/my-cart"}> <FaCartPlus /> My Cart
                                    </NavLink>
                                    <span className="badge badge-secondary p-3">+{cart?.length || 0}</span>
                                </li>
                                <div className="divider"></div>
                                <li><NavLink to={"/"}> <FaHome /> Home</NavLink></li>
                                <li><NavLink to="/menu">Our Menu</NavLink></li>
                                <li><NavLink to="/order/salad">Order Food</NavLink></li>
                            </>
                    }


                </ul>

            </div>
        </div>

    );
};

export default Dashboard;