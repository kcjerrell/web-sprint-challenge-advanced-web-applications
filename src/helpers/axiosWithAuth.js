import axios from "axios";

export const BASE_URL = "http://localhost:5000";
const LOGIN_ENDPOINT = "/api/login";
const STORAGE_KEY = "access-token";

export const axiosWithAuth = () => {
	const token = localStorage.getItem(STORAGE_KEY);

	return axios.create({
		headers: {
			Authorization: token
		},
		baseURL: BASE_URL,
	})
};

export const login = (username, password) => {
	return axios.post(BASE_URL + LOGIN_ENDPOINT, { username: username, password: password })

		.then((response) => {
			const token = response.data.payload;
			saveToken(token);
		})

		.catch((error) => {
			console.log(error);
			throw (error);
		});
}

export const saveToken = (token) => {
	localStorage.setItem(STORAGE_KEY, token);
};

export const hasToken = () => {
	return localStorage.getItem(STORAGE_KEY) !== null;
};

export const removeToken = () => {
	localStorage.removeItem(STORAGE_KEY);
};

//Task List:
//Build and export a function used to send in our authorization token
