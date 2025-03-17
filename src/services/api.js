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
