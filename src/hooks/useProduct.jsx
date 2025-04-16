import { useQuery } from "@tanstack/react-query";
import usePublicServer from "./usePublicServer";

const useProduct = (category, limit = 0, sort = "") => {
  const publicServer = usePublicServer();

  const { data: productData, isLoading, refetch } = useQuery({
    queryKey: ["product-data", category, limit, sort], 
    queryFn: async () => {
      let url = `/allProducts?category=${category}&&limit=${limit}`;
      
      if (sort) {
        url += `&&sort=${sort}`;
      }

      const { data } = await publicServer.get(url);
      return data;
    },
  });

  return { productData, isLoading, refetch };
};

export default useProduct;
