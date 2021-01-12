const {projects} = require('../data');
const { scopedProject } = require('../middleware/projectPermission');


const view_all = (req,res)=>{
  res.json(scopedProject(projects));
}


const view_project =(req, res) => {
    res.json(req.project);
}

const delete_project=(req,res)=>{
  res.send('Project Deleted');
}

module.exports = {
    view_all,
    view_project,
    delete_project
}