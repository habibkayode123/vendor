import axios from '../axios';

const create = (user) => {
	return axios.post('/users', user);
};

const userList = () => {
	return axios.get('/users');
};

const read = (params) => {
	return axios.get("/users/" + params.userId);
};

const remove = (params) => {
	return axios.delete("/users/" + params.userId);
};

const setUserRole = (params) => {
	return axios.put("/users/" + params.userId + "/role", {roleId:params.roleId});
};


export { create, userList,read,remove ,setUserRole};

