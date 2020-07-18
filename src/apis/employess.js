import axios from 'axios';
const employeesApi = 'http://dummy.restapiexample.com/api/v1/employees';
const employeeApi = 'http://dummy.restapiexample.com/api/v1/employee';
const createApi = 'http://dummy.restapiexample.com/api/v1/create';
const deleteApi = 'http://dummy.restapiexample.com/api/v1/delete';
const updateApi = 'http://dummy.restapiexample.com/api/v1/update';
// Get all data
export const getAll = () =>
    axios.get(employeesApi)
        .then(res => {
            return res.data;
        }).catch((error) => {
            console.log("Error While getting todos")
            return (error)
        })
// Add data
export const add = (data) =>
    axios.post(createApi, data)
        .then(res => res.data)
        .catch((error) => {
            console.log("Error While Add data")
            return (error)
        })
//Get-data
export const getWithId = (id) => {
    console.log("Getting data ...");
    return axios.get(`${employeeApi}/${id}`)
        .then(res => res.data)
        .catch((error) => {
            console.log("Error While get data", error);
            return (error)
        })
}
//update data
export const update = (id, data) => {
    console.log("Adding data ...", data);
    return axios.put(`${updateApi}/${id}`, data)
        .then((res) => res.data)
        .catch((error) => {
            console.log("Error While Add data", error);
            return (error)
        })
}
//Delete-data
export const deleteWithId = (id) => {
    console.log("deleting data ...");
    return axios.delete(`${deleteApi}/${id}`)
        .then(res => res.data)
        .catch((error) => {
            console.log("Error While deleting data", error);
            return (error)
        })
}