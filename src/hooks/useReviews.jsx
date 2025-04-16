import React from 'react'
import usePublicServer from './usePublicServer'
import { useQuery } from '@tanstack/react-query';

const useReviews = (id) => {
    const publicServer = usePublicServer();

    const {
        data: reviewData,
        isLoading: reviewLoading,
        refetch:reviewFetch
      } = useQuery({
        queryKey: ["reviewData", id],
        queryFn: async () => {
          const { data } = await publicServer.get(`/reviews/${id}`);
          return data;
          
        },
      });

  return {reviewData, reviewLoading, reviewFetch}
}

export default useReviews