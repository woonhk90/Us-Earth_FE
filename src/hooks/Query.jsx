import axios from "axios";

export const postFormData = async (formData) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/articles`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob",
        Authorization: token,
      },
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
