import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateServer from "./usePrivateServer";

const useWishList = () => {
  const { user } = useAuth();
  const privateServer = usePrivateServer();

  const {
    data: wishData,
    isLoading: wishLoading,
    refetch: wishRefetch,
  } = useQuery({
    queryKey: ["wishData", user?.email],
    queryFn: async () => {
      const { data } = await privateServer.get(`/wishlist/${user?.email}`);
      return data;
    },
  });

  return {wishData, wishLoading, wishRefetch};
};

export default useWishList;
