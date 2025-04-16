import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import usePublicServer from "./usePublicServer";

const useUser = () => {
  const { user } = useAuth();
  const publicServer = usePublicServer();

  const {
    data: userData,
    isLoading: userLoading,
    refetch
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const { data } = await publicServer.get(`/user/${user?.email}`);
      return data;
      
    },
  });

  return {userData, userLoading, refetch}
};

export default useUser;
