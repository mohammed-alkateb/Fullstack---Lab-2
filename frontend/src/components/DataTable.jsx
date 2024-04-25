import React from 'react';
import './DataTable.css';

const DataTable = ({ employeeData }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Employee_ID</th>
                    <th>Employee_name</th>
                    <th>Project_name</th>
                    <th>Start_date</th>
                </tr>
            </thead>
            <tbody>
                {employeeData.map(emp => (
                    <tr key={emp._id}>
                        <td>{emp._id}</td>
                        <td>{emp.full_name}</td>
                        <td>{emp.projects.map(project => project.project_name)}</td>
                        <td>{emp.projectAssignments.map(assignment => assignment.start_date)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DataTable