import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import usePrivateServer from "./usePrivateServer";

const useGallery = () => {
  const { user } = useAuth();
  const privateServer = usePrivateServer();

  const {
    data: galleryData,
    isLoading: galleryLoading,
    refetch: galleryRefetch,
  } = useQuery({
    queryKey: ["galleryData", user?.email],
    queryFn: async () => {
      const { data } = await privateServer.get(`/gallery/${user?.email}`);
      return data;
    },
  });
  return {galleryData, galleryLoading, galleryRefetch}
};

export default useGallery;
