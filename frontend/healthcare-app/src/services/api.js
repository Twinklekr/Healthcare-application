import axios from 'axios';
const urls = process.env.REACT_APP_API_URL;
const API_URL = `${urls}/api/appointments`;
const NOTIFICATION_URL = `${urls}/notifications`;


const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const userId = localStorage.getItem('userId');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }

    };
};

// Send Notification API call with auth headers
export const sendNotification = async (userId, message) => {
    return axios.post(
        `${NOTIFICATION_URL}/`, 
        null, 
        {
            params: { userId, message },
            ...getAuthHeaders()
        }
    );
};


export const bookAppointment = (appointment) => {
    // console.log(appointment);
    // console.log(localStorage.getItem('token'));
    return axios.post(`${API_URL}/addAppointment`, appointment, getAuthHeaders());
};



export const getAppointmentsByUser = (userId) => {
    return axios.get(`${API_URL}/user/${userId}`, getAuthHeaders());
};

export const getAppointmentsByDoctor = (doctorId) => {
    return axios.get(`${API_URL}/doctor/${doctorId}`, getAuthHeaders());
};

export const updateAppointmentStatus = (id, status) => {
    console.log("inside api.js updateAppointmentStatus");   
    return axios.put(`${API_URL}/${id}`,  status , getAuthHeaders());
};

export const cancelAppointment = (id) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
