import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as employeesApi from '../apis/employess'

const deleteWithId = (id) => {
    // console.log("#id : ", id)
    employeesApi.deleteWithId(id).then((res) => {
        console.log("#res : ", res)
        if (res.status != "failed") {
            alert("Employee has been deleteds!" + res.message? res.message:"");
        } else {
            alert("Server error while deleteing " + res.message? res.message:"");
        }
    })
}
const Employee = props => (
    <tr style={{ textAlign: "center" }}>
        {/* {console.log("#props : ", props.employee)} */}
        <td className='textLimit'>{props.employee.id}</td>
        <td className='textLimit'>{props.employee.employee_name}</td>
        <td className="">{props.employee.employee_age}</td>
        <td className="">{props.employee.employee_salary}</td>
        <td onClick={() => deleteWithId(props.employee.id)}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
        </td>
        <td>
            <Link to={"/edit/" + props.employee.id} >
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
                    <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
                </svg>
            </Link>
        </td>
    </tr>
)

const EmployeesList = (props) => {

    const [employees, setEmployees] = useState([])

    /* mounting fetching data  */
    React.useEffect(() => {
        async function fetchData() {
            return employeesApi.getAll().then(res => {
                console.log("res", res.data)
                setEmployees(res.data)
            })
        }
        fetchData();
    }, []);

    const employeesList = () => {
        console.log("#employeesList : ", employees)
        return employees.map((currentEmployee, i) => {
            return <Employee employee={currentEmployee} key={i} />;
        });
    }

    return (
        <div>
            <h3>Employees List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Employee Age</th>
                        <th>Employee Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length ? employeesList() : <p className="defaultTextStyle" >No employess added yet</p>}
                </tbody>
            </table>
        </div>
    )
}
export default EmployeesList