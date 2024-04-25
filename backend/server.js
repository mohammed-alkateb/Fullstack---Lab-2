import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConn.js';
import employeesRouter from './api/employees.js';
import projectsRouter from './api/projects.js';
import projectAssignmentRouter from './api/project_assignments.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Welcome to mern");
});

app.use('/api/employees/', employeesRouter);
app.use('/api/projects/', projectsRouter);
app.use('/api/project_assignments/', projectAssignmentRouter);

connectDB().then(() => {
    console.log("Connected to Mongo");
    app.listen(port, () => {
        console.log(`The server is running at http://localhost:${port}`);
    });
}).catch(err => {
    console.error("Error connecting to MongoDB: ", err);
});