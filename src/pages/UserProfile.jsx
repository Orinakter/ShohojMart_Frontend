import { useEffect, useState } from "react";
import PageMargin from "../components/common/PageMargin";
import noPhoto from "../assets/images/noPhoto.jpg";
import noPhoto2 from "../assets/images/noPhoto2.jpg";
import { BsCameraFill } from "react-icons/bs";
import useUser from "../hooks/useUser";
import { RxUpdate } from "react-icons/rx";
import { MdEdit, MdPhoto } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import usePrivateServer from "../hooks/usePrivateServer";
import toast from "react-hot-toast";
import imgUploads from "../api/imgUploads";
import LoaderSipnner from "../components/common/LoaderSipnner";
import ProfileComponents from "../components/ProfileComponents/ProfileComponents";
import useGallery from "../hooks/useGallery";

const UserProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [cover, setCover] = useState("");
  const [photo, setPhoto] = useState("");
  const { userData, userLoading, refetch } = useUser();
  const [name, setName] = useState("");
  const [editName, setEditName] = useState(true);
  const [editCover, setEditCover] = useState(true);
  const [editPhoto, setEditPhoto] = useState(true);
  const { user, updateUserProfile } = useAuth();
  const privateServer = usePrivateServer();
  const date = new Date();
  const [photoLoading, setPhotoLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const { galleryData, galleryLoading, galleryRefetch } = useGallery();

  // upload cover function
  const uploadCover = async () => {
    if (!cover) {
      toast.error("please Upload Photo");
      setEditCover(true);
      return;
    }
    try {
      setCoverLoading(true);
      const img = await imgUploads(cover);
      await privateServer.patch(`/updateCover/${user?.email}`, { cover: img });
      await privateServer.post(`/gallery`, {
        image: img,
        email: user?.email,
        status: "cover",
        date: date,
      });
      refetch();
      galleryRefetch();
      toast.success("Image Upload SuccessFully!");
      setEditCover(true);
      setCover("");
      setCoverLoading(false);
    } catch (err) {
      toast.error(err?.message);
      setEditCover(true);
      setCoverLoading(false);
    }
  };

  // upload photo function
  const uploadPhoto = async () => {
    // setEditPhoto(true);
    if (!photo) {
      toast.error("please Upload Photo");
      setEditPhoto(true);
      return;
    }
    setPhotoLoading(true);
    try {
      const img = await imgUploads(photo);
      await updateUserProfile(user?.name, img);
      await privateServer.patch(`/updateProfilePhoto/${user?.email}`, {
        photo: img,
      });
      await privateServer.post(`/gallery`, {
        image: img,
        email: user?.email,
        status: "profile",
        date: date,
      });
      refetch();
      galleryRefetch();
      toast.success("Image Upload SuccessFully!");
      setEditPhoto(true);
      setPhoto("");
      setPhotoLoading(false);
    } catch (err) {
      toast.error(err?.message);
      setEditPhoto(true);
      setPhotoLoading(false);
    }
  };

  // edit name function
  const updateName = async () => {
    if (!name) {
      toast.error("please give Name");
      setEditName(true);
      return;
    }
    try {
      await updateUserProfile(name);
      await privateServer.patch(`/updateName/${user?.email}`, { name: name });
      toast.success("Name SuccessFully Changed!");
      setEditName(true);
      refetch();
    } catch (err) {
      toast.error(err?.message);
      setEditName(true);
    }
  };

  return (
    <div className="">
      <div className="">
        <PageMargin />
        {userLoading ? (
          <LoaderSipnner />
        ) : (
          <div className="w-full lg:max-w-[1200px] mx-auto  relative">
            {/* cover photo */}
            <div className="relative">
              <img
                src={userData?.cover ? userData?.cover : noPhoto}
                alt=""
                className="max-h-[500px] md:max-h-[450px] w-full object-cover"
              />
              <div className="">
                {editCover ? (
                  <label className="uppercase">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        setCover(e.target.files[0]);
                        setEditCover(false);
                      }}
                    />

                    <div className="flex gap-2 absolute rounded-md cursor-pointer bottom-4 right-6 items-center px-4 py-2 bg-white">
                      <span className="text-xl md:text-2xl">
                        <BsCameraFill />
                      </span>
                      <span className="font-semibold text-sm md:text-md">
                        Edit Cover Photo
                      </span>
                    </div>
                  </label>
                ) : (
                  <button
                    onClick={uploadCover}
                    disabled={coverLoading}
                    className="flex gap-2 absolute rounded-md cursor-pointer bottom-4 right-6 items-center px-4 py-2 bg-white"
                  >
                    <span className="text-xl md:text-2xl">
                      <MdPhoto />
                    </span>
                    <span className="font-semibold text-sm md:text-md">
                      {coverLoading ? "Loading..." : "Upload Cover Photo"}
                    </span>
                  </button>
                )}
              </div>
            </div>
            {/* photo and name */}
            <div className="absolute -bottom-[320px] lg:-bottom-[190px] left-0">
              <div className="flex flex-col gap-10 md:flex-row justify-center md:justify-start items-center">
                {/* image */}
                <div className="relative">
                  <img
                    src={userData?.profile ? userData?.profile : noPhoto2}
                    alt=""
                    className="h-[200px] rounded-full w-[200px] lg:h-[250px] lg:w-[250px]"
                  />
                  {/* input photo */}
                  <div className="absolute bottom-2 right-8">
                    {editPhoto ? (
                      <label className="uppercase">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            setPhoto(e.target.files[0]);
                            setEditPhoto(false);
                          }}
                        />

                        <div className="cursor-pointer text-white w-12 h-12 flex  bg-gray-800  justify-center items-center border-2 rounded-full">
                          <span className="text-xl  md:text-2xl">
                            <BsCameraFill />
                          </span>
                        </div>
                      </label>
                    ) : (
                      <button
                        disabled={photoLoading}
                        onClick={uploadPhoto}
                        className="cursor-pointer text-white gap-1 flex px-3 py-2  bg-gray-800  justify-center items-center border-2 rounded-full"
                      >
                        <span className="text-xl  md:text-2xl">
                          <RxUpdate />
                        </span>
                        <span className="">
                          {photoLoading ? "Loading..." : "Upload"}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                {/* name */}
                <div className="px-6">
                  <div className="w-full ">
                    <div className="flex items-center ">
                      <input
                        defaultValue={userData?.name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        disabled={editName}
                        className={`text-3xl ${
                          !editName && "border border-gray-400 p-2 text-2xl"
                        } md:text-4xl mb-3 font-semibold`}
                      />
                      <span className="text-3xl cursor-pointer p-2">
                        {editName ? (
                          <span onClick={() => setEditName(false)} className="">
                            <MdEdit />
                          </span>
                        ) : (
                          <span onClick={updateName} className="">
                            <RxUpdate />
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <p className="md:text-xl font-medium">{userData?.email}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="divider mt-[350px] lg:mt-[200px]  py-8"></div>
      {/* content */}
      <div className="w-full lg:max-w-[850px] mb-20 lg:border-x border-gray-300 lg:px-14 mx-auto">
        {galleryLoading ? (
          <LoaderSipnner />
        ) : (
          <div className="">
            {galleryData?.length === 0 ? (
              <div className="py-4">
                <h1 className="text-3xl font-semibold text-center">No Post Found</h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {galleryData?.map((item) => (
                  <ProfileComponents item={item} user={userData} galleryRefetch={galleryRefetch} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
