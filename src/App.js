import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddEmployee from "./components/add-employee.component";
import EditEmployee from "./components/edit-employee.component";
import EmployeesList from "./components/employees-list.component";
import Header from "./components/header";

const App = () => {
  return (
    <Router>
      <div className="container">

        <Header title="Employee Management App" link1="Employess" link2="Add Employee"></Header>

        <Route path="/" exact component={EmployeesList} />
        <Route path="/edit/:id" component={EditEmployee} />
        <Route path="/create" component={AddEmployee} />
      </div>
    </Router>
  );
}

export default App;