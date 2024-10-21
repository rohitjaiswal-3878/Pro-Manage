import axios from "axios";

const createTask = async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}/task/create`,
      {
        ...formData,
      },
      {
        headers: {
          "X-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export { createTask };
