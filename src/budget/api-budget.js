import axios from '../axios';

const create = (budget) => {
  return axios.post('/budget', budget);
};
const list = () => {
  return axios.get('/budgettest');
};

const getAllBudget = () => {
  return axios.get('/budget');
};

const getBudgetTypeList = () => {
  return axios.get('/budgettype');
};

const getBudgetById = (params) => {
  return axios.get('/budget/additionalBudget/' + params.id);
};

const additionalBudgetUpdate = (params, budget) => {
  return axios.put("/budget/additionalbudget/" + params.budgetId, budget);
};

const budgetUsageByDepartment = (params) => {
  return axios.get("budgetusage/by/" + params.departmentId);
};

const update = (params, user) => {
  return axios.put("budget/update" + params.budgetId, user);
};

const read = (params) => {
  return axios.get("/budget/" + params.budgetId);
};

const getBudgetByDepartment = (userDept) => {
  return axios.post("budget/departmentBudget", userDept);
};

export {
  create,
  list,
  getBudgetTypeList,
  getBudgetById,
  update,
  read,
  additionalBudgetUpdate,
  getBudgetByDepartment,
  budgetUsageByDepartment,
  getAllBudget,
};
