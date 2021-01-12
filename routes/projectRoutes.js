const express = require('express');
const router = express.Router();
const projectControllers = require('../controllers/projectControllers');
const { projects } = require('../data');
const { userPermit } = require('../middleware/authUser');
const { projectPermission, deleteProject } = require('../middleware/projectPermission');


router.get('/',userPermit,projectControllers.view_all);
router.get('/:projectId',setProject,userPermit,authViewProject,projectControllers.view_project);
router.delete('/:projectId',setProject,userPermit,authDeleteProject,projectControllers.delete_project);

function setProject(req,res,next){
    const projectId =parseInt(req.params.projectId);
    req.project = projects.find(project=> project.id === projectId);

    if(req.project == null){
        res.status(404);
        return res.send('Project not found');
    };

    next();
};

function authViewProject(req,res,next){
    if(!projectPermission(req.user,req.project)){
        res.status(401);
        return res.send('Not Allowed');
    }
    next();
}

function authDeleteProject(req,res,next){
    if(!deleteProject(req.user,req.project)){
        res.status(401);
        return res.send('Not Allowed');
    }
    next();
}

module.exports = router;