'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const authrouter = require('./routes/sign-in');
const squadRouter = require('./routes/resource-routes/squadRoutes');
const achievementsRouter = require('./routes/resource-routes/achievementsRoutes.js');
const profilerouter = require('./routes/resource-routes/profile-routes.js');
const errorHandler = require('./error-handlers/errorHandler');
const friendsRouter = require('./routes/resource-routes/friendsRoutes');
const noRouteHandler = require('../src/error-handlers/404.js');
const bp = require('body-parser');

// app.use(bp.json())
// app.use(bp.urlencoded({ extended: true }))

app.use(express.json());
app.use(cors());

app.use(authrouter);
app.use(squadRouter);
app.use(achievementsRouter);
app.use(profilerouter);
app.use(friendsRouter);

app.use('*', noRouteHandler);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Proof of life on ${PORT}`);
  });
}

module.exports = {
  app,
  start,
};
