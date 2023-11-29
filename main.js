const express = require('express');
const cors = require('cors')
const connectDB = require('./server/configs/db')

const employeeRouter = require('./server/routers/employeeRouter');
const departmentRouter = require('./server/routers/departmentRouter');
const shiftRouter = require('./server/routers/shiftRouter');
const testRouter = require('./server/routers/testRouter');
const authRouter = require('./server/routers/authRouter');
const userRouter = require('./server/routers/userRouter');
const actionRouter = require('./server/routers/actionRouter')

const app = express();
const port = 8000;

connectDB()

app.use(cors())
app.use(express.json());

// routers
app.use('/employees', employeeRouter);
app.use('/departments', departmentRouter); 
app.use('/shifts', shiftRouter);  // DB
app.use('/test', testRouter); 
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/actions', actionRouter);

app.listen(
  port,
  () => console.log(`app is listening at http://localhost:${port}`)
);