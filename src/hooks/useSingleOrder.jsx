import { useQuery } from '@tanstack/react-query';
import usePrivateServer from './usePrivateServer';

const useSingleOrder = (id) => {
  const privateServer = usePrivateServer();
    const {
        data: singleOrder = {},
        isLoading: singleOrderLoading,
        refetch:singleRefetchPayment,
      } = useQuery({
        queryKey: ["singleOrder", id],
        queryFn: async () => {
          const { data } = await privateServer.get(`/singleOrder/${id}`);
          return data;
        },
      });
  return {singleOrder, singleOrderLoading, singleRefetchPayment} 
}

export default useSingleOrder