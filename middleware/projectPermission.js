const { ROLE } = require("../data");

const projectPermission =(user,project)=>{
    return (user.role === ROLE.ADMIN || project.userId === user.id);
}

const scopedProject =(user,projects)=>{
    if(user.role === ROLE.ADMIN) return projects;
    return projects.filter(project => project.userId = user.id);
}

const deleteProject=(user,project)=>{
    return (project.userId === user.id);
}

module.exports={
    projectPermission,
    scopedProject,
    deleteProject
}