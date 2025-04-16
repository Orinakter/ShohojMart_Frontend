
import { useQuery } from "@tanstack/react-query";
import usePrivateServer from "./usePrivateServer";

const useAllUser = (role) => {
  const privateServer = usePrivateServer();

  const {
    data: allUserData,
    isLoading: allUserLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUser", role],
    queryFn: async () => {
      const { data } = await privateServer.get(`/allUser?role=${role}`);
      return data;
    },
  });

  return {allUserData, allUserLoading, refetch}
};

export default useAllUser;
