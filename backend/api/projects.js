import express from 'express';
import { project } from '../modules/model.js';

const projectsRouter = express.Router();

// add project
projectsRouter.post('/', async (req, res) => {
    try {
        if (!req.body.project_name ||
            !req.body.project_description ||
            !req.body.employee_id) {
                return res.status(400).json({ error: 'Send all required fields' });
        }
        const newProject = {
            project_name: req.body.project_name,
            project_description: req.body.project_description,
            employee_id: req.body.employee_id
        }
        const createProject = await project.create(newProject);
        res.status(201).send(createProject);
    } catch (error) {
        console.error(error);
    }
});

// get project
projectsRouter.get('/', async (req, res) => {
    try {
        const allProjects = await project.find();
        if (allProjects.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }
        res.status(200).json(allProjects);
    } catch (error) {
        console.error(error);
    }
});

export default projectsRouter;