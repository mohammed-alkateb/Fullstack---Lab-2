import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import DataTable from '../components/DataTable';

const ShowEmployeeData = () => {
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [project_assignments, setProjectAssignments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        // fetch employees
        axios
            .get('http://localhost:3333/api/employees')
            .then((res) => {
                setEmployees(res.data);
                //console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
        // fetch projects
        axios
            .get('http://localhost:3333/api/projects')
            .then((res) => {
                setProjects(res.data);
                //console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
        // fetch project_assignments
        axios
            .get('http://localhost:3333/api/project_assignments')
            .then((res) => {
                setProjectAssignments(res.data);
                //console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });

        setLoading(false);
    }; 
    // refresh fetchData() every minute
    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 30000);
        return () => clearInterval(intervalId);
    }, []);
    // map employee data
    const employeeData = employees.map(employee => {
        const projectData = projects.filter
            (project => project.employee_id === employee._id);
        const projectAssignmentData = project_assignments.filter
            (project_assignment => project_assignment.employee_id === employee._id);
        return {
            ...employee,
            projects: projectData,
            projectAssignments: projectAssignmentData 
        };
    });
    // render components
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <DataTable employeeData={employeeData} />
            )}
        </div>
    )
}

export default ShowEmployeeData