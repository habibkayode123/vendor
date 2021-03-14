import axios from '../axios';

const create = (department) => {
	return axios.post('/department', department);
};

const list = () => {
	return axios.get('/department');
};

const readDepartment = (params) => {
	return axios.get('/department/' + params.id);
};

const remove = (params) => {
	return axios.delete('/department/' + params.id);
};


const update = (params, department) => {
	return axios.put('/department/' + params.id, department);
};

export { create, list,readDepartment,remove,update };