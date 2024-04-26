import express from 'express';
import { project } from '../modules/model.js';
import { employee } from '../modules/model.js';

const projectsRouter = express.Router();

// add project
projectsRouter.post('/', async (req, res) => {
    try {
        if (!req.body.project_name ||
            !req.body.project_description ||
            !req.body.employee_id ||
            !req.body.project_code) {
                return res.status(400).json({ error: 'Send all required fields' });
        }
        const newProject = {
            project_code: req.body.project_code,
            employee_id: req.body.employee_id,
            project_name: req.body.project_name,
            project_description: req.body.project_description
        }

        const employeeExists = await employee.findById
            (newProject.employee_id);
        const projectCodeExists = await project.findOne
            ({project_code:newProject.project_code});

        if (!employeeExists) {
            return res.status(400).json({error: "Employee doesn't exists!"});
        } else if (projectCodeExists) {
            return res.status(400).json({error: "Project code should be unique!"});
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