
const API_URL = process.env.REACT_APP_URL;

export const fetchWithToken = async (endpoint, options = {}) => {
    const token = sessionStorage.getItem('token');


    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};
