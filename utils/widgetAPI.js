import axios from 'axios';

export const fetchStations = async () => {
    try {
        const response = await axios.get('http://192.168.0.112:8000/widget/stations/');
        return response.data;
    } catch (error) {
        console.error('Error fetching stations:', error);
        throw error;
    }
};


export const fetchStationData = async (stationId) => {
    try {
        const response = await axios.get(`http://192.168.0.112:8000/widget/station/${stationId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching station data:', error);
        throw error;
    }
}


export const fetchRainfallData = async (stationId) => {
    try {
        const response = await axios.get(`http://192.168.0.112:8000/widget/rainfall/${stationId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching station data:', error);
        throw error;
    }
}

export const fetchAllData = async (stationId) => {
    try {
        const response = await axios.get(`http://192.168.0.112:8000/widget/alldata/${stationId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching station data:', error);
        throw error;
    }
}