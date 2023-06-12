import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user);
                const loggedInUser = result.user;
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email };
                fetch("https://bistro-boss-server-one-hazel.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(saveUser),
                })
                    .then(res => res.json())
                    /* .then(data => {
                        if (data.insertedId) {
                            navigate(from, { replace: true });
                        }
                    }) */
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
            .catch(err => console.log(err.message));
    };

    return (
        <div>
            <div className="divider"></div>

            <div className="text-center my-6">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;