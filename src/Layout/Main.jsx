import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
    const location = useLocation();
    // console.log(location);
    const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("sign-up")

    return (
        <>
            {noHeaderFooter || <Navbar />} {/* if left side is false / falsy than right side will be executed */}
            <Outlet />
            {noHeaderFooter || <Footer />}
        </>
    );
};

export default Main;