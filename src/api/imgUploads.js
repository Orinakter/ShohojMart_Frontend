import axios from "axios";

const imgUploads = async (imgPath) => {
  const formData = new FormData();
  formData.append("image", imgPath);
  const imgBBKey = import.meta.env.VITE_ImgBB_API;
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
    formData
  );
  return data.data.display_url;
};

export default imgUploads;
