import express from 'express';
import { projectAssignment } from '../modules/model.js';

const projectAssignmentsRouter = express.Router();

// add project_assignment
projectAssignmentsRouter.post('/', async (req, res) => {
    try {
        if (!req.body.employee_id ||
            !req.body.project_code ||
            !req.body.start_date) {
                return res.status(400).json({ error: 'Send all required fields' });
        }
        const newProjectAssignment = {
            employee_id: req.body.employee_id,
            project_code: req.body.project_code,
            start_date: req.body.start_date
        }
        const createProjectAssignment = await projectAssignment.create(newProjectAssignment);
        res.status(201).send(createProjectAssignment);
    } catch (error) {
        console.error(error);
    }
});

// get project_assignment
projectAssignmentsRouter.get('/', async (req, res) => {
    try {
        const allProjectAssignments = await projectAssignment.find();
        if (allProjectAssignments.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }
        res.status(200).json(allProjectAssignments);
    } catch (error) {
        console.error(error);
    }
});

export default projectAssignmentsRouter;