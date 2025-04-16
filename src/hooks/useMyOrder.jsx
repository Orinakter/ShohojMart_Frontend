import { useQuery } from "@tanstack/react-query";
import usePrivateServer from "./usePrivateServer";
import useAuth from "./useAuth";


const useMyOrder = () => {
    const privateServer = usePrivateServer();
    const {user} = useAuth();
    
    const {
        data: myOrder,
        isLoading: myOrderLoading,
        refetch,
      } = useQuery({
        queryKey: ["myOrder", user?.email],
        queryFn: async () => {
          const { data } = await privateServer.get(`/myOrder/${user?.email}`);
          return data;
        },
      });

  return {myOrder, myOrderLoading, refetch}
}

export default useMyOrder