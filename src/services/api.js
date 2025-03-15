const API_URL = "https://momentum.redberryinternship.ge/api";
const TOKEN = "9e704534-6a81-479a-b8d2-6a7df125a570";
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
  console.log("here in API");
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
