import axios from "axios";

const API_URL = "http://localhost:5000/api/creatures";

const createCreature = async (creatureData) => {
  try {
    await axios.post(`${API_URL}/create`, creatureData);
  } catch (error) {
    console.error("Error submitting creature:", error);
    throw error;
  }
};

const getAllCreatures = async () => {
  try {
    const response = await axios.get(`${API_URL}/get/all`);
    return response.data;
  } catch (error) {
    console.error("Error getting creatures:", error);
    throw error;
  }
};

const updateCreature = async (creatureId, updateData) => {
  try {
    const response = await axios.put(
      `${API_URL}/update/${creatureId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating creature:", error);
    throw error;
  }
};

export { createCreature, getAllCreatures, updateCreature };
