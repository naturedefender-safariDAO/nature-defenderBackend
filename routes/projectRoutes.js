const express = require('express')
const {getAllProjects, getProjectById, createProject} = require('../controllers/projectController');
const { authorizeAdmin } = require('../middleware/auth');
const route = express.Router();

route.get('/', getAllProjects);
route.get('/:projectId', getProjectById);
route.post('/create', authorizeAdmin, createProject);

module.exports = route
