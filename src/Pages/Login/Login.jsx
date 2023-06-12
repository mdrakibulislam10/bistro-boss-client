import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { AuthContext } from '../../Providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    // const { signIn } = useContext(AuthContext);
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: 'User login successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                navigate(from, { replace: true });
            })
            .catch(err => console.log(err.message))
    };

    const handleValidateCaptcha = e => {
        const user_captcha_value = e.target.value;
        // console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) { // we can check with === true;
            alert('Captcha Matched');
            setDisabled(false);

        }
        else { // working fine without else;
            alert('Captcha Does Not Match');
            setDisabled(true);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>

            <h2>Please Login</h2>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center lg:text-left md:w-1/2">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:w-1/2">

                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Type here" name="email" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="Enter your password" name="password" required className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" onBlur={handleValidateCaptcha} placeholder="Type the captcha code here" name="captcha" required className="input input-bordered" />
                                {/* <button onClick={handleValidateCaptcha} className="btn btn-outline btn-sm mt-2">Validate</button> */}

                                <span className='p-1 text-white rounded mt-2 text-sm cursor-pointer md:w-1/2 text-center bg-blue-600 hover:bg-slate-600'>Apply Captcha</span>
                            </div>
                            <div className="form-control mt-6">
                                {/* TODO: make btn disabled for captcha */}
                                <input disabled={disabled} className="btn bg-[#D1A054]" type="submit" value="Login" />
                                {/* or disabled={disabled === true} */}
                            </div>
                            <p className='text-center'> New here? <Link to={"/sign-up"}>
                                <span className='text-blue-700'>Create a New Account.</span>
                            </Link>
                            </p>
                        </form>

                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;