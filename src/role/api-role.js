import axios from '../axios';

const roleList = () => {
	return axios.get('/role');
};

export {
	roleList,
};
