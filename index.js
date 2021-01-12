const express = require('express');
const app = express();
const { users,ROLE } = require('./data');
const { userPermit,userRole } = require('./middleware/authUser');
const projectRoutes = require('./routes/projectRoutes');

const setUser=(req, res, next)=>{
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find(user => user.id === userId)
  };
  next();
}

app.use(express.json());
app.use(setUser);
app.use('/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/dashboard',userPermit ,(req, res) => {
  res.send('Dashboard Page');
});

app.get('/admin',userPermit,userRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
});



app.listen(3000);
