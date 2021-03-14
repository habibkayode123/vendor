import axios from '../axios';

const signin = (user) => {
	return axios.post('/auth/signin', user);
};

const signout = () => {
	return axios.get('/auth/signout');
};

export { signin, signout };


