import React, { Component, useState } from 'react';
import * as employees from '../apis/employess'

const AddEmployee = (props) => {

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [salary, setSalary] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        console.log(`Form submitted:`);

        const newEmployee = {
            name: name,
            age: age,
            salary: salary
        }
        if (!newEmployee.name || !newEmployee.age || !newEmployee.salary) {
            alert("Some of required fields are missing !")
        } else {
            console.log("newEmployee : ", newEmployee)
            employees.add(newEmployee).then(res => {
                console.log("res: ", res);
                setName('')
                setSalary('')
                setAge('')
                if (res.status != "failed") {
                    setIsSubmitting(false)
                    alert("Employee has been added successfully!"+ res.message? res.message:"");
                    this.props.history.push('/')
                } else {
                    setIsSubmitting(false)
                    alert("Server error while adding todo"+ res.message? res.message:"");
                }
            })
        }
    }

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Add New Employee</h3>
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
                        type="number"
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Employee Salary: </label>
                    <input type="text"
                        className="form-control"
                        value={salary}
                        type="number"
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input type="submit" value="Add Employee"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    )
}
export default AddEmployee