import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin(); // isAdmin = true or false;
    // const location = useLocation();

    if (loading || isAdminLoading) { // jotokkhon porjnto useAdmin hook e data load hoye na asbe totokkhon porjonto loading hote thakbe. kichukkhoner jonno secure route e chole jabe na arki;
        return <progress className="progress progress-info w-56" value="70" max="100"></progress>
    }

    if (user && isAdmin) { // useAdmin hook e data ta load hoye jokhon asbe jokhon true thakbe tokhon children return dibe ar false asle <Navigate kore home (/) e niye jabe.
        return children;
    }

    // return <Navigate to={"/"} state={{ from: location }} replace />
    return <Navigate to={"/"} />
};

export default AdminRoute;