import React, { Component, useState } from 'react';
import * as employees from '../apis/employess'

const EditEmployee = (props) => {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [salary, setSalary] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    /* mounting fetching data  */
    React.useEffect(() => {
        async function fetchData() {
            return employees.getWithId(props.match.params.id).then(res => {
                console.log("res edit", res)
                if(res.data){
                    setName(res.data.name)
                    setAge(res.data.age)
                    setSalary(res.data.salary)
                }
            })
        }
        fetchData();
    }, []);

    const deleteEmployee = () => {
        employees.deleteWithId(props.match.params.id)
            .then(res => {
                console.log(res.data);
                if (res) {
                    alert("Employee has been deleted successfully!")
                    this.props.history.push('/')
                } else {
                    alert("Server error while deleting todo");
                }
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        console.log(`Form submitted:`);

        const editEmployee = {
            // id: id,
            name: name,
            age: age,
            salary: salary
        }
        console.log("editEmployee : ", editEmployee)
        employees.update(props.match.params.id, editEmployee).then(res => {
            console.log("res: ", res);
            setName('')
            setSalary('')
            setAge('')
            if (res) {
                setIsSubmitting(false)
                alert("Employee has been updated!");
                props.history.push('/')
            } else {
                setIsSubmitting(false)
                alert("Server error while updating");
            }
        })
    }

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Update Employee</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Employee Name: </label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Employee Age: </label>
                    <input type="text"
                        className="form-control"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Employee Salary: </label>
                    <input type="text"
                        className="form-control"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit"
                        disabled={isSubmitting}
                        value="Update Todo" className="btn btn-primary" />
                    <input type="button"
                        disabled={isSubmitting}
                        onClick={() => deleteEmployee()} value="Delete Employee" className="btn btn-danger marginHorizontal" />
                </div>
            </form>
        </div>
    )
}
export default EditEmployee