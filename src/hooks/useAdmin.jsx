import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    // tan stack
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({ // isAdmin is true or false; so, don't need to declaer isAdmin = [];
        queryKey: ["isAdmin", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            // console.log(res);
            return res.data.admin; // res.data = send kora data. and .admin mane, obj send kora hocche jar vitore prop hisebe admin ache. jar value hocche, true or false;
        }
    })

    return [isAdmin, isAdminLoading];
};

export default useAdmin;