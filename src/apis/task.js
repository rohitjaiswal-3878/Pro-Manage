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

const getTasks = async (filter) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/task/tasks/${filter}`,
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

const updateTask = async (task) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND}/task/change`,
      { task },
      {
        headers: {
          "X-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return error.repsonse;
  }
};

const addPeopleToBoard = async (email) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND}/task/add-people`,
      {
        email,
      },
      {
        headers: {
          "X-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

const getAnalytics = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/task/analytics`,
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

const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/task/single/${taskId}`,
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

const changeTask = async (formData) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND}/task/update`,
      { ...formData },
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

const deleteTask = async (taskId) => {
  try {
    const repsonse = await axios.delete(`${import.meta.env.VITE_APP_BACKEND}/task/remove/${taskId}`, {
      headers: {
        "X-token": localStorage.getItem("token"),
      },
    })

    return repsonse;
  } catch (error) {
    return error.response;
  }
}

export {
  createTask,
  getTasks,
  updateTask,
  addPeopleToBoard,
  getAnalytics,
  getTaskById,
  changeTask,
  deleteTask
};
