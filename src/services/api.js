const API_URL = process.env.REACT_APP_API_URL;
const TOKEN = process.env.REACT_APP_TOKEN;
export const getSortingDropDownContent = async (endPoint) => {
  try {
    //endpoint can only be : statuses,priorities,departments
    const response = await fetch(`${API_URL}/${endPoint}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
export const updateTaskStatus = async (taskId, statusId) => {
  try {
    await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ status_id: statusId }),
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getTaskComments = async (ID) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${ID}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getSingleTaskData = async (ID) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${ID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getEmployeesList = async () => {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const postEmployeeInfo = async (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("surname", data.surname);
  formData.append("avatar", data.avatar);
  formData.append("department_id", data.department_id);
  try {
    await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
export const postNewTaskToAPI = async (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("due_date", data.due_date);
  formData.append("status_id", data.status_id);
  formData.append("employee_id", data.employee_id);
  formData.append("priority_id", data.priority_id);
  try {
    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const postCommant = async (data, taskID) => {
  const formData = new FormData();
  formData.append("text", data.text);
  if (data.parent_id !== null) formData.append("parent_id", data.parent_id);

  try {
    const response = await fetch(`${API_URL}/tasks/${taskID}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getComments = async (taskID) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskID}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
