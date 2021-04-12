const { PORT } = require('./config/index');
const apiRoutes = require('./src/routes');
const { NotFoundMiddleware, ErrorMiddleware } = require('./src/middlewares');
const express = require('express');
const app = express();
const cors = require('cors');

const cron = require('./src/crons');

const MODE = process.env.NODE_ENV || 'prod';

app.use(cors())

// api routes
app.use('/v1/api', apiRoutes);

//error handle routes

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

// app.use('/',(req, res, next)=>{
//   res.status(200).send({ status: 200, message: "IPOS Api" })
// });

app.listen(PORT, () => {
  console.log(`🚀  Server ready at http://localhost:${PORT} in ${MODE} mode`);
});