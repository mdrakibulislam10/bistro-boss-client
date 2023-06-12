import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
    baseURL: 'https://bistro-boss-server-one-hazel.vercel.app',
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    // const axiosSecure = axios.create({
    //     baseURL: 'https://bistro-boss-server-one-hazel.vercel.app',
    // });

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        axiosSecure.interceptors.request.use((config) => { // config or req;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config; // next er kaj gulo cholte thakbe arki;
        });

        // for error;
        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut();
                    navigate("/login");

                    // toast dite pari je err khaiche;
                }
                return Promise.reject(error); // op
            }
        );
    }, [logOut, navigate]);
    // }, [logOut, navigate, axiosSecure]);
    // }, [logOut, navigate, axiosSecure, token]);

    return [axiosSecure];
};

export default useAxiosSecure;