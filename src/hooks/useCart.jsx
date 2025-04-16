import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePublicServer from "./usePublicServer";

const useCart = () => {
  const { user } = useAuth();
  const publicServer = usePublicServer();

  const {
    data: cartData,
    isLoading: cartLoading,
    refetch: cartRefetch,
  } = useQuery({
    queryKey: ["cartData", user?.email],
    queryFn: async () => {
      const { data } = await publicServer.get(`/cart/${user?.email}`);
      return data;
    },
  });

  return {cartData, cartLoading, cartRefetch}
};

export default useCart;
