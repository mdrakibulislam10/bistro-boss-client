import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useCart = () => {
    const { user, loading } = useAuth();
    // const token = localStorage.getItem("access-token");

    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading, // if loading is false then execute queryFun(data load);
        // queryFn: async () => {
        //     const res = await fetch(`https://bistro-boss-server-one-hazel.vercel.app/carts?email=${user?.email}`, {
        //         headers: { authorization: `bearer ${token}` }
        //     });
        //     /* const data = await res.json();
        //     return data; */
        //     return res.json();
        // },
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            // console.log("res from axios", res);
            return res.data;
        },
    })

    return [cart, refetch];
};

export default useCart;