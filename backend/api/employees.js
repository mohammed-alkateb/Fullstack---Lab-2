import express from 'express';
import { employee } from '../modules/model.js';

const employeesRouter = express.Router();

// add employee
employeesRouter.post('/', async (req, res) => {
    try {
        if (!req.body.full_name ||
            !req.body.email) {
                return res.status(400).json({error: 'Send all required fields'});
        }
        const newEmployee = {
            full_name: req.body.full_name,
            email: req.body.email
        }
        const createEmployee = await employee.create(newEmployee);
        res.status(201).send(createEmployee);
    } catch (error) {
        console.error(error);
    }
});

// get employee
employeesRouter.get('/', async (req, res) => {
    try {
        const allEmployees = await employee.find();
        if (allEmployees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }
        res.status(200).json(allEmployees);
    } catch (error) {
        console.error(error);
    }
});

export default employeesRouter;