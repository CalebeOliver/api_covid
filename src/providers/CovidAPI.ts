import axios from 'axios';

const api = axios.create({
	baseURL: 'https://disease.sh',
});

export default api;
