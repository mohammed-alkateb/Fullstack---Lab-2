import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    full_name: String,
    email: String
});

const projectSchema = new mongoose.Schema({
    project_code: {
        type: Number,
        unique: true
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    project_name: String,
    project_description: String,
});

const projectAssignmentSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    project_code: {
        type: Number,
        ref: 'Project'
    },
    start_date: { type: Date, default: Date.now }
});

const employee = mongoose.model('employee', employeeSchema, 'employee');
const project = mongoose.model('project', projectSchema, 'project');
const projectAssignment = mongoose.model('project_assignment', projectAssignmentSchema, 'project_assignment');

export {
    employee,
    project,
    projectAssignment
}