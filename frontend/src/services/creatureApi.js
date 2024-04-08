import axios from 'axios';

const API_URL = "http://localhost:5000/api/creatures";

const createCreature = async (creatureData) => {
    try 
    {
        const response = await axios.post(`${API_URL}/create`, creatureData);
    } 
    catch (error) 
    {
        console.error('Error submitting creature:', error);
        throw error;
    }
};

const getAllCreatures = async () => {
    try
    {
        const response = await axios.get(`${API_URL}/get/all`)
        return response.data;
    }
    catch (error)
    {
        console.error('Error getting creatures:', error)
        throw error;
    }
}

export { createCreature, getAllCreatures };